import React, {useEffect, useState} from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddModal from '../../components/addModal';
import OrderList from './components/OrderList';
import OrderStats from './components/OrderStats';
import SearchV2 from './Search_ver2';
import TakeoutModal from './components/TakeoutModal';
import axios from "axios";

const SearchOrder = () => {
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [currentOrder, setCurrentOrder] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [takeoutModalShow, setTakeoutModalShow] = useState(false);

    const handleConfirm = () => {
        navigate('/purchase');
    };

    const handleClear = () => {
        setOrderList([]);
        setTotalPrice(0);
    };

    const handleOpen = (data) => {
        setCurrentOrder(data);
        setModalShow(true);
    };

    const handleAdd = (data) => {
        const idx = orderList.findIndex((order) => order.id === data.id);
        if (idx !== -1) {
            const newOrderList = [...orderList];
            newOrderList[idx].count += 1;
            setOrderList(newOrderList);
        } else {
            setOrderList([...orderList, { ...data, count: 1 }]);
        }
        setTotalPrice(totalPrice + data.price);
    };

    const getOrderCount = () => {
        let count = 0;
        orderList.forEach((order) => {
            count += order.count;
        });
        return count;
    };

    const handleTakeoutConfirm = () => {
        setTakeoutModalShow(true);
    };

    const goToPay = (option) => {
        const orderData = {
            takeout: option,
            totalPrice: totalPrice,
            orderDetailRequestDtoList: orderList.map((order) => ({
                menuName: order.name,
                amount: order.count,
                price: order.count * order.price,
                temperature: 'ice',
            })),
        };
        console.log('Data received from modal: ', orderData);
        setTakeoutModalShow(false);
        navigate("/payment", { state: { orderData: orderData } });

    };

    return (
        <div className='container'>
            <div className='youngerorder-container'>
                <Row style={{ height: '100%', width: '100%' }}>
                    <Col md={8} className='youngerorder-middle'>
                        <Row>
                            <SearchV2 handleOpen={handleOpen} />
                        </Row>
                    </Col>
                    <Col md={4}>
                        <div className='youngerorder-detail gap-3'>
                            <OrderList orderList={orderList} />
                            <OrderStats getOrderCount={getOrderCount} totalPrice={totalPrice} />
                            <div className='d-grid gap-2'>
                                <Button className='btn-primary rounded-4' onClick={handleTakeoutConfirm}><h3>주문 확정</h3></Button>
                                <Button className='btn-danger rounded-4' onClick={handleClear}><h3>주문 취소</h3></Button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <AddModal
                    data={currentOrder}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onAdd={handleAdd}
                />
                <TakeoutModal
                    show={takeoutModalShow}
                    onHide={() => setTakeoutModalShow(false)}
                    onConfirm={goToPay}
                />
            </div>
        </div>
    );
};

export default SearchOrder;
