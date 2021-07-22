import React, { useEffect } from 'react'
import Section from './Section'
import Footer from './Footer'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'

function Home() {
    function handlecreate(data) {
        console.log("홈 데이터"+JSON.stringify(data))
    }

    return (
        <>
            <Header />
            <Section/>       
            <Footer onCreate={handlecreate} />
        </>
    )
}

export default Home