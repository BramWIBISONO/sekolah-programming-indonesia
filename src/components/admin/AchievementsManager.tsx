import React from 'react';
import { GenericManager, FormField } from './GenericManager';

export const AchievementsManager: React.FC<{ token: string }> = ({ token }) => {
  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'achievement_type', label: 'Type' },
    { key: 'year', label: 'Year' },
  ];

  const formFields: FormField[] = [
    { name: 'title', label: 'Title (Admin Reference)', type: 'text', required: true },
    { name: 'heading', label: 'Public Heading', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { 
      name: 'achievement_type', 
      label: 'Achievement Type', 
      type: 'select',
      options: [
        { value: 'international', label: 'International (Hero)' },
        { value: 'national', label: 'National' },
        { value: 'local', label: 'Local' },
      ],
      required: true 
    },
    { name: 'year', label: 'Year', type: 'number' },
    { name: 'category', label: 'Category (e.g., SD, SMP)', type: 'text' },
    { name: 'level', label: 'Level (e.g., National)', type: 'text' },
    { name: 'rank', label: 'Rank', type: 'text' },
    { name: 'rank_label', label: 'Rank Label', type: 'text' },
    { name: 'competition', label: 'Competition Name', type: 'text' },
    { name: 'event', label: 'Event Name', type: 'text' },
    { name: 'score', label: 'Score', type: 'text' },
    { name: 'school', label: 'School Name', type: 'text' },
    { name: 'display_order', label: 'Display Order', type: 'number' },
    { name: 'photo_url', label: 'Achievement Photo', type: 'image' },
    { name: 'evidence_url', label: 'Supporting Evidence Image', type: 'image' },
  ];

  return (
    <GenericManager 
      title="Achievements"
      endpoint="/api/achievements"
      token={token}
      columns={columns}
      formFields={formFields}
    />
  );
};
