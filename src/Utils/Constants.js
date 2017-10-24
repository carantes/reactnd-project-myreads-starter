export const api = 'https://reactnd-books-api.udacity.com';

export const headers = {
    Accept: 'application/json',
    Authorization: localStorage.token || Math.random().toString(36).substr(-8),
};

export const waitInterval = 500;

