import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [names, setNames] = useState([]);
  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to add a new name to the list
  const addName = () => {

    // If the input is empty, show an error message and stop execution
    if (newName.trim() === "") {
      setErrorMessage("Please enter a name.");
      return;
    }

    setNames([
      ...names,
      { id: Date.now().toString(), name: newName.trim(), present: false },
    ]);

    // Clear the input field after adding the name
    setNewName("");
    setErrorMessage(""); // Clear error message on successful add
  };

  const deleteName = (id) => {
    setNames(names.filter((item) => item.id !== id));
  };

  const startEdit = (item) => {
    setEditId(item.id); // Set the name's ID for editing
    setEditName(item.name); // Set the current name in input field
  };


  // Function to save an edited name
  const saveEdit = () => {
    setNames(
      names.map((item) =>
        item.id === editId ? { ...item, name: editName.trim() } : item
      )
    );
    setEditId(null);
    setEditName("");
  };

  const toggleAttendance = (id) => {
    setNames(
      names.map((item) =>
        item.id === id ? { ...item, present: !item.present } : item
      )
    );
  };

  return (
    <div className="container">
      <h1>Meeting Attendance</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter name"
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
            setErrorMessage(""); // Remove error when user starts typing
          }}
          onKeyPress={(e) => e.key === "Enter" && addName()}
        />
        <button onClick={addName}>Add</button>
      </div>

      {/* Display error message if exists */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <ul className="list">
        {names.map((item) => (
          <li key={item.id} className="list-item">
            <input
              type="checkbox"
              checked={item.present}
              onChange={() => toggleAttendance(item.id)}
            />
            {editId === item.id ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                autoFocus
              />
            ) : (
              <span className={item.present ? "present" : ""}>
                {item.name}
              </span>
            )}

            <div className="actions">
              {editId === item.id ? (
                <button onClick={saveEdit} className="save">💾</button>
              ) : (
                <button onClick={() => startEdit(item)} className="edit">✏️</button>
              )}
              <button onClick={() => deleteName(item.id)} className="delete">🗑️</button>
            </div>
          </li>
        ))}
      </ul>

      <p className="summary">
        Present: {names.filter((item) => item.present).length} / {names.length}
      </p>
    </div>
  );
};

export default App;