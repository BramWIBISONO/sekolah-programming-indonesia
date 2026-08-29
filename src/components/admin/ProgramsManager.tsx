import React from 'react';
import { GenericManager, FormField } from './GenericManager';

export const ProgramsManager: React.FC<{ token: string }> = ({ token }) => {
  const columns = [
    { key: 'title', label: 'Program Title' },
    { key: 'month', label: 'Month' },
    { key: 'year', label: 'Year' },
  ];

  const formFields: FormField[] = [
    { name: 'title', label: 'Program Title', type: 'text', required: true },
    { name: 'badge', label: 'Badge Text', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'benefits', label: 'Benefits (JSON Array)', type: 'textarea' },
    { name: 'start_date', label: 'Start Date', type: 'text' },
    { name: 'remaining_seats', label: 'Remaining Seats', type: 'number' },
    { name: 'registration_url', label: 'Registration URL', type: 'text' },
    { name: 'month', label: 'Month (1-12)', type: 'number', required: true },
    { name: 'year', label: 'Year', type: 'number', required: true },
    { name: 'visual_image', label: 'Program Visual', type: 'image' },
  ];

  return (
    <GenericManager 
      title="Monthly Featured Programs"
      endpoint="/api/programs"
      token={token}
      columns={columns}
      formFields={formFields}
    />
  );
};
