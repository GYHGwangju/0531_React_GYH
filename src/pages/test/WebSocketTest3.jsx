import React, {useEffect, useRef, useState} from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const WebSocketTest = () => {
    const [text, setText] = useState("");
    const wsRef = useRef(null);
    const audioBuffer = useRef([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef('');


    useEffect(() => {
        wsRef.current = new W3CWebSocket("ws://localhost:8000/websocket/v3/ws");

        wsRef.current.onopen = () => {
            console.log("WebSocket is open now.");
        };

        wsRef.current.onmessage = (response) => {
            let bytes = response.data;
            console.log(bytes);

            audioBuffer.current.push(bytes); // 오디오 버퍼에 청크 추가
            setIsPlaying(true); // 오디오 재생 시작 신호

            const source = audioContextRef.current.createBufferSource();
        };
    }, []);



    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleSendText = () => {
        if (text.trim() !== "") {
            wsRef.current.send(text);
        }
    };


    return (
        <div>
            <h1>Real-time Text-to-Speech Streaming</h1>
            <textarea
                rows="4"
                cols="50"
                value={text}
                onChange={handleTextChange}
                placeholder="Enter text here..."
            />
            <br />
            <button onClick={handleSendText}>Send Text</button>
        </div>
    );
};

export default WebSocketTest;
