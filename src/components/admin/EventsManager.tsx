import React from 'react';
import { GenericManager, FormField } from './GenericManager';

export const EventsManager: React.FC<{ token: string }> = ({ token }) => {
  const columns = [
    { key: 'title', label: 'Event Title' },
    { key: 'date', label: 'Date' },
  ];

  const formFields: FormField[] = [
    { name: 'title', label: 'Event Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'start_time', label: 'Start Time', type: 'time' },
    { name: 'end_time', label: 'End Time', type: 'time' },
    { name: 'location', label: 'Location', type: 'text' },
    { name: 'registration_url', label: 'Registration URL', type: 'text' },
    { name: 'image_url', label: 'Event Image', type: 'image' },
  ];

  return (
    <GenericManager 
      title="Upcoming Events"
      endpoint="/api/events"
      token={token}
      columns={columns}
      formFields={formFields}
    />
  );
};
