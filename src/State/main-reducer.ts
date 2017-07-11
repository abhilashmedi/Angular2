import { ActionReducer, Action } from "@ngrx/store";
import { State, intitialState } from "./main-state";
import { LOGIN, LOGOUT, VIEWUSER, SIGNUP, CREATEUSER, DELETEUSER, EDITUSER, PERSIST } from "./main-action-creator";

export const mainReducer: ActionReducer<State> =
    (state = intitialState, action: Action) => {
        switch (action.type) {
            case LOGIN: {
                state = {
                    userEmail: action.payload.email,
                    userName: action.payload.userName,
                    admin: action.payload.admin,
                    isLogged: true,
                    users: state.users
                };
                return state
            }
            case SIGNUP: {
                state = {
                    userEmail: action.payload.email,
                    userName: action.payload.userName,
                    admin: action.payload.admin,
                    isLogged: true,
                    users: []
                };
                return state
            }
            case LOGOUT: {
                state = {
                    userEmail: '',
                    userName: '',
                    admin: false,
                    isLogged: false,
                    users: []
                };
                return state
            }
            case VIEWUSER: {
                state = {
                    userEmail: state.userEmail,
                    userName: state.userName,
                    isLogged: state.isLogged,
                    admin: state.admin,
                    users: action.payload.users,
                };
                return state
            }
            case CREATEUSER: {
                var temp = state.users;
                temp.push({ age: action.payload.age, emailAddress: action.payload.emailAddress, name: action.payload.name })
                state = {
                    userEmail: state.userEmail,
                    userName: state.userName,
                    isLogged: state.isLogged,
                    admin: state.admin,
                    users: temp,
                };
                return state
            }
            case EDITUSER: {
                var temp = state.users;
                var user = { age: action.payload.age, emailAddress: action.payload.emailAddress, name: action.payload.name };
                var index = temp.findIndex(x => x.emailAddress = action.payload.emailAddress)
                temp[index] = user;
                // temp.filter(x => x.emailAddress = action.payload.emailAddress)[0].name = action.payload.name;
                // temp.filter(x => x.emailAddress = action.payload.emailAddress)[0].age = action.payload.age;

                state = {
                    userEmail: state.userEmail,
                    userName: state.userName,
                    isLogged: state.isLogged,
                    admin: state.admin,
                    users: temp,
                };
                return state
            }
            case DELETEUSER: {
                state = {
                    userEmail: state.userEmail,
                    userName: state.userName,
                    isLogged: state.isLogged,
                    admin: state.admin,
                    users: action.payload.users,
                };
                return state
            }
            case PERSIST: {
                state = action.payload;
                return state;
            }

            default: {
                return state;
            }
        }
    };