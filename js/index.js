class Recipe{
    constructor(name, ingredients, instructions){
        this.name = name,
        this.ingredients = ingredients,
        this.instructions = instructions
        //console.log(this)
    }
}

fetch('https://random.dog/woof.json')
.then(response => response.json())
.then(data => renderImage(data))

function renderImage(data){
    const img = document.createElement('img')
    img.src = data.url
    img.width = '400'
    img.height = '250'
    document.querySelector('section').append(img)
    //console.log(img)
}