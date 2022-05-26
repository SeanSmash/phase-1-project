class Recipe{
    constructor(recipeTitle, chef, familyStory, ingredients, instructions, inspiredBy, category){
        this.recipeTitle = recipeTitle,
        this.chef = chef
        this.familyStory = familyStory
        this.ingredients = ingredients,
        this.instructions = instructions
        this.inspiredBy = inspiredBy
        this.category = category
    }
}

document.addEventListener('DOMContentLoaded', function (){
    fetch('http://localhost:3000/Recipes')
    .then(resp => resp.json())
    .then(data => renderAllRecipes(data))
})

const renderAllRecipes = recipes => {
    recipes.forEach(recipe => {
        renderRecipe(recipe)
    })
}

const allRecipesBtn = document.querySelector('#all-recipes')
const clearRecipesBtn = document.querySelector('#clear-recipes')
const formSubmit = document.querySelector('form')
const recipeSection = document.getElementById('recipe')

allRecipesBtn.addEventListener('click', e => {
    while(recipeSection.firstChild){
        recipeSection.removeChild(recipeSection.firstChild)
    }
    fetch('http://localhost:3000/Recipes')
    .then(resp => resp.json())
    .then(data => renderAllRecipes(data))
})

clearRecipesBtn.addEventListener('click', e => {
    while(recipeSection.firstChild){
        recipeSection.removeChild(recipeSection.firstChild)
    }
})

formSubmit.addEventListener('submit', e => postRecipe(e))

function postRecipe(e){
    e.preventDefault()
    const recipeTitle = e.target[0].value
    const chef = e.target[1].value
    const familyStory = e.target[2].value
    const ingredients = e.target[3].value
    const instructions = e.target[4].value
    const inspiredBy = e.target[5].value
    const category = e.target[6].value
    const newRecipe = new Recipe(recipeTitle, chef, familyStory, ingredients, instructions, inspiredBy, category)
    formSubmit.reset()
    while(recipeSection.firstChild){
        recipeSection.removeChild(recipeSection.firstChild)
    }
    fetch('http://localhost:3000/Recipes', {
        method: 'POST',
        headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newRecipe),
    })
    .then(resp => resp.json())
    .then(data => renderRecipe(data))
}

function renderRecipe(recipe){
    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    const h3 = document.createElement('h3')
    const asideStory = document.createElement('aside')
    const pIngredients = document.createElement('p')
    const pInstructions = document.createElement('p')
    const inspirations = document.createElement('p')
    h2.className = 'title'
    h2.textContent = `Recipe Title: ${recipe.recipeTitle}`
    h3.className = 'chef'
    h3.textContent = `by Chef ${recipe.chef}`
    asideStory.className = 'family-story'
    asideStory.textContent = `Family Story: ${recipe.familyStory}`
    pIngredients.className = 'ingredients'
    pIngredients.textContent = `Ingredients: ${recipe.ingredients}`
    pInstructions.className = 'instructions'
    pInstructions.textContent = `Instructions: ${recipe.instructions}`
    inspirations.className = 'inspirations'
    inspirations.textContent = `Inspired by / Contributors: ${recipe.inspiredBy}`
    div.append(h2, h3, asideStory, pIngredients, pInstructions, inspirations)
    recipeSection.append(div)
}