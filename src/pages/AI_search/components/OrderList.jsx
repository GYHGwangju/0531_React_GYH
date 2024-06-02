import { Card, CardBody, Table } from "react-bootstrap";
import React from "react";

const OrderList = ({ orderList }) => {
    return (
        <Card className='rounded-4 shadow-sm border-0' style={{fontFamily:"Nanum-Reg"}}>
            <CardBody>
                <h3>주문 목록</h3>
                <Table striped bordered hover style={{fontFamily:'Nanum-Reg'}}>
                    <thead>
                        <tr>
                            <th>상품명</th>
                            <th>수량</th>
                            <th>가격</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList.map((order) => (
                            <tr key={order.id}>
                                <td>{order.name}</td>
                                <td>{order.count}</td>
                                <td>{order.price * order.count} ￦</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
}

export default OrderList;
