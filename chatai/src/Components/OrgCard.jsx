import React from 'react'

function OrgCard({title,description}) {
  return (
    <div class="card">
      <div class="container-card bg-green-box">
        
        <p class="card-title">{title}</p>
        <p class="card-description">{description}</p>
      </div>
    </div>
  )
}

export default OrgCard
