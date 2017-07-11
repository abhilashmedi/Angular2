import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../Users/user.service';
import { User } from './../model/user.interface';
import { Http, Headers } from '@angular/http';
import { SIGNUP, LOGIN, VIEWUSER } from './../State/main-action-creator';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from "../State/main-state";
import { select } from '@angular-redux/store';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
})

export class LoginComponent {
    users: Array<User>;
    loginForm: FormGroup;
    signupForm: FormGroup;
    emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
    passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    isLogged: Boolean = false;
    userEmail: String = '';
    userName: String = '';
    noEmail: Boolean = false;
    noPassword: Boolean = false;
    failedLogin: Boolean = false;
    emailValidation: Boolean = false;
    noFirstName: Boolean = false;
    noLastName: Boolean = false;
    noSignUpEmail: Boolean = false;
    invalidSignUpEmail: Boolean = false;
    noSignUpPassword: Boolean = false;
    noSignUpReTypepassword: Boolean = false;
    invalidSignUpPassword: Boolean = false;
    invalidSignUpReTypePassword: Boolean = false;
    passwordsNotMatch: Boolean = false;
    userExists: Boolean = false;
    headers: Headers;
    http: Http;
    constructor(private router: Router, private fb: FormBuilder, private store: Store<State>, http: Http, private userService: UserService, private ngRedux: NgRedux<State>) {

        // var currentUser = JSON.parse(localStorage.getItem('currentUser'));

        this.userService.getUsers().then(user => this.ngRedux.dispatch({ type: VIEWUSER, payload: { users: user.json().people } }));
        this.router = router;
        // store.select('mainStore')
        //     .subscribe((data: State) => {
        //         this.isLogged = data.isLogged;
        //         this.userEmail = data.userEmail;
        //         this.userName = data.userName;
        //     });

        this.http = http;
        ngRedux.subscribe(() => {
            this.isLogged = ngRedux.getState().isLogged;
            this.userEmail = ngRedux.getState().userEmail;
        });
    }
    ngOnInit() {
        this.loginForm = this.fb.group({
            password: [''],
            // password: ['', [Validators.required, Validators.minLength(3)]],
            email: new FormControl({ value: null }, Validators.compose([
                Validators.required,
                Validators.pattern(this.emailRegex)]))
        });
        this.signupForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: new FormControl({ value: null }, Validators.compose([
                Validators.required,
                Validators.pattern(this.emailRegex)])),
            password: new FormControl({ value: null }, Validators.compose([
                Validators.required, Validators.pattern(this.passwordRegex)])),
            retypepassword: new FormControl({ value: null }, Validators.compose([
                Validators.required, Validators.pattern(this.passwordRegex)]))
        });
    }
    login(loginForm: NgForm) {

        // this.ngRedux.dispatch({ type: LOGIN, payload: { email: this.userEmail, userName: this.userName, admin: true } });

        this.noEmail = this.loginForm.controls['email'].value == '';
        this.emailValidation = !this.noEmail && !this.loginForm.controls['email'].valid;
        this.noPassword = !this.noEmail && !this.emailValidation && this.loginForm.controls['password'].value == '';
        this.failedLogin = !this.noEmail && !this.emailValidation && !this.noPassword && this.loginForm.controls['password'].value == '';
        if (loginForm.valid) {
            this.emailValidation = false;
            this.noPassword = false;
            this.noEmail = false;
            this.failedLogin = false;
            var observable = this.http.get('http://localhost:3000/posts');
            observable.forEach(p => {
                this.users = p.json();
                this.users.map(x => {
                    if (loginForm.controls['email'].value === x.emailAddress && loginForm.controls['password'].value === x.password) {
                        this.isLogged = true;
                        this.userEmail = x.emailAddress;
                        this.userName = x.name;
                        this.failedLogin = false;
                        // this.store.dispatch({ type: LOGIN, payload: { email: this.userEmail, userName: this.userName, admin: x.admin } });
                        this.ngRedux.dispatch({ type: LOGIN, payload: { email: this.userEmail, userName: this.userName, admin: true } });
                        // setTimeout(() => {
                        this.router.navigateByUrl('welcome');
                        // }, 100);
                    }
                })
                observable.toPromise().then(() => {
                    this.failedLogin = true;
                    this.loginForm.controls['password'].reset();
                    // setTimeout(() => {
                    //     this.failedLogin = true;
                    //     this.loginForm.controls['password'].reset();
                    // }, 15)
                })
            });
        }
    }
    signUp(signupForm: NgForm) {
        // this.noSignUpEmail = !this.noFirstName && this.signupForm.controls['lastName'].value != '' && this.signupForm.controls['email'].value == '';
        this.noFirstName = this.signupForm.controls['firstName'].value == '';
        this.noLastName = !this.noFirstName && this.signupForm.controls['lastName'].value == '';
        this.noSignUpEmail = !this.noFirstName && !this.noLastName && this.signupForm.controls['email'].value == '';
        this.invalidSignUpEmail = !this.noFirstName && !this.noLastName && !this.noSignUpEmail && !this.signupForm.controls['email'].valid;
        this.noSignUpPassword = !this.noFirstName && !this.noLastName && !this.noSignUpEmail && !this.invalidSignUpEmail && (this.signupForm.controls['password'].value == null || this.signupForm.controls['password'].value == '');
        this.invalidSignUpPassword = !this.noFirstName && !this.noLastName && !this.noSignUpEmail && !this.invalidSignUpEmail && !this.noSignUpPassword && !this.signupForm.controls['password'].valid;
        this.noSignUpReTypepassword = !this.noFirstName && !this.noLastName && !this.noSignUpEmail && !this.invalidSignUpEmail && !this.noSignUpPassword && !this.invalidSignUpPassword && (this.signupForm.controls['retypepassword'].value == null || this.signupForm.controls['retypepassword'].value == '');
        this.invalidSignUpReTypePassword = !this.noFirstName && !this.noLastName && !this.noSignUpEmail && !this.invalidSignUpEmail && !this.noSignUpPassword && !this.invalidSignUpPassword && !this.noSignUpReTypepassword && !this.signupForm.controls['retypepassword'].valid;
        this.passwordsNotMatch = !this.noFirstName && !this.noLastName && !this.noSignUpEmail && !this.invalidSignUpEmail && !this.noSignUpPassword && !this.invalidSignUpPassword && !this.noSignUpReTypepassword && !this.invalidSignUpReTypePassword && this.signupForm.controls['password'].value != this.signupForm.controls['retypepassword'].value;


        // this.noFirstName = this.signupForm.controls['firstName'].value == '';
        // this.noLastName = !this.noFirstName && this.signupForm.controls['lastName'].value == '';
        // this.noSignUpEmail = (this.noFirstName || this.signupForm.controls['lastName'].value != '') && this.signupForm.controls['email'].value == '';
        // this.invalidSignUpEmail = !this.noSignUpEmail && !this.signupForm.controls['email'].valid;
        // this.noSignUpPassword = !this.invalidSignUpEmail && this.signupForm.controls['password'].value == '';
        // this.invalidSignUpPassword = !this.noSignUpPassword && !this.signupForm.controls['password'].valid;
        // this.noSignUpReTypepassword = !this.invalidSignUpPassword && this.signupForm.controls['retypepassword'].value == '';
        // this.invalidSignUpReTypePassword = !this.noSignUpReTypepassword && !this.signupForm.controls['retypepassword'].valid;
        // this.passwordsNotMatch = !this.invalidSignUpReTypePassword && this.signupForm.controls['password'].value != this.signupForm.controls['retypepassword'].value;

        if (signupForm.valid && !this.passwordsNotMatch) {
            this.headers = new Headers({
                'Content-Type': 'application/json'
            });

            // this.http.delete('http://localhost:3000/posts/4').subscribe(p => console.log(p));
            this.userExists = false;
            this.http.get('http://localhost:3000/posts').forEach(p => {
                this.users = p.json();
                this.users.map(x => {
                    if (signupForm.controls['email'].value === x.emailAddress) {
                        this.userExists = true;
                    }
                })
                if (!this.userExists) {
                    this.userExists = true;
                    this.http.post('http://localhost:3000/posts', {
                        name: signupForm.controls['firstName'].value + ' ' + signupForm.controls['lastName'].value,
                        emailAddress: signupForm.controls['email'].value,
                        password: signupForm.controls['password'].value,
                        age: 10,
                        admin: false
                    },
                        {
                            headers: new Headers({
                                'Content-Type': 'application/json'
                            })
                        }).subscribe(p => p)
                    //this.store.dispatch({ type: SIGNUP, payload: { email: signupForm.controls['email'].value, userName: signupForm.controls['firstName'].value + ' ' + signupForm.controls['lastName'].value, admin: false } });
                    this.ngRedux.dispatch({ type: SIGNUP, payload: { email: signupForm.controls['email'].value, userName: signupForm.controls['firstName'].value + ' ' + signupForm.controls['lastName'].value, admin: false } });
                    this.router.navigateByUrl('welcome');
                }
            });
        } else {
            this.signupForm.controls['password'].reset();
            this.signupForm.controls['retypepassword'].reset()
        }
    }

}
