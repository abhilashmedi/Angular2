import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from "@angular-redux/store/lib/src";
import { State } from "../State/main-state";
@Component({
    selector: 'default',
    templateUrl: 'default.component.html',
})

export class DefaultComponent {
    constructor(private router: Router, private ngRedux: NgRedux<State>) {
    }

    redirect() {
        this.router.navigateByUrl('/welcome');
    }
}

