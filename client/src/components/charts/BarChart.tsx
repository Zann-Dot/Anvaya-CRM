import { Bar } from "react-chartjs-2"

interface BarChartProps {
    chartData: {
        labels: string[] | undefined;
        datasets: {
            label: string;
            data: number[] | undefined;
            backgroundColor: string[];
        }[];
    }
}

export default function BarChart({ chartData }: BarChartProps) {
    return (
        <div className="size-100">
            <Bar
                key="bar_chart"
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Users Gained between 2016-2020",
                            padding: {
                                top: 10,
                                bottom: 30
                            }
                        }
                    },
                    maintainAspectRatio: false
                }} />
        </div>
    )
}
