// import {Card, Col} from "react-bootstrap";
// import React, {useEffect, useState} from "react";
// import axios from "axios";
//
// const SearchedMenuList = ({menus, handleOpen}) => {
//     const [dataList, setDataList] = useState([]);
//
//     useEffect(() => {
//         if (menus && menus.menuList) {
//             const fetchData = async () => {
//                 const menuList = menus.menuList;
//                 const queryParams = menuList.map(menu => `id=${menu.id}`).join('&');
//                 try {
//                     const response = await axios.get(`http://localhost:8080/api/menus?${queryParams}`);
//                     setDataList(convertJsonArrayToObjectArray(response.data));
//                 } catch (error) {
//                     console.error('no menus contain those ingredients error : ', error);
//                 }
//             };
//             fetchData();
//         }
//         else {
//             setDataList([]);
//         }
//
//     }, [menus]);
//
//
//     const convertJsonArrayToObjectArray = (menuDetails) => {
//         return menuDetails.map(item => {
//             return {
//                 id: item.id,
//                 name: item.name,
//                 price: item.price,
//                 imagePath: item.imagePath
//             };
//         });
//     }
//
//     const renderMenus = (dataList) => {
//         if(dataList) {
//             return (
//                 <>
//                     {dataList.map((data) => {
//                         return (
//                             <Col md={3} key={data.id} style={{margin: '5px 0'}}>
//                                 <Card className="rounded-4 shadow-sm border-0" onClick={() => handleOpen(data)}>
//                                     <Card.Img variant="top" src={data.imagePath}/>
//                                     <Card.Body>
//                                         <Card.Title>{data.name}</Card.Title>
//                                         <Card.Text>
//                                             <span style={{color: 'red'}}>{data.price}￦</span>
//                                         </Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>)
//                     })}
//                 </>
//             );
//         }
//         else {
//             return null;
//         }
//     }
//
//
//
//     return (
//         renderMenus(dataList)
//     );
//
// }
//
// export default SearchedMenuList;


import { Card, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchedMenuList = ({ menus, handleOpen }) => {
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        if (menus && menus.menuList) {
            const fetchData = async () => {
                const menuList = menus.menuList;
                const queryParams = menuList.map(menu => `id=${menu.id}`).join('&');
                try {
                    const response = await axios.get(`http://localhost:8080/api/menus?${queryParams}`);
                    setDataList(convertJsonArrayToObjectArray(response.data));
                } catch (error) {
                    console.error('No menus contain those ingredients error: ', error);
                }
            };
            fetchData();
        } else {
            setDataList([]);
        }
    }, [menus]);

    const convertJsonArrayToObjectArray = (menuDetails) => {
        return menuDetails.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            imagePath: item.imagePath
        }));
    };

    const renderMenus = (dataList) => {
        if (dataList) {
            return (
                <>
                    {dataList.map((data) => (
                        <Col md={3} key={data.id} style={{ margin: '5px 0' }}>
                            <Card className="rounded-4 shadow-sm border-0" onClick={() => handleOpen(data)}>
                                <Card.Img variant="top" src={data.imagePath} />
                                <Card.Body>
                                    <Card.Title>{data.name}</Card.Title>
                                    <Card.Text>
                                        <span style={{ color: 'red' }}>{data.price}￦</span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </>
            );
        }
        return null;
    };

    return renderMenus(dataList);
};

export default SearchedMenuList;
