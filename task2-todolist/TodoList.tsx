import React, { useState, useEffect, useMemo } from 'react';
import styles from './TodoList.module.scss';

// Задача 2: TodoList компонент
// Найдите и исправьте все ошибки в этом компоненте

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}

interface TodoListProps {
  initialTodos?: Todo[];
  onTodosChange?: (todos: Todo[]) => void;
}

const TodoList: React.FC<TodoListProps> = ({ initialTodos = [], onTodosChange }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [newTodoText, setNewTodoText] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<Todo['priority']>('medium');

  // Ошибка 1: бесконечный цикл из-за некорректных зависимостей
  useEffect(() => {
    if (onTodosChange) {
      onTodosChange(todos);
    }
  }, [todos, onTodosChange]);

  // Ошибка 2: отсутствует мемоизация для дорогой операции
  const filteredTodos = todos.filter(todo => {
    console.log('Filtering...'); // Показывает что фильтрация происходит при каждом рендере
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  // Ошибка 3: функция создается заново при каждом рендере
  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(), // Ошибка 4: плохая генерация ID
        text: newTodoText.trim(),
        completed: false,
        createdAt: new Date(),
        priority: selectedPriority
      };
      
      setTodos([...todos, newTodo]);
      setNewTodoText('');
    }
  };

  // Ошибка 5: функция не мемоизирована
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Ошибка 6: функция не мемоизирована и мутирует массив
  const deleteTodo = (id: string) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  // Ошибка 7: отсутствует обработка edge cases
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className={styles.todoList}>
      <div className={styles.header}>
        <h2>Todo List</h2>
        <div className={styles.stats}>
          <span>{completedCount}/{totalCount} completed</span>
        </div>
      </div>

      <div className={styles.addTodo}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo..."
          className={styles.todoInput}
        />
        
        <select 
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value as Todo['priority'])}
          className={styles.prioritySelect}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button 
          onClick={addTodo}
          className={styles.addButton}
          // Ошибка 8: кнопка не деактивируется когда input пустой
        >
          Add
        </button>
      </div>

      <div className={styles.filters}>
        {/* Ошибка 9: обработчики создаются заново при каждом рендере */}
        <button 
          onClick={() => setFilter('all')}
          className={filter === 'all' ? styles.active : ''}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('active')}
          className={filter === 'active' ? styles.active : ''}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? styles.active : ''}
        >
          Completed
        </button>
      </div>

      <div className={styles.todoItems}>
        {/* Ошибка 10: не оптимизирована производительность списка */}
        {filteredTodos.map((todo) => (
          <div 
            key={todo.id}
            className={`${styles.todoItem} ${todo.completed ? styles.completed : ''} ${styles[todo.priority]}`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className={styles.checkbox}
            />
            
            <span className={styles.todoText}>{todo.text}</span>
            
            <span className={styles.priority}>{todo.priority}</span>
            
            <button 
              onClick={() => deleteTodo(todo.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        ))}
        
        {/* Ошибка 11: некорректное условие для отображения пустого состояния */}
        {filteredTodos.length === 0 && (
          <div className={styles.emptyState}>
            No todos found
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;