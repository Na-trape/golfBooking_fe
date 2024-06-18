import axios from "axios";
import TokenManager from "./TokenManager";

const AuthAPI = {
    login: (username, password) => axios.post('https://6c7c-145-93-149-178.ngrok-free.app/tokens', { username, password })
        .then(response => response.data.accessToken)
        .then(accessToken => {
            TokenManager.setAccessToken(accessToken);
            localStorage.setItem('accessToken', accessToken); // Save token in localStorage
        }),

    createPlayer: (license, name, password, countryId) => axios.post('https://6c7c-145-93-149-178.ngrok-free.app/players', { license, name, password, countryId })
        .then(response => response.data)
}

export default AuthAPI;
