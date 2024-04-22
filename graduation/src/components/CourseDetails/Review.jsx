import React from 'react'

export default function Review() {
    return (
        <div>
            <h2 style={{ fontSize: '20px', color: 'var(--color-second)' }}>Student Ratings & Reviews</h2>
            <div>
                <div style={{ marginTop: '30px', border: '1px solid black', borderRadius: '8px', padding: '30px', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '56px', color: 'var(--color-second)' }}>5.00</h2>
                        <div style={{ margin: '20px 0', display: 'flex', gap: '5px', color: '#ED9700' }}>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <p>Total 1 Rating</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <i style={{ color: '#ED9700' }} class="fa-regular fa-star"></i>
                            <p style={{ color: 'var(--color-second)' }}>5</p>
                            <div style={{ width: '400px', height: '10px', backgroundColor: '#ED9700', borderRadius: '10px' }}></div>
                            <p>1 Rating</p>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <i style={{ color: '#ED9700' }} class="fa-regular fa-star"></i>
                            <p style={{ color: 'var(--color-second)' }}>4</p>
                            <div style={{ width: '400px', height: '10px', backgroundColor: '#ED9700', borderRadius: '10px' }}></div>
                            <p>1 Rating</p>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <i style={{ color: '#ED9700' }} class="fa-regular fa-star"></i>
                            <p style={{ color: 'var(--color-second)' }}>3</p>
                            <div style={{ width: '400px', height: '10px', backgroundColor: '#ED9700', borderRadius: '10px' }}></div>
                            <p>1 Rating</p>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <i style={{ color: '#ED9700' }} class="fa-regular fa-star"></i>
                            <p style={{ color: 'var(--color-second)' }}>2</p>
                            <div style={{ width: '400px', height: '10px', backgroundColor: '#ED9700', borderRadius: '10px' }}></div>
                            <p>1 Rating</p>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <i style={{ color: '#ED9700' }} class="fa-regular fa-star"></i>
                            <p style={{ color: 'var(--color-second)' }}>1</p>
                            <div style={{ width: '400px', height: '10px', backgroundColor: '#ED9700', borderRadius: '10px' }}></div>
                            <p>1 Rating</p>
                        </div>
                    </div>
                </div>
                <div style={{ padding: '30px 350px 30px 30px', display:'flex', justifyContent:'space-between', alignItems:'center', border:'1px solid black', borderRadius:'8px', marginTop:'20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent:'center' }}>
                        <img style={{ width: '48px', height: '48px', borderRadius: '50%', marginLeft:'25px' }} src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/Avatar-3-150x150.jpg" alt="" />
                        <a style={{margin:'15px 0'}} href="">Quoc Dat</a>
                        <p>2 Tháng Trước</p>
                    </div>
                    <div>
                        <div style={{display:'flex', color:'#ED9700', gap:'10px', marginBottom:'30px'}}>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <p>Đánh Giá Cuối Cùng</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
