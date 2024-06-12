import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";

const OrderComplete = () => {
    const {state} = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Uncomment the below code to enable navigation after 10 seconds
        // setTimeout(() => {
        //     navigate("/");
        // }, 10000)
    }, [navigate]);

    return (
        <Container style={{fontFamily:'Nanum-Reg', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <div style={{textAlign:'center', margin:'45px',fontSize:'64pt'}}>
                <p>주문 완료!</p>
                <p style={{fontSize:'56pt'}}>주문번호는 <strong style={{color:'red', fontSize:'120pt'}}>{state}</strong>입니다!</p>
            </div>
            <p style={{fontSize:'40pt', textAlign:'center', marginBottom: '10vh'}}>잠시 후 초기 화면으로 돌아갑니다...</p>
        </Container>
    );
}

export default OrderComplete;
