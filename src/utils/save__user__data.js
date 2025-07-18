import axios from "axios";

export const saveUserDatabase = async (user) => {
    await axios.post(`${import.meta.env.VITE_API_URL}/user`, user);
};
