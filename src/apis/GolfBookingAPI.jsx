import axios from "axios";
import TokenManager from "./TokenManager";

const GolfBookingAPI = {
    getPlayer: (playerId) => axios.get(`http://localhost:8080/players/${playerId}`,
        {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
        })
        .then(response => response.data)

}

export default GolfBookingAPI;