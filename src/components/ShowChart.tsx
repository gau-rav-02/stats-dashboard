import { useState } from "react";
import './ShowChart.css';
import CustomBarChart from "./CustomBarChart";
import CustomLineChart from "./CustomLineChart";

const ShowChart : React.FC = () => {
    const [selectedChart, setSelectedChart] = useState<string | null>("bar");

    const handleChartChange = (chartName: string) => {
        setSelectedChart(chartName === selectedChart ? null : chartName);
    };

    return(
        <div className="show-chart-container">
            <section className="show-chart-header">
                <h3>Stats</h3>
                <select className="show-chart-dropdown" value={selectedChart || ''} onChange={(e) => {handleChartChange(e.target.value)}}>
                    <option value="bar">Bar Chart</option>
                    <option value="line">Line Chart</option>
                </select>
            </section>
            {
                selectedChart == "bar" ? <CustomBarChart /> : <CustomLineChart />
            }   
        </div>
    );
}

export default ShowChart;