document.querySelector("select[name=uf]").addEventListener("change", () => {
  console.log("mudei")
})


function popularUfs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res =>  res.json() )
    .then(  states => {

          for (const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

          }      
    } ).catch(  res => console.log("error:" +  res) )

}


function getCitys(event){
  const citySelect = document.querySelector("select[name=city]")
 const stateInput = document.querySelector("input[name=state]")

  const cityValue = event.target.value

  
  const indexOfSelectState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectState].text
 

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${cityValue}/municipios`
  citySelect.innerHTML = `<option value="">Selecione uma cidade</option>`
  citySelect.disabled = true
    fetch(url)
    .then( res =>  res.json() )
    .then(  citys => {
   
          for (const city of citys){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
         
          }      
          citySelect.disabled = false

    } ).catch(  res => console.log("error:" +  res) )
  
}

popularUfs()

document.querySelector("select[name=uf]").addEventListener("change", getCitys)


//Estrutura para captura dos itens selecionados

//armazenar todos os LI dentro do grid
const itemsToCollect = document.querySelectorAll(".items-grid li")
 
for (const item of itemsToCollect){
    item.addEventListener("click", handleSlectedItem);


}

//coletar dados selecionados
let selectedItems = []
const collectedItems = document.querySelector("input[name=items]")

function handleSlectedItem(event){

  const itemLi = event.target;
  //add ou remover uma classe. muito util para efeito de seleção.
  itemLi.classList.toggle("select")
  

  let itemId = itemLi.dataset.id


 const alreadySelected = selectedItems.findIndex( item => {
    const itemFound = item == itemId;
    return itemFound
 })

 if ( alreadySelected >=0 ){

  const filteredItems = selectedItems.filter( item =>{
    const itemIsDifferent = item != itemId;
    return itemIsDifferent;
  })
selectedItems = filteredItems;

 }else{

  selectedItems.push(itemId)
 }

 collectedItems.value = selectedItems;

}