import DataInput from './data_input';
import LandingPage from './landing_page';
import React, { useState } from 'react';
import ReviewPage from './review-page';

const mockData = [
  { id: 1, machineName: 'Machine A', machineNumber: 101, state: 'Review' },
  { id: 2, machineName: 'Machine B', machineNumber: 102, state: 'Completed' },
  { id: 3, machineName: 'Machine A', machineNumber: 101, state: 'Review' },
  { id: 4, machineName: 'Machine B', machineNumber: 102, state: 'Completed' },
  { id: 5, machineName: 'Machine A', machineNumber: 101, state: 'Review' },
  { id: 6, machineName: 'Machine B', machineNumber: 102, state: 'Completed' },
  { id: 7, machineName: 'Machine A', machineNumber: 101, state: 'Review' },
  { id: 8, machineName: 'Machine B', machineNumber: 102, state: 'Completed' },
  { id: 9, machineName: 'Machine A', machineNumber: 101, state: 'Review' },
  { id: 10, machineName: 'Machine B', machineNumber: 102, state: 'Completed' },
  { id: 11, machineName: 'Machine A', machineNumber: 101, state: 'Review' },
  { id: 12, machineName: 'Machine B', machineNumber: 102, state: 'Completed' },
  { id: 13, machineName: 'Machine A', machineNumber: 101, state: 'Review' },
  { id: 14, machineName: 'Machine B', machineNumber: 102, state: 'Completed' },
  { id: 15, machineName: 'Machine A', machineNumber: 101, state: 'Review' },
  { id: 16, machineName: 'Machine B', machineNumber: 102, state: 'Completed' },
  { id: 17, machineName: 'Machine A', machineNumber: 101, state: 'Review' },
  { id: 18, machineName: 'Machine B', machineNumber: 102, state: 'Completed' },
  // Add more data...
];
function MainContent() {
  const [state, setState] = useState(1);

  const handleStateChange = (newState) => {
      setState(newState);
  };

    return (
    <div className="main-content">
    {state === 1 &&
      <LandingPage data={mockData} submitCallBack={handleStateChange}/>
    }
    {state === 2 &&
      <DataInput data={mockData} submitCallBack={handleStateChange}/>
    }
    {state === 3 &&
      <ReviewPage />
    }
    </div>
    );
}

export default MainContent;