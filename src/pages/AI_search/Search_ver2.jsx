import React, { useEffect, useState } from 'react';
import axios from "axios";
import { CardBody, Col, Container, Row, Button } from "react-bootstrap";
import SearchedMenuList from "./components/SearchedMenuList";

const SearchV2 = ({ handleOpen }) => {
    const [ingredients] = useState(['주스', '커피', '우유', '차', '당도', '과일', '초콜릿']);
    const [clickedIngredients, setClickedIngredients] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    const [menus, setMenus] = useState([]);
    const [visibilityToggle, setVisibilityToggle] = useState(true);

    useEffect(() => {
        setIsEmpty(clickedIngredients.length === 0);
    }, [clickedIngredients]);

    const toggleIngredient = (ingredient) => {
        setClickedIngredients(prevClickedIngredients =>
            prevClickedIngredients.includes(ingredient)
                ? prevClickedIngredients.filter(item => item !== ingredient)
                : [...prevClickedIngredients, ingredient]
        );
    };

    const goSearch = () => {
        if (!isEmpty) {
            const data = { ingredients: clickedIngredients };
            axios.post('http://localhost:8000/fast/api/search', data)
                .then(response => {
                    console.log('recommendation menus are successfully arrived! : ', response.data);
                    visibilityHandler();
                    setMenus(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const reset = () => {
        setClickedIngredients([]);
        setMenus([]);
        visibilityHandler();
    };

    const visibilityHandler = () => {
        setVisibilityToggle(!visibilityToggle);
        console.log('Visibility Toggle: ', !visibilityToggle);
    };

    const noSelectStyle = {
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
    };

    return (
        <Container id="search" style={{noSelectStyle, marginTop:'40px'}}>
            <Col className="text-center">
                {visibilityToggle && (
                    <Row style={{ fontFamily: 'Nanum-Reg' }}>
                        <h1>키워드 검색</h1>
                        <h4>지금 이 순간, 이용자분께서 드시고 싶은 음료에 들어가는 것을 눌러주세요!</h4>
                        <h5>해당하는 메뉴만 쏙 골라서 추천해드리겠습니다!</h5>
                        <Row className="card rounded-5 rounded-bottom-0 bg-light border-0 shadow-sm">
                            <CardBody className="overflow-auto row justify-content-center">
                                <div className="d-flex flex-wrap justify-content-center">
                                    {ingredients.map((ingredient, index) => {
                                        const isClicked = clickedIngredients.includes(ingredient);
                                        const buttonClass = isClicked ? "btn btn-info rounded-3 m-2" : "btn btn-outline-info rounded-3 m-2";
                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                className={buttonClass}
                                                onClick={() => toggleIngredient(ingredient)}
                                                style={{ fontSize: '24pt', fontFamily: 'Nanum-Reg' }}
                                            >
                                                {ingredient}
                                            </button>
                                        );
                                    })}
                                </div>
                            </CardBody>
                        </Row>
                        <Row className="card rounded-5 rounded-top-0 bg-light border-0 shadow-sm">
                            <CardBody className="overflow-auto row justify-content-center">
                                <Button
                                    className="btn-success rounded-4 w-100"
                                    onClick={goSearch}
                                    disabled={isEmpty}
                                    style={{ fontSize: '24pt', fontFamily: 'Nanum-Reg' }}
                                >
                                    선택한 재료가 포함된 메뉴 검색
                                </Button>
                            </CardBody>
                        </Row>
                    </Row>
                )}
                {!visibilityToggle && (
                    <Row>
                        <button className="btn btn-info rounded-4" type="button" onClick={reset}>
                            <h3 style={{ fontFamily: "Nanum-Reg" }}>다시 검색</h3>
                        </button>
                        {menus && menus.menuList && menus.menuList.length > 0 ? (
                            <SearchedMenuList menus={menus} handleOpen={handleOpen} />
                        ) : (
                            <p><h1 style={{ fontFamily: "Nanum-Reg" }}>해당되는 메뉴가 없습니다!</h1></p>
                        )}
                    </Row>
                )}
            </Col>
        </Container>
    );
};

export default SearchV2;
