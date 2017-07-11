import { Http } from '@angular/http';
import { Injectable, Component } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs';

@Injectable()
export class UserService {
    constructor(private http: Http) { }
    getUsers() {
        return this.http.get('../model/user.model.json').toPromise();//.map(user=>user);

        // var observable = this.http.get('../model/user.model.json');//.map(user=>user);

        // observable.map(user => this.data = user);
        // observable.toPromise().then(res => { return this.data }).catch(res => { return this.data });

    }
}