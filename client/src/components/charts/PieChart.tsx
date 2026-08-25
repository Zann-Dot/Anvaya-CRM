import { Pie } from "react-chartjs-2"

interface PieChartProps {
    chartData: {
        labels: string[];
        datasets: {
            label: string;
            data: (number | undefined)[];
            backgroundColor: string[];
        }[];
    }
}

export default function PieChart({ chartData }: PieChartProps) {
    return (
        <div className="size-100">
            <Pie
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Users Gained between 2016-2020"
                        }
                    },
                    maintainAspectRatio: false
                }} />
        </div>
    )
}
