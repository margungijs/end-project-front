import {GetXSRFToken} from "../assets/GetXSRFToken.js";
import axios from "axios";

const SendData = async (data, api, loading) => {
    loading()
    await axios.get(
        'http://localhost/sanctum/csrf-cookie',
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