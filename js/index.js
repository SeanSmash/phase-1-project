class Recipe{
    constructor(title, chef, familyStory, ingredients, instructions, inspiredBy){
        this.title = title,
        this.chef = chef
        this.familyStory = familyStory
        this.ingredients = ingredients,
        this.instructions = instructions
        this.inspiredBy = inspiredBy
        //console.log(this)
    }
}

// document.addEventListener("DOMContentLoaded", e => {
//     const h1 = document.querySelector('h1')
//     console.log(h1.textContent)
// })

const formSubmit = document.querySelector('form')
formSubmit.addEventListener('submit', e => postRecipe(e))

function postRecipe(e){
    e.preventDefault()
    const recipeTitle = e.target[0].value
    const chef = e.target[1].value
    const familyStory = e.target[2].value
    const ingredients = e.target[3].value
    const instructions = e.target[4].value
    const inspiredBy = e.target[5].value
    const newRecipe = new Recipe(recipeTitle, chef, familyStory, ingredients, instructions, inspiredBy)
    console.log(newRecipe)
    fetch('http://localhost:3000/Recipes', {
        method: 'POST',
        headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newRecipe)
    })
    .then(resp => resp.json)
    .then(data => console.log(data))
    formSubmit.reset()
}