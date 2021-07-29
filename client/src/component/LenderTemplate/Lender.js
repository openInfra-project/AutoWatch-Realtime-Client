import React, { useEffect } from 'react'
import './Lender.scss'
import Lottie from 'react-lottie'
import lottieanim from '../../lottie/LottieLoading.json'
import { fetchGetInform } from '../../store/action'
import { useDispatch } from 'react-redux'
function Lender() {
    //로티 옵션
    const lottieOptions = {
        animationData:lottieanim,
        loop:true,
        autoplay:true,
        
    }
    const dispatch = useDispatch()
    
    useEffect(()=> {
        fetchGetInform().then((result)=> {
            dispatch(result)
        })
    },[])


   
    return (
        <>
            <div className="LenderContainer">
                 <Lottie options={lottieOptions} />
            </div>

           
        </>

    )
}
export default Lender