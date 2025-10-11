import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Plus, Trash2, Check, Circle } from "lucide-react";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Task Manager
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Organize suas tarefas diárias
          </p>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite uma nova tarefa..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button
              onClick={addTask}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center gap-2 font-semibold"
            >
              <Plus size={20} />
              Adicionar
            </button>
          </div>

          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Circle size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg">Nenhuma tarefa ainda</p>
                <p className="text-sm">Adicione uma tarefa para começar!</p>
              </div>
            ) : (
              tasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <button onClick={() => toggleTask(task.id)} className="flex-shrink-0">
                    {task.completed ? (
                      <Check size={24} className="text-green-500" />
                    ) : (
                      <Circle
                        size={24}
                        className="text-gray-400 group-hover:text-purple-500 transition-colors"
                      />
                    )}
                  </button>

                  <span
                    className={`flex-1 text-lg ${
                      task.completed ? "line-through text-gray-400" : "text-gray-800"
                    }`}
                  >
                    {task.text}
                  </span>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>

          {tasks.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total: {tasks.length} tarefa(s)</span>
                <span>Concluídas: {tasks.filter(t => t.completed).length}</span>
              </div>
            </div>
          )}
        </div>

        <footer className="text-center mt-6 text-white text-sm">
          <p>Criado com React + GitHub Pages</p>
        </footer>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<TaskManager />);
