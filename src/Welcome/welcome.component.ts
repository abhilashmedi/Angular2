import { VIEWUSER } from './../State/main-action-creator';
import { State } from './../State/main-state';
import { Store } from '@ngrx/store'
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { NgRedux } from "@angular-redux/store/lib/src";

@Component({
    selector: 'welcome',
    templateUrl: 'welcome.component.html',
})

export class WelcomeComponent {

    isLogged: Boolean = false;
    userEmail: String = '';

    constructor(private store: Store<State>, private ngRedux: NgRedux<State>, ) {

        localStorage.setItem('currentUser', JSON.stringify({ token: 'as123d', name: 'n123ame' }));
        // store.select('mainStore')
        //     .subscribe((data: State) => {
        //         this.isLogged = data.isLogged;
        //         this.userEmail = data.userEmail;
        //     });
    }
    getUsers() {
        this.ngRedux.dispatch({ type: VIEWUSER, payload: {} });
    }
}
