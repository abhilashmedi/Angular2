import { Router } from '@angular/router';
import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from "../State/main-state";
import { LOGIN } from './../State/main-action-creator';
import { NgRedux } from "@angular-redux/store/lib/src";
declare const gapi: any;

@Component({
    selector: 'google-signin',
    template: '<button id="googleBtn">Google Sign-In</button>'
})
export class GoogleSigninComponent implements AfterViewInit {

    private clientId: string = '154521921586-2fl55sjdbuupk73lhtqv0ak17u5ub3t8.apps.googleusercontent.com';
    private scope = [
        'profile',
        'email',
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/contacts.readonly',
        'https://www.googleapis.com/auth/admin.directory.user.readonly'
    ].join(' ');
    public auth2: any;
    constructor(private element: ElementRef, private ngRedux: NgRedux<State>, private store: Store<State>, private router: Router) {
        console.log('Router: ' + router == null);
        //this.googleInit();
    }
    public googleInit() {
        let that = this;
        gapi.load('auth2', function () {
            that.auth2 = gapi.auth2.init({
                client_id: that.clientId,
                cookiepolicy: 'single_host_origin',
                scope: that.scope,
                //ux_mode: 'redirect'
            });
            that.attachSignin(that.element.nativeElement.firstChild);
            //that.element.nativeElement.firstChild.click();
        });
    }

    public attachSignin(element) {
        let that = this;
        this.auth2.attachClickHandler(element, {},
            function (googleUser) {

                let profile = googleUser.getBasicProfile();
                console.log('Token || ' + googleUser.getAuthResponse().id_token);
                console.log('ID: ' + profile.getId());
                console.log('Name: ' + profile.getName());
                console.log('Image URL: ' + profile.getImageUrl());
                console.log('Email: ' + profile.getEmail());
                that.ngRedux.dispatch({ type: LOGIN, payload: { email: profile.getEmail(), userName: profile.getEmail(), admin: true } });

                setTimeout(() => {
                    that.router.navigateByUrl('welcome');
                }, 300);

            }, function (error) {
                console.log(JSON.stringify(error, undefined, 2));
            });
    }



    ngAfterViewInit() {
        this.googleInit();
    }
}
