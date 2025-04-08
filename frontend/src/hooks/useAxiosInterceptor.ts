import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../store/slices/jwtSlice';
import { useAppDispatch, useAppSelector } from './typedHooks';


const useAxiosInterceptor = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.jwttoken.jwttoken);
    const navigate = useNavigate();

    useEffect(() => {
        //  request interceptor for Authorization 
        const requestInterceptor = axios.interceptors.request.use(
            (request) => {
                if (token) {
                    request.headers.Authorization = `Bearer ${token}`;
                }
                return request;
            },
            (error) => {
                console.log(error);
                return Promise.reject(error);
            }
        );

        //  response interceptor for token expiration
        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    dispatch(removeToken());
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        //cleanup
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [token, dispatch, navigate]);
};

export default useAxiosInterceptor;
