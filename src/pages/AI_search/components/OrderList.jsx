import {Card, CardBody, Col, Row} from "react-bootstrap";
import React from "react";

const OrderList = ({ orderList }) => {
    return (
        <Card className='rounded-4 shadow-sm border-0'>
            <CardBody>
                <span><h3>주문 목록</h3></span>
                {orderList.map((order) => {
                    return (
                        <Row key={order.id}>
                            <Col md={5}><h5>{order.name}</h5></Col>
                            <Col md={3}><h5>{order.count}</h5></Col>
                            <Col md={4}><h5>{order.price * order.count}￦</h5></Col>
                        </Row>
                    )
                })}
            </CardBody>
        </Card>
    );
}


export default OrderList;

