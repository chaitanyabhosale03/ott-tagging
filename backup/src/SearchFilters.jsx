// SearchFilters.jsx - Search and filter controls
import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';

const SearchFilters = ({ 
  filters, 
  onFilterChange, 
  options, 
  resultCount, 
  totalCount 
}) => {
  const handleReset = () => {
    onFilterChange({
      searchTerm: '',
      language: 'All',
      genre: 'All',
      tone: 'All',
      maturity: 'All',
      mood: 'All'
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Search & Filters
        </h2>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-sm text-white transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
        {/* Search Input */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search films, themes, directors..."
            className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={filters.searchTerm}
            onChange={(e) => onFilterChange({ ...filters, searchTerm: e.target.value })}
          />
        </div>
        
        {/* Language Filter */}
        <select
          className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={filters.language}
          onChange={(e) => onFilterChange({ ...filters, language: e.target.value })}
        >
          {options.languages.map(lang => (
            <option key={lang} value={lang} className="bg-gray-800">{lang}</option>
          ))}
        </select>

        {/* Genre Filter */}
        <select
          className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={filters.genre}
          onChange={(e) => onFilterChange({ ...filters, genre: e.target.value })}
        >
          {options.genres.map(genre => (
            <option key={genre} value={genre} className="bg-gray-800">{genre}</option>
          ))}
        </select>

        {/* Tone Filter */}
        <select
          className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={filters.tone}
          onChange={(e) => onFilterChange({ ...filters, tone: e.target.value })}
        >
          {options.tones.map(tone => (
            <option key={tone} value={tone} className="bg-gray-800">{tone}</option>
          ))}
        </select>

        {/* Maturity Filter */}
        <select
          className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={filters.maturity}
          onChange={(e) => onFilterChange({ ...filters, maturity: e.target.value })}
        >
          {options.maturities.map(maturity => (
            <option key={maturity} value={maturity} className="bg-gray-800">{maturity}</option>
          ))}
        </select>
      </div>

      {/* Mood Filter - Full width */}
      <div className="mb-4">
        <label className="block text-sm text-gray-300 mb-2">Mood Profile</label>
        <select
          className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={filters.mood}
          onChange={(e) => onFilterChange({ ...filters, mood: e.target.value })}
        >
          <option value="All" className="bg-gray-800">All Moods</option>
          {options.moods.map(mood => (
            <option key={mood} value={mood} className="bg-gray-800">
              {mood.length > 50 ? mood.substring(0, 50) + '...' : mood}
            </option>
          ))}
        </select>
      </div>
      
      {/* Results Count */}
      <div className="text-center text-gray-300">
        Showing <span className="font-semibold text-purple-300">{resultCount}</span> of{' '}
        <span className="font-semibold text-purple-300">{totalCount}</span> films
      </div>
    </div>
  );
};

export default SearchFilters;