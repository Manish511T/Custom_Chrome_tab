import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('hacker_todos');
    return stored ? JSON.parse(stored) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('hacker_todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([{ text: input, done: false }, ...todos]);
      setInput('');
    }
  };

  const toggleDone = (index) => {
    const updated = [...todos];
    updated[index].done = !updated[index].done;
    setTodos(updated);
  };

  const deleteTodo = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  return (
    <div className="w-64 bg-[#1e1e28] text-white p-4 rounded-lg shadow-md border border-[#2e2e3e]">
      <h2 className="text-lg font-mono mb-3">[ TODO LIST ]</h2>
      <div className="flex mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Type & press Enter"
          className="bg-[#2a2a3a] text-white text-sm px-2 py-1 flex-grow outline-none"
        />
        <button onClick={addTodo} className="ml-2 px-2 bg-green-600 text-sm">+</button>
      </div>
      <ul className="max-h-60 overflow-y-auto  pr-1">
        {todos.map((todo, i) => (
          <li
            key={i}
            className="text-sm flex justify-between items-center mb-1"
          >
            <span
              className={`cursor-pointer font-mono ${todo.done ? 'line-through text-green-400' : ''}`}
              onClick={() => toggleDone(i)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(i)} className="text-red-500 text-xs ml-2">x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
