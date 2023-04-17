import { createReducer, on } from "@ngrx/store";
import { auto_logout, loginSuccess } from "./auth.actions";
import { initialState } from "./auth.state";

export const authReducer = createReducer(initialState,
    on(loginSuccess, (state, action) => {
        return {
            ...state,
         user: action.user
        }
    }), 
    on(auto_logout, (state, action) => {
        return {
            ...state,
            user: null
        }
    })
    )