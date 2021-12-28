import http from './axios.js';

const login = (paramsList) => {
    return http.post('/api/index/login', paramsList ,{
        params: {},
        responseType: 'json'
    })
}

export default login;
