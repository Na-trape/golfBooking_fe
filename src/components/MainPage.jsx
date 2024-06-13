import { useState, useEffect } from 'react';
import TimeSlots from './TimeSlots';
import timeSlotsData from './timeSlots'; // Adjust the path if necessary
import {Chat} from './Chat';

const MainPage = () => {
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        // Fetch the data from the server or use the sample data
        // Here, we'll use the sample data from the timeSlots.js file
        const fetchData = async () => {
            // Replace with actual data fetching if needed
            setTimeSlots(timeSlotsData);
        };

        fetchData();
    }, []);

    return (
        <div style={styles.container}>
            <h1>Available Training Slots</h1>
            {/*<TimeSlots timeSlotsData={timeSlots} />*/}
            <Chat /> {/* Add the Chat component */}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
};

export default MainPage;
