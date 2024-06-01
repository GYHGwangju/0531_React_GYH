import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Home.css'
import { useNavigate } from "react-router-dom";
import WebcamCapture from '../functions/WebcamCapture';


function AIOptionModal(props) {
    const navigate = useNavigate();

    const handleClick = (data) => {
        if (data === 0) {
            navigate("/olderorder");
        } else {
            navigate("/usingai");
        }
    }

    return (
        <Modal
            {...props}
            size='lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body style={{ fontFamily: 'Nanum-Nor', textAlign: 'center' }}>
                <div className="aioption-title">편리한 인공지능 주문을 사용해보시겠어요?</div>
                <div className="aioption-content">
                    <p>인공지능을 사용하면 자체 내장된 인공지능이</p>
                    <p>이용자분과 목소리로 이야기를 하면서</p>
                    <p>주문을 할 수 있습니다.</p>
                </div>
                <div>
                    <Button variant="primary" style={{ marginRight: '32px', fontSize: '36pt' }} onClick={() => handleClick(0)}>인공지능과 주문</Button>
                    <Button variant="secondary" style={{ fontSize: '36pt' }} onClick={() => handleClick(1)}>일반 선택 주문</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const Home = () => {
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/youngerorder");
    }

    return (
        <div className='first-container'>
            <div className='first-picture-row'>
                <WebcamCapture />
                {/* <span>
                    ABC 카페
                </span>
                <div className='first-picture'>
                    <img src={logo} alt='pic' />
                </div> */}
            </div>
            <div className='first-description' style={{ fontFamily: "Nanum-Nor", textAlign:'center' }}>
                <p>
                    ABC 카페에 오신 여러분을 환영합니다!
                </p>
                <p>
                    ABC 카페의 키오스크는 여러분의 얼굴을 캡쳐 후,
                </p>
                <p>
                    인식된 연령에 맞춰서 맞춤형 인터페이스를 제공합니다
                </p>
                <p>
                    맞춤형 인터페이스를 통해 더 편해진 키오스크의 경험을 제공해드립니다!
                </p>
            </div>
            <div className='first-bottom' style={{ fontFamily: "Nanum-Nor", position:'absolute', bottom:'5vh', left:'25vw'}}>
                <Button variant="primary first-btn" onClick={handleClick} style={{ fontSize: '48pt' }}>매장 이용</Button>
                <Button variant="secondary first-btn" onClick={() => setModalShow(true)} style={{ fontSize: '48pt' }}>테이크 아웃</Button>
            </div>
            <AIOptionModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div >
    );
};

export default Home;
