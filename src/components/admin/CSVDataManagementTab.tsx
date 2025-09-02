import React from 'react';
import CSVManagementSystem from '../common/CSVManagementSystem';

interface CSVDataManagementTabProps {
  userRole: 'admin' | 'operations' | 'outreach';
}

const CSVDataManagementTab: React.FC<CSVDataManagementTabProps> = ({ userRole }) => {
  return (
    <div className="p-6">
      <CSVManagementSystem userRole={userRole} />
    </div>
  );
};

export default CSVDataManagementTab;