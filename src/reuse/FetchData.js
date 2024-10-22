import axios from "axios";

const FetchData = async (api) => {
    try {
        const response = await axios.get(api,
            {
                header:{
                    accept: 'application/json',
                },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching the data', error);
    }
}

export default FetchData;