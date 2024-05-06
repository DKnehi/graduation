import React from 'react'

export default function ComponentDashboard() {
  return (
    <div>
      {/* <h2 style={{fontSize:'26px', fontWeight:'500', color:'var(--color-second)'}}>Dashboard</h2> */}
      <div className='dashboard-list-item'>
        <div className='dashboard-detail-item'>
        <i class="fa-solid fa-book-open"></i>
          <h3>28</h3>
          <p>Enrolled Courses</p>
        </div>
        <div className='dashboard-detail-item'>
        <i class="fa-solid fa-graduation-cap"></i>
          <h3>8</h3>
          <p>Active Courses</p>
        </div>
        <div className='dashboard-detail-item'>
        <i class="fa-solid fa-trophy"></i>
          <h3>25</h3>
          <p>Completed Courses</p>
        </div>
        <div className='dashboard-detail-item'>
        <i class="fa-brands fa-google-scholar"></i>
          <h3>34</h3>
          <p>Total Students</p>
        </div>
        <div className='dashboard-detail-item'>
        <i class="fa-solid fa-box-open"></i>
          <h3>24</h3>
          <p>Total Courses</p>
        </div>
        <div className='dashboard-detail-item'>
        <i class="fa-solid fa-coins"></i>
          <h3>$0.00</h3>
          <p>Total Earnings</p>
        </div>
        
      </div>
      
    </div>
  )
}
