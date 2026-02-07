
import React, { useState, useEffect } from 'react';
import { Language, CommunityPost } from '../types';
import { Camera, MapPin, X, ChevronLeft, Upload, CheckCircle2, Trash2 } from 'lucide-react';

interface PostCreationViewProps {
  lang: Language;
  onBack: () => void;
  onSubmit: (data: CommunityPost) => void;
  title: string;
  initialData?: CommunityPost | null;
}

const PostCreationView: React.FC<PostCreationViewProps> = ({ lang, onBack, onSubmit, title, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    price: initialData?.price || '',
    city: initialData?.city || 'Toronto',
    description: initialData?.description || '',
    category: initialData?.category || ''
  });
  
  const [imagePreviews, setImagePreviews] = useState<string[]>(initialData?.image_urls || []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // Fix: Explicitly cast to File[] to ensure the argument to URL.createObjectURL is recognized as a valid Blob.
    const newPreviews = (files as File[]).map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postData: CommunityPost = {
      ...formData,
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      image_urls: imagePreviews,
      createdAt: initialData?.createdAt || 'Just now',
      lat: initialData?.lat || 43.6532,
      lng: initialData?.lng || -79.3832,
      author: initialData?.author || 'Current User',
      phone_hash: initialData?.phone_hash
    };
    onSubmit(postData);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn pb-12">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-xl shadow-soft flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
          {initialData ? (lang === 'ko' ? '게시글 수정' : 'Edit Listing') : (lang === 'ko' ? `${title} 등록` : `Post to ${title}`)}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[40px] shadow-soft border border-white space-y-8">
        {/* Multi-Image Upload Area */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Listing Photos (Multi)</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {imagePreviews.map((url, idx) => (
              <div key={idx} className="relative h-32 rounded-2xl overflow-hidden border-2 border-indigo-50 group">
                <img src={url} className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 w-7 h-7 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <label className="h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 transition-all">
              <Camera size={20} className="text-slate-300" />
              <span className="text-[9px] font-black text-slate-400 uppercase">Add Photo</span>
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Title</label>
            <input 
              required
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="What are you listing?"
              className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 focus:bg-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Price / Salary</label>
            <input 
              type="text" 
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              placeholder="$0.00"
              className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 focus:bg-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Location</label>
          <div className="relative">
            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select 
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 appearance-none focus:bg-white"
            >
              <option>Toronto</option>
              <option>Vancouver</option>
              <option>Montreal</option>
              <option>Calgary</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Description</label>
          <textarea 
            required
            rows={5}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Share more details about your listing..."
            className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 font-medium text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 focus:bg-white"
          ></textarea>
        </div>

        <button 
          type="submit"
          className="w-full h-16 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/30 hover:translate-y-[-2px] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <Upload size={20} /> {initialData ? 'Update Listing' : 'Publish Listing'}
        </button>
      </form>
    </div>
  );
};

export default PostCreationView;
