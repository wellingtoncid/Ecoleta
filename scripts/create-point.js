
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`    
        }

    } )

}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url =`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// collect items
// find Li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItem = document.querySelector("input[name=items]")


let selectedItems = []

function handleSelectedItem(event) {

    const itemLi = event.target

    //add or remove javascript class
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    
    //items verify, if yes
    //select items

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // its true or false
        return itemFound
    })

    //if selected
    if( alreadySelected >= 0 ) {
        // remove select
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    // if not selected
    } else {
        // add a selection
        selectedItems.push(itemId)
    }

    // Update the hidden field with the selected items
    collectedItem.value = selectedItems

}
