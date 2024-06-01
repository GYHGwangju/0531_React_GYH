import { useEffect, useRef, useState } from "react";

const WebSocketTest = () => {
    const [response, setResponse] = useState({});
    const ws = useRef(null);

    const connectWebSocket = () => {
        ws.current = new WebSocket("ws://localhost:8000/websocket/ws");

        ws.current.onopen = () => {
            console.log("WebSocket is open now.");
        };

        ws.current.onmessage = (e) => {
            const json = e.data;
            setResponse(JSON.parse(json));
            console.log(e.data);
        };

        ws.current.onclose = (e) => {
            console.log("WebSocket is closed now. Reconnecting...");
            setTimeout(connectWebSocket, 1000);  // Try to reconnect every 1 second
        };

        ws.current.onerror = (err) => {
            console.error("WebSocket encountered error: ", err.message, "Closing socket");
            ws.current.close();
        };
    };

    useEffect(() => {
        connectWebSocket();

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    const sendMessage = () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send("안녕하세요");
        } else {
            console.error("WebSocket is not open yet.");
        }
    };

    return (
        <>
            <h1>websocket test</h1>
            <button onClick={sendMessage}>웹소켓 메세지 전송</button>
            <button onClick={() => ws.current && ws.current.close()}>웹소켓 종료</button>

            <p id="response">{response.gpt_text_response}</p>
        </>
    );
};

export default WebSocketTest;
