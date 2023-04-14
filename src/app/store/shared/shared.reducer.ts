import { createReducer, on } from "@ngrx/store";
import { setErrorMessage, setLoadingSpinner } from "./shared.actions";
import { initialState } from "./shared.state";


export const sharedReducer = createReducer(initialState, 
    on(setLoadingSpinner, (state, action) => {
        return {
            ...state,
            showLoading: action.status
        }
    }), on(setErrorMessage, (state, action) => {
        return {
            ...state,
            errorMessage: action.message
    }})
    )