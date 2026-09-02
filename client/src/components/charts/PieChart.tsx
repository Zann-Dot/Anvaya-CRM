import { Pie } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

interface PieChartProps {
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
    customOptions?: ChartOptions<"pie">;
}

export default function PieChart({
    chartData,
    title,
    height = 300,
    customOptions,
}: PieChartProps) {
    const defaultOptions: ChartOptions<"pie"> = {
        responsive: true,
        maintainAspectRatio: false,
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
            <Pie key="pie_chart" data={chartData} options={defaultOptions} />
        </div>
    );
}

