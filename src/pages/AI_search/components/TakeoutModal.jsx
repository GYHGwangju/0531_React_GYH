import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TakeoutModal = ({ show, onHide, onConfirm }) => {
    const handleOptionSelect = (option) => {
        onConfirm(option);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>주문 옵션 선택</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-around">
                <Button variant="primary" size="lg" onClick={() => handleOptionSelect('takeout')}>
                    포장
                </Button>
                <Button variant="secondary" size="lg" onClick={() => handleOptionSelect('dinein')}>
                    매장
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default TakeoutModal;
