import { Doughnut } from "react-chartjs-2"

interface DoughnutChartProps {
    chartData: {
        labels: string[] | undefined;
        datasets: {
            label: string;
            data: number[] | undefined;
            backgroundColor: string[];
        }[];
    }
}

export default function DoughnutChart({ chartData }: DoughnutChartProps) {
    return (
        <div className="h-100 w-100">
            <Doughnut
                key="doughnut_chart"
                data={chartData}
                options={{
                    maintainAspectRatio: false
                }} />
        </div>
    )
}
