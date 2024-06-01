import React from 'react';
import { Outlet } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
// import "react-bootstrap/dist/react-bootstrap.min"
import "./index.css";
import Header from "../components/Header"

export default function MainLayout() {
    return (
        <>
            <Header />
            <div className='main-layout'>
                <div className='main-inner'>
                    <Outlet />
                </div>
            </div>
        </>
    );
}
