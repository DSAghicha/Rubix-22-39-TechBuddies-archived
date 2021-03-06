import React, { createContext, useEffect, useRef, useState} from 'react'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

const SocketContext = createContext()

const socket = io('http://localhost:5000') //TODO: Change on Production

const ContextProvider = ({ children }) => {
    const [stream, setStream] = useState(null)
    const [me, setMe] = useState('')
    const [name, setName] = useState('')
    const [call, setCall] = useState({})
    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    
    const patientsVideo = useRef()
    const doctorsVideo = useRef()
    const connectionRef = useRef()

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((currentStream) => {
            setStream(currentStream)

            patientsVideo.current.srcObject = currentStream
        })

        socket.on('me', (id) => setMe(id))
        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivedCall: true, from, name: callerName, signal })
        })
    }, [])

    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream
        })

        peer.on('signal', (data) => {
            socket.emit('answerCall', {signal: data, to: call.from})
        })

        peer.on('stream', (currentStream) => {
            doctorsVideo.current.setObject = currentStream
        })

        peer.signal(call.signal)

        connectionRef.current = peer
    }

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream
        })

        peer.on('signal', (data) => {
            socket.emit('callUser', {userToCall: id, signalData: data, from: me, name })
        })

        peer.on('stream', (currentStream) => {
            doctorsVideo.current.setObject = currentStream
        })

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })
        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
        window.location.reload()
    }

    return(
        <SocketContext.Provider value={{
            call,
            callAccepted,
            patientsVideo,
            doctorsVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall
        }}>
            { children }
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext }