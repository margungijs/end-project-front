const getApiUrl = () => {
    if(window.location.hostname === "localhost"){
        return "http://localhost";
    }

    return process.env.REACT_APP_API_URL || "https://chronicleapi.kantans.com";
}

export const API_URL = getApiUrl();