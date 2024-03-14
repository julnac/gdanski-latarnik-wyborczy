import "../styles/resultChart.scss";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Datalabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Datalabels
);

interface DatalabelsConfig {
    anchor: "center" | "end" | "start";
    align: 'top' | 'bottom' | 'center';
    formatter: (value: number) => string;
}

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
            display: false
        },
        title: {
            display: true,
            text: '',
        },
        tooltip: {
            enabled: false
        },
        datalabels: {
            anchor: 'end',
            align: 'top',
            formatter: (value:number) => (value*100).toString() + '%',
        } as DatalabelsConfig,
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            display: false
        }
    }
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
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }
        ],
    };

    return <Bar className="bar" options={options} data={data} />;
}

export default ResultChart;