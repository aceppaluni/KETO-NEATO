
import { saucesAndMarinadesArray } from "/data.js"

const saucesAndMarinades = document.getElementById('third')

function getSauceAndMarinadesArray(saucesAndMarinadesArray){
    let sauceAndMarinade = ''

    saucesAndMarinadesArray.forEach(function(item){
        
        let ingredients = ''

        item.ingredients.forEach(function(ingredient){
            ingredients += `<li id="ingredient-list">${ingredient}</li>`
        })

        sauceAndMarinade += `<div>
        <h3 id="name">${item.name}:</h3>
        <ul>
        ${ingredients}
        </ul>
        </div>` 
    })

    return sauceAndMarinade
}

function renderSauceAndMarinadesArray(){
    saucesAndMarinades.innerHTML += getSauceAndMarinadesArray(saucesAndMarinadesArray)
}
renderSauceAndMarinadesArray(saucesAndMarinadesArray)