import React, { useState } from 'react';
import './OlderOrder.css'
import { Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import AddModal from '../components/addModal'
import Accordion from 'react-bootstrap/Accordion';
import Pic from '../swallow.jpg'

const OlderOrder = () => {
    const navigate = useNavigate();
    const groupList = ['커피', '논커피', '주스', '티']
    const dataList = [{
        id: 1,
        name: '아메리카노',
        price: 3000
    },
    {
        id: 2,
        name: '카페라떼',
        price: 3500
    },
    {
        id: 3,
        name: '바닐라라떼',
        price: 3700
    }]

    const [orderList, setOrderList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const handleConfirm = () => {
        navigate("/purchase");
    }

    const handleClear = () => {
        setOrderList([])
        setTotalPrice(0)
    }

    const [currentOrder, setCurrentOrder] = useState({})

    const handleOpen = (data) => {
        setCurrentOrder(data)
        setModalShow(true)
    }

    const [modalShow, setModalShow] = useState(false);
    const handleAdd = (data) => {
        const idx = orderList.findIndex((order) => order.id === data.id)
        if (idx !== -1) {
            const newOrderList = [...orderList]
            newOrderList[idx].count += 1
            setOrderList(newOrderList)
        }
        else {
            setOrderList([...orderList, { ...data, count: 1 }])
        }
        setTotalPrice(totalPrice + data.price)
    }

    const getOrderCount = () => {
        let count = 0
        orderList.forEach((order) => {
            count += order.count
        })
        return count
    }

    return (
        <div className='olderorder-container'>
            <Row style={{ height: '100%', width: '100%' }}>
                <Col md={2}>
                    <ul className="navbar-nav flex-column olderorder-nav-list">
                        <li className="nav-item">
                            <button className="btn btn-primary nav-link">인기</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-secondary nav-link">음료</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-warning nav-link">디저트</button>
                        </li>
                    </ul>
                </Col>
                <Col md={6} className='olderorder-middle'>
                    <Accordion defaultActiveKey={0}>
                        {groupList.map((group, index) => {
                            return (
                                <Accordion.Item eventKey={index}>
                                    <Accordion.Header>{group}</Accordion.Header>
                                    <Accordion.Body>
                                        <Row>
                                            {dataList.map((data) => {
                                                return (
                                                    <Col md={3} key={data.id} style={{ margin: '5px 0' }}>
                                                        <Card onClick={() => handleOpen(data)}>
                                                            <Card.Img variant="top" src={Pic} />
                                                            <Card.Body>
                                                                <Card.Title>{data.name}</Card.Title>
                                                                <Card.Text>
                                                                    <span style={{ color: 'red' }}>{data.price}￦</span>
                                                                </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>)
                                            })}
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        })}
                    </Accordion>
                </Col>
                <Col md={4}>
                    <div className='olderorder-detail'>
                        <div className='olderorder-detail-top'>
                            <span style={{ fontSize: 36 }}>주문 목록</span>
                            {orderList.map((order) => {
                                return (
                                    <Row key={order.id}>
                                        <Col md={5} style={{ fontSize: 32 }}>{order.name}</Col>
                                        <Col md={3} style={{ fontSize: 32 }}>
                                            <span>{order.count}</span>
                                        </Col>
                                        <Col md={4} style={{ fontSize: 32 }}>{order.price * order.count}￦</Col>
                                    </Row>
                                )
                            }
                            )}
                        </div>
                        <div className='olderorder-detail-middle'>
                            <Row>
                                <Col md={6}>
                                    <span style={{ fontSize: 36 }}>주문 개수</span>
                                </Col>
                                <Col md={6}>
                                    <span style={{ fontSize: 36, color: 'rgba(255,0,0,1)' }}>{getOrderCount()} 개</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <span style={{ fontSize: 36 }}>결제 금액</span>
                                </Col>
                                <Col md={6}>
                                    <span style={{ fontSize: 36, color: 'rgba(255,0,0,1)' }}>{totalPrice} ￦</span>
                                </Col>
                            </Row>
                        </div>
                        <div className='olderorder-detail-bottom'>
                            <div style={{
                                backgroundColor: 'rgba(255,81,81,1)', width: '70%', height: '100%',
                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }} onClick={handleConfirm}>
                                <span style={{ fontSize: 60 }}>주문 확정</span>
                            </div>
                            <div md={3} style={{
                                backgroundColor: 'rgba(226,226,226,1)', width: '30%', height: '100%',
                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }} onClick={handleClear}>
                                <span style={{ fontSize: 30, color: 'rgba(0,0,0,1)' }}>주문
                                    취소</span>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row >
            <AddModal
                data={currentOrder}
                show={modalShow}
                onHide={() => setModalShow(false)}
                onAdd={handleAdd} />
        </div >
    );
};

export default OlderOrder;