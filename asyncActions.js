const redux = require('redux');
const thunkMiddleware = require('redux-thunk').thunk;
const axios = require('axios');

const { createStore, applyMiddleware } = redux;

// Initial State
const initialState = {
    loading: false,
    users: [],
    error: "",
};

// Action Types
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';

// Action Creators
const fetchUsersRequest = () => ({
    type: FETCH_USERS_REQUESTED,
});

const fetchUsersSuccess = (users) => ({
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
});

const fetchUsersFail = (error) => ({
    type: FETCH_USERS_FAILED,
    payload: error,
});

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return { ...state, loading: true };

        case FETCH_USERS_SUCCEEDED:
            return { loading: false, users: action.payload, error: "" };

        case FETCH_USERS_FAILED:
            return { loading: false, users: [], error: action.payload };

        default:
            return state; // Default case to prevent undefined state
    }
};

// Async Action Creator using Thunk
const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest());
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                const users = response.data.map((user) => user.id);
                dispatch(fetchUsersSuccess(users));
            })
            .catch((error) => {
                dispatch(fetchUsersFail(error.message));
            });
    };
};

// Create Store with Middleware
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
    console.log(store.getState());
});

// Dispatch the Async Action
store.dispatch(fetchUsers());
