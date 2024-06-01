import React from 'react';
import './header.css';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/");
    }
    return (
        <div className='layout-header'>
            <nav className="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
                <div className="navbar-brand" onClick={handleBack}>
                    <span className="header-text" >ABC 카페 키오스크</span>
                </div>
            </nav>
        </div>
    );
};

export default Header;