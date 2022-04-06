import React from 'react';
import {BsGithub,BsFacebook, BsTwitter, BsInstagram} from 'react-icons/bs';
import './footer.css';
import {Link } from 'react-router-dom';


const Footer = () => {
  return (
    <>
        <div className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h1 className="logo-text">Sat<span>App</span></h1>
                    <p>
                        Muhammad Bayou Satrio
                    </p>
                    <div className="contact">
                        <a className='link-icon' href="https://www.facebook.com/bayu.satrio.718689"><BsFacebook/></a>
                        <a className='link-icon' href="https://www.instagram.com/deif.satrio/"><BsInstagram/></a>
                        <a className='link-icon' href="https://github.com/bayustrio"><BsGithub/></a>
                    </div>
                </div>
                </div>
                </div>
                

    </>
  )
}

export default Footer