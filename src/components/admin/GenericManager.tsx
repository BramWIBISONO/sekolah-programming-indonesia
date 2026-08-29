import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Upload } from 'lucide-react';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'time' | 'number' | 'select' | 'image' | 'pdf';
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface GenericManagerProps {
  title: string;
  endpoint: string;
  token: string;
  columns: { key: string; label: string; render?: (val: any, row: any) => React.ReactNode }[];
  formFields: FormField[];
}

export const GenericManager: React.FC<GenericManagerProps> = ({ title, endpoint, token, columns, formFields }) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await fetch(endpoint, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [endpoint]);

  const handleCreateNew = () => {
    setFormData({ status: 'draft' }); // Default values
    setIsEditing(true);
    setError('');
  };

  const handleEdit = (item: any) => {
    setFormData({ ...item });
    setIsEditing(true);
    setError('');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchItems();
      } else {
        alert('Failed to delete item.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataObj
      });
      if (res.ok) {
        const data = await res.json();
        setFormData((prev: any) => ({ ...prev, [fieldName]: data.url }));
      } else {
        const err = await res.json();
        alert(err.error || 'Upload failed');
      }
    } catch (e) {
      console.error(e);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const isUpdate = !!formData.id;
    const url = isUpdate ? `${endpoint}/${formData.id}` : endpoint;
    const method = isUpdate ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setIsEditing(false);
        fetchItems();
      } else {
        const data = await res.json();
        setError(data.error || 'Save failed');
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  if (loading) return <div className="animate-pulse flex gap-4"><div className="h-8 w-32 bg-slate-200 rounded"></div></div>;

  if (isEditing) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">{formData.id ? 'Edit' : 'Create'} {title}</h2>
          <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-100 font-semibold text-sm">{error}</div>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFields.map(field => {
              const val = formData[field.name] || '';
              
              if (field.type === 'textarea') {
                return (
                  <div key={field.name} className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-1">{field.label}</label>
                    <textarea 
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#176DF8]/50 outline-none"
                      rows={5}
                      value={val}
                      onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                      required={field.required}
                    />
                  </div>
                );
              }

              if (field.type === 'select') {
                return (
                  <div key={field.name}>
                    <label className="block text-sm font-bold text-slate-700 mb-1">{field.label}</label>
                    <select 
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#176DF8]/50 outline-none bg-white"
                      value={val}
                      onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                      required={field.required}
                    >
                      <option value="">Select...</option>
                      {field.options?.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                );
              }

              if (field.type === 'image' || field.type === 'pdf') {
                return (
                  <div key={field.name} className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-1">{field.label}</label>
                    <div className="flex items-center gap-4">
                      {val && field.type === 'image' && (
                        <img src={val} alt="Preview" className="h-16 w-16 object-cover rounded-lg border border-slate-200" />
                      )}
                      {val && field.type === 'pdf' && (
                        <div className="h-16 px-4 bg-slate-100 rounded-lg border border-slate-200 flex items-center text-sm font-semibold text-slate-600 truncate max-w-xs">
                          {val.split('/').pop()}
                        </div>
                      )}
                      <label className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer transition-colors border border-slate-200">
                        <Upload className="w-4 h-4" />
                        <span className="text-sm font-semibold">{uploading ? 'Uploading...' : 'Choose File'}</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept={field.type === 'image' ? 'image/*' : '.pdf'} 
                          onChange={(e) => handleFileUpload(e, field.name)}
                          disabled={uploading}
                        />
                      </label>
                      {val && (
                        <button type="button" onClick={() => setFormData({ ...formData, [field.name]: '' })} className="text-red-500 text-sm font-semibold hover:underline cursor-pointer">
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <div key={field.name}>
                  <label className="block text-sm font-bold text-slate-700 mb-1">{field.label}</label>
                  <input 
                    type={field.type}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#176DF8]/50 outline-none"
                    value={val}
                    onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                    required={field.required}
                  />
                </div>
              );
            })}

            {/* Default Status Field */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
              <select 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#176DF8]/50 outline-none bg-white font-semibold"
                value={formData.status || 'draft'}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
          
          <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-[#176DF8] hover:bg-[#1059D4] text-white rounded-xl font-bold transition-colors shadow-sm cursor-pointer"
            >
              Save {title}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Manage {title}</h2>
        <button 
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2 bg-[#176DF8] hover:bg-[#1059D4] text-white rounded-xl font-bold transition-colors shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-bold border-b border-slate-200">
              <tr>
                {columns.map(col => (
                  <th key={col.key} className="px-6 py-4">{col.label}</th>
                ))}
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 2} className="px-6 py-12 text-center text-slate-500">
                    No items found. Click "Add New" to create one.
                  </td>
                </tr>
              ) : (
                items.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    {columns.map(col => (
                      <td key={col.key} className="px-6 py-4 font-medium text-slate-800">
                        {col.render ? col.render(item[col.key], item) : item[col.key]}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleEdit(item)} className="text-[#176DF8] hover:text-[#1059D4] p-2 transition-colors cursor-pointer" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 p-2 transition-colors cursor-pointer" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
