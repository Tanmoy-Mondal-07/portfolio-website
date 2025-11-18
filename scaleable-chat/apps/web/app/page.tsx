'use client'

import React from 'react'
import { useSocket } from '../context/SocketProvider'

function page() {
  const { sendMessage, messages } = useSocket()
  const [message, setMessage] = React.useState('')


  return (
    <div>
      <div>
        <h1>Messages</h1>
      </div>
      <div>
        <input onChange={e => setMessage(e.target.value)} placeholder='Message...' />
        <button onClick={e => sendMessage(message)}>send</button>
      </div>
      <div>
        {messages.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </div>
    </div>
  )
}

export default page