import axios from "axios";

const sendDataGeneral = async (data, api, loading) => {
    await axios.post(
        api,
        {...data},
        {
            header:{
                accept: 'application/json',
            },
        }
    )
}

export default sendDataGeneral;