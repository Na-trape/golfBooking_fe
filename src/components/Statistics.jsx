import { useState, useEffect } from 'react';
import productAPI from '../apis/productAPI';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Statistics = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        fetchProductData();
    }, []);

    const fetchProductData = async () => {
        const data = await productAPI.getProductsByMonth(0); // Fetch data for the current month
        const groupedData = groupByMonth(data);
        setChartData({
            labels: Object.keys(groupedData),
            datasets: [
                {
                    label: 'Products Created',
                    data: Object.values(groupedData),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)'
                }
            ]
        });
    };

    const groupByMonth = (products) => {
        return products.reduce((acc, product) => {
            const month = new Date(product.creationDate).toLocaleString('default', { month: 'long' });
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {});
    };

    return (
        <div style={styles.container}>
            <h2>Products Created by Month</h2>
            <Bar data={chartData} />
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
};

export default Statistics;
