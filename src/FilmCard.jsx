// FilmCard.jsx - Individual film card component
import React from 'react';
import { Star, Globe, PlayCircle, Tag, Calendar, User } from 'lucide-react';

const FilmCard = ({ film, onEdit, onDelete }) => {
  const getMaturityColor = (maturity) => {
    switch(maturity) {
      case 'U': return 'bg-green-100 text-green-800';
      case 'U/A': return 'bg-yellow-100 text-yellow-800';
      case 'A': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getToneColor = (tone) => {
    const colors = {
      'Uplifting': 'bg-blue-100 text-blue-800',
      'Dark': 'bg-gray-800 text-white',
      'Heartwarming': 'bg-pink-100 text-pink-800',
      'Intense': 'bg-red-100 text-red-800',
      'Light': 'bg-green-100 text-green-800',
      'Serious': 'bg-purple-100 text-purple-800',
      'Inspirational': 'bg-indigo-100 text-indigo-800',
      'Nostalgic': 'bg-amber-100 text-amber-800',
      'Realistic': 'bg-slate-100 text-slate-800',
      'Tragic': 'bg-gray-600 text-white'
    };
    return colors[tone] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 hover:bg-white/20 transition-all duration-300 hover:scale-105 relative group">
      {/* Edit/Delete buttons */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        <button
          onClick={() => onEdit(film)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded text-xs"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(film.id)}
          className="bg-red-500 hover:bg-red-600 text-white p-1 rounded text-xs"
        >
          Delete
        </button>
      </div>

      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold text-lg text-white leading-tight pr-16">{film.title}</h3>
        <PlayCircle className="h-5 w-5 text-purple-400 flex-shrink-0" />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Globe className="h-4 w-4 text-blue-400" />
          <span className="text-blue-300">{film.language}</span>
          <Calendar className="h-4 w-4 text-gray-400 ml-2" />
          <span className="text-gray-400">{film.year}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Star className="h-4 w-4 text-yellow-400" />
          <span className="text-yellow-300">{film.rating}/10</span>
          <User className="h-4 w-4 text-gray-400 ml-2" />
          <span className="text-gray-300 text-xs">{film.director}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {film.genre.map(g => (
            <span key={g} className="text-xs bg-blue-600/50 text-blue-200 px-2 py-1 rounded">
              {g}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded font-medium ${getToneColor(film.tone)}`}>
            {film.tone}
          </span>
          <span className={`text-xs px-2 py-1 rounded font-medium ${getMaturityColor(film.maturity)}`}>
            {film.maturity}
          </span>
        </div>

        <div className="text-xs text-gray-300">
          <strong>Themes:</strong> {film.theme.join(', ')}
        </div>

        <div className="text-xs text-purple-300 bg-purple-900/30 p-2 rounded">
          <Tag className="h-3 w-3 inline mr-1" />
          {film.mood}
        </div>
      </div>
    </div>
  );
};

export default FilmCard;