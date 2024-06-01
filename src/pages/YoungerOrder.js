import React, {useState} from 'react';
import './YoungerOrder.css'
import {Row, Col,  Badge} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Pic from '../images/completeImg.png';
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import AddModal from '../components/addModal';

import {Input ,Space} from "antd";

const YoungerOrder = () => {
    const navigate = useNavigate();
    const dataList = [{
            id: 1,
            name: '아메리카노11',
            price: 3000,
            temperature : 'Hot'
        }, {
            id: 2,
            name: '카페라떼_1',
            price: 3500,
            temperature : 'Hot'
        }, {
            id: 3,
            name: '카페라떼_2',
            price: 3500,
            temperature : 'Hot'
        }, {
            id: 4,
            name: '바닐라라떼',
            price: 3700,
            temperature : 'Hot'
        }]

    const [orderList, setOrderList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const handleConfirm = () => {
        navigate("/purchase");
    }

    const handleClear = () => {
        setOrderList([])
        setTotalPrice(0)
        navigate("/")
    }

    const [currentOrder, setCurrentOrder] = useState({})

    const handleOpen = (data) => {
        setCurrentOrder(data)
        setModalShow(true)
    }

    const [modalShow, setModalShow] = useState(false);
    const handleAdd = (data) => {
        const idx = orderList.findIndex((order) => {
            return order.temperature === data.temperature && order.id === data.id
        } )
        if (idx !== -1) {
            const newOrderList = [...orderList]
            newOrderList[idx].count += 1
            setOrderList(newOrderList)
        } else {
            setOrderList([...orderList, {...data, count: 1}])
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


    const add = (data) => {
        const idx = orderList.findIndex((order) => {
            return order.temperature === data.temperature && order.id === data.id
        } )
        debugger
        if (idx !== -1) {
            const newOrderList = [...orderList]
            newOrderList[idx].count += 1
            setOrderList(newOrderList)
        } else {
            setOrderList([...orderList, {...data, count: 1}])
        }
        setTotalPrice(totalPrice + data.price)
    }
    const reduce = (data) => {
        const idx = orderList.findIndex((order) => {
            return order.temperature === data.temperature && order.id === data.id
        } )
        if (idx !== -1) {
            const newOrderList = [...orderList]
            if(newOrderList[idx].count!==1){
                newOrderList[idx].count -= 1
            }else
            {
                return
            }

            setOrderList(newOrderList)
        } else {
            setOrderList([...orderList, {...data, count: 1}])
        }
        setTotalPrice(totalPrice - data.price)
    }
    const reduceone =
        () => {

            // this.props.dispatch(setdata({
            //     id,
            //     count
            // }))
        }
    return (
        <div className='youngerorder-container'>
            <Row style={{height: '100vh', width: '100%'}}>  {/* height를 100%에서 100vh로 변경 */}
                <Col md={2}>
                    <ul className="navbar-nav flex-column youngerorder-nav-list">
                        <li className="nav-item">
                            <button className="btn btn-primary nav-link">커피</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-secondary nav-link">논커피</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-warning nav-link">주스</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger nav-link">디저트</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-success nav-link">티</button>
                        </li>
                    </ul>
                </Col>
                <Col md={6} className='youngerorder-middle'>
                    <Row style={{height:'96vh',overflow:'auto'}}>
                        {dataList.map((data) => {
                            return (
                                <Col md={3} key={data.id} style={{margin: '5px 0'}}>
                                    <Card onClick={() => handleOpen(data)}>
                                        <Card.Img variant="top" src={Pic}/>
                                        <Card.Body>
                                            <Card.Title className="truncate-title" style={{textAlign:'center', fontFamily:"Nanum-Nor",fontSize:'x-large'}}>{data.name}</Card.Title> {/* 메뉴 카드의 메뉴 이름 크기 증가 */}
                                            <Card.Text>
                                                <span style={{color: 'red', fontWeight:'bold'}}>{data.price}￦</span>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>)
                        })}
                    </Row>
                </Col>
                <Col md={4}>
                    <div className='youngerorder-detail'>
                        <div className='youngerorder-detail-top'>

                            <Row> {/* 아래 4개의 폰트 사이즈를 18 -> 22 변경 */}
                                <Col md={2} style={{fontSize: 22, fontFamily:'Nanum-Nor'}}>온도</Col>
                                <Col md={4} style={{fontSize: 22, fontFamily:'Nanum-Nor'}}>주문</Col>
                                <Col md={4} style={{fontSize: 22, fontFamily:'Nanum-Nor'}}>수량</Col>
                                <Col md={2} style={{fontSize: 22, fontFamily:'Nanum-Nor'}}>가격</Col>
                            </Row>
                            {orderList.map((order) => {

                                    return (
                                        <Row key={order.id}>
                                            <Col md={2} style={{fontSize: 22 , fontFamily:'Nanum-Nor'}}>
                                                <Badge bg={order.temperature ==='Hot'?'danger':'primary' }>{order.temperature}</Badge></Col>
                                            <Col md={4} style={{fontSize: 22 , fontFamily:'Nanum-Nor'}} className="truncate-title">{order.name}</Col>
                                            <Col md={4} style={{fontSize: 18 , fontFamily:'Nanum-Nor'}}>
                                                <Space.Compact style={{ width: '100%', fontSize:'x-large' }}>
                                                    <Button  size ="small" type="primary" onClick={() => reduce(order)}>-</Button>

                                                    <Input  size ="small" value={order.count} />

                                                    <Button size ="small" type="primary" onClick={() => add(order)}>+</Button>
                                                </Space.Compact>
                                            </Col>
                                            <Col md={2} style={{fontSize: 18, fontFamily:'Nanum-Nor'}}>{order.price * order.count}￦</Col>
                                        </Row>
                                    )
                                }
                            )}
                        </div>
                        <div className='youngerorder-detail-middle' style={{fontFamily:"Nanum-Nor"}}>
                            <Row>
                                <Col md={6}>
                                    <span style={{fontSize: 36}}>주문 개수</span>
                                </Col>
                                <Col md={6}>
                                    <span style={{fontSize: 36, color: 'rgba(255,0,0,1)', textAlign:'right'}}>{getOrderCount()} 개</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <span style={{fontSize: 36}}>결제 금액</span>
                                </Col>
                                <Col md={6}>
                                    <span style={{fontSize: 36, color: 'rgba(255,0,0,1)', textAlign:'right'}}>{totalPrice} ￦</span>
                                </Col>
                            </Row>                            
                        </div>
                        <div className='youngerorder-detail-bottom' style={{fontFamily:'Nanum-Nor'}}>
                            {/* <div style={{
                                backgroundColor: 'rgba(255,81,81,1)', width: '70%', height: '100%',
                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }} onClick={handleConfirm}>
                                <span style={{fontSize: 60}} >주문 확정</span>
                            </div> */}
                            <Button variant="success" style={{width:'65%', height:'100%', fontSize:'48pt'}} onClick={handleConfirm}>주문 확정</Button>
                            {/* <div md={3} style={{
                                backgroundColor: 'rgba(226,226,226,1)', width: '30%', height: '100%',
                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }} onClick={handleClear}>
                                <span style={{fontSize: 30, color: 'rgba(0,0,0,1)'}}>주문
                                    취소</span>
                            </div> */}
                            <Button variant="outline-secondary" style={{width:'35%',height:'100%', fontSize:'32pt'}}>주문 취소</Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <AddModal
                data={currentOrder}
                show={modalShow}
                onHide={() => setModalShow(false)}
                onAdd={handleAdd}/>
        </div>
    );
};

export default YoungerOrder;