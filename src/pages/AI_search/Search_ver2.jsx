// import React, {useEffect, useState} from 'react';
// import axios from "axios";
// import {CardBody, Col, Container, Row} from "react-bootstrap";
// import SearchedMenuList from "./components/SearchedMenuList";
//
// const SearchV2 = ({handleOpen}) => {
//     const [ingredients, setIngredients] = useState(['주스', '커피', '우유', '차', '당도', '과일', '초콜릿']);
//     const [ingredientBlocks, setIngredientBlocks] = useState(ingredients);
//     const [clickedIngredients, setClickedIngredients] = useState([]);
//     const [isEmpty, setIsEmpty] = useState(true);
//     const [menus, setMenus] = useState();
//     const [visibilityToggle, setVisibilityToggle ] = useState(true);
//
//     useEffect(() => {
//         clickedIngredients.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
//     }, [clickedIngredients]);
//
//     const toggleIngredient = (ingredient) => {
//         // 클릭된 재료 목록에 이미 포함되어 있는지 확인
//         const isClicked = clickedIngredients.includes(ingredient);
//         if (isClicked) {
//             setClickedIngredients(prevClickedIngredients => prevClickedIngredients.filter(item => item !== ingredient));
//         } else {
//             setClickedIngredients(prevClickedIngredients => [...prevClickedIngredients, ingredient]);
//         }
//     };
//
//     useEffect(() => {
//         const updatedBlocks = ingredients.map((ingredient) => {
//             // 클릭된 재료인지 확인
//             const isClicked = clickedIngredients.includes(ingredient);
//             // 클릭된 재료인 경우 border 추가, 아닌 경우 border 없음
//             const blockBorder = isClicked ? "card rounded-4 col-md-auto border-3" : "card border-0 rounded-4 col-md-auto";
//             return (
//                 <div className={blockBorder} onClick={() => toggleIngredient(ingredient)}>
//                     <div className="card-body"><h2>{ingredient}</h2></div>
//                 </div>
//             );
//         });
//         setIngredientBlocks(updatedBlocks);
//     }, [ingredients, clickedIngredients]);
//
//
//     const goSearch = () => {
//         if(!isEmpty) {
//             const data = {
//                 "ingredients": clickedIngredients
//             }
//             axios.post('http://localhost:8000/fast/api/search', data)
//                 .then(response => {
//                     console.log('recommendation menus are successfully arrived! : ', response.data);
//                     visibilityHandler();
//                     setMenus(response.data);
//
//
//                 })
//                 .catch(error => {
//                     console.log(error);
//                 })
//         }
//     }
//
//     const reset = () => {
//         setClickedIngredients([]);
//         setMenus([]);
//         visibilityHandler();
//     }
//
//     const visibilityHandler = () => {
//         setVisibilityToggle(!visibilityToggle);
//     }
//
//     return (
//         <Container id="search">
//
//             <Col className="text-center">
//
//                 {visibilityToggle &&
//                     <Row>
//                         {/* 검색에 추가할 재료 선택 */}
//                         <Row className="card rounded-5 rounded-bottom-0 bg-light border-0 shadow-sm">
//                             <CardBody className="overflow-auto row justify-content-center">
//                                 <div className="d-flex flex-nowrap column-gap-3">
//                                     {/* 재료 블록 */}
//                                     {ingredientBlocks}
//                                 </div>
//                             </CardBody>
//                         </Row>
//
//                         <Row className="card rounded-5 rounded-top-0 bg-info-subtle border-0 shadow-sm" onClick={goSearch}>
//                             <CardBody className="overflow-auto row justify-content-center">
//                                 <h3>선택한 재료가 포함되는 모든 메뉴 검색</h3>
//                             </CardBody>
//                         </Row>
//
//                     </Row>
//                 }
//
//
//                 {!visibilityToggle &&
//                     <Row>
//                         <button className="btn btn-info rounded-4" type="button" onClick={reset}><h3>다시 검색</h3></button>
//                         <SearchedMenuList menus={menus} handleOpen={handleOpen}/>
//                     </Row>
//                 }
//
//
//             </Col>
//
//         </Container>
//     );
// };
//
// export default SearchV2;


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

    return (
        <Container id="search">
            <Col className="text-center">
                {visibilityToggle && (
                    <Row>
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
