import React, { useEffect } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useRecoilState } from "recoil";
import SearchTextAtom from "../../recoil/SearchTextAtom";

const SearchBar = () => {
  const [inputData, setInputData] = useRecoilState(SearchTextAtom);

  // useEffect(() => {
  //   console.log("inputData", inputData);
  // }, [inputData]);
  return (
    <div className="search-wrapper">
      <input
        type="search"
        placeholder="Search tasks here"
        className="search-bar"
        value={inputData}
        onChange={(e) => {
          setInputData(e.target.value);
        }}
      />
      <div className="search-icon">
        <SearchRoundedIcon fontSize="large" />
      </div>
    </div>
  );
};

export default SearchBar;
