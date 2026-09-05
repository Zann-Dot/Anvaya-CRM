import { Pie } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { useThemeMode } from "flowbite-react";

interface PieChartProps {
    chartData: {
        labels?: string[];
        datasets: {
            label?: string;
            data: (number | undefined)[];
            backgroundColor?: string[];
            borderColor?: string | string[];
            borderWidth?: number;
            offset?: number[];
            hoverOffset?: number[];
        }[];
    };
    title?: string;
    height?: number | string;
    customOptions?: ChartOptions<"pie">;
}

export default function PieChart({
    chartData,
    height = 300,
    customOptions,
}: PieChartProps) {
    const chartRef = useRef(null);
    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    const { mode } = useThemeMode();



    const defaultOptions: ChartOptions<"pie"> = {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: dpr,
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
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    padding: 18,
                    color: mode === "dark" ? "#eee" : "#0B0909",
                    font: {
                        size: 12,
                        weight: 400,
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

    const resolvedHeight =
        typeof height === "number" ? `${height}px` : height;

    return (
        <div
            className="relative w-full"
            style={{
                height: resolvedHeight,
                minHeight: resolvedHeight,
            }}
        >
            <Pie
                ref={chartRef}
                key="pie_chart"
                data={chartData}
                options={defaultOptions}
            />
        </div>
    );
}

