import {initialState} from "./useFormContext";

export const formReducer = (state, action) => {
    switch (action.type) {
        case 'edit':
            state.data = state.data.map(data => {
                if (data.id === action.data.id) {
                    return action.data;
                } else {
                    return data;
                }
            })
            state.selection = null
            return {
                ...state,
            }
        case 'add':
            const check2 = state.data.filter((data) => data.id === action.data.id)
            console.log('hahah', check2, action.data)
            if (check2 && check2.length > 0) {
                return state;
            }
            const check = state.data.filter((data) => data.email === action.data.email)
            console.log('hahah2', check, action.data)
            if (check && check.length > 0) {
                window.alert('email exist');
                return state;
            }
            state.data = [...state.data, action.data]
            state.selection = null
            return {
                ...state,
            }
        case 'delete':
            state.data = state.data.filter((data) => data.id !== action.id)
            state.selection = null
            return {
                ...state,
            }
        case 'updateForm':
            state.selection[action.field] = action.value;
            return {
                ...state,
            }
        case 'select':
            // state.selection = {
            //     ...state.data[action.id]
            // }
            state.selection = {...action.data}
            return {
                ...state,
                // selection: state[action.id]
            }
        case 'UPDATE_FIELD':
            return {
                ...state,
                [action.field]: action.value,
            };
        case 'sort':
            state.data.sort((a,b) => {
                return a[action.field].localeCompare(b[action.field])
            })
            return {
                ...state
            };
        case 'search':
            state.data = state.data.filter((data) => data[action.field].includes(action.value))
            return {
                ...state
            };
        case 'refresh':

            return {
                ...initialState
            };
        default:
            return state;
    }
};
