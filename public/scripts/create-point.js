/* Implementação de uma máscara para inserção de número de telefone pelo usuário com parênteses, espaços
 e ínfem automáticos */
function mascara(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmascara()",1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
function mtel(v){
    v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}

// Código referente à tabela 'Dados da entidade'
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json() )
        .then( states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
        .then(res => res.json()
            .then(cities => {
                for (const city of cities) {
                    citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
                }
                citySelect.disabled = false
            }))

}

document.querySelector("select[name=uf]").addEventListener("change", getCities)

// Código referente à grid 'Itens de coleta'
// Recebe todos os itens contidos em um bloco 'li'
const itemsToCollect = document.querySelectorAll(".items-grid li")
const collectedItems = document.querySelector("input[name=items]")
for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    // Adicionar ou remover uma classe com o Javascript
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id
    // Verifficar se existem itens selecionados, se sim, pegá-los
    const alreadySelected = selectedItems.findIndex( item => {
        return item == itemId
    })
    // console.log(alreadySelected)
    // Se já houver sido selecionado, tirá-lo da seleção
    if(alreadySelected >= 0){
        const filteredItem = selectedItems.filter( item => {
            return item != itemId
        })
        selectedItems = filteredItem
        // console.log(selectedItems)
        // Senão, adicioná-lo
    }else{
        selectedItems.push(itemId)
    }
    // console.log(selectedItems)
        // Atualizar o campo escondido 'input hidden' com os dados selecionados
    collectedItems.value = selectedItems
}