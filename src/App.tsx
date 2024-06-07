import { useEffect} from 'react';
import './App.css';
import CustomTable from './components/CustomTable';
import { useActivityData } from './context/activityData';
import CustomPieChart from './components/CustomPieChart';
import ShowChart from './components/ShowChart';

// import { Chart as ChartJS } from 'chart.js/auto';
// import { Bar, Doughnut, Line } from 'react-chartjs-2';

function App() {
  const activityData = useActivityData();

  useEffect(() => {
    activityData?.fetchData();
  },[]);

  return (
    <div className='App'>
      <div className='main'>
        <section className='main-header'>
          <h1>DevDynamics Stats</h1>
        </section>
        <div className='one'>
          <CustomPieChart />
          {/* <CustomLineChart /> */}
          {/* <CustomBarChart /> */}
          <ShowChart />
        </div>
        <div className='two'>
          <CustomTable />
        </div>
      </div>
    </div>
  )
}

export default App
