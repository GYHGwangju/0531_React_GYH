import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TakeoutModal = ({ show, onHide, onConfirm }) => {
    const handleOptionSelect = (option) => {
        onConfirm(option);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} style={{fontFamily:'Nanum-Reg'}} centered>
            <Modal.Header closeButton>
                <Modal.Title>주문 옵션 선택</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-around">
                <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={() => handleOptionSelect('takeout')}
                    style={{ 
                        width: '48%', 
                        height: '70px', 
                        fontSize: '32pt', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                    }}
                >
                    포장
                </Button>
                <Button 
                    variant="secondary" 
                    size="lg" 
                    onClick={() => handleOptionSelect('dinein')}
                    style={{ 
                        width: '48%', 
                        height: '70px', 
                        fontSize: '32pt', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                    }}
                >
                    매장
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default TakeoutModal;
