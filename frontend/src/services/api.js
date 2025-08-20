import axios from 'axios';

// service for API calls 

const apiClient = axios.create({
    baseURL: 'http://localhost:3000', // PORT 3000 on default, up to you to change it
    headers: {
        'Content-Type': 'application/json',
    },
});
//  Export API routes
export default {
    getRomanNumber(post) {
        return apiClient.post('/convert', post);
    }
};
