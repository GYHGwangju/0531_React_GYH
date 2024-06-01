import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from "axios";
import {useEffect, useState} from "react";

const SpeechToText = () => {
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const [gptScript, setGptScript] = useState();
    const [audioUrl, setAudioUrl] = useState('');

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

            SpeechRecognition.stopListening();
            sendUserScript();

        } else {
            setAudioUrl('');
            SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
        }
    }



    const sendUserScript = (finalTranscript) => {
        const userScript = {
            "userScript": document.getElementById('userScript').value// 수정된 부분
        };

        axios.post('http://localhost:8000/fast/api/script-order', userScript)
            .then(response => {
                console.log('suc', response.data);
                resetTranscript(); //사용자 script를 reset

                setGptScript(response.data.gptScript); //응답 받은 gpt script를 설정해줌.
                audioHandler(response); //응답 받은 gpt audio url를 재생.
            })
            .catch(error => {
                console.log('err', error);
            })

    }

    return (
        <>
            {/* 실시간으로 stt된 사용자 음성 텍스트 */}
            <textarea className="transcript" id="userScript" value={transcript} onChange={() => {}} />

            {/* 음성인식 시작/중지 버튼 */}
            <button onClick={toggleListening}>
                {listening ? '음성인식 중지' : '음성인식 시작'}
            </button>

            {/* gpt 응답 텍스트, gpt 응답 오디오는 api 요청 성공 시 바로 재생 */}
            <p id="gptScript">{gptScript}</p>
        </>
    );

};

export default SpeechToText;
