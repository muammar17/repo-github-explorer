import axios from 'axios';

const BASE_URL = 'https://api.github.com';

const api = {
    getAllUsers: () => {
        return axios.get(`${BASE_URL}/users/livedetermined`);
    },
    searchUsers: (query) => {
        return axios.get(`${BASE_URL}/search/users?q=${query}&per_page=5`);
    },
    getRepos: (repos_url) => {
        return axios.get(`${repos_url}`);
    },
}; 
  
export default api;