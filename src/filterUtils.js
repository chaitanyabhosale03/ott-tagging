// filterUtils.js - Filter and search utilities
export const filterFilms = (films, filters) => {
  // Provide default values to avoid undefined errors
  const {
    searchTerm = '',
    language = 'All',
    genre = 'All',
    tone = 'All',
    maturity = 'All',
    mood = 'All',
  } = filters || {};

  return films.filter(film => {
    // Defensive: ensure film fields are strings/arrays
    const filmTitle = film.title || '';
    const filmTheme = Array.isArray(film.theme) ? film.theme : [];
    const filmDirector = film.director || '';
    const filmGenre = Array.isArray(film.genre) ? film.genre : [];
    const filmMood = film.mood || '';
    const filmLanguage = film.language || '';

    const search = searchTerm.toLowerCase();
    const matchesSearch =
      filmTitle.toLowerCase().includes(search) ||
      filmDirector.toLowerCase().includes(search) ||
      filmGenre.some(g => (g || '').toLowerCase().includes(search)) ||
      filmTheme.some(t => (t || '').toLowerCase().includes(search)) ||
      filmMood.toLowerCase().includes(search) ||
      filmLanguage.toLowerCase().includes(search);

    const matchesLanguage = language === 'All' || film.language === language;
    const matchesGenre = genre === 'All' || (Array.isArray(film.genre) ? film.genre.includes(genre) : false);
    const matchesTone = tone === 'All' || film.tone === tone;
    const matchesMaturity = maturity === 'All' || film.maturity === maturity;
    const matchesMood = mood === 'All' || film.mood === mood;

    return matchesSearch && matchesLanguage && matchesGenre && matchesTone && matchesMaturity && matchesMood;
  });
};

export const getUniqueValues = (films, property) => {
  if (property === 'genre') {
    return ['All', ...new Set(films.flatMap(film => film.genre))];
  }
  if (property === 'theme') {
    return ['All', ...new Set(films.flatMap(film => film.theme))];
  }
  return ['All', ...new Set(films.map(film => film[property]))];
};

export const sortFilms = (films, sortBy) => {
  switch (sortBy) {
    case 'title':
      return [...films].sort((a, b) => a.title.localeCompare(b.title));
    case 'year':
      return [...films].sort((a, b) => b.year - a.year);
    case 'rating':
      return [...films].sort((a, b) => b.rating - a.rating);
    case 'language':
      return [...films].sort((a, b) => a.language.localeCompare(b.language));
    default:
      return films;
  }
};

export const searchFilms = (films, query) => {
  if (!query.trim()) return films;
  
  const searchTerm = query.toLowerCase();
  return films.filter(film => 
    film.title.toLowerCase().includes(searchTerm) ||
    film.director.toLowerCase().includes(searchTerm) ||
    film.genre.some(g => g.toLowerCase().includes(searchTerm)) ||
    film.theme.some(t => t.toLowerCase().includes(searchTerm)) ||
    film.mood.toLowerCase().includes(searchTerm) ||
    film.language.toLowerCase().includes(searchTerm)
  );
};