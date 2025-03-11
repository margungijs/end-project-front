const getApiUrl = () => {
    if(window.location.hostname === "localhost"){
        return "http://localhost";
    }

    return process.env.REACT_APP_API_URL || "https://lucky-delight-production.up.railway.app";
}

export const API_URL = getApiUrl();