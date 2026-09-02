import { PolarArea } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

interface PolarAreaChartProps {
    chartData: {
        labels?: string[];
        datasets: {
            label?: string;
            data: (number | undefined)[];
            backgroundColor?: string[];
            borderColor?: string[];
            borderWidth?: number;
        }[];
    };
    title?: string;
    height?: number | string;
    customOptions?: ChartOptions<"polarArea">;
}

export default function PolarAreaChart({
    chartData,
    title,
    height = 300,
    customOptions,
}: PolarAreaChartProps) {
    const defaultOptions: ChartOptions<"polarArea"> = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1000,
            easing: "easeOutQuart",
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
            r: {
                grid: {
                    color: "rgba(156, 163, 175, 0.15)",
                },
                angleLines: {
                    color: "rgba(156, 163, 175, 0.15)",
                },
                ticks: {
                    backdropColor: "transparent",
                    font: {
                        size: 10,
                    },
                },
                beginAtZero: true,
            },
        },
        ...customOptions,
    };

    return (
        <div className="relative w-full" style={{ height: typeof height === "number" ? `${height}px` : height }}>
            <PolarArea key="polar_area_chart" data={chartData} options={defaultOptions} />
        </div>
    );
}
