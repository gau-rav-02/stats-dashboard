import React from "react";
import './CustomPieChart.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useActivityData } from "../context/activityData";

const CustomLineChart : React.FC = () =>{

    const activityData = useActivityData();

    return(
      <div className='line-charrt-container'>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={activityData?.chartData}
          margin={{ top: 20, right: 60, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="4 4" stroke="black" />
          <XAxis dataKey="name" fontSize={12} interval={0} tick={{fill: 'black', dx: -10}}/>
          <YAxis tick={{fill: 'black'}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="PR_Open" stroke="#EF6B6B" />
          <Line type="monotone" dataKey="PR_Merged" stroke="#61CDBB" />
          <Line type="monotone" dataKey="Commits" stroke="#FAC76E" />
          <Line type="monotone" dataKey="PR_Reviewed" stroke="#C2528B" />
          <Line type="monotone" dataKey="PR_Comments" stroke="#0396A6" />
          <Line type="monotone" dataKey="Incident_Alerts" stroke="#5F50A9" />
          <Line type="monotone" dataKey="Incidents_Resolved" stroke="#8F3519" />
        </LineChart>
      </ResponsiveContainer>
    </div>
    );
}

export default CustomLineChart;