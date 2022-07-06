import axios from 'axios';
import Link from 'next/link'
import { useContext, useState } from 'react';
import { Context } from '../context';
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";

export default function Home() {
  const { setPage, page} = useContext(Context)
  const [pagenum, setPageNum] = useState("")

  const { data, status, fetchNextPage, hasNextPage} = useInfiniteQuery(
    "infiniteCharacters",
    async ({ pageParam = 1 }) =>
      await fetch(
        `https://rickandmortyapi.com/api/character/?page=${pageParam}`
      ).then((result) => result.json()),
    {
      getNextPageParam: (lastPage, pages) => {
        setPage(pages.length)
        if (lastPage.info.next) {
          return pages.length + 1;
        }
      },
    }
  );
  
  // const HandleSearch = (e) => {
  //   e.preventDefault()
  
  //   console.log(pageNum);
  // }

  return (
    <div>
      <form className="flex items-center">
        
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
          </div>
          <input type="text" onChange={(e)=> setPageNum(e.target.value)}  id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a page number..(1-42)" required/>
        </div>
        <Link href={`/page/${(pagenum)}`} >
        <button type="submit"  className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
        </Link>
      </form>

      <div >
      {status === "success" && (
        <InfiniteScroll
          dataLength={data?.pages.length * 20}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<h4>Loading...</h4>}
        >
           <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 bg-gray-500'>
            {data?.pages.map((page) => (
              <>
                {page.results.map((item) => (
                  <Link
                  
                   href={`/detail/${(item.id)}`} key={item.id}>
                  <div className="m-3 rounded border-2 flex flex-col items-center bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
                    <p className='font-serif font-bold p-1 text-xl m-1'>{item.name}</p>
                    <picture><img src={item.image} alt="foto" width="150px" height="100px" className='pb-2'/></picture>
                  </div>
                </Link>
                ))}
              </>
            ))}
          </div>
        </InfiniteScroll>
      )}

{/* {page.map(item =>
          <Link href={`/detail/${(item.id)}`} key={item.id}>
            <div className="m-3 rounded border-2 flex flex-col items-center bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
              <p className='font-serif font-bold p-1 text-xl m-1'>{item.name}</p>
              <picture><img src={item.image} alt="foto" width="150px" height="100px" className='pb-2'/></picture>
            </div>
          </Link>
        )} */}
      </div>
    </div>
  );
}
