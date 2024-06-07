import { useState } from 'react';
import './CustomTable.css';
import { useActivityData } from '../context/activityData';

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

function CustomTable() {
  const activityData = useActivityData();
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>("rishi@devdynamics.ai");

  const handleAuthorChange = (authorName: string) => {
    setSelectedAuthor(authorName === selectedAuthor ? null : authorName);
  };

  return (
    <div className='table-container'>
        <section className='table-header'>
          <h3>Author's Day-Wise Activity</h3>
          <select className='custom-table-dropdown' value={selectedAuthor || ''} onChange={(e) => handleAuthorChange(e.target.value)}>
          {activityData?.data?.data?.AuthorWorklog?.rows.map((author: Author, index: number) => (
            <option key={index} value={author.name}>{author.name}</option>
          ))}
        </select>
        </section>
        
        {selectedAuthor && (
          <div>
            {/* <h4 className='table-author-name'>{selectedAuthor}</h4> */}
            <table className='custom-table'>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>PR Open</th>
                  <th>PR Merged</th>
                  <th>Commits</th>
                  <th>PR Reviewed</th>
                  <th>PR Comments</th>
                  <th>Incident Alerts</th>
                  <th>Incidents Resolved</th>
                </tr>
              </thead>
              <tbody>
                {activityData?.data?.data?.AuthorWorklog?.rows
                  .find(author => author.name === selectedAuthor)
                  ?.dayWiseActivity.map((dayActivity: DayWiseActivity, index: number) => (
                    <tr key={index}>
                      <td id='date-td'>{dayActivity.date}</td>
                      {dayActivity.items.children.map((item: DayWiseItem, index: number) => (
                        <td key={index} style={{ backgroundColor: item.fillColor }}>{item.count}</td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
}

export default CustomTable;
