import {empty, noSymbol, emailCheck, lengthCheck, passwords, safePassword} from "../assets/Validations.jsx";

export const HandleInputChange = (e, setState, setError, type) => {
    const { name, value } = e.target;

    if(empty(value)){
        setError((prevState) => ({
            ...prevState,
            [name]: "Field cannot be empty."
        }))
    }else{
        setError((prevState) => ({
            ...prevState,
            [name]: ""
        }))
    }

    if(type === "register"){
        if(name === "name"){
            if(noSymbol(value)){
                setError((prevState) => ({
                    ...prevState,
                    [name]: "Invalid username"
                }))
            }else if(lengthCheck(value)){
                setError((prevState) => ({
                    ...prevState,
                    [name]: "Username too short"
                }))
            }else{
                setError((prevState) => ({
                    ...prevState,
                    [name]: ""
                }))
            }
        }

        if(name === "email"){
            if(emailCheck(value)){
                setError((prevState) => ({
                    ...prevState,
                    [name]: "Invalid email"
                }))
            }else{
                setError((prevState) => ({
                    ...prevState,
                    [name]: ""
                }))
            }
        }

        if(name === "password"){
            if(safePassword(value)){
                setError((prevState) => ({
                    ...prevState,
                    [name]: "Password must contain at least one upper, lower case letter, a number and a symbol"
                }))
            }
            else{
                setError((prevState) => ({
                    ...prevState,
                    [name]: ""
                }))
            }
        }
    }


    setState((prevState) => ({
        ...prevState,
        [name]: value,
    }));
}


