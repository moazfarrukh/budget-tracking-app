import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from "chart.js";
import { enUS } from "date-fns/locale";
import { calculateMinDate } from "../index";

export function setupChartjs(dateOffset: number) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        TimeScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Budget Trends",
                align: "start" as "start",
                padding: 30,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                type: "time",
                adapters: {
                    date: {
                        locale: enUS,
                    },
                },
                max: new Date().getTime(),
                min: calculateMinDate(dateOffset),
            },
        },
    };
    return options
}