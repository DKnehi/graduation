import React from "react";

export default function Test() {
    return (
        <div className="lesson-test">
            <div className='lesson-test-heading'>
                <p>Questions No:</p>
                <h1>1/2</h1>
                <p>Total Attempted:</p>
                <h1>2/10</h1>
            </div>
            <div>
                <p style={{ margin: '40px 0', fontSize: '32px', color: 'var(--color-second)', fontWeight: '500' }}>1. Question 1975</p>
                <div>
                    <div className='answer-options'>
                        <label>
                            <input type="radio" name="answer" value="A" />
                            <span className='option-text'>Option A</span>
                        </label>
                        <label>
                            <input type="radio" name="answer" value="B" />
                            <span className='option-text'>Option B</span>
                        </label>
                        <label>
                            <input type="radio" name="answer" value="C" />
                            <span className='option-text'>Option C</span>
                        </label>
                    </div>
                    <div className='test-button'>
                        <button style={{ backgroundColor: '#246BFD', color: '#ffffff' }}>Submit & Next</button>
                        <button style={{ color: 'gray' }}>Skip Question</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
