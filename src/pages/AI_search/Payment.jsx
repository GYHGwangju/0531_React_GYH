import {Card, CardBody, Button, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const Payment = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [isPaid, setIsPaid] = useState(false);


    const pay = () => {
        setIsPaid(true);
    }

    useEffect(() => {
        const orderData = JSON.parse(state.orderData);
        console.log(orderData);
        if(isPaid) {
            sendOrderToServer(orderData);
        }
    }, [isPaid]);

    const sendOrderToServer = (data) => {
        axios.post("http://localhost:8080/api/orders", data)
            .then(response => {
                const orderId = response.data;
                console.log("order success", orderId);
                navigate("/order-complete", {state: orderId});
            })
            .catch(error => {
                console.log("order failed", error);
            })
    }


    return (
        <Container>
            <Card className="border-0">
                <CardBody className="bg-light">
                    <Row className="justify-content-center">
                        <h1>결제를 진행해주세요.</h1>
                    </Row>
                    <Row>
                        <span>결제 금액 <strong>{state.orderData.totalPrice}</strong></span>
                    </Row>
                    <Row className="mt-3 justify-content-center">
                        <Button className="btn btn-primary" onClick={pay}>결제</Button>
                    </Row>
                </CardBody>
            </Card>
        </Container>


    );
}

export default Payment;