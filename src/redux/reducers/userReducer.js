const initialState = {
    user: {},
    isAuthenticated: false,
    loader: false,
    transactions: [],
    categories: [],
}



const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOADER":
            return {
                ...state,
                loader: action.payload
            }
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loader: false,
            }
        case "SET_TRANSACTION":
            return {
                ...state,
                transactions: [...state.transactions, action.payload],
                loader: false
            }
        case "SET_TRANSACTIONS":
            return {
                ...state,
                transactions: action.payload,
                loader: false
            }
        case "SET_CATEGORIES":
            return {
                ...state,
                categories: action.payload,
                loader: false,
            }
        case "SET_CATEGORY":
            return {
                ...state,
                categories: [...state.categories, action.payload],
                loader: false,
            }
        case "DELETE_TRANSACTION":
            return {
                ...state,
                transactions: state.transactions.filter(obj => {
                    return obj._id !== action.payload._id
                }),
                loader: false
            }
        default:
            return state
    }
}

export default userReducer