import React from "react";
import './app-error.css'
import ReactLogo from './error.svg'

const AppError = () => {
    return(
        <img className='error-image' src={ReactLogo} alt="React Logo" />
    )
}
export default AppError