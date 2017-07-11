import { State } from './../State/main-state';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgRedux } from "@angular-redux/store/lib/src";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private ngRedux: NgRedux<State>, private store: Store<State>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("route.url");
        console.log(route.url);
        console.log(state.url);

        if (!this.ngRedux.getState().isLogged) {
            if (state.url != '/login' && state.url != '') {
                this.router.navigateByUrl('/login');
            }
        }
        else {
            if (state.url === '/login' || state.url === '' || state.url === '/') {
                this.router.navigateByUrl('/welcome');
            }
        }

        // this.ngRedux.subscribe(() => {

        // });
        return true;
    }
}
