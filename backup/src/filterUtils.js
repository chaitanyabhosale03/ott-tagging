// filterUtils.js - Filter and search utilities
export const filterFilms = (films, filters) => {
  const { searchTerm, language, genre, tone, maturity, mood } = filters;
  
  return films.filter(film => {
    const matchesSearch = film.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         film.theme.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         film.director.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLanguage = language === 'All' || film.language === language;
    const matchesGenre = genre === 'All' || film.genre.includes(genre);
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