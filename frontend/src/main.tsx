import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import ErrorPage from "./pages/ErrorPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import ClientPage from "./pages/ClientPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import store, { persistor } from "./store/store.ts";
import {Provider} from 'react-redux'
import ClientOrderPage from "./pages/ClientOrderPage.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import axios from "axios";
import LoginPage from "./pages/LoginPage.tsx";
import { PersistGate } from 'redux-persist/integration/react'

axios.interceptors.request.use((request) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
}, (error) => {
    console.log(error);
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to='/login'/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/login",
        element: <LoginPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/app",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/app',
                element: < Navigate to='/app/home'/>
            },
            {
                path: '/app/home',
                element: <HomePage/>,
                errorElement: <ErrorPage/>
            }, {
                path: '/app/product',
                element: <ProductPage/>,
                errorElement: <ErrorPage/>
            }
            , {
                path: '/app/client',
                element: <ClientPage/>,
                errorElement: <ErrorPage/>
            }
            , {
                path: '/app/cart',
                element: <CartPage/>,
                errorElement: <ErrorPage/>
            }
            , {
                path: '/app/clientorder',
                element: <ClientOrderPage/>,
                errorElement: <ErrorPage/>
            }, {
                path: '/app/category',
                element: <CategoryPage/>,
                errorElement: <ErrorPage/>
            }
        ]
    },
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router}/>
            </PersistGate>
            </Provider>
    </StrictMode>,
)
