import axios from "axios";
import { API_URL } from "../config";

const SendData = async (data, api, loading) => {
    loading()

    await axios.get(
        `${API_URL}/sanctum/csrf-cookie`,
        {
            withCredentials: true
        }
    );

    await axios.post(
        api,
        {...data},
        {
            header:{
                accept: 'application/json',
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
            },
            withCredentials: true
        }
    )

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
};

export default SendData;