import { Doughnut } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

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
    const defaultOptions: ChartOptions<"doughnut"> = {
        responsive: true,
        maintainAspectRatio: false,
        cutout,
        animation: {
            animateScale: true,
            animateRotate: true,
            duration: 1000,
            easing: "easeInOutQuart",
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
                    padding: 18,
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
        ...customOptions,
    };

    return (
        <div className="relative w-full" style={{ height: typeof height === "number" ? `${height}px` : height }}>
            <Doughnut key="doughnut_chart" data={chartData} options={defaultOptions} />
        </div>
    );
}

