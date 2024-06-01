import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";


const WebSocketTest = () => {
    const wsRef = useRef(null);
    const audioContextRef = useRef(null);
    const audioQueueRef = useRef([]);
    const isPlayingRef = useRef(false);
    const [gptScript, setGptScript] = useState('');
    const navigate = useNavigate();

    const { transcript, listening, resetTranscript } = useSpeechRecognition();

    useEffect(() => {
        connect();
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

        wsRef.current.onclose = () => {
            console.log('웹소켓 연결 종료!');
        };

        wsRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.close();
                audioContextRef.current.close();
                audioQueueRef.current = [];
                isPlayingRef.current = false;
            }
        };
    }, []);

    const connect = () => {
        wsRef.current = new WebSocket('ws://localhost:8000/ws/v4/openai');
        wsRef.current.binaryType = 'arraybuffer';

        wsRef.current.onopen = () => {
            console.log('웹소켓 연결 성공!');
            audioQueueRef.current = [];

        };

    }

    const startStreaming = () => {
        if (!transcript) {
            alert('Please enter some text to synthesize');
            return;
        }
        wsRef.current.send(transcript);
        console.log(`${transcript}가 전달되었습니다.`);
        console.time("tts 전송 테스트");

        wsRef.current.onmessage = async (event) => {
            if (event.data instanceof ArrayBuffer) {
                const arrayBuffer = event.data;
                try {
                    const audioContext = audioContextRef.current;
                    if (!audioContext) {
                        console.error('Audio context is not initialized.');
                        return;
                    }
                    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                    audioQueueRef.current.push(audioBuffer);

                    if (!isPlayingRef.current) {
                        playNextAudio();
                    }
                } catch (error) {
                    console.error('Error decoding audio data:', error);
                }
            } else {
                try {
                    const orderData = JSON.parse(event.data);
                    console.log(`Received order${typeof orderData}:`, orderData);
                    navigate("/payment", { state: { orderData: orderData } });
                } catch (e) {
                    setGptScript(event.data);
                }
            }
        };



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
                    console.timeEnd("tts 전송 테스트");
                }
            };
        } else {
            isPlayingRef.current = false;
            console.log('No audio buffers to play');
        }
    };

    const toggleListening = () => {
        if (listening) {
            SpeechRecognition.stopListening();
            startStreaming();
        } else {
            if(isPlayingRef.current === true) {//스트리밍일 때만 가능
                isPlayingRef.current = false;
                audioQueueRef.current = [];
            }

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
                            <Button
                                className={`ms-auto ${listening ? 'btn-danger' : 'btn-light'}`}
                                style={{ height: '80px', flexShrink: 0 }}
                                onClick={toggleListening}
                            >
                                {listening ? '음성인식 중지' : '음성인식 시작'}
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default WebSocketTest;