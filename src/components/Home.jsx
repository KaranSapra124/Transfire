import React from 'react'
import { TranslateImg } from './constants/Links'
const Home = () => {
    return (
        <>
          <div className='sm:p-32 sm:text-4xl   flex  sm:flex-wrap md:flex-nowrap justify-between xsm:flex-wrap xsm:p-5'>
            <div className='mr-5 animate-Bounce-once '>
                <h1 className='text-[#D80032] font-extrabold text-4xl'>Transfire , Your way of translation!!</h1>
                <p className='text-2xl'>Transfire gives access to translate your words to more than 100 languages <br/> So , what are you waiting for try it now!!!</p>
            </div>
            <div className=''>
                <img className='max-[200px]:h-52 max-[200px]:w-[20rem] max-[200px]:m-10 w-[50rem] animate-Bounce-once' src={TranslateImg} alt="" />
            </div>
          </div>
        </>
    )
}

export default Home
