import { Doughnut } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { useThemeMode } from "flowbite-react";

interface DoughnutChartProps {
    chartData: {
        labels?: string[];
        datasets: {
            label?: string;
            data: (number | undefined)[];
            backgroundColor?: string[];
            borderColor?: string | string[];
            borderWidth?: number;
            hoverOffset?: number;
        }[];
    };
    title?: string;
    height?: number | string;
    cutout?: string | number;
    customOptions?: ChartOptions<"doughnut">;
}

export default function DoughnutChart({
    chartData,
    title,
    height = 300,
    cutout = "70%",
    customOptions,
}: DoughnutChartProps) {
    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    const { mode } = useThemeMode();
    const colorMode = mode === "dark" ? "#a3a3a3" : "#0B0909"

    const defaultOptions: ChartOptions<"doughnut"> = {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: dpr,
        cutout,
        animation: {
            animateScale: true,
            animateRotate: true,
            duration: 1000,
            easing: "easeInOutQuart",
        },
        layout: {
            padding: {
                top: 10,
                right: 20,
                bottom: 10,
                left: 10,
            },
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
                    color: colorMode,
                    usePointStyle: true,
                    padding: 18,
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
        ...customOptions,
    };

    return (
        <div className="relative w-full" style={{ height: typeof height === "number" ? `${height}px` : height }}>
            <Doughnut key="doughnut_chart" data={chartData} options={defaultOptions} />
        </div>
    );
}

