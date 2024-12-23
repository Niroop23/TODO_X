import React, { useEffect } from "react";
import filterEndPointsMap from "../../helper/filter";
import { useRecoilState } from "recoil";
import TodoData from "../../recoil/TodoData";
import ActiveFilter from "../../recoil/ActiveFilter";
import FilterDataAtom from "../../recoil/FilterDataAtom";

const Filters = () => {
  //global
  const [todoApiData, setTodoApiData] = useRecoilState(TodoData);
  const [activeFilterVal, setActiveFilterVal] = useRecoilState(ActiveFilter);
  const [filterData, setFilterData] = useRecoilState(FilterDataAtom);

  // useEffect(() => {
  //   console.log("filterData_filters.jsx");
  //   console.log(filterData);
  // }, [filterData]);

  return (
    <div>
      <div className="filter-container">
        {filterData?.map((data, index) => {
          // console.log(data, index);
          return (
            <div key={index} className="filter-btn-container">
              <button
                onClick={() => {
                  setActiveFilterVal(data?.label);
                  fetch(
                    "http://127.0.0.1:8000/" +
                      filterEndPointsMap[index]?.endpoint,
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      setTodoApiData(data?.todo); //initially i wrote todo_data but in homedata it is todo_data but in the data from the api call  it returns todo not todo_data .so later changedit to todo which succesfully rendered the data (todo):)
                      setFilterData(data?.stats);
                      // console.log("post-api_call", filterData);
                    })
                    .catch((error) => {
                      alert(error);
                    });

                  console.log(data?.label);
                }}
                className={`${
                  activeFilterVal === data?.label ? "active-filter" : ""
                }`}
              >
                <h3>{data?.label}</h3>
                <p
                  className={`${
                    activeFilterVal === data?.label ? "active-filter-value" : ""
                  }`}
                >
                  {data?.value}
                </p>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
