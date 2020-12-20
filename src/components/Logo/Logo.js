import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css'
import LogoPic from './Logo.png'

const Logo = () => {
    return(
        <div>
            <p className="center f1 fw9">{'Smart Brain Face Detector'}</p>
            <div className="ma4 mt0 center">
                <Tilt className="Tilt br2 shadow-2" options={{ max : 45 }} style={{ height: 150, width: 150 }} >
                    <div className="Tilt-inner"> <img src={LogoPic} alt='logo-pic'/> </div>
                </Tilt>
            </div>
        </div>
    )
}

export default Logo