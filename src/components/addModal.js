import React, { useState } from 'react';
import './addModal.css';
import Pic from '../swallow.jpg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const AddModal = (props) => {
    const { show, data, onAdd, onHide } = props;

    const [temperature, setTemperature] = useState('');

    const handleAdd = () => {
        onAdd({ ...data, temperature });
        handleCancel();
    };

    const handleCancel = () => {
        onHide();
    };

    const handleTemperatureChange = (value) => {
        setTemperature(value);
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <Card style={{ width: 100, marginBottom: 20 }}>
                    <Card.Img variant="top" src={Pic} />
                    <Card.Body>
                        <Card.Title>{data.name}</Card.Title>
                        <Card.Text>
                            <span style={{ color: 'red' }}>{data.price}￦</span>
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Body>
                        <Card.Title>음료의 온도</Card.Title>
                        <Card.Text>
                            <Form>
                                <ButtonGroup toggle className="mb-3">
                                    <ToggleButton
                                        key="hot"
                                        id="hot"
                                        type="radio"
                                        variant="outline-danger"
                                        name="temperature"
                                        value="Hot"
                                        checked={temperature === 'Hot'}
                                        onChange={(e) => handleTemperatureChange(e.currentTarget.value)}
                                    >
                                        Hot
                                    </ToggleButton>
                                    <ToggleButton
                                        key="cold"
                                        id="cold"
                                        type="radio"
                                        variant="outline-primary"
                                        name="temperature"
                                        value="Cold"
                                        checked={temperature === 'Cold'}
                                        onChange={(e) => handleTemperatureChange(e.currentTarget.value)}
                                    >
                                        Cold
                                    </ToggleButton>
                                </ButtonGroup>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <div>
                    <Button variant="secondary" onClick={handleCancel}>취소</Button>
                    <Button variant="primary" onClick={handleAdd}>확정</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AddModal;
