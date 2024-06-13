import { useState, useEffect } from 'react';


const ClubsList = () => {
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        // Fetch clubs data from the backend API
        fetch('http://localhost:8080/clubs') // Replace the URL
            .then(response => response.json())
            .then(data => setClubs(data))
            .catch(error => console.error('Error fetching clubs:', error));
    }, []);

    return (
        <div>
            <h1>Clubs List</h1>
            <ul>
                {clubs.map(club => (
                    <li key={club.id}>
                        <h3>{club.title}</h3>
                        <p>City: {club.city}</p>
                        <p>Address: {club.address}</p>
                        <p>Zipcode: {club.zipcode}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClubsList;
