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

    fetch(url)
    .then( res =>  res.json() )
    .then(  citys => {

          for (const city of citys){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
         
          }      
          citySelect.disabled = false

    } ).catch(  res => console.log("error:" +  res) )
  
}

popularUfs()

document.querySelector("select[name=uf]").addEventListener("change", getCitys)

 