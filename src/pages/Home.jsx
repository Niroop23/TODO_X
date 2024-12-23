import React, { useEffect } from "react";
import Header from "../components/home/Header";
import "./home.css";
import SearchBar from "../components/home/SearchBar";
import Filters from "../components/home/Filters";

import AddTask from "../components/home/AddTask";
import { useRecoilState } from "recoil";
import AddTaskAtom from "../recoil/AddTaskAtom";
import ApiDataAtom from "../recoil/ApiDataAtom";
import TodoData from "../recoil/TodoData";
import Todos from "../components/home/Todo";
import EditTaskAtom from "../recoil/EditTaskAtom";
import EditTask from "../components/home/EditTask";
import FilterDataAtom from "../recoil/FilterDataAtom";

const Home = () => {
  //global
  const [addTaskOverlay, setAddTaskOverlay] = useRecoilState(AddTaskAtom);
  const [apiData, setApiData] = useRecoilState(ApiDataAtom);
  const [todoApiData, setTodoApiData] = useRecoilState(TodoData);
  const [editTask, setEditTask] = useRecoilState(EditTaskAtom);
  const [filterData, setFilterData] = useRecoilState(FilterDataAtom);

  //local
  const homeData = {
    stats: [
      { label: "All", value: 3 },
      { label: "Completed", value: 1 },
      { label: "Ongoing", value: 2 },
      { label: "Archived", value: 1 },
    ],

    todo_data: [
      {
        title: "Title1",
        desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias, quaerat atque. Nam, suscipit natus? Nemo dolorem quod modi non ipsa.",
        color: "#33f0cb",
        status: "Completed",
      },
      {
        title: "Title2",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus similique hic eligendi!",
        color: "#ffb6c1",
        status: "Ongoing",
      },
      {
        title: "Title3",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit minus temporibus, quasi obcaecati possimus ullam eaque, quae porro blanditiis in hic neque deleniti perferendis ratione asperiores voluptas?",
        color: "#7dff83",
        staus: "Archived",
      },
      {
        title: "Title4",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus similique hic eligendi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, ea.",
        color: "#777ad9",
        status: "Ongoing",
      },
    ],
  };

  //initial call to fetch api data
  useEffect(() => {
    fetch("http://127.0.0.1:8000/initial_call/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTodoApiData(data?.todo); //initially i wrote todo_data but in homedata it is todo_data but in the data from the api call  it returns todo not todo_data .so later changedit to todo which succesfully rendered the data (todo):)
        setFilterData(data?.stats);

        console.log("filter data", filterData);
      })
      .catch((error) => {
        alert(error);
      });
  }, [setFilterData]);

  return (
    <div className="relative">
      {addTaskOverlay && (
        <div>
          {/* overlay */}
          <div
            className="overlay"
            onClick={() => {
              setAddTaskOverlay(null);
            }}
          ></div>
          {/*add new task*/}
          <AddTask />
        </div>
      )}
      {editTask && (
        <div>
          {/* overlay */}
          <div
            className="overlay"
            onClick={() => {
              setEditTask(null);
            }}
          ></div>
          {/*add new task*/}
          <EditTask />
        </div>
      )}

      <div className="home-container">
        <Header />
        <SearchBar />

        <Filters />
        <Todos />
      </div>
    </div>
  );
};

export default Home;
