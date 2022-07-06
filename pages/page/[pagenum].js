import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import axios from 'axios';
import Link from 'next/link';

const Pagenum = () => {
    const router = useRouter()
    const [data, setData] = useState([]);
    const { pagenum } = router.query

    const fetchData = async () => {
        const result = await axios(`https://rickandmortyapi.com/api/character?page=${pagenum}`);
        setData(result.data.results)}

    useEffect(() => {
        fetchData();
    }, []);
    
  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 bg-gray-500 ' >
    {data.map(item =>

        <div key={item.id}  className="m-3 rounded border-2 flex flex-col items-center bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
          <p className='font-serif font-bold p-1 text-xl m-1'>{item.name}</p>
          <picture><img src={item.image} alt="foto" width="150px" height="100px" className='pb-2'/></picture>
        </div>

    )}


  </div>
  )
}

export default Pagenum