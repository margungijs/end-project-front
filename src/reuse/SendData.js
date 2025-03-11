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
            },
            withCredentials: true
        }
    )
};

export default SendData;