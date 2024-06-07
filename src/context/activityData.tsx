import { ReactNode, createContext, useContext, useState } from "react";
import { getActivityData } from "../api";

interface Activity {
  name: string;
  value: string;
}

interface DayWiseItem {
  count: number;
  fillColor: string;
}

interface DayWiseActivity {
  date: string;
  items: {
    children: DayWiseItem[];
  };
}

interface Author {
  name: string;
  totalActivity: Activity[];
  dayWiseActivity: DayWiseActivity[];
}

interface AuthorWorklog {
  rows: Author[];
}

interface Data {
  data: {
    AuthorWorklog: AuthorWorklog;
  };
}

interface TransformedAuthor {
  name: string;
  PR_Open: number;
  PR_Merged: number;
  Commits: number;
  PR_Reviewed: number;
  PR_Comments: number;
  Incident_Alerts: number;
  Incidents_Resolved: number;
}

interface ProviderValue {
  data: Data | null;
  transformData: (data: Data) => TransformedAuthor[];
  getActivityDataForPieChart: (transformedData: TransformedAuthor[], activity: keyof TransformedAuthor) => any[]; 
  fetchData: () => Promise<void>;
  pieChartsData: { [key: string]: { name: string; value: string | number }[] }; // Adjust the type according to your data structure
  chartData: TransformedAuthor[];
}

const activityDataContext = createContext<ProviderValue | null>(null);

export const useActivityData = () => {
  return useContext(activityDataContext);
}

export const ActivityDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<Data | null>(null);

  const fetchData = async () => {
    try {
      const response = await getActivityData();
      setData(response.data);
    } catch (error) {
      console.error('Error fetching activity data:', error);
    }
  }

  const transformData = (data: Data): TransformedAuthor[] => {
    return data?.data?.AuthorWorklog?.rows.map((author: Author) => {
      const transformed: TransformedAuthor = {
        name: author.name,
        PR_Open: 0,
        PR_Merged: 0,
        Commits: 0,
        PR_Reviewed: 0,
        PR_Comments: 0,
        Incident_Alerts: 0,
        Incidents_Resolved: 0,
      };

      author.totalActivity.forEach((activity: Activity) => {
        switch (activity.name) {
          case "PR Open":
            transformed.PR_Open = parseInt(activity.value);
            break;
          case "PR Merged":
            transformed.PR_Merged = parseInt(activity.value);
            break;
          case "Commits":
            transformed.Commits = parseInt(activity.value);
            break;
          case "PR Reviewed":
            transformed.PR_Reviewed = parseInt(activity.value);
            break;
          case "PR Comments":
            transformed.PR_Comments = parseInt(activity.value);
            break;
          case "Incident Alerts":
            transformed.Incident_Alerts = parseInt(activity.value);
            break;
          case "Incidents Resolved":
            transformed.Incidents_Resolved = parseInt(activity.value);
            break;
          default:
            break;
        }
      });
      return transformed;
    });
  };

  const getActivityDataForPieChart = (transformedData: TransformedAuthor[], activity: keyof TransformedAuthor) => {
    return transformedData.map(author => ({
      name: author.name,
      value: author[activity]
    }));
  };

  const chartData = data ? transformData(data) : [];

  const pieChartsData = {
    PR_Open: getActivityDataForPieChart(chartData, 'PR_Open'),
    PR_Merged: getActivityDataForPieChart(chartData, 'PR_Merged'),
    Commits: getActivityDataForPieChart(chartData, 'Commits'),
  };

  const providerValue: ProviderValue = {
    data,
    transformData,
    getActivityDataForPieChart,
    fetchData,
    pieChartsData,
    chartData
  };

  return (
    <activityDataContext.Provider value={providerValue}>
      {children}
    </activityDataContext.Provider>
  );
}
