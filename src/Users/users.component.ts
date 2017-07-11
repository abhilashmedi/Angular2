import { UserService } from './user.service';
import { CREATEUSER, VIEWUSER, DELETEUSER } from './../State/main-action-creator';
import { SortPipe } from './../Pipes/sort.pipe';
import { User } from './../model/user.interface';
import { Http, Response, Headers } from '@angular/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from "../State/main-state";
import { LOGIN } from "../State/main-action-creator";
import { EditUserComponent } from './edituser.component'
import { NgRedux } from "@angular-redux/store/lib/src";

@Component({
    selector: 'users',
    templateUrl: 'users.component.html',
})

export class UserComponent {

    headers: Headers;

    data: Array<User> = null;
    user: User;
    firstName: String;
    lastName: String;
    nameSortType = 'ASC';
    emailSortType = 'ASC';
    ageSortType = 'ASC';
    startPageNumber = 0;
    endPageNumber = 4;
    selectedButton = 1;
    deleteUser: String
    admin: Boolean = false;
    public arrayOfKeys;
    view: Boolean = true;
    selected: number = 1;

    constructor(public http: Http, private ngRedux: NgRedux<State>, private fb: FormBuilder, private store: Store<State>, private heroService: UserService) {
        this.selectedButton = 1;
        this.startPageNumber = 0;
        this.endPageNumber = 4;
        this.data = ngRedux.getState().users;
        this.admin = ngRedux.getState().admin;
        ngRedux.subscribe(() => {
            this.data = ngRedux.getState().users;
            this.admin = ngRedux.getState().admin;
        });

        this.user = this.data.find(x => x.name == "Person A");
    }
    getContacts() {
        console.log("getContacts");
    }

    onFormSubmit(name: String) {
        console.log(name);
    }
    delete(user: User) {
        this.deleteUser = user.name;
    }
    delUser(userName: String) {
        this.data = this.data.filter(x => x.name != userName);
        this.ngRedux.dispatch({ type: DELETEUSER, payload: { users: this.data } });
    }

    edit(user: User) {
        this.user = user;//this.data.find(x => x.name == name);
        this.firstName = this.user.name.split(' ', 2)[0];
        this.lastName = this.user.name.split(' ', 2)[1];

        document.getElementById('modalPopUp').click();
    }

    sort(key) {
        if (key == 'name') {
            this.nameSortType = this.nameSortType === 'DESC' ? 'ASC' : 'DESC';
            this.emailSortType = '';
            this.ageSortType = '';
        } else if (key == 'age') {
            this.ageSortType = this.ageSortType === 'DESC' ? 'ASC' : 'DESC';
            this.nameSortType = '';
            this.emailSortType = '';
        } else if (key == 'email') {
            this.emailSortType = this.emailSortType === 'DESC' ? 'ASC' : 'DESC';
            this.nameSortType = '';
            this.ageSortType = '';
        }
    }
    pagination(pageIndex) {
        console.log(pageIndex)
        this.selectedButton = pageIndex;
        this.startPageNumber = (pageIndex - 1) * 4;
        this.endPageNumber = (pageIndex) * 4;
    }




    clicked(select) {
        this.selected = select;
    }
    getMod(select, selected) {
        // if (select - selected == 0 || selected - select == 0) {
        //     return 4;
        // } else if (select - selected == 1 || selected - select == 1) {
        //     return 3;
        // } else if (select - selected == 2 || selected - select == 2) {
        //     return 2;
        // } else if (select - selected == 3 || selected - select == 3) {
        //     return 1;
        // }

        if (select > selected) {
            return select - selected;
        }
        return selected - select;
    }
    getStyle(select, selected) {
        return 4 - this.getMod(select, selected);
        // return this.getMod(select, selected);
    }
    getColor(select, selected) {
        if (select - selected == 0 || selected - select == 0) {
            return '#526c96';
        } else if (select - selected == 1 || selected - select == 1) {
            return '#8eacdb';
        } else if (select - selected == 2 || selected - select == 2) {
            return '#aec3e5';
        } else if (select - selected == 3 || selected - select == 3) {
            return '#c4d4ed';
        }


        // if (select - selected == 0 || selected - select == 0) {
        //     return '#ff0000';
        // } else if (select - selected == 1 || selected - select == 1) {
        //     return '#ff6666';
        // } else if (select - selected == 2 || selected - select == 2) {
        //     return '#ffb3b3';
        // } else if (select - selected == 3 || selected - select == 3) {
        //     return '#ffcccc';
        // }
    }
}
