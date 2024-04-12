import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [newRecipe, setNewRecipe] = useState({ title: '', ingredients: '', instructions: '' });

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes'));
    if (savedRecipes) {
      setRecipes(savedRecipes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = () => {
    if (!newRecipe.title || !newRecipe.ingredients || !newRecipe.instructions) {
      alert('Please fill out all fields.');
      return;
    }
    setRecipes([...recipes, newRecipe]);
    setNewRecipe({ title: '', ingredients: '', instructions: '' });
  };

  const deleteRecipe = (index) => {
    const updatedRecipes = [...recipes];
    updatedRecipes.splice(index, 1);
    setRecipes(updatedRecipes);
  };

  const editRecipe = (index) => {
    setEditingRecipe(index);
    setNewRecipe(recipes[index]);
  };

  const saveEditedRecipe = () => {
    if (!newRecipe.title || !newRecipe.ingredients || !newRecipe.instructions) {
      alert('Please fill out all fields.');
      return;
    }
    const updatedRecipes = [...recipes];
    updatedRecipes[editingRecipe] = newRecipe;
    setRecipes(updatedRecipes);
    setEditingRecipe(null);
    setNewRecipe({ title: '', ingredients: '', instructions: '' });
  };

  return (
    <div className="App">
      <h1>Rishi's Recipe List</h1>
      <RecipeForm
        newRecipe={newRecipe}
        setNewRecipe={setNewRecipe}
        addRecipe={addRecipe}
        saveEditedRecipe={saveEditedRecipe}
        editingRecipe={editingRecipe}
      />
      <RecipeList
        recipes={recipes}
        deleteRecipe={deleteRecipe}
        editRecipe={editRecipe}
      />
    </div>
  );
}

<br></br>

function RecipeForm({ newRecipe, setNewRecipe, addRecipe, saveEditedRecipe, editingRecipe }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  return (
    <div className="recipe-form">
      <h2>{editingRecipe !== null ? 'Edit Recipe' : 'Add A New Recipe'}</h2>
      <input type="text" name="title" value={newRecipe.title} onChange={handleChange} placeholder="Title" />
      <textarea name="ingredients" value={newRecipe.ingredients} onChange={handleChange} placeholder="Ingredients" />
      <textarea name="instructions" value={newRecipe.instructions} onChange={handleChange} placeholder="Instructions" />
      <br></br>
      {editingRecipe !== null ? (
        <button onClick={saveEditedRecipe}>Save</button>
      ) : (
        <button onClick={addRecipe}>Add Recipe</button>
      )}
      <br></br>
    </div>
  );
}

function RecipeList({ recipes, deleteRecipe, editRecipe }) {
  /*const handleFontColorChange = (e) => {
    const newColor = e.target.value;
    document.documentElement.style.setProperty('--font-color', newColor);
  }; */

  return (
    <div className="recipe-list">
      <h2 style={{ fontFamily: 'Bahnschrift', fontSize: '60px', fontWeight: 'bold', textDecoration: 'underline'}}>Your Recipes</h2>
      {recipes.map((recipe, index) => (
        <div key={index}>
          <h3 style={{ fontFamily: 'Helvetica',fontSize: '40px', fontWeight: 'bold', color: '#05ffea', textAlign: 'center', marginLeft: '0px'}}>{recipe.title}</h3>
          <div>
            <h4 style={{ fontFamily: 'Bahnschrift', textDecoration: 'underline', textAlign: 'left', color: '#1f84ff' }}>Ingredients:</h4>
            <ol>
              {recipe.ingredients.split('\n').map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ol>
          </div>
          
          <div>
            <h4 style={{ fontFamily: 'Bahnschrift', textDecoration: 'underline', textAlign: 'left', color: '#1f84ff' }}>Instructions:</h4>
            <ol>
              {recipe.instructions.split('\n').map((instruction, i) => (
                <li key={i}>{instruction}</li>
              ))}
            </ol>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}> {}
            <button style={{ backgroundColor: '#ff9c38', color: 'white', padding: '10px 20px', fontSize: '16px', border: 'none', borderRadius: '5px', fontFamily: 'Bahnschrift' }} onClick={() => deleteRecipe(index)}>Delete</button> {}
            <button style={{ backgroundColor: '#ff9c38', color: 'white', padding: '10px 20px', fontSize: '16px', border: 'none', borderRadius: '5px', fontFamily: 'Bahnschrift' }} onClick={() => editRecipe(index)}>Edit</button> {}
          </div>
          <br />
        </div>
      ))}
      
    </div>
  );
}



export default App;