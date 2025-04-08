import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/typedHooks";
import { removeToken } from "./store/slices/jwtSlice";
import axios from "axios";
import { useEffect } from "react";
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";


function App() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    //request intercepting
    useAxiosInterceptor();

    function logOut() {
        dispatch(removeToken());
        navigate('/login')
    }

    return (
        <>
            <div className="">
                <nav className="navbar bg-dark border-bottom border-body navbar-expand-lg fs-4
           " data-bs-theme="dark">
                    <div className="container-fluid">
                        <div>
                            <img src="../public/WONLINESTORE.png"
                                style={{ width: '70px' }}></img>
                        </div>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={'/app/home'}>
                                        <i className="bi bi-house-door-fill text-white-50"></i> Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={'/app/product'}>Product</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={'/app/client'}>Client</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={'/app/category'}>Categories</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={'/app/clientorder'}>Orders</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center gap-5'>
                        <NavLink className='nav-link' to={'/app/cart'}>
                            <button className="btn btn-secondary">
                                <i className="bi bi-cart-fill"></i></button>
                        </NavLink>
                        <button className="btn btn-outline-danger d-inline-flex align-items-center gap-1"
                            onClick={() => logOut()}>Logout
                            <i className="bi bi-box-arrow-right" />
                        </button>
                    </div>
                </nav>
                <Outlet />
            </div>
        </>
    )
}

export default App
