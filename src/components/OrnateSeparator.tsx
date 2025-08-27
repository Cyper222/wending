import React from 'react'

export default function OrnateSeparator() {
  return (
    <div className="flex items-center justify-center my-6">
      <svg width="200" height="22" viewBox="0 0 200 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow">
        <path d="M10 11H190" stroke="#d5a437" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M100 2C104 6 104 16 100 20C96 16 96 6 100 2Z" fill="#f5c86a" fillOpacity="0.65"/>
        <path d="M25 11c8-4 12-4 20 0-8 4-12 4-20 0Zm130 0c8-4 12-4 20 0-8 4-12 4-20 0Z" fill="#f5c86a" fillOpacity="0.45"/>
      </svg>
    </div>
  )
}




