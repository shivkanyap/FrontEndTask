import { FETCH_ALL, POST_DATA,SEARCH_WORD } from "./types";
import axios from "axios";

let obj = {
  title: "",
};

let config = {
  headers: {
    api_id: "b9ccd843",
    api_key: "66507d3c45b99256a09db77d20b9fba7",
  },
};
export const fetchAll = () => {
  return async (dispatch) => {
    console.log("here");
    const response = await axios.get("http://localhost:3005/word/get");
    if (!response) {
      throw new Error("Something went wrong ..!!");
      // more detail error handling can be done
    }
    const resData = response.data; // convert from json to js type
    console.log(resData, "res");
    dispatch({
      type: FETCH_ALL,
      allData: resData,
    });
  };
};

export const postData = (data)  => {
  console.log("post",data);

  return async (dispatch) => {
    console.log("here");
    const response = await axios.post("http://localhost:3005/word/add", data);
    if (!response) {
      throw new Error("Something went wrong ..!!");
      // more detail error handling can be done
    }
    const resData = await response.data.data; // convert from json to js type
    console.log(resData, "res");
    
    dispatch({
      type: POST_DATA,
      addedWord: resData,
    });
  };
};


export const fetchSearchData = (searchword) => {
  console.log('dtasearch')
  return async (dispatch) => {
    console.log("here");
    const response = await axios.get(`http://localhost:3005/word/search?word=${searchword}`);
    if (!response) {
      throw new Error("Something went wrong ..!!");
      // more detail error handling can be done
    }
    const resData = response.data; // convert from json to js type
    console.log(resData, "res");
    dispatch({
      type:SEARCH_WORD ,
      allData: resData,
    });
  };
};
