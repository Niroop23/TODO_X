import { Link, Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserinfoAtom from "./recoil/UserinfoAtom";
import { useRecoilState } from "recoil";
import { useEffect } from "react";


function App() {

  const [userInfo, setUserInfo] = useRecoilState(UserinfoAtom);

  useEffect(() => {
    if (localStorage?.getItem("userStatus") === "true") {
      setUserInfo(true);
    } else {
      setUserInfo(false);
    }
  }, [localStorage?.getItem("userStatus")]);
  return (
    <div >
      <Routes>
        <Route path="/" element={userInfo === true ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={userInfo === false ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
