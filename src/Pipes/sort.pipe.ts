import { User } from './../model/user.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sort' })
export class SortPipe implements PipeTransform {
    transform(users: Array<User>, nameOrder: String, ageOrder: String, emailOrder: String, startPageNumber: string, endPageNumber: string) {
        if (users === undefined) return users;
        if (nameOrder == 'ASC') {
            users = users.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
            return users.slice(parseInt(startPageNumber), parseInt(endPageNumber));
        } else if (ageOrder == 'ASC') {
            users = users.sort(function (a, b) {
                return a.age - b.age;
            });
            return users.slice(parseInt(startPageNumber), parseInt(endPageNumber));
        } else if (emailOrder == 'ASC') {
            users = users.sort(function (a, b) {
                return a.emailAddress.localeCompare(b.emailAddress);
            });
            return users.slice(parseInt(startPageNumber), parseInt(endPageNumber));
        } else if (nameOrder == 'DESC') {
            users = users.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
            return users.slice(parseInt(startPageNumber), parseInt(endPageNumber)).reverse();
        } else if (ageOrder == 'DESC') {
            users = users.sort(function (a, b) {
                return a.age - b.age;
            });
            return users.slice(parseInt(startPageNumber), parseInt(endPageNumber)).reverse();
        } else if (emailOrder == 'DESC') {
            users = users.sort(function (a, b) {
                return a.emailAddress.localeCompare(b.emailAddress);
            });
            return users.slice(parseInt(startPageNumber), parseInt(endPageNumber)).reverse();
        }
        return users;
    }
}