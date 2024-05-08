import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import MaskArea from '../../Components/MaskArea/MaskArea'
import Hero from '../../Components/Hero/Hero'
import Rides from '../../Components/Rides/Rides'
import Driver from '../../Components/Driver/Driver'
import Footer from '../../Components/Footer/Footer'

const Home = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <MaskArea />
            <Rides />
            <Driver />
            <Footer />
        </div>
    )
}

export default Home
