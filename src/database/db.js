// importar dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()
// iniciar o objeto de banco de dados
const db = new sqlite3.Database("./src/database/database.db")

// Exportar arquivo para o 'server.js'
module.exports = db

// // utilizar o objeto de banco de dados para nossas operações
// db.serialize(() => {
//     // // criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places(
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT,
//             image TEXT,
//             address TEXT,
//             address2 TEXT,
//             number TEXT,
//             phone TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)
//     // inserir dados da tabela
    // const query = `
    //     INSERT INTO places(
    //         image,
    //         address,
    //         address2,
    //         number,
    //         phone,
    //         state,
    //         city,
    //         items
    //     ) VALUES(?,?,?,?,?,?,?,?);
    // `
//     const values = [
//         req.body.image,
//         req.body.address,
//         req.body.address2,
//         req.body.number,
//         req.body.phone,
//         req.body.state,
//         req.body.city,
//         req.body.items

//     ]

//     function afterInsertData(err) {
//         if (err) {
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso!")
//         console.log(this)
//     }

    // db.run(query, values, afterInsertData)


    // consultar dados da tabela
    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        console.log("Aqui estão seus registros: ")
        console.log(rows)
    })

    // deletar dados da tabela
    // o número 1 do segundo argumento é apenas exemplo.
    db.run(`DELETE FROM places WHERE id = ?`, [4], function (err) {
        if (err) {
            return console.log(err)
        }
        console.log("Registro deletado com sucesso!")

    })

// })
