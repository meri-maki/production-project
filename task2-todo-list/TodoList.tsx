import React, { useState, useEffect } from 'react';
import styles from './TodoList.module.scss';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

interface TodoListProps {
  initialTodos?: Todo[];
  onSave?: (todos: Todo[]) => void;
}

const TodoList: React.FC<TodoListProps> = ({ initialTodos = [], onSave }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [priority, setPriority] = useState<Todo['priority']>('medium');

  useEffect(() => {
    onSave(todos);
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    
    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      priority: priority,
      createdAt: new Date()
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id != id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const sortedTodos = filteredTodos.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>
      
      <form onSubmit={addTodo} className={styles.form}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className={styles.input}
        />
        
        <select 
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={styles.select}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        
        <button type="submit" className={styles.addButton}>
          Add
        </button>
      </form>

      <div className={styles.filters}>
        <button
          className={filter === 'all' && styles.active}
          onClick={() => setFilter('all')}
        >
          All ({todos.length})
        </button>
        <button
          className={filter === 'active' && styles.active}
          onClick={() => setFilter('active')}
        >
          Active ({todos.filter(t => !t.completed).length})
        </button>
        <button
          className={filter === 'completed' && styles.active}
          onClick={() => setFilter('completed')}
        >
          Completed ({todos.filter(t => t.completed).length})
        </button>
      </div>

      <ul className={styles.todoList}>
        {sortedTodos.map((todo, index) => (
          <li key={index} className={styles.todoItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className={styles.checkbox}
            />
            
            <span 
              className={`${styles.todoText} ${todo.completed && styles.completed}`}
            >
              {todo.text}
            </span>
            
            <span className={`${styles.priority} ${styles[todo.priority]}`}>
              {todo.priority}
            </span>
            
            <button
              onClick={() => deleteTodo(todo.id)}
              className={styles.deleteButton}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && (
        <p className={styles.emptyState}>No todos yet. Add one above!</p>
      )}
    </div>
  );
};

export default TodoList;