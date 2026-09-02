import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

interface LineChartProps {
    chartData: {
        labels?: string[];
        datasets: {
            label?: string;
            data: (number | undefined)[];
            borderColor?: string;
            backgroundColor?: string;
            borderWidth?: number;
            fill?: boolean;
            tension?: number;
            pointBackgroundColor?: string;
            pointBorderColor?: string;
            pointHoverRadius?: number;
        }[];
    };
    title?: string;
    height?: number | string;
    customOptions?: ChartOptions<"line">;
}

export default function LineChart({
    chartData,
    title,
    height = 300,
    customOptions,
}: LineChartProps) {
    const defaultOptions: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1200,
            easing: "easeInOutQuart",
        },
        interaction: {
            mode: "index",
            intersect: false,
        },
        plugins: {
            title: {
                display: !!title,
                text: title || "",
                font: {
                    size: 15,
                    weight: "bold",
                },
                padding: {
                    top: 8,
                    bottom: 16,
                },
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    padding: 16,
                    font: {
                        size: 12,
                        weight: 500,
                    },
                },
            },
            tooltip: {
                backgroundColor: "rgba(17, 24, 39, 0.9)",
                titleFont: { size: 13, weight: "bold" },
                bodyFont: { size: 12 },
                padding: 12,
                cornerRadius: 8,
                boxPadding: 6,
            },
        },
        scales: {
            x: {
                grid: {
                    color: "rgba(156, 163, 175, 0.1)",
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                grid: {
                    color: "rgba(156, 163, 175, 0.15)",
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                    stepSize: 1,
                },
                beginAtZero: true,
            },
        },
        ...customOptions,
    };

    return (
        <div className="relative w-full" style={{ height: typeof height === "number" ? `${height}px` : height }}>
            <Line key="line_chart" data={chartData} options={defaultOptions} />
        </div>
    );
}
