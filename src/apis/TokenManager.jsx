// import { default as jwt_decode } from 'jwt-decode';
import { jwtDecode } from "jwt-decode";

const userData = {
    accessToken: undefined,
    claims: undefined
};



const TokenManager = {
    getAccessToken: () => userData.accessToken,
    getClaims: () => {
        if (!userData.claims) {
            return undefined;
        }
        return userData.claims;
    },
    setAccessToken: async (token) => {
        userData.accessToken = token;
        // const { default: jwt_decode } = await import('jwt-decode');
        console.log(token);
        const claims = jwtDecode(token);
        userData.claims = claims;
        return claims;
    },
    clear: () => {
        userData.accessToken = undefined;
        userData.claims = undefined;
    }
};

export default TokenManager;
