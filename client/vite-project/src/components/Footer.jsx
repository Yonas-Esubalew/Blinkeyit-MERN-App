import React from 'react'
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className='border-t'>
        <div className='container mx-auto p-4 text-center flex-col gap-4 flex lg:flex-row lg:justify-between'>
            <p> All rights are Reserved 2024.</p>
            <div className='flex items-center gap-4 justify-center'>
                <a href='' className='hover:text-yellow-400'>
                <FaFacebook/>
                </a>
                <a href='' className='hover:text-yellow-400'>
                <FaInstagram/>
                </a>
                <a href='' className='hover:text-yellow-400'>
                <FaLinkedin/>
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer