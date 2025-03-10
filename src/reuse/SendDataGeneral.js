import axios from "axios";

const sendDataGeneral = async (data, api, loading) => {
    try {
        const response = await axios.post(api, data, {
            headers: {
                'Accept': 'application/json',
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export default sendDataGeneral;