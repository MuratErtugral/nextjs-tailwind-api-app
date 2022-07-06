import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { Context } from '../../context'

const Detail = () => {
    const router = useRouter()
    const { id } = router.query 
    const {data} = useContext(Context)
    console.log(data);
    return (
        <div>
            
            {data?.filter(item => item.id == id).map(item =>
                <div className="flex flex-col items-center bg-amber-300 " key={id} >
                    <h1 className="text-4xl mb-2 font-serif font-bold p-3" >{item.name}</h1>
                    <picture><img src={item.image} alt="foto" width="300px" /></picture>
                    <p className="text-xl m-2 p-1"><span className='italic font-bold' >Species</span> : {item.species}</p>
                    <p className="text-xl m-2 p-1"><span className='italic font-bold' >Status</span> : {item.status}</p>
                    <p className="text-xl m-2 p-1"><span className='italic font-bold' >Gender</span> : {item.gender}</p>
                    <p className="text-xl m-2 p-1"><span className='italic font-bold' >Location</span> : {item.location.name}</p>
                    <p className="text-xl mb-40 p-1"><span className='italic font-bold' >Origin Name</span>  : {item.origin.name}</p>
                </div>
            )}

        </div>
    )
}

export default Detail;