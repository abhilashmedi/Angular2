import { CREATEUSER } from './../State/main-action-creator';
import { SortPipe } from './../Pipes/sort.pipe';
import { User } from './../model/user.interface';
import { Http, Response, Headers } from '@angular/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from "../State/main-state";
import { LOGIN, EDITUSER } from "../State/main-action-creator";
import { NgRedux } from "@angular-redux/store/lib/src";


@Component({
    selector: 'edituser',
    templateUrl: 'edituser.component.html',
})

export class EditUserComponent {

    @Input() name: String = '';
    // @Input() lastName: String;
    @Input() email: String;
    @Input() age: number;
    firstNames = new FormControl();
    lastNames = new FormControl();
    emails = new FormControl();
    ages = new FormControl();

    editUserForm: FormGroup;
    emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
    modalShow;
    noFirstName: Boolean;
    noLastName: Boolean;
    noAge: Boolean;
    valid: Boolean = false
    constructor(private fb: FormBuilder, private store: Store<State>, private ngRedux: NgRedux<State>, private router: Router) {
        this.editUserForm = this.fb.group({
            firstNames: ['this.name', [Validators.required]],
            lastNames: ['', [Validators.required]],
            emails: ['', Validators.compose([
                Validators.required,
                Validators.pattern(this.emailRegex)])],
            ages: ['', [Validators.required]]//new FormControl('', this.validation)
        });
        this.editUserForm.controls['firstNames'].setValue('asdasdsa');
    }

    validation(data: FormControl) {
        if (data.value == null || data.value <= 0) {
            return null;
        }
        return {
            validateAge: {
                valid: true
            }
        }
    }
    ngOnInit() {
        this.editUserForm = this.fb.group({
            firstNames: [this.name.split(' ', 2)[0], [Validators.required]],
            lastNames: [this.name.split(' ', 2)[1], [Validators.required]],
            emails: [this.email, Validators.compose([
                Validators.required,
                Validators.pattern(this.emailRegex)])],
            ages: ['', [Validators.required]]//new FormControl('', this.validation)
        });
        console.log("FirstName")
        console.log(this.editUserForm.controls['firstNames'].value);
    }

    edit(editUser) {
        this.noFirstName = this.editUserForm.controls['firstNames'].value == '';
        this.noLastName = !this.noFirstName && this.editUserForm.controls['lastNames'].value == '';
        this.noAge = !this.noFirstName && !this.noLastName && this.editUserForm.controls['ages'].value == ''
        this.valid = this.editUserForm.controls['firstNames'].valid &&
            this.editUserForm.controls['lastNames'].valid &&
            this.editUserForm.controls['ages'].valid

        if (this.valid) {
            this.ngRedux.dispatch({
                type: EDITUSER,
                payload: {
                    name: this.editUserForm.controls['firstNames'].value + ' ' + this.editUserForm.controls['lastNames'].value,
                    emailAddress: this.email,
                    age: this.editUserForm.controls['ages'].value,
                }
            });
            // location.reload();
            // this.router.navigate(['/users', { id: 7 } ]);
            return false;
        }
    }
}
