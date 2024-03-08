import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};


interface ResultChartProps {
    values: number[];
    labels: string[];
}

const ResultChart: React.FC<ResultChartProps> = ({values, labels}) => {

    const data = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return <Bar options={options} data={data} />;
}

export default ResultChart;