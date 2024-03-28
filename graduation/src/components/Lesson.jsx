import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
export default function () {
  return (
    <div>
        <Header></Header>
        <section className='lesson-section'>
            <div className='lesson-section-headingbox-left'>
                <div className='lesson-section-headingbox'>
                <h2 className='lesson-section-heading'>Course Content</h2>
                </div>
            </div>
            <div className='lesson-section-videobox'>
                <div className='lesson-section-videobox-heading'>
                    <Link to='/course'>
                    <i class="fa-solid fa-chevron-left"></i>
                    </Link>
                <h2>Video Editing</h2>
                </div>
                <div className='lesson-section-videobox-heading-out'>
                    <Link to='/'>
                    <i class="fa-solid fa-xmark"></i>
                    </Link>
                
                </div>
                
            </div>
            <div className='lesson-section-video'> 
                    
                </div>
        </section>
        <Footer></Footer>
    </div>
  )
}
