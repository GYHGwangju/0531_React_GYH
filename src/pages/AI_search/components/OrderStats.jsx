import { Card, CardBody, Col, Row } from "react-bootstrap";
import React from "react";

const OrderStats = ({ getOrderCount, totalPrice }) => {
    return (
        <Card className='rounded-4 shadow-sm border-0 gap-2'>
            <CardBody>
                <Row>
                    <Col md={6}><h3>주문 개수</h3></Col>
                    <Col md={6}><h5>{getOrderCount()} 개</h5></Col>
                </Row>
                <Row>
                    <Col md={6}><h3>결제 금액</h3></Col>
                    <Col md={6}><h5>{totalPrice}￦</h5></Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default OrderStats;
