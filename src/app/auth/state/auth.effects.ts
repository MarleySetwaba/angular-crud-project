import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { Store } from "@ngrx/store";

import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/shared/shared.actions";
import { auto_login, auto_logout, loginStart, loginSuccess, startSignup, successSignup } from "./auth.actions";


@Injectable()
export class AuthEffects{

    constructor(
        private actions$: Actions, 
        private authService: AuthService, 
        private store: Store<AppState>,
        private router: Router){}

    login$ = createEffect((): any => {
        return this.actions$.pipe(ofType(loginStart), 
        exhaustMap((action) => {
     return this.authService
     .login(action.email, action.password)
     .pipe(map((data) => {

        this.store.dispatch(setLoadingSpinner({status: false}))
        const user = this.authService.formatUser(data)
        this.authService.setUserInLocalStorage(user);
        return loginSuccess({ user });
     }),
     catchError((errResp) => {
        console.log(errResp.error.error.message);
        const errorMessage = this.authService.getErrorMessage(errResp.error.error.message);
         return of(setErrorMessage({message: errorMessage}));
     })
     )
        }))
    })

    loginRedirected$ = createEffect(
        () => {
        return this.actions$.pipe(
            ofType(loginSuccess), 
            tap((action) => {
            this.router.navigate(['/'])
        })
        )
    }, {dispatch: false})

    signUpRedirected$ = createEffect(
        () => {
        return this.actions$.pipe(
            ofType(successSignup), 
            tap((action) => {
                this.store.dispatch(setErrorMessage({ message: ''}))
            this.router.navigate(['/'])
        })
        )
    }, {dispatch: false})


    signUp$ = createEffect((): any => {
      return this.actions$.pipe(ofType(startSignup),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false}));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return successSignup({user});
        }),catchError((errMessage) => {
            this.store.dispatch(setLoadingSpinner({status: false}))
            console.log(errMessage.error.error.message);
            const errorMessage = this.authService.getErrorMessage(errMessage.error.error.message);
         return of(setErrorMessage({message: errorMessage}));
        })
        );
      })

    )})


    autoLogin$ = createEffect((): any => {
      return this.actions$.pipe(ofType(auto_login), 
      mergeMap((action) => {  
        const user = this.authService.getUserFromLocalStorage();
        return of(loginSuccess({ user }))
      } ))
})

logout$ = createEffect(() => {
    return this.actions$.pipe(ofType(auto_logout), map((action) => {
        this.authService.logout();
        this.router.navigate(['auth']);
    }))
}, {dispatch: false})
}
