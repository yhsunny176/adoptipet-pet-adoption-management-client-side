
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import axios from "axios";

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();
    useEffect(() => {
        axiosSecure.interceptors.response.use(
            (res) => {
                return res;
            },
            async (error) => {
                console.log("Error caught from axios interceptor-->", error.response);
                if (error.response.status === 401 || error.response.status === 403) {
                    // logout
                    logOut();
                    // navigate to login
                    navigate("/auth/login");
                }
                return Promise.reject(error);
            }
        );
    }, [logOut, navigate]);
    return axiosSecure;
};

export default useAxiosSecure;