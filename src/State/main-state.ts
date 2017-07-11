
export interface State {
    userEmail: String;
    userName: String;
    isLogged: Boolean;
    users: Array<any>;
    admin: Boolean
};

export const intitialState = {
    userEmail: '',
    userName: '',
    isLogged: false,
    users: [],
    admin: false
};