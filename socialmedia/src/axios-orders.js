import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ourfeel-dbk.firebaseio.com/'
});

export default instance;