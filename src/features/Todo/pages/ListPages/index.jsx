import React from "react";
import PropTypes from "prop-types";
import TodoList from "../../component/TodoList";
import { useState } from "react";
import TodoForm from "../../component/TodoForm";

ListPage.propTypes = {};

function ListPage(props) {
  const inittodoList = [
    {
      id: 1,
      title: "Eat",
      status: "new",
    },
    {
      id: 2,
      title: "Sleep",
      status: "completed",
    },
    {
      id: 3,
      title: "Code",
      status: "new",
    },
  ];

  const [todoList, setTodoList] = useState(inittodoList);
  const [filterStatus, setFilterStatus] = useState("all");
  const handleTodoClick = (todo, idx) => {
    console.log(todo, idx);
    // clone todolist
    const newTodoList = [...todoList];
    //toggle state
    const newTodo = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === "new" ? "completed" : "new",
    };
    newTodoList[idx] = newTodo;
    //update todolist
    setTodoList(newTodoList);
  };

  const handleShowAllClick = () => {
    setFilterStatus("all");
  };
  const handleShowCompletedClick = () => {
    setFilterStatus("completed");
  };
  const handleShowNewClick = () => {
    setFilterStatus("new");
  };

  const renderedTodo = todoList.filter(
    (todo) => filterStatus === "all" || filterStatus === todo.status
  );
  const handleTodoFormSubmit = (values) => {
    console.log("Form submit:", values);
    const newTodo = {
      id: todoList.length + 1,
      title: values.title,
      status: "new",
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
  };

  return (
    <div>
      <h3>What to do </h3>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <h3>To Do List</h3>
      <TodoList todoList={renderedTodo} onTodoClick={handleTodoClick} />
      <div>
        <button onClick={handleShowAllClick}>Show All</button>
        <button onClick={handleShowCompletedClick}>Show Completed</button>
        <button onClick={handleShowNewClick}>Show New</button>
      </div>
    </div>
  );
}

export default ListPage;
