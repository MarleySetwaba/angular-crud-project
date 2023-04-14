import { createReducer, on } from "@ngrx/store";
import { loginSuccess } from "./auth.actions";
import { initialState } from "./auth.state";

export const authReducer = createReducer(initialState,
    on(loginSuccess, (state, action) => {
        return {
            ...state,
         user: action.user
        }
    })
    )