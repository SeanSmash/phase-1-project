class Recipe{
    constructor(recipeTitle, chef, familyStory, ingredients, instructions, inspiredBy, category, likes){
        this.recipeTitle = recipeTitle,
        this.chef = chef
        this.familyStory = familyStory
        this.ingredients = ingredients,
        this.instructions = instructions
        this.inspiredBy = inspiredBy
        this.category = category
        this.likes = likes
    }
}

document.addEventListener('DOMContentLoaded', function (){
    fetch('http://localhost:3000/Recipes')
    .then(resp => resp.json())
    .then(data => {
        countVisibleRecipes(data)
        renderAllRecipes(data)
    })
    document.addEventListener('click', e =>{
        if(e.target.matches('.like-btn')){
            updateLikes(e)
        }
    })
})

const renderAllRecipes = recipes => {
    recipes.forEach(recipe => {
        recipeCard(recipe)
    })
}

const allRecipesBtn = document.querySelector('#all-recipes')
const clearRecipesBtn = document.querySelector('#clear-recipes')
const formSubmit = document.querySelector('form')
const filterByCategoryBtn = document.querySelector('#category-filter')
const visibleRecipes = document.querySelector('#visible-recipes')
const visibleRecipeCount = []
const recipeSection = document.getElementById('recipe')

allRecipesBtn.addEventListener('click', e => {
    clearRecipes()
    fetch('http://localhost:3000/Recipes')
    .then(resp => resp.json())
    .then(data => {
        countVisibleRecipes(data)
        renderAllRecipes(data)
    })
})

clearRecipesBtn.addEventListener('click', e => {
    clearRecipes()
})

formSubmit.addEventListener('submit', e => postRecipe(e))

filterByCategoryBtn.addEventListener('submit', e => filterRecipesByCategory(e))

function postRecipe(e){
    e.preventDefault()
    const recipeTitle = e.target[0].value
    const chef = e.target[1].value
    const familyStory = e.target[2].value
    const ingredients = e.target[3].value
    const instructions = e.target[4].value
    const inspiredBy = e.target[5].value
    const category = e.target[6].value
    const likes = 0
    const newRecipe = new Recipe(recipeTitle, chef, familyStory, ingredients, instructions, inspiredBy, category, likes)
    formSubmit.reset()
    clearRecipes()
    fetch('http://localhost:3000/Recipes', {
        method: 'POST',
        headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newRecipe),
    })
    .then(resp => resp.json())
    .then(data => recipeCard(data))
}

function recipeCard(recipe){
    const div = document.createElement('div')
    div.className = 'recipe-card'
    const h2 = document.createElement('h2')
    h2.className = 'title'
    h2.style = 'text-decoration: underline'
    h2.textContent = recipe.recipeTitle
    const h3 = document.createElement('h3')
    h3.className = 'chef'
    h3.textContent = `by: Chef ${recipe.chef}`
    const likeBtn = document.createElement('button')
    likeBtn.id = recipe.id
    likeBtn.className = 'like-btn'
    likeBtn.innerHTML = `Like <span style= "font-size:125%; color:#B22222">&hearts;</span>`
    const pStory = document.createElement('p')
    pStory.className = 'family-story'
    pStory.textContent = `Family Story: ${recipe.familyStory}`
    const pIngredients = document.createElement('p')
    pIngredients.className = 'ingredients'
    pIngredients.textContent = `Ingredients: ${recipe.ingredients}`
    const pInstructions = document.createElement('p')
    pInstructions.className = 'instructions'
    pInstructions.textContent = `Instructions: ${recipe.instructions}`
    const inspirations = document.createElement('p')
    inspirations.className = 'inspirations'
    inspirations.textContent = `Inspired by / Contributors: ${recipe.inspiredBy}`
    const pLikes = document.createElement('span')
    pLikes.id = recipe.id
    pLikes.textContent = `  ${recipe.likes} likes!`
    const deleteBtn = document.createElement('button')
    deleteBtn.id = 'recipe-delete'
    deleteBtn.style = 'text-align:center'
    deleteBtn.textContent = 'Delete'
    div.append(h2, h3, likeBtn, pLikes, pStory, pIngredients, pInstructions, inspirations, deleteBtn)
    recipeSection.append(div)
}

const filterRecipesByCategory = e => {
    e.preventDefault()
    const category = e.target[0].value
    clearRecipes()
    filterByCategoryBtn.reset()
    fetch('http://localhost:3000/Recipes')
    .then(resp => resp.json())
    .then(data => {
        const newArray = []
        data.map(recipe => {
            if(recipe.category === category){
                recipeCard(recipe)
                newArray.push(recipe)
            }
        })
        visibleRecipes.textContent = `${newArray.length} Recipes`
    })
}

const countVisibleRecipes = (recipeArray) => {
    visibleRecipes.textContent = `${recipeArray.length} Recipes`
}

const clearRecipes = () => {
    while(recipeSection.firstChild){
        recipeSection.removeChild(recipeSection.firstChild)
    }
    visibleRecipes.textContent = '...'
}

const updateLikes = e => {
    e.preventDefault()
    fetch(`http://localhost:3000/Recipes/${e.target.id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          'likes': parseInt(e.target.parentElement.children[7].textContent.split(" ")[2], 10) +1
        })
    })
      .then(resp => resp.json())
      .then(data =>{
          const p = document.getElementById(data.id).nextSibling
          p.textContent = `  ${data.likes} likes!`
      })}