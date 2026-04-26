import React, { useState } from 'react';
import { TabList, Tab, SelectTabEvent, SelectTabData, Button } from '@fluentui/react-components';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import useTodos from '../hooks/useTodos';

type Filter = 'all' | 'active' | 'completed';

function Todos() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  const visibleTodos = todos.filter((todo: { completed: boolean }) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const hasCompleted = todos.some((todo: { completed: boolean }) => todo.completed);

  const handleTabSelect = (_event: SelectTabEvent, data: SelectTabData) => {
    setFilter(data.value as Filter);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoInput onAdd={addTodo} />
      <TabList selectedValue={filter} onTabSelect={handleTabSelect}>
        <Tab value="all">All</Tab>
        <Tab value="active">Active</Tab>
        <Tab value="completed">Completed</Tab>
      </TabList>
      <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
      <Button onClick={clearCompleted} disabled={!hasCompleted}>
        Clear completed
      </Button>
    </div>
  );
}

export default Todos;
