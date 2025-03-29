"use client"

import React from 'react'
import { useAuth } from '../context-provider';

function Dashboard() {
  const { user } = useAuth();
  console.log(user)
  return (
    <div>
      <h2>Hello Khuong</h2>
    </div>
  )
}

export default Dashboard;