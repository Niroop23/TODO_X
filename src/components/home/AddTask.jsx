import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import AddTaskAtom from "../../recoil/AddTaskAtom";
import TodoData from "../../recoil/TodoData";
import FilterDataAtom from "../../recoil/FilterDataAtom";

const AddTask = () => {
  //global vars
  const [addTaskOverlay, setAddTaskOverlay] = useRecoilState(AddTaskAtom);
  const [todoApiData, setTodoApiData] = useRecoilState(TodoData);
  const [filterData, setFilterData] = useRecoilState(FilterDataAtom);

  //local
  const titleRef = useRef(null);
  const descRef = useRef(null);

  const AddTaskHandler = (e) => {
    e.preventDefault();
    const data = {
      title: titleRef?.current?.value,
      desc: descRef?.current?.value,
    };

    fetch("http://127.0.0.1:8000/create_todo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setAddTaskOverlay(false);
        setTodoApiData(data?.todo);
        setFilterData(data?.stats);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div className="add-task-container">
      <div className="add-task-content">
        <h1>New Task</h1>
        <form onSubmit={AddTaskHandler} className="add-task-form">
          <input ref={titleRef} type="text" placeholder="Title" />
          <textarea
            ref={descRef}
            cols="30"
            rows="10"
            placeholder="Desccription"
          ></textarea>
          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
