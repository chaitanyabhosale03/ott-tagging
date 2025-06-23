// App.jsx - Main Application Component
import React, { useState, useEffect } from 'react';
import FilmCard from './FilmCard';
import AddFilmForm from './AddFilmForm';
import SearchFilters from './SearchFilters';
import { metadataOptions, filmsDatabase } from './filmData';
import { filterFilms } from './filterUtils';

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [films, setFilms] = useState(filmsDatabase);
  const [filters, setFilters] = useState({
    searchTerm: '',
    language: 'All',
    genre: 'All',
    tone: 'All',
    maturity: 'All',
    mood: 'All',
  });
  const [isFormOpen, setFormOpen] = useState(false);
  const [editingFilm, setEditingFilm] = useState(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const filteredFilms = filterFilms(films, filters);

  const handleSave = (film) => {
    setFilms((prev) => {
      const exists = prev.find((f) => f.id === film.id);
      if (exists) {
        return prev.map((f) => (f.id === film.id ? film : f));
      }
      return [...prev, film];
    });
  };

  const handleDelete = (id) => {
    setFilms((prev) => prev.filter((f) => f.id !== id));
  };

  const handleEdit = (film) => {
    setEditingFilm(film);
    setFormOpen(true);
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-black text-black dark:bg-gray-900 dark:text-white">
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 p-4">OTT Film Tagging System</h1>

        <SearchFilters
          filters={filters}
          onFilterChange={setFilters}
          options={metadataOptions}
          resultCount={filteredFilms.length}
          totalCount={films.length}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFilms.map((film) => (
            <FilmCard
              key={film.id}
              film={film}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
        <button
          className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 dark:text-white text-white px-5 py-3 rounded-full shadow-xl"
          onClick={() => {
            setEditingFilm(null);
            setFormOpen(true);
          }}
        >
          + Add Film
        </button>
        <button
          className="fixed top-6 right-6 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full shadow-xl z-50"
          onClick={() => setIsDark((prev) => !prev)}
          aria-label="Toggle dark mode"
        >
          Dark Mode
        </button>

        <AddFilmForm
          isOpen={isFormOpen}
          onClose={() => setFormOpen(false)}
          onSave={handleSave}
          editingFilm={editingFilm}
        />
      </div>
    </div>
  );
};

export default App;
