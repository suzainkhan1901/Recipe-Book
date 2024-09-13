document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipeForm');
    const recipeList = document.getElementById('recipeList');
    const searchInput = document.getElementById('search');

    // Load recipes from LocalStorage
    loadRecipes();

    // Add Recipe
    recipeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const recipeName = document.getElementById('recipeName').value;
        const ingredients = document.getElementById('ingredients').value;
        const preparation = document.getElementById('preparation').value;
        const imageFile = document.getElementById('image').files[0];

        const reader = new FileReader();
        reader.onload = function(e) {
            const newRecipe = {
                name: recipeName,
                ingredients: ingredients,
                preparation: preparation,
                image: e.target.result
            };

            saveRecipe(newRecipe);
            recipeForm.reset();
        };
        reader.readAsDataURL(imageFile);
    });

    // Search Functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm));
        displayRecipes(filteredRecipes);
    });

    function saveRecipe(recipe) {
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes(recipes);
    }

    function loadRecipes() {
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        displayRecipes(recipes);
    }

    function displayRecipes(recipes) {
        recipeList.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'recipe';
            recipeDiv.innerHTML = `
                <h3>${recipe.name}</h3>
                <img src="${recipe.image}" alt="${recipe.name} Image">
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Preparation:</strong> ${recipe.preparation}</p>
            `;
            recipeList.appendChild(recipeDiv);
        });
    }
});