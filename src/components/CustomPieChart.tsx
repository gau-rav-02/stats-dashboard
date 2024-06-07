import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from "recharts";
import { useActivityData } from "../context/activityData";

const CustomPieChart : React.FC = () => {

    const activityData = useActivityData();
    const pieChartsData = activityData?.pieChartsData;
    const COLORS = ['#EF6B6B', '#61CDBB', '#FAC76E', '#C2528B', '#0396A6', '#5F50A9', '#8F3519'];

    return(
        <div className="pie-chart-container">
          {Object.keys(pieChartsData as Record<string, { name: string; value: string | number }[]>).map((key, index) => (
              <div key={index} className="pie-chart">
                <div className="pie-chart-header">
                  <h4>{key.replace('_', ' ')}</h4>
                </div>       
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={(pieChartsData as Record<string, { name: string; value: string | number }[]>)[key as keyof typeof pieChartsData]}
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {(pieChartsData as Record<string, { name: string; value: string | number }[]>)[key as keyof typeof pieChartsData].map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ))}
      </div>
    );
}

export default CustomPieChart;