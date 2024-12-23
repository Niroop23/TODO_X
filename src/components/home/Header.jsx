import React, { useEffect } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useNavigate } from "react-router-dom";
import UserinfoAtom from "../../recoil/UserinfoAtom";
import { useRecoilState } from "recoil";
import AddTaskAtom from "../../recoil/AddTaskAtom";

const Header = (props) => {
  //global vars
  const [userInfo, setUserInfo] = useRecoilState(UserinfoAtom);
  const [addTaskOverlay, setAddTaskOverlay] = useRecoilState(AddTaskAtom);

  // useEffect(() => {
  //   console.log(addTaskOverlay);
  // }, [addTaskOverlay]);

  const navigate = useNavigate();
  return (
    <header>
      <div className="home-header-container">
        <h1 className="header-logo-text">TodoX</h1>

        <div className="btn-container">
          <button
            className="new-task-btn"
            onClick={() => {
              if (addTaskOverlay) {
                setAddTaskOverlay(false);
              } else {
                setAddTaskOverlay(true);
              }
            }}
          >
            <span>
              <AddRoundedIcon fontSize="large" />
            </span>
            New
          </button>

          <button
            className="new-task-btn"
            onClick={() => {
              localStorage?.clear();
              setUserInfo(false);
              navigate("/login");
            }}
          >
            <LogoutRoundedIcon fontSize="large" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
