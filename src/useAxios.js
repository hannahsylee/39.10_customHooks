import { useEffect, useState } from "react";
import uuid from "uuid";
import axios from "axios";

const useAxios = (url) => {
  const [response, setResponse] = useState(url);

  // after the first render, fetch our data
  useEffect(() => {
    async function getData() {
      let d = await axios.get(`${url}`);
      setResponse(d.data);
    }
    getData();
  }, [url]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(url, options);
//         const json = await res.json();
//         setResponse(json);
//       } catch (error) {
//         setError(error);
//       }
//       setIsLoading(false);
//     };
//     fetchData();
//   }, []);

  return [...response, { ...response.data, id: uuid() }];
};

export default useAxios;