export const CATEGORIES_INITIAL_STATE = {
    Categories : {}
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
    const {type , payload} = action;

    switch (type) {
        case 'SET_CATEGORIES_MAP':
            return {...state, Categories: payload}    
        default:
            return state;
    }
}

