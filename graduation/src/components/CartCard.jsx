import React from 'react'

export default function CartCard() {
    return (
        <div>
            <div className='cart-content-card'>
                <div className='cart-content-card-imgbox'>
                    <img src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/30-1-160x90.jpg" alt="" />
                    <p>​Freelance Content Writing</p>
                </div>

                <div className='cart-content-card-price'>
                    <p>$34.34</p>
                    <p className='cart-content-card-price-remove'>Remove</p>
                </div>
            </div>
        </div>
    )
}
