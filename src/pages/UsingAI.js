import React, {useEffect, useState} from 'react';
import './UsingAI.css'
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import axios from "axios";

const UsingAI = () => {
    const navigate = useNavigate();
    const handleConfirm = () => {
        navigate("/purchase");
    }

    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const [gptScript, setGptScript] = useState();
    const [audioUrl, setAudioUrl] = useState('');
    const [gptCheckerResult, setGptCheckerResult] = useState(null);
    const [recording, setRecording] = useState(null);

    useEffect(() => {
        if (gptScript) {
            setGptCheckerResult(
                <span style={{ fontSize: 32 }}>{gptScript}</span>
            );
        }
    }, [gptScript]);


    useEffect(() => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();

            return () => {
                audio.pause();
            };
        }
        else {
            const audio = new Audio();
            audio.pause();
        }
    }, [audioUrl]);

    const audioHandler = (response) => {
        setAudioUrl(response.data.gptAudioUrl);
    }

    const toggleListening = () => {
        if (listening) {
            setRecording(null);
            SpeechRecognition.stopListening();
            sendUserScript();

        } else {
            setAudioUrl('');
            setRecording(<div className="spinner-grow text-danger-sm" role="status"/>);
            SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
        }
    }



    const sendUserScript = (finalTranscript) => {
        const userScript = {
            "userScript": document.getElementById('userScript').textContent// 수정된 부분
        };
        setGptCheckerResult(
            <div className="d-flex justify-content-center">
                <div className="spinner-grow text-primary" style={{ height: "10rem", width: "10rem" }} role="status"/>
            </div>
        );

        axios.post('http://localhost:8000/fast/api/ai-order', userScript)
            .then(response => {
                console.log('suc', response.data);
                resetTranscript(); //사용자 script를 reset
                setGptScript(response.data.gpt_text_response); //응답 받은 gpt script를 설정해줌.
                //audioHandler(response.data.gpt_audio_response); //응답 받은 gpt audio url를 재생.
                const audioSrc = document.getElementById('audioSrc');
                audioSrc.src = response.data.gpt_audio_response;
                audioSrc.load();  // Load the new source
                audioSrc.play();

            })
            .catch(error => {
                console.log('err', error);
            })

    }


    const handleClear = () => {
    }
    return (
        <div className='usingai-container'>
            <Row style={{height: '100%', width: '100%'}}>
                <Col md={8} className='usingai-left'>
                    <Row style={{height: '80%'}}>
                        <span style={{fontSize: 48}}>AI</span>
                        {/* gpt 답변 없으면 스피너 */}
                        <div id={'gptChecker'}>{gptCheckerResult}</div>
                    </Row>
                    <Row style={{height: '20%', borderTop: '6px solid rgba(0, 0, 0, 1)'}}>
                        <span style={{fontSize: 48}}>사용자<span>{recording}</span></span>{/* recording 빨간색으로 변경*/}

                        <span id={'userScript'} style={{fontSize: 32}} onChange={() => {
                        }}>{transcript}</span>
                        <button onClick={toggleListening}>
                            {listening ? '음성인식 중지' : '음성인식 시작'}
                        </button>
                    </Row>
                </Col>
                <Col md={4}>
                    <div className='usingai-detail'>
                        <div className='usingai-detail-top'>
                            <span style={{fontSize: 36}}>주문 목록</span>
                            <Row>
                                <Col md={5} style={{fontSize: 32}}>아메리카노</Col>
                                <Col md={3} style={{fontSize: 32}}>1</Col>
                                <Col md={4} style={{fontSize: 32}}>3,000￦</Col>
                            </Row>
                            <Row>
                                <Col md={5} style={{fontSize: 32}}>카페라떼</Col>
                                <Col md={3} style={{fontSize: 32}}>2</Col>
                                <Col md={4} style={{fontSize: 32}}>7,000￦</Col>
                            </Row>
                        </div>
                        <div className='usingai-detail-middle'>
                            <Row>
                                <Col md={6}>
                                    <span style={{fontSize: 36}}>주문 개수</span>
                                </Col>
                                <Col md={6}>
                                    <span style={{fontSize: 36, color: 'rgba(255,0,0,1)'}}>3 개</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <span style={{fontSize: 36}}>결제 금액</span>
                                </Col>
                                <Col md={6}>
                                    <span style={{fontSize: 36, color: 'rgba(255,0,0,1)'}}>10,000 ￦</span>
                                </Col>
                            </Row>
                        </div>
                        <div className='usingai-detail-bottom'>
                            <div style={{
                                backgroundColor: 'rgba(255,81,81,1)', width: '70%', height: '100%',
                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }} onClick={handleConfirm}>
                                <span style={{fontSize: 60}}>주문 확정</span>
                            </div>
                            <div md={3} style={{
                                backgroundColor: 'rgba(226,226,226,1)', width: '30%', height: '100%',
                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }} onClick={handleClear}>
                                <span style={{fontSize: 30, color: 'rgba(0,0,0,1)'}}>주문
                                    취소</span>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <audio controls>
                <source id="audioSrc" type="audio/wav"/>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default UsingAI;