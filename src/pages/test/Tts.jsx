import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import React, { useState, useEffect } from "react";
import AudioStreaming from "./AudioStreaming";
import {Button, Row, Col, Container, CardBody, CardHeader, Card} from "react-bootstrap";

const Tts = () => {
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const [isRecording, setIsRecording] = useState(null);
    const [text, setText] = useState('');
    const [sendingText, setSendingText] = useState('');

    useEffect(() => {
        setText(transcript);
    }, [transcript]);

    const toggleListening = () => {
        if (listening) {
            setIsRecording(null);
            SpeechRecognition.stopListening();


            //setSendingText(userScript);
        } else {
            resetTranscript();
            setIsRecording(<div className="spinner-grow bg-danger" role="status"/>);
            SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
        }
    }

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
                                <p>안녕하세요. 사용자 대화 영역을 만들어 드리겠습니다.</p>
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
                                onClick={toggleListening}
                                className={`ms-auto ${listening ? 'btn-danger' : 'btn-light'}`}
                                style={{height: '40px', flexShrink: 0}}
                            >
                                {listening ? '음성인식 중지' : '음성인식 시작'}
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );


}

export default Tts;
