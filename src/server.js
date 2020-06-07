// Observação importante: ao utilizar a função 'require()', naturalmente, o argumento à ser importado
// estará sendo exportado do seu local de origem utilizando-se 'module.exports = argumento', como no
// caso do arquivo db.js da pasta database.
const express = require("express")
const server = express()

// importar o banco de dados 'db.js'
const db = require("./database/db")

// Configurar pasta pública
server.use(express.static("public"))

// Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

// Utilizando Template Engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    // 'noCache' é um argumento que incapacita (enquanto 'true') que o servidor mantenha informações antigas
    //de página. Usual enquanto está sendo desenvolvido o projeto 
    noCache: true
})

// Configurar caminhos da aplicação (página inicial)
server.get("/", function (req, res) {
    return res.render("index.html")
})

server.get("/create-point", function (req, res) {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    // Criar banco de dados
    db.serialize(() => {
        db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            number TEXT,
            phone TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
        // Inserir dados no banco de dados
        const query = `
        INSERT INTO places(
            name,
            image,
            address,
            address2,
            number,
            phone,
            state,
            city,
            items
        ) VALUES(?,?,?,?,?,?,?,?,?);
    `
        const values = [
            req.body.name,
            req.body.image,
            req.body.address,
            req.body.address2,
            req.body.number,
            req.body.phone,
            req.body.state,
            req.body.city,
            req.body.items
        ]

        function afterInsertData(err) {
            if (err) {
                console.log(err)
                return res.send("Erro no cadastro!")
            }
            console.log("Cadastrado com sucesso!")
            console.log(this)
            return res.render("create-point.html", { saved: true })
        }
        db.run(query, values, afterInsertData)
    })
})

server.get("/search-results", (req, res) => {
    const search = req.query.search
    if (search == "") {

        return res.render("search-results.html", { total: 0 })
    }
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length
        // Exibe a página HTML com os dados coletados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })
})

// Ligar o servidor
server.listen(3001)