import React from 'react';
import { GenericManager, FormField } from './GenericManager';

export const BlogManager: React.FC<{ token: string }> = ({ token }) => {
  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'published_at', label: 'Published Date' },
  ];

  const formFields: FormField[] = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'slug', label: 'URL Slug', type: 'text', required: true },
    { 
      name: 'category', 
      label: 'Category', 
      type: 'select', 
      options: [
        { value: 'Student Projects', label: 'Student Projects' },
        { value: 'Education', label: 'Education' },
        { value: 'AI & Future', label: 'AI & Future' },
        { value: 'Testimonials', label: 'Testimonials' },
      ],
      required: true 
    },
    { name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true },
    { name: 'content', label: 'Content (Markdown)', type: 'textarea', required: true },
    { name: 'author', label: 'Author', type: 'text' },
    { name: 'source', label: 'Source', type: 'text' },
    { name: 'published_at', label: 'Publication Date', type: 'date' },
    { name: 'cover_image', label: 'Cover Image', type: 'image' },
  ];

  return (
    <GenericManager 
      title="Blog Posts"
      endpoint="/api/blog"
      token={token}
      columns={columns}
      formFields={formFields}
    />
  );
};
