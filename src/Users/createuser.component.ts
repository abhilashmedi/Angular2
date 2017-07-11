import { CREATEUSER } from './../State/main-action-creator';
import { SortPipe } from './../Pipes/sort.pipe';
import { User } from './../model/user.interface';
import { Http, Response, Headers } from '@angular/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from "../State/main-state";
import { LOGIN } from "../State/main-action-creator";
import { NgRedux } from "@angular-redux/store/lib/src";


@Component({
    selector: 'createuser',
    templateUrl: 'createuser.component.html',
})

export class CreateUserComponent {

    createUserForm: FormGroup;
    emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
    emailValidation: Boolean = false;
    noEmail: Boolean = false;
    noFirstName: Boolean = false;
    firstNameLength: Boolean = false;
    noLastName: Boolean = false;
    lastNameLength: Boolean = false;
    noAge: Boolean = false;
    invalidAge: Boolean = false;

    constructor(private ngRedux: NgRedux<State>, private fb: FormBuilder, private store: Store<State>, private router: Router) {
    }

    ngOnInit() {
        this.createUserForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.minLength(3)]],
            email: new FormControl({ value: null }, Validators.compose([
                Validators.required,
                Validators.pattern(this.emailRegex)])),
            age: ['', [Validators.required]]
        });
    }

    create() {
        this.noFirstName = this.createUserForm.controls['firstName'].value == '';
        this.firstNameLength = !this.noFirstName && !this.createUserForm.controls['firstName'].valid;
        this.noLastName = !this.firstNameLength && !this.noFirstName && this.createUserForm.controls['lastName'].value == '';
        this.lastNameLength = !this.noLastName && !this.firstNameLength && !this.noFirstName && !this.createUserForm.controls['lastName'].valid;
        this.noEmail = !this.firstNameLength && !this.lastNameLength && !this.noFirstName && !this.noLastName && this.createUserForm.controls['email'].value == '';
        this.emailValidation = !this.firstNameLength && !this.lastNameLength && !this.noFirstName && !this.noLastName && !this.noEmail && !this.createUserForm.controls['email'].valid;
        this.noAge = !this.firstNameLength && !this.lastNameLength && !this.emailValidation && !this.noFirstName && !this.noLastName && !this.noEmail && this.createUserForm.controls['age'].value == ''
        this.invalidAge = !this.firstNameLength && !this.lastNameLength && !this.emailValidation && !this.noFirstName && !this.noLastName && !this.noEmail && !this.noAge && this.createUserForm.controls['age'].value <= 0;

        if (this.createUserForm.valid && !this.invalidAge) {
            this.ngRedux.dispatch({
                type: CREATEUSER,
                payload: {
                    name: this.createUserForm.controls['firstName'].value + ' ' + this.createUserForm.controls['lastName'].value,
                    emailAddress: this.createUserForm.controls['email'].value,
                    age: this.createUserForm.controls['age'].value,
                }
            });
            this.router.navigateByUrl('/users');
        }
        return false;
    }
}




// import { Component, NgZone } from '@angular/core';

// declare var gapi: any;

// @Component({
//     selector: 'login',
//     template: '{{googleLoginButtonId}}',
// })
// export class CreateUserComponent {
//     googleLoginButtonId = "google-login - button";
//     constructor(private _zone: NgZone) {

//     }
//     ngAfterViewInit() {
//         // Converts the Google login button stub to an actual button.
//         gapi.signin2.render(this.googleLoginButtonId, {
//             'onsuccess': this.onLoginInSuccess, 'onfailure': this.onLoginFailure, 'scope': 'profile', 'theme': 'light', 'width': 240, 'height': 50,
//         });
//     }
//     private onLoginInSuccess = (loggedInUser: any) => {
//         this._zone.run(() => {
//             var email = loggedInUser.getBasicProfile().getEmail();
//             var auth_token = loggedInUser.getAuthResponse().id_token;
//             // Use a service to store authenticate with backend // Store token in local storage for authentication 
//         });
//     }
//     private onLoginFailure = (error: any) => { console.log(error); }
// }

