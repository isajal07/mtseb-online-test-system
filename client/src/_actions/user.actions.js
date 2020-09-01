import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import Student from '../../../models/Student';

export const userActions = {
    login,
    slogin,
    logout,
    register,
    sregister,
    isOnline,
    getOnlineStudents
};

function isOnline(online) {
    return dispatch => {
        userService.isOnline(online)
            .then(
                isonline => dispatch({
                    type: userConstants.IS_ONLINE,
                    payload: isonline
                }),
                error => {
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }
}

function getOnlineStudents() {
    return dispatch => {
        userService.getOnlineStudents()
            .then(
                students => dispatch({
                    type: userConstants.GET_ONLINE_STUDENTS,
                    payload: students
                }),
                error => {
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }
}



//Teacher's login
function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/home');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

//Students login
function slogin(classNo, roll, password) {
    return dispatch => {
        dispatch(request({ classNo, roll }));

        userService.slogin(classNo, roll, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/shome');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

//Teacher's Register
function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
//Students register
function sregister(user) {
    return dispatch => {
        dispatch(request(user));

        userService.sregister(user)
            .then(
                user => {
                    dispatch(success());
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}