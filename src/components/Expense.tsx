import { useExpense } from "../store/expense";
import { useState } from "react";
import { type Expense } from "../store/expense";

const ExpenseComponent = () => {
  // Destructure the expense store
  const { expenses, addExpense, removeExpense, editExpense } = useExpense();
  
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  
  // State to track which expense is being edited (null means adding new)
  const [editingId, setEditingId] = useState<number | null>(null);

  // Handle edit button click
  const handleEditClick = (expense: Expense) => {
    setEditingId(expense.id);
    setName(expense.name);
    setIngredients(expense.ingredients.join(", "));
    setInstructions(expense.instructions);
  };

  // Handle form submission (both add and edit)
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !ingredients || !instructions) {
      alert("Please fill in all fields");
      return;
    }

    const ingredientArray = ingredients
      .split(",")
      .map((ing) => ing.trim())
      .filter((ing) => ing);

    if (editingId) {
      // Update existing expense
      editExpense({
        id: editingId,
        name,
        ingredients: ingredientArray,
        instructions,
      });
    } else {
      // Add new expense
      addExpense({
        id: Date.now(),
        name,
        ingredients: ingredientArray,
        instructions,
      });
    }

    // Reset form
    setName("");
    setIngredients("");
    setInstructions("");
    setEditingId(null);
  };

  // Handle cancel edit
  const handleCancel = () => {
    setName("");
    setIngredients("");
    setInstructions("");
    setEditingId(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Expense Tracker</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter expense name"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Ingredients: </label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients (comma-separated)"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Instructions: </label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter instructions"
            rows={4}
          />
        </div>

        <button type="submit">{editingId ? "Update Expense" : "Add Expense"}</button>
        {editingId && (
          <button type="button" onClick={handleCancel} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        )}
      </form>

      {/* Expenses List */}
      <div>
        <h2>Expenses List ({expenses.length})</h2>
        {expenses.length === 0 ? (
          <p>No expenses yet</p>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <h3>{expense.name}</h3>
              <p>
                <strong>Ingredients:</strong> {expense.ingredients.join(", ")}
              </p>
              <p>
                <strong>Instructions:</strong> {expense.instructions}
              </p>
              <div>
                <button
                  onClick={() => handleEditClick(expense)}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => removeExpense(expense.id)}
                  style={{ backgroundColor: "#ff4444", color: "white" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export { ExpenseComponent };
