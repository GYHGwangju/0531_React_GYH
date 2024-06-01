import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";

const OrderComplete = () => {
    const {state} = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 10000)
    }, []);

    return (
        <Container>
            <div>
                주문완료! 주문번호는 <strong>{state}</strong>입니다!
            </div>
        </Container>
    );
}

export default OrderComplete;
