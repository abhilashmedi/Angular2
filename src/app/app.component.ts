import { UserService } from './../Users/user.service';
import { LOGOUT, VIEWUSER } from './../State/main-action-creator';
import { State } from './../State/main-state';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { NgRedux } from "@angular-redux/store/lib/src";

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
})

export class AppComponent {
  form: FormGroup;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
  data = '';
  isLogged: Boolean = false;
  userEmail: String = '';
  userName: String = '';
  isAdmin: Boolean = false;

  constructor(private fb: FormBuilder, private ngRedux: NgRedux<State>, private store: Store<State>, private router: Router, private userService: UserService) {
    this.router = router;

    this.isLogged = ngRedux.getState().isLogged;
    this.userEmail = ngRedux.getState().userEmail;
    this.userName = ngRedux.getState().userName;
    this.isAdmin = ngRedux.getState().admin;
    ngRedux.subscribe(() => {
      this.isLogged = ngRedux.getState().isLogged;
      this.userEmail = ngRedux.getState().userEmail;
      this.userName = ngRedux.getState().userName;
      this.isAdmin = ngRedux.getState().admin;
    });
  }

  logout() {
    //this.store.dispatch({ type: LOGOUT, payload: {} });
    this.ngRedux.dispatch({ type: LOGOUT, payload: {} });
    this.router.navigateByUrl('logout');
  }

  ngOnInit() {
    this.form = this.fb.group({
      location: this.fb.group({
        predefined: ['-1'],
      }, Validators.required),
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: new FormControl({ value: null }, Validators.compose([
        Validators.required,
        Validators.pattern(this.emailRegex)]))
    });
  }
  onFormSubmit(form: NgForm) {
  }
}
