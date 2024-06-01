import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {CardBody, Col, Container, Row} from "react-bootstrap";

const Search = () => {
    const navigate = useNavigate();
    const [ingredients, setIngredients] = useState(['주스', '커피', '우유', '차', '당도', '과일', '초콜릿']);
    const [ingredientBlocks, setIngredientBlocks] = useState(ingredients);
    const [clickedIngredients, setClickedIngredients] = useState([]);
    const [clickedIngredientBlocks, setClickedIngredientBlocks] = useState([]);

    // useEffect(() => {
    //     console.log("Clicked Ingredients:", clickedIngredients);
    // }, [clickedIngredients]);

    useEffect(() => {
        const ingredientsElements = ingredients.map((ingredient) => (
            <div className="card border-0 rounded-4 col-md-auto" onClick={() => toggleIngredient(ingredient)}>
                <div className="card-body">{ingredient}</div>
            </div>
        ));
        setIngredientBlocks(ingredientsElements);
    }, [ingredients]);

    useEffect(() => {
        const clickedIngredientElements = clickedIngredients.map((clickedIngredient) => (
            <div className="card bg-primary-subtle border-0 rounded-4 col-md-auto" onClick={() => toggleIngredient(clickedIngredient)}>
                <div className="card-body"><strong>{clickedIngredient}</strong></div>
            </div>
        ))
        setClickedIngredientBlocks(clickedIngredientElements);
    }, [clickedIngredients]);

    /// 클릭된 재료를 추가하거나 제거하는 함수
    const toggleIngredient = (ingredient) => {
        // 클릭된 재료 목록에 이미 포함되어 있는지 확인
        const isClicked = clickedIngredients.includes(ingredient);

        // 클릭된 재료 목록에 포함되어 있으면 제거, 그렇지 않으면 추가
        if (isClicked) {
            setClickedIngredients(prevClickedIngredients => prevClickedIngredients.filter(item => item !== ingredient));
            setIngredients(prevIngredients => [...prevIngredients, ingredient]);
        } else {
            setClickedIngredients(prevClickedIngredients => [...prevClickedIngredients, ingredient]);
            setIngredients(prevIngredients => prevIngredients.filter(item => item !== ingredient));
        }
    };

    const goSearch = () => {
        // 클릭된 재료 없을 때 검색 안되게
        const data2 = {
            "ingredients": clickedIngredients
        }
        axios.post('http://localhost:8000/fast/api/search', data2)
            .then(response => {
                console.log(response);
                ///OrderComponent에 데이터와 함께 이동

                navigate("/search-order",{
                    state: {menus: response.data}
                });

            })
            .catch(error => {
                console.log(error);
            })
    }




    return (
        <Container>
            <Container id="search">
                <Col className="text-center">
                    <Row className="text-center">
                        <Button>키워드에 해당되는 메뉴 검색</Button>
                    </Row>


                    {/* 검색어 생성 */}
                    <Card className="row rounded-5 bg-light-subtle border-0 shadow-sm">
                        <CardBody className="row column-gap-2 justify-content-center">
                            {/* 클릭된 재료 블룩 */}
                            {clickedIngredientBlocks}
                            <Card className="border-0 rounded-4 col-md-auto">
                                <CardBody onClick={goSearch}>가 들어간 메뉴를 검색</CardBody>
                            </Card>
                        </CardBody>
                    </Card>

                    {/* 검색에 추가할 재료 선택 */}
                    <Card className="row rounded-5 bg-light-subtle border-0 shadow-sm">
                        <CardBody className="overflow-auto row justify-content-center">
                            <div className="d-flex flex-nowrap column-gap-2">
                                {/* 재료 블록 */}
                                {ingredientBlocks}
                            </div>
                        </CardBody>
                    </Card>

                </Col>

            </Container>



        </Container>
    );
};

export default Search;