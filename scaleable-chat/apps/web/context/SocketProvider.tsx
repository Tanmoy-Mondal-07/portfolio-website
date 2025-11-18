'use client'

import React, { useCallback, useContext, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

interface SocketProviderProps {
    children?: React.ReactNode
}

interface ISocketContext {
    sendMessage: (msg: string) => any;
    messages: string[]
}

const SocketContext = React.createContext<ISocketContext | null>(null)

export const useSocket = () => {
    const state = useContext(SocketContext)
    // console.log(state);
    if (!state) throw new Error('state is undefined')
    return state
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const [socket, setsocket] = React.useState<Socket>()
    const [messages, setmessages] = React.useState<string[]>([])

    const sendMessage: ISocketContext['sendMessage'] = useCallback((msg: string) => {
        console.log('send msg', msg);
        if (socket) {
            socket.emit('event:message', { message: msg })
        }
    }, [socket]);

    const onMessageRes = useCallback((msg: string) => {
        console.log('from server msg resived', msg);
        const { message } = JSON.parse(msg) as { message: string }
        setmessages((prev) => [...prev, message])
    }, [])

    useEffect(() => {
        const _socket = io('http://localhost:8000')
        setsocket(_socket)

        _socket.on('message', onMessageRes)

        return () => {
            _socket.off('message', onMessageRes)
            _socket.disconnect()
            setsocket(undefined)
        }
    }, [])


    return (
        <SocketContext.Provider value={{ sendMessage, messages }}>
            {children}
        </SocketContext.Provider>
    )
}