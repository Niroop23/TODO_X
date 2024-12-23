import React from "react";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

//recoil
import { useRecoilState } from "recoil";
import SearchTextAtom from "../../recoil/SearchTextAtom";
import TodoData from "../../recoil/TodoData";
import ActiveFilter from "../../recoil/ActiveFilter";
import EditTaskAtom from "../../recoil/EditTaskAtom";
import FilterDataAtom from "../../recoil/FilterDataAtom";

const Todos = () => {
  //global
  const [todoApiData, setTodoApiData] = useRecoilState(TodoData);
  const [activeFilterVal, setActiveFilterVal] = useRecoilState(ActiveFilter);
  const [editTask, setEditTask] = useRecoilState(EditTaskAtom);
  const [filterData, setFilterData] = useRecoilState(FilterDataAtom);
  //local
  const [inputData, setInputData] = useRecoilState(SearchTextAtom);

  return (
    <div className="todo-main-container">
      <div>
        {todoApiData
          ?.filter((filtered_data) => {
            if (inputData === "") {
              return filtered_data;
            } else if (
              filtered_data?.title
                ?.toLowerCase()
                ?.includes(inputData?.toLowerCase())
            ) {
              return filtered_data;
            }
          })
          ?.map((todo, index) => {
            return (
              <div key={index} className="todo-card">
                <div>
                  <div
                    onClick={() => {
                      const bodydata = {
                        id: todo?.id,
                      };
                      fetch("http://127.0.0.1:8000/complete_task/", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(bodydata),
                      })
                        .then((response) => response.json())
                        .then((data) => {
                          setTodoApiData(data?.todo);
                          setFilterData(data?.stats);
                        })
                        .catch((error) => {
                          console.log("Error:", error);
                        });
                    }}
                    className={`${
                      todo?.status === "Completed"
                        ? "checkbox-active"
                        : "checkbox"
                    }`}
                  ></div>
                </div>

                <div className="todo-content-container">
                  <div className="todo-card-header">
                    <h2
                      className={`${
                        todo?.status === "Completed"
                          ? "completed-todo-title"
                          : "todo-title"
                      } `}
                    >
                      {todo?.title}
                    </h2>
                    {(activeFilterVal === "All" ||
                      activeFilterVal === "Archived") && (
                      <div className="icon-container">
                        <EditIcon
                          id="edit"
                          className="ctrl-icons"
                          onClick={() => {
                            setEditTask({
                              id: todo?.id,
                              title: todo?.title,
                              desc: todo?.desc,
                            });
                          }}
                        />
                        <ArchiveIcon
                          id="archive"
                          className="ctrl-icons"
                          onClick={() => {
                            const data = {
                              id: todo?.id,
                            };
                            fetch("http://127.0.0.1:8000/archived_task/", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(data),
                            })
                              .then((response) => response.json())
                              .then((data) => {
                                // console.log(data);
                                setTodoApiData(data?.todo);
                                setFilterData(data?.stats);
                              })
                              .catch((error) => {
                                console.log("Error:", error);
                              });
                          }}
                        />
                        <ClearIcon
                          id="delete"
                          className="ctrl-icons"
                          onClick={() => {
                            const data = {
                              id: todo?.id,
                            };
                            fetch("http://127.0.0.1:8000/delete_task/", {
                              method: "DELETE",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(data),
                            })
                              .then((response) => response.json())
                              .then((data) => {
                                // console.log(data);
                                setTodoApiData(data?.todo);
                                setFilterData(data?.stats);
                              })
                              .catch((error) => {
                                console.log("Error:", error);
                              });
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <p className="todo-desc">{todo?.desc}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Todos;
