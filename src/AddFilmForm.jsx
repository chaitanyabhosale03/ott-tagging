// AddFilmForm.jsx
import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { metadataOptions } from './filmData';

// ✅ Declare initialState outside the component
const initialState = {
  title: '',
  language: 'Hindi',
  genre: [],
  tone: 'Uplifting',
  theme: [],
  maturity: 'U',
  mood: '',
  year: new Date().getFullYear(),
  rating: 7.0,
  director: ''
};

const AddFilmForm = ({ isOpen, onClose, onSave, editingFilm = null }) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingFilm) {
      setFormData(editingFilm);
    } else {
      setFormData(initialState); // ✅ This now works
    }
  }, [editingFilm]);
  
  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Title is required.';
    if (!formData.director.trim()) errs.director = 'Director is required.';
    if (!formData.genre.length) errs.genre = 'Select at least one genre.';
    if (!formData.theme.length) errs.theme = 'Select at least one theme.';
    if (!formData.mood) errs.mood = 'Mood is required.';
    return errs;
  };

  const handleSubmit = () => {
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }
    onSave({ ...formData, id: editingFilm?.id || Date.now() });
    onClose();
  };

  const handleMultiSelectChange = (field, value) => {
    setFormData((prev) => {
      const exists = prev[field].includes(value);
      return {
        ...prev,
        [field]: exists ? prev[field].filter((v) => v !== value) : [...prev[field], value],
      };
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-lg relative">
        <button className="absolute top-3 right-3 text-red-500" onClick={onClose}>
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4">{editingFilm ? 'Edit Film' : 'Add New Film'}</h2>

        {/* Title */}
        <input
          type="text"
          className="w-full mb-2 p-2 border rounded"
          placeholder="Film Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

        {/* Director */}
        <input
          type="text"
          className="w-full mb-2 p-2 border rounded"
          placeholder="Director"
          value={formData.director}
          onChange={(e) => setFormData({ ...formData, director: e.target.value })}
        />
        {errors.director && <p className="text-red-500 text-sm">{errors.director}</p>}

        {/* Language, Tone, Maturity, Year, Rating */}
        <div className="grid grid-cols-2 gap-4 mb-2">
          <select
            className="p-2 border rounded"
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
          >
            {metadataOptions.languages.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
          <select
            className="p-2 border rounded"
            value={formData.tone}
            onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
          >
            {metadataOptions.tones.map((tone) => (
              <option key={tone}>{tone}</option>
            ))}
          </select>
          <select
            className="p-2 border rounded"
            value={formData.maturity}
            onChange={(e) => setFormData({ ...formData, maturity: e.target.value })}
          >
            {metadataOptions.maturities.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <input
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            className="p-2 border rounded"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: +e.target.value })}
          />
        </div>

        {/* Rating */}
        <input
          type="number"
          step="0.1"
          max="10"
          min="0"
          className="w-full mb-2 p-2 border rounded"
          placeholder="Rating"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: +e.target.value })}
        />

        {/* Genre Multi-select */}
        <div className="mb-2">
          <p className="font-semibold">Genres:</p>
          <div className="flex flex-wrap gap-2">
            {metadataOptions.genres.map((g) => (
              <button
                key={g}
                className={`px-3 py-1 rounded border ${
                  formData.genre.includes(g) ? 'bg-blue-600 text-red-800' : 'bg-gray-200'
                }`}
                onClick={() => handleMultiSelectChange('genre', g)}
              >
                {g}
              </button>
            ))}
          </div>
          {errors.genre && <p className="text-red-500 text-sm">{errors.genre}</p>}
        </div>

        {/* Theme Multi-select */}
        <div className="mb-2">
          <p className="font-semibold">Themes:</p>
          <div className="flex flex-wrap gap-2">
            {metadataOptions.themes.map((t) => (
              <button
                key={t}
                className={`px-3 py-1 rounded border ${
                  formData.theme.includes(t) ? 'bg-purple-600 text-black' : 'bg-gray-200'
                }`}
                onClick={() => handleMultiSelectChange('theme', t)}
              >
                {t}
              </button>
            ))}
          </div>
          {errors.theme && <p className="text-red-500 text-sm">{errors.theme}</p>}
        </div>

        {/* Mood Select */}
        <select
          className="w-full mb-4 p-2 border rounded"
          value={formData.mood}
          onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
        >
          <option value="">Select Mood</option>
          {metadataOptions.moods.map((mood) => (
            <option key={mood} value={mood}>
              {mood}
            </option>
          ))}
        </select>
        {errors.mood && <p className="text-red-500 text-sm">{errors.mood}</p>}

        <div className="flex justify-end mt-4 gap-3">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Save className="h-4 w-4" /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFilmForm;
