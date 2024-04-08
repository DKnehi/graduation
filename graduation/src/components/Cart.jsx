import React from 'react'
import CartCard from './CartCard'
export default function Cart() {
    return (
        <div>
            <section className='cart-section'>
                <div className='cart-content'>
                    <h2>Cart</h2>
                    <div className='cart-content-list'>
                    <CartCard></CartCard>
                    <CartCard></CartCard>
                    <CartCard></CartCard>
                    <CartCard></CartCard>
                    </div>
                    
                </div>
                <div className='summary-content'>
                    <h2>Summary</h2>
                    <div className='summary-box'>
                        <div className='summary-first'>
                            <p>Subtotal</p>
                            <p>$214.96</p>
                        </div>
                        <div className='summary-second'>
                            <div>
                                <p>Shipping</p>
                            </div>
                            <div className='summary-second-sub'>
                                <p>Flat rate</p>
                                <p>Shipping to xvdsv gfngfnbvc fvbfd, bandung, Jawa Barat, 40174, Indonesia.</p>
                                <a href="">Change Address</a>
                            </div>

                        </div>
                        <div className='summary-third'>
                            <p>Total</p>
                            <p className='summary-third-price'>$214.96</p>
                        </div>
                        <div>
                            <button>Procceed to checkout</button>
                            <button className='vnpay-checkout'><img src="https://asset.brandfetch.io/idV02t6WJs/idyWhNall8.svg" alt="" /></button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
