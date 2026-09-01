import { useCounter } from "./store/store";
import { useRecipie } from "./store/recipieStore";
import { useState } from "react";
  import { type Recipie } from "./store/recipieStore";
const App = () => {
  // 1- Destructuring custom counter hook
  // const { count, Increment, Decrement, zeroCount } = useCounter();

  // Added editRecipie to the destructured object
  const { recipies, addRecipie, removeRecipie, editRecipie } = useRecipie();
  
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  
  // New state: stores the ID of the recipe being edited (null means we are adding a new one)
  const [editingId, setEditingId] = useState<number | null>(null);

  // Triggered when someone clicks the "Edit" button on a recipe card
  const handleEditClick = (recipe: Recipie) => {
    setEditingId(recipe.id);
    setName(recipe.name);
    // Joins the array items back into a comma-separated string for the input field
    setIngredients(recipe.ingredients.join(", "));
    setInstructions(recipe.instructions);
  };

  // Handle submitting the form (handles both Add and Save Changes)
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    const ingredientArray = ingredients.split(',').map(item => item.trim()).filter(Boolean);

    if (editingId !== null) {
      // --- EDIT MODE ---
      const updatedRecipie = {
        id: editingId, // Keep the original ID
        name: name,
        ingredients: ingredientArray,
        instructions: instructions
      };
      
      editRecipie(updatedRecipie);
      setEditingId(null); // Switch back to Add mode
    } else {
      // --- ADD MODE ---
      const newRecipie = {
        id: Date.now(), 
        name: name,
        ingredients: ingredientArray,
        instructions: instructions
      };
      
      addRecipie(newRecipie);
    }

    // Clear the form fields
    setName('');
    setIngredients('');
    setInstructions('');
  };

  // Cancels editing and resets the form
  const handleCancel = () => {
    setEditingId(null);
    setName('');
    setIngredients('');
    setInstructions('');
  };

  return (
    <>
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        <h1>My Recipe Box</h1>

        {/* --- ADD / EDIT RECIPE FORM --- */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
          {/* Dynamic header title based on mode */}
          <h3>{editingId !== null ? "Edit Recipe" : "Add a New Recipe"}</h3>
          
          <input 
            type="text" 
            placeholder="Recipe Name (e.g., Tacos)" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          
          <input 
            type="text" 
            placeholder="Ingredients (separate with commas: Cheese, Meat, Tortilla)" 
            value={ingredients} 
            onChange={(e) => setIngredients(e.target.value)} 
          />
          
          <textarea 
            placeholder="Cooking Instructions" 
            value={instructions} 
            onChange={(e) => setInstructions(e.target.value)} 
          />
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="submit" 
              style={{ 
                flex: 1,
                cursor: 'pointer', 
                background: editingId !== null ? '#008CBA' : '#4CAF50', 
                color: 'white', 
                border: 'none', 
                padding: '10px' 
              }}
            >
              {editingId !== null ? "Save Changes" : "Save Recipe"}
            </button>

            {/* Show a cancel button only when in edit mode */}
            {editingId !== null && (
              <button 
                type="button" 
                onClick={handleCancel}
                style={{ cursor: 'pointer', background: '#e7e7e7', color: 'black', border: 'none', padding: '10px' }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* --- RECIPE LIST DISPLAY --- */}
        <div>
          <h3>Your Recipes ({recipies.length})</h3>
          
          {recipies.length === 0 ? (
            <p>No recipes added yet. Try adding one above!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {recipies.map((recipe) => (
                <div key={recipe.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', position: 'relative' }}>
                  
                  {/* Remove button */}
                  <button 
                    onClick={() => removeRecipie(recipe.id)}
                    style={{ position: 'absolute', top: '10px', right: '10px', background: '#f44336', color: 'white', border: 'none', cursor: 'pointer', padding: '5px 10px' }}
                  >
                    Delete
                  </button>

                  {/* Fixed Edit button: passed the full recipe item instead of just id */}
                  <button 
                    onClick={() => handleEditClick(recipe)}
                    style={{ position: 'absolute', top: '10px', right: '85px', background: '#007BFF', color: 'white', border: 'none', cursor: 'pointer', padding: '5px 10px' }}
                  >
                    Edit
                  </button>

                  <h4 style={{ margin: '0 0 10px 0', paddingRight: '140px' }}>{recipe.name}</h4>
                  
                  <p><strong>Ingredients:</strong></p>
                  <ul>
                    {recipe.ingredients.map((ing, index) => (
                      <li key={index}>{ing}</li>
                    ))}
                  </ul>
                  
                  <p><strong>Instructions:</strong> {recipe.instructions}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { App };
