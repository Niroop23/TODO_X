import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import AddTaskAtom from "../../recoil/AddTaskAtom";
import TodoData from "../../recoil/TodoData";
import EditTaskAtom from "../../recoil/EditTaskAtom";
import FilterDataAtom from "../../recoil/FilterDataAtom";

const EditTask = () => {
  //global vars
  const [addTaskOverlay, setAddTaskOverlay] = useRecoilState(AddTaskAtom);
  const [todoApiData, setTodoApiData] = useRecoilState(TodoData);
  const [editTask, setEditTask] = useRecoilState(EditTaskAtom);
  const [filterData, setFilterData] = useRecoilState(FilterDataAtom);

  //local
  const titleRef = useRef(null);
  const descRef = useRef(null);

  const EditTaskHandler = (e) => {
    e.preventDefault();
    const data = {
      id: editTask?.id,
      title: titleRef?.current?.value,
      desc: descRef?.current?.value,
    };

    fetch("http://127.0.0.1:8000/update_task/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setEditTask(false);
        setTodoApiData(data?.todo);
        console.log("stats", data?.stats);
        setFilterData(data?.stats);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  return (
    <div>
      <div className="add-task-container">
        <div className="add-task-content">
          <h1>Edit Task</h1>
          <form onSubmit={EditTaskHandler} className="add-task-form">
            <input
              ref={titleRef}
              type="text"
              placeholder="Title"
              defaultValue={editTask?.title}
            />
            <textarea
              ref={descRef}
              cols="30"
              rows="10"
              placeholder="Desccription"
              defaultValue={editTask?.desc}
            ></textarea>
            <button>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
