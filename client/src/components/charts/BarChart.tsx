import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { useThemeMode } from "flowbite-react";

interface BarChartProps {
    chartData: {
        labels?: string[];
        datasets: {
            label?: string;
            data: (number | undefined)[];
            backgroundColor?: string | string[];
            borderColor?: string | string[];
            borderWidth?: number;
            borderRadius?: number | { topLeft: number; topRight: number; bottomLeft: number; bottomRight: number };
            barThickness?: number | "flex";
        }[];
    };
    title?: string;
    height?: number | string;
    indexAxis?: "x" | "y";
    customOptions?: ChartOptions<"bar">;
}

export default function BarChart({
    chartData,
    height = 300,
    indexAxis = "x",
    customOptions,
}: BarChartProps) {
    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    const { mode } = useThemeMode();
    const colorMode = mode === "dark" ? "#a3a3a3" : "#0B0909"

    const defaultOptions: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: dpr,
        indexAxis,
        animation: {
            duration: 1000,
            easing: "easeOutQuart",
        },
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    padding: 16,
                    color: colorMode,
                    font: {
                        size: 14,
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
                    display: false,
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                    color: colorMode
                },
            },
            y: {
                grid: {
                    color: "rgba(156, 163, 175, 0.20)",
                },
                ticks: {
                    color: colorMode,
                    font: {
                        size: 12,
                    },
                    stepSize: 1,
                },
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Leads',
                    font: {
                        size: 14
                    },
                    color: colorMode,
                },
            },

        },
        ...customOptions,
    };

    return (
        <div className="relative w-full" style={{ height: typeof height === "number" ? `${height}px` : height }}>
            <Bar key="bar_chart" data={chartData} options={defaultOptions} />
        </div>
    );
}

