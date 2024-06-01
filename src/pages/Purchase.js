import React, { useEffect, useState } from 'react';
import './Purchase.css'
import { useNavigate } from "react-router-dom";
import { Row, Col } from 'react-bootstrap'
import purchaseImg from '../images/purchaseImg.png'
import completeImg from '../images/completeImg.png'
const Purchase = () => {
    const [status, setStatus] = useState(0) // 0 purchase 1 complete
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setStatus(1)
        }, 3000)
    }, [])

    return (
        <div className='purchase-container'>
            <Row style={{ height: '100%', width: '100%' }}>
                <Col md={4}>
                    <div className='purchase-img'>
                        <img src={status === 0 ? purchaseImg : completeImg} alt="purchase" />
                    </div>
                </Col>
                <Col md={4}>
                    <div className='purchase-info'>
                        {
                            status === 0 ? <>
                                <span style={{ fontSize: 96 }}>결제 대기</span>
                                <span style={{ fontSize: 64 }}>카드를 단말기에 넣어주세요.</span>
                            </> : <>
                                <span style={{ fontSize: 96 }}>결제 완료</span>
                                <span style={{ fontSize: 64 }}>이용해주셔서 감사합니다.
                                    <br />
                                    카드를 빼주세요.</span>
                                <span style={{ fontSize: 96 }}>주문 번호</span>
                                <span style={{ fontSize: 96, color: 'rgba(255,0,0,1)' }} >007</span>
                            </>
                        }
                    </div>
                </Col>
                <Col md={4}>
                    <div className='purchase-detail'>
                        <div className='purchase-detail-top'>
                            <span style={{ fontSize: 36 }}>주문 목록</span>
                            <Row>
                                <Col md={5} style={{ fontSize: 32 }}>아메리카노</Col>
                                <Col md={3} style={{ fontSize: 32 }}>1</Col>
                                <Col md={4} style={{ fontSize: 32 }}>3,000￦</Col>
                            </Row>
                            <Row>
                                <Col md={5} style={{ fontSize: 32 }}>카페라떼</Col>
                                <Col md={3} style={{ fontSize: 32 }}>2</Col>
                                <Col md={4} style={{ fontSize: 32 }}>7,000￦</Col>
                            </Row>
                        </div>
                        <div className='purchase-detail-bottom'>
                            <Row>
                                <Col md={6}>
                                    <span style={{ fontSize: 36 }}>주문 개수</span>
                                </Col>
                                <Col md={6}>
                                    <span style={{ fontSize: 36, color: 'rgba(255,0,0,1)' }}>3 개</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <span style={{ fontSize: 36 }}>결제 금액</span>
                                </Col>
                                <Col md={6}>
                                    <span style={{ fontSize: 36, color: 'rgba(255,0,0,1)' }}>10,000 ￦</span>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Purchase;