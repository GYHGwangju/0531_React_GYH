import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const WebSocketTest = () => {
    const [text, setText] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const wsRef = useRef(null);
    const audioContextRef = useRef(null);
    const audioQueueRef = useRef([]);
    const isPlayingRef = useRef(false);
    const [gptScript, setGptScript] = useState('');
    const navigate = useNavigate();

    const { transcript, listening, resetTranscript } = useSpeechRecognition();

    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        return () => {
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.close();
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const startStreaming = () => {

        wsRef.current = new WebSocket('ws://localhost:8000/websocket/v5/ws');
        wsRef.current.binaryType = 'arraybuffer';

        wsRef.current.onopen = () => {
            console.log('Connected to the WebSocket server');
            audioQueueRef.current = [];
            wsRef.current.send("안녕하세요 제 이름은 김태현입니다. 저는 조선대학교 4학년 학생입니다.");
        };

        wsRef.current.onmessage = async (event) => {
            if (event.data instanceof ArrayBuffer) {
                const arrayBuffer = await event.data;
                try {
                    const audioContext = audioContextRef.current;
                    if (!audioContext) {
                        console.error('Audio context is not initialized.');
                        return;
                    }
                    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                    audioQueueRef.current.push(audioBuffer);

                    if (!isPlayingRef.current) {
                        await playNextAudio();
                    }
                } catch (error) {
                    console.error('Error decoding audio data:', error);
                }
            } else {
                try {
                    const orderData = JSON.parse(event.data);
                    console.log('Received non-binary message:', orderData);
                    navigate("/payment", { state: { orderData: orderData } });
                } catch (e) {
                    setGptScript(event.data);
                }
            }
        };

        wsRef.current.onclose = () => {
            console.log('Disconnected from the WebSocket server');
            setIsStreaming(false);
        };

        wsRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        setIsStreaming(true);
    };

    const playNextAudio = () => {
        if (audioQueueRef.current.length > 0) {
            isPlayingRef.current = true;
            const audioBuffer = audioQueueRef.current.shift();
            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContextRef.current.destination);
            source.start();
            console.log('Playing audio buffer', audioBuffer);
            source.onended = () => {
                console.log('Audio buffer ended', audioBuffer);
                if (audioQueueRef.current.length > 0) {
                    playNextAudio();
                } else {
                    isPlayingRef.current = false;
                    console.log('All audio buffers played');
                }
            };
        } else {
            isPlayingRef.current = false;
            console.log('No audio buffers to play');
        }
    };
    
    function send() {
        startStreaming();
    }

    const toggleListening = () => {
        if (listening) {
            SpeechRecognition.stopListening();
            startStreaming();
        } else {
            resetTranscript();
            SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
        }
    };

    return (
        <Container fluid className="d-flex flex-column min-vh-100">
            <Row className="flex-grow-1 overflow-auto p-4">
                <Col md={{ span: 6, offset: 3 }}>
                    <Card className="mb-4">
                        <Card.Body className="d-flex">
                            <div className="me-3">
                                <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                    AI
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <p className="mb-1 text-muted">AI Assistant</p>
                                <p>{gptScript}</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="bg-light p-4">
                <Col md={{ span: 6, offset: 3 }}>
                    <Card className="mb-4">
                        <Card.Body className="d-flex">
                            <div className="me-3">
                                <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                    U
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <p className="mb-1 text-muted">User</p>
                                <p className="overflow-auto">{transcript}</p>
                            </div>
                            <Button onClick={send}>
                                메세지 보내기
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default WebSocketTest;
