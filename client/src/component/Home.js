import React from 'react'
import Section from './Section'
import Footer from './Footer'
import Header from './Header'

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