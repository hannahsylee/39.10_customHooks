import { useEffect, useState } from "react";
import uuid from "uuid";
import axios from "axios";

function useFlip(initialVal = false) {
    // flipping any type of card
    // call useState, "reserve piece of state"
    const [value, setValue] = useState(initialVal);
    const toggle = () => {
        setValue(oldValue => !oldValue);
    };

    // return piece of state AND a function to toggle it
    return [value, toggle];
}

function useAxios(url) {
  const [response, setResponse] = useState([]);
  const fetchData = async () => {
    const res = await axios.get(url);
    setResponse(response => [...response, { ...res.data, id: uuid() }]);
  };

  return [response, fetchData];

}

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

const useLocalStorage = (key, defaultValue) => {
    const [state, setState] = useState(() => {
      let value
      try {
        value = JSON.parse(
          window.localStorage.getItem(key) || JSON.stringify(defaultValue)
        )
      } catch (e) {
        console.log(e)
        value = defaultValue;
      }
      return value;
    })
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])
  
    return [state, setState];
}

export default useLocalStorage;

export { useFlip, useAxios };