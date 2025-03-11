import axios from "axios";
import { API_URL } from "../config";

const SendData = async (data, api, loading) => {
    loading();

    await axios.get(`${API_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
    });

    const csrfToken = getCookie('XSRF-TOKEN');

    if (!csrfToken) {
        console.error('CSRF token not found');
    }

    await axios.post(
        api,
        { ...data },
        {
            headers: {
                accept: 'application/json',
                "X-XSRF-TOKEN": csrfToken,
            },
            withCredentials: true,
        }
    );
};

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export default SendData;
