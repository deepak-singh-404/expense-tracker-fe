import axios from 'axios'
import setAuthToken from '../helper/setAuthToken'
import jwt_decode from 'jwt-decode'


// const urlHelper = "http://localhost:3000/api/v1/user"

const urlHelper = "https://expense-tracker-service.herokuapp.com/api/v1/user"

export const userLoginHelper = (data) => {
    return {
        type: "SET_USER",
        payload: data
    }
}

const userLogoutHelper = (data) => {
    return {
        type: "DELETE_USER",
        payload: data
    }
}

const setLoader = (data) => {
    return {
        type: "SET_LOADER",
        payload: data
    }
}



export const userRegister = (_data, history) => {
    return async (dispatch) => {
        try {
            dispatch(setLoader(true))
            const { data } = await axios({
                method: "post",
                url: `${urlHelper}/register`,
                data: _data
            })
            dispatch(setLoader(false))
            if (data.success) {
                const { token } = data
                localStorage.setItem('userToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(userLoginHelper(decoded))
                history.push('/home')
            }
            else{
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(setLoader(false))
            console.log("Error in userRegister", err)
        }
    }
}

export const userLogin = (_data, history) => {
    return async (dispatch) => {
        try {
            dispatch(setLoader(true))
            const { data } = await axios({
                method: "post",
                url: `${urlHelper}/login`,
                data: _data
            })
            dispatch(setLoader(false))
            if (data.success) {
                const { token } = data
                localStorage.setItem('userToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(userLoginHelper(decoded))
                history.push('/home')
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(setLoader(false))
            console.log("Error in userLogin", err)
        }
    }
}

export const addTransaction = (_data,history) => {
    return async (dispatch) => {
        try {
            dispatch(setLoader(true))
            const { data } = await axios({
                method: "post",
                url: `${urlHelper}/transaction`,
                data: _data
            })
            dispatch(setLoader(false))
            if (data.success) {
                dispatch({
                    type: "SET_TRANSACTION",
                    payload: data.data
                })
                history.push('/home')
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(setLoader(false))
            console.log("Error in addTransaction", err)
        }
    }
}

export const getAllTransactions = (query) => {
    return async (dispatch) => {
        try {
            dispatch(setLoader(true))
            const { data } = await axios({
                method: "get",
                url: `${urlHelper}/transaction?month=${query}`,
            })
            dispatch(setLoader(false))
            if (data.success) {
                dispatch({
                    type: "SET_TRANSACTIONS",
                    payload: data.data
                })
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(setLoader(false))
            console.log("Error in getAllTransactions", err)
        }
    }
}

export const getAllCategories = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoader(true))
            const { data } = await axios({
                method: "get",
                url: `${urlHelper}/transaction/category`,
            })
            dispatch(setLoader(false))
            if (data.success) {
                if (data.data.length > 0){
                    dispatch({
                        type: "SET_CATEGORIES",
                        payload: data.data
                    })
                }
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(setLoader(false))
            console.log("Error in getAllTransactionDescriptions", err)
        }
    }
}

export const addCategory = (_data)=>{
    return async(dispatch)=>{
        try{
            dispatch(setLoader(true))
            const { data } = await axios({
                method: "post",
                url: `${urlHelper}/transaction/category`,
                data: _data
            })
            dispatch(setLoader(false))
            if (data.success) {
                dispatch({
                    type: "SET_CATEGORY",
                    payload: data.data
                })
            }
            else {
                alert(data.message)
            }

        }
        catch(err){
            dispatch(setLoader(false))
            console.log("Error in addCategory", err)
        }
    }
}

export const deleteTransaction = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoader(true))
            const { data } = await axios({
                method: "delete",
                url: `${urlHelper}/transactiondescription/${id}`,
            })
            dispatch(setLoader(false))
            if (data.success) {
                dispatch({
                    type: "DELETE_TRANSACTION",
                    payload: data.data
                })
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(setLoader(false))
            console.log("Error in deleteTransaction", err)
        }
    }
}

export const userLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('userToken');
        setAuthToken(false);
        dispatch(userLogoutHelper({}));
        dispatch(setLoader(false))
    }
}