import { useState, useEffect, createContext } from "react";
import axios from "axios";

// create context
const Context = createContext({});


const Provider = ({ children }) => {
  //Getting todos from API
    const [data, setData] = useState([]);
    const [page, setPage] = useState("1")

    const fetchData = async () => {
    const result = await axios(`https://rickandmortyapi.com/api/character?page=${page}`);
    setData([...data , ...result.data.results])}
    
    useEffect(() => {
        fetchData();
    }, [page]);
  

  return <Context.Provider value={{data, page, setPage, fetchData }}>{children}</Context.Provider>;
};

export { Context, Provider };