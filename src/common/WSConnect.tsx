import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
const WSConnect = () => {
    const [wsInfo, setWsInfo] = useState<Socket<any, any> | null>(null)

    useEffect(() => {
        const ws: Socket<any, any> = io('http://localhost:7000', {
            reconnection: true,
            reconnectionAttempts: 30,
            reconnectionDelay: 1000,
            timeout: 5000,
            auth: {
                token: window.sessionStorage.getItem('token') || 'fwx',
            },
        })

        setWsInfo(ws)
    }, [])

    return wsInfo
}

export default WSConnect
