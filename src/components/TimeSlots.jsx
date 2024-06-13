import PropTypes from 'prop-types';

const TimeSlots = ({ timeSlotsData }) => {
    return (
        <div>
            {timeSlotsData.map((slot, index) => (
                <div key={index} style={styles.slotContainer}>
                    <div style={styles.time}>{slot.time}</div>
                    <div style={styles.details}>
                        <div style={styles.title}>{slot.title}</div>
                        <div>{slot.location}</div>
                        <div>{slot.facility}</div>
                        <div>{slot.duration}</div>
                    </div>
                    <div style={styles.slotsLeft}>
                        <span style={styles.icon}>👥</span> {slot.slotsLeft} Left
                    </div>
                </div>
            ))}
        </div>
    );
};

TimeSlots.propTypes = {
    timeSlotsData: PropTypes.arrayOf(
        PropTypes.shape({
            time: PropTypes.string.isRequired,
            duration: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            facility: PropTypes.string.isRequired,
            slotsLeft: PropTypes.number.isRequired,
        })
    ).isRequired,
};

const styles = {
    slotContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ddd',
        marginBottom: '10px',
    },
    time: {
        fontWeight: 'bold',
        fontSize: '16px',
    },
    details: {
        flexGrow: 1,
        marginLeft: '20px',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '18px',
    },
    slotsLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        marginRight: '5px',
    },
};

export default TimeSlots;
