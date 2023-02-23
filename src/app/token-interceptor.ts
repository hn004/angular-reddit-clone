import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from './auth/shared/auth.service';
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { LoginResponse } from './auth/login/login-response.payload';
@Injectable({
    providedIn: 'root'
})
export class TokenInteceptor implements HttpInterceptor {


    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);
    isTokenRefreshing = false;

    constructor(public authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        const jwtToken = this.authService.getJwtToken();

        if (jwtToken) {
            this.addToken(req, jwtToken)
        }
        return next.handle(req).pipe(catchError(error=>{
            if(error instanceof HttpErrorResponse && error.status===403){
                return this.handleAuthError(req,next);
            }else{
                return throwError(error);
            }
        }))
    }
    handleAuthError(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((refreshTokenResponse: LoginResponse) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject
                        .next(refreshTokenResponse.authenticationToken);
                    return next.handle(this.addToken(req,
                        refreshTokenResponse.authenticationToken));
                })
            )
        } else {
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap((res) => {
                    return next.handle(this.addToken(req,
                        this.authService.getJwtToken()))
                })
            );
        }
    }

    addToken(req: HttpRequest<any>, jwtToken: any) {
        return req.clone({
            headers: req.headers.set('Authorization', 'Bearer' + jwtToken)
        })
    }
}

