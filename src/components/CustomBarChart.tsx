import React from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useActivityData } from "../context/activityData";

const CustomBarChart : React.FC = () => {

    const activityData = useActivityData();

    return(
        <div className="bar-chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={activityData?.chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="black" />
            <XAxis dataKey="name" fontSize={12} interval={0} height={70} tick={{fill: 'black'}}/>
            <YAxis tick={{fill: 'black'}} />
            <Tooltip />
            <Legend />
            <Bar dataKey="PR_Open" fill="#EF6B6B" name="PR Open" />
            <Bar dataKey="PR_Merged" fill="#61CDBB" name="PR Merged" />
            <Bar dataKey="Commits" fill="#FAC76E" name="Commits" />
            <Bar dataKey="PR_Reviewed" fill="#C2528B" name="PR Reviewed" />
            <Bar dataKey="PR_Comments" fill="#0396A6" name="PR Comments" />
            <Bar dataKey="Incident_Alerts" fill="#5F50A9" name="Incident Alerts" />
            <Bar dataKey="Incidents_Resolved" fill="#8F3519" name="Incidents Resolved" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
}

export default CustomBarChart;