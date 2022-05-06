import { useEffect, useState } from "react";
// import uuid from "uuid";
import axios from "axios";

function useFlip(initialVal = true) {
    // flipping any type of card
    // call useState, "reserve piece of state"
    const [value, setValue] = useState(initialVal);
    const toggle = () => {
        setValue(oldValue => !oldValue);
    };

    // return piece of state AND a function to toggle it
    return [value, toggle];
}

// // Part 3
// function useAxios(url) {
//   const [response, setResponse] = useState([]);
//   const fetchData = async () => {
//     const res = await axios.get(url);
//     setResponse(response => [...response, { ...res.data, id: uuid() }]);
//   };

//   return [response, fetchData];

// }

// Part 4
function useAxios(keyInLS, baseUrl) {
  const [response, setResponse] = useLocalStorage(keyInLS);

  // const [response, setResponse] = useState([]);

  const addData = async (formatter = data => data, restOfUrl = "") => {
    const res = await axios.get(`${baseUrl}${restOfUrl}`);
    setResponse(data => [...data, formatter(res.data)]);
  };

  const clearData = () => setResponse([]);

  return [response, addData, clearData];

}

// function useAxios(baseUrl) {
//   const [response, setResponse] = useState([]);
//   const [restOfUrl, setRestOfUrl] = useState(null);

//   const fetchData = async () => {
//     const res = await axios.get(`${baseUrl}${restOfUrl}`);
//     setResponse(data => [...data, { ...res.data, id: uuid() }]);
//   };

//   return [response, fetchData];
// };

// function useAxios(keyInLS, baseUrl) {
//   const [responses, setResponses] = useLocalStorage(keyInLS);

//   const addResponseData = async (formatter = data => data, restOfUrl = "") => {
//     const response = await axios.get(`${baseUrl}${restOfUrl}`);
//     setResponses(data => [...data, formatter(response.data)]);
//   };

//   const clearResponses = () => setResponses([]);

//   return [responses, addResponseData, clearResponses];
// }

// const useAxios = (url) => {
//   const [response, setResponse] = useState([]);

//   // after the first render, fetch our data
//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get(url);
//       setResponse(response => [...response, { ...res.data, id: uuid() }]);
//     };
//     fetchData();
//   }, [url]);

//   return [response, setResponse];
// };

const useLocalStorage = (key, defaultValue = []) => {
  if (localStorage.getItem(key)){
    defaultValue = JSON.parse(localStorage.getItem(key))
  }
    const [state, setState] = useState(defaultValue);

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])
  
    return [state, setState];
}

export default useLocalStorage;

export { useFlip, useAxios, useLocalStorage };