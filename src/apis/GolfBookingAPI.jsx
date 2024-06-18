import axios from "axios";
import TokenManager from "./TokenManager";

const GolfBookingAPI = {
    getPlayer: (playerId) => axios.get(`https://6c7c-145-93-149-178.ngrok-free.app/players/${playerId}`,
        {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
        })
        .then(response => response.data)

}

export default GolfBookingAPI;