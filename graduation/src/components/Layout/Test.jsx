import React from 'react'

export default function Test() {
    return (
        <div>
            <section className="lesson-section">
                <div className="lesson-section-headingbox-left">
                    <div className="lesson-section-headingbox">
                        <h2 style={{ fontSize: '22px', fontWeight: '500' }}>Course Content</h2>
                    </div>
                </div>
                <div className="lesson-section-videobox">
                    <div className="lesson-section-videobox-heading">
                        <i class="fa-solid fa-chevron-left"></i>
                        <h2>Test</h2>
                    </div>
                    <div className="lesson-section-videobox-heading">
                        <h2 style={{ marginRight: '10px' }}>Your Progress: 2 of 4 (50%)</h2>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
            </section> 
            <section className="lesson-section-test">
                <div style={{ backgroundColor: '#EFF1F6' }}>
                    <div className='lesson-test-content'>
                        <button style={{ borderBottom:'1px solid #CDCFD5', padding: '18px 15px', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <p style={{ fontSize: '18px', fontWeight: '500', color: '#677BA2' }}>Test 1</p>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <p>1/1</p>
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="lesson-test">
                    <div className='lesson-test-heading'>
                        <p>Questions No:</p>
                        <h1>1/2</h1>
                        <p>Total Attempted:</p>
                        <h1>2/10</h1>
                    </div>
                    <div>
                        <p style={{margin:'40px 0', fontSize:'32px', color:'var(--color-second)', fontWeight:'500'}}>1. Question 1975</p>
                        <div>
                            <div className='answer-options'>
                                <label>
                                    <input type="radio" name="answer" value="A"/>
                                        <span className='option-text'>Option A</span>
                                </label>
                                <label>
                                    <input type="radio" name="answer" value="B"/>
                                        <span className='option-text'>Option B</span>
                                </label>
                            </div>
                            <div className='test-button'>
                                <button style={{backgroundColor:'#246BFD', color:'#ffffff'}}>Submit & Next</button>
                                <button style={{color:'gray'}}>Skip Question</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
