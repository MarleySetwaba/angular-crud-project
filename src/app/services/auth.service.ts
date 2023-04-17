import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthResponseData } from "../models/authResponseData.model";
import { User } from "../models/user.model";


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    timeoutInterval: any;
constructor(private http: HttpClient){}

login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBV0JHlxKYM0hqsVmRb48gYRG1vakXmsU0', {email, password, returnSecureToken: true})
}

//SIGN UP
signUp(email: string, password: string): Observable<AuthResponseData>{
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBV0JHlxKYM0hqsVmRb48gYRG1vakXmsU0', {email, password, returnSecureToken: true})
}

formatUser(data: AuthResponseData) {
const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000)
const user = new User(data.email, data.idToken, data.localId, expirationDate)
return user;
}

getErrorMessage(message: string) {
    switch(message){
        case 'EMAIL_NOT_FOUND':
            return 'Email Not Found';
            case 'INVALID_PASSWORD':
                return 'Invalid Password';
            case 'EMAIL_EXISTS':
                return 'Email Already Exists'
                default: 
                return 'Unknown Error Occured';
    }
}


getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if(userDataString){
        const userData = JSON.parse(userDataString)
        const expirationDate = new Date(userData.expirationDate)
        const user = new User(userData.email, userData.token, userData.localId, expirationDate)
        this.runTimeOutInterval(user);
        return user;
    }

    return null;
}

runTimeOutInterval(user: User){
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeoutInterval = setTimeout(() => {
        //Logout Functionality or get refresh token
    }, timeInterval)
}

setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeOutInterval(user)
}
}

