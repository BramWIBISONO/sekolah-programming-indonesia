import React from 'react';
import { GenericManager, FormField } from './GenericManager';

export const JournalManager: React.FC<{ token: string }> = ({ token }) => {
  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'year', label: 'Year' },
    { key: 'category', label: 'Category' },
  ];

  const formFields: FormField[] = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'slug', label: 'URL Slug', type: 'text', required: true },
    { name: 'abstract', label: 'Abstract', type: 'textarea', required: true },
    { name: 'authors', label: 'Authors', type: 'text', required: true },
    { name: 'volume', label: 'Volume', type: 'text' },
    { name: 'year', label: 'Year', type: 'number', required: true },
    { 
      name: 'category', 
      label: 'Category', 
      type: 'select',
      options: [
        { value: 'Riset AI', label: 'Riset AI' },
        { value: 'Metodologi', label: 'Metodologi' },
        { value: 'Pendidikan', label: 'Pendidikan' },
      ],
      required: true 
    },
    { name: 'methodology', label: 'Methodology', type: 'text' },
    { name: 'pdf_url', label: 'PDF File', type: 'pdf', required: true },
    { name: 'cover_image', label: 'Cover Image (Optional)', type: 'image' },
    { name: 'published_at', label: 'Publication Date', type: 'date' },
  ];

  return (
    <GenericManager 
      title="Journal Publications"
      endpoint="/api/journal"
      token={token}
      columns={columns}
      formFields={formFields}
    />
  );
};
