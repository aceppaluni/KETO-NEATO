import { recipeData } from './data.js'

const cravingRadios = document.getElementById('craving-radios')
const isGif = document.getElementById('craving-only-option')
const getBtn = document.getElementById('get-btn')

const outterChoiceContainer = document.getElementById('Outter-Choice-Container')
const innerChoiceContainer = document.getElementById('inner-choice-container')

getBtn.addEventListener("click", renderCravingObject)

cravingRadios.addEventListener('change', highLightCraving)

function highLightCraving(e){// when a craving is selected it will highlight and allows for only one to be selected
    const radios = document.getElementsByClassName('radio')

    for (let radio of radios){ // if another craving is selected then remove the prior 
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight') // add the styles specified by the highlight class when clicked 
}

function renderCravingObject(){ // this renders the image to the UI
    // displaying the image based on the craving selected by the user and if the gif option was selected 
    // be sure to set the display of the container as to not encounter bugs 
    const cravingObject = getSingleCravingObject()

    innerChoiceContainer.innerHTML = `<img
    id="craving-image-element" src="./images/${cravingObject.image}" alt="Image craving"
    >`

    outterChoiceContainer.style.display = 'flex'
}


function getSingleCravingObject(){ // this selects the image based on what the user chose 
    // aims ot retrive an image that matches the criteria selected by the user aka craving and gif
    //if there is only one image that matches then that image is returned 
    // if more then one image matches then an image is displayed at random 
    const cravingsArray = getMatchingCravingData()

    if(cravingsArray.length === 1){
        return cravingsArray[0]
    } else {
        const randomNumber = Math.floor(Math.random() * cravingsArray.length)
        return cravingsArray[randomNumber]
    }
}

function getMatchingCravingData(){/// this grabs the data and sets a condition 
    // crating a condition based on the selectd craving
    // getting the images from the image property from the data 
    if(document.querySelector('input[type="radio"]:checked')){

        const isGifOnly = isGif.checked // determine button click - need to store that info
        const selectedCraving = document.querySelector('input[type="radio"]:checked').value // capturing whcih craving was selected 

        const MatchingCravingsArray = recipeData.filter(function(recipe){

            if(isGifOnly){ // checking if clicked 
                return recipe.cravingTags.includes(selectedCraving) && recipe.isGif
                // if the user picks a sweet option and hit the gif button then the user gets a moving image 
            } else {
                return recipe.cravingTags.includes(selectedCraving)
                // if the gif button is not clicked then user gets a stagnant image 
            }


        })

        return MatchingCravingsArray
    }
}


function getCravingsArray(recipes){// this grabs the data 
    // getting the array of cravings from the data
    // cannot use for each as you are not pushing out each individual tag, only the ones taht are mentioned the first time 
    const recipesArray = [] // need a variable to store craving tags 

    for (let recipe of recipes){// need to iterate over each item and identify its assigend craving
        for(let craving of recipe.cravingTags){
            if(!recipesArray.includes(craving)){ // if the craving is not mentioned yet then push it to the array 
                recipesArray.push(craving)
            }
        }
    }
    return recipesArray // return the information stored in the array 

}

function renderCravingRadios(recipes){// this renders the data from above to the UI
    // determinging how and what way we want the data to be rendered 
    let radioItems = '' // need a varible for rendering 

    const craves = getCravingsArray(recipes) // need variable to fetch from data

    for(let crave of craves){
        radioItems += `<div class="radio">
        <label for="${crave}">${crave}</label>
        <input type="radio" value="${crave}" name="cravings" id="${crave}">
        </div>`
    }

    cravingRadios.innerHTML = radioItems
}
renderCravingRadios(recipeData)

