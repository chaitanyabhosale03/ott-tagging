// moodRecommendations.js - Mood-based recommendation engine
export const generateMoodRecommendations = (films) => {
  return {
    "Suspenseful Rural Dramas": films.filter(f => 
      f.tone === "Suspenseful" || 
      f.tone === "Intense" || 
      f.theme.includes("Caste Violence") ||
      f.mood.includes("Rural")
    ),
    
    "Uplifting Sports Films": films.filter(f => 
      f.genre.includes("Sports") && 
      (f.tone === "Uplifting" || f.tone === "Inspirational" || f.tone === "Emotional")
    ),
    
    "Dark Comedy Thrillers": films.filter(f => 
      f.genre.includes("Comedy") && 
      f.genre.includes("Thriller") && 
      f.tone === "Dark"
    ),
    
    "Heartwarming Family Stories": films.filter(f => 
      f.theme.includes("Family") && 
      (f.tone === "Heartwarming" || f.tone === "Uplifting")
    ),
    
    "Intense Social Dramas": films.filter(f => 
      f.theme.some(t => ["Social Justice", "Caste", "Women's Rights", "Social Issues"].includes(t)) &&
      (f.tone === "Serious" || f.tone === "Intense" || f.tone === "Raw")
    ),
    
    "Light Romantic Comedies": films.filter(f => 
      f.genre.includes("Romance") && 
      f.genre.includes("Comedy") && 
      f.tone === "Light"
    ),
    
    "Nostalgic Period Pieces": films.filter(f => 
      f.tone === "Nostalgic" || 
      f.theme.includes("Memory") || 
      f.theme.includes("Time")
    ),
    
    "Inspirational Biopics": films.filter(f => 
      f.genre.includes("Biography") && 
      (f.tone === "Inspirational" || f.tone === "Uplifting")
    )
  };
};

export const getMoodProfile = (film) => {
  const profiles = [];
  
  // Genre-based profiles
  if (film.genre.includes("Sports")) profiles.push("Athletic Achievement");
  if (film.genre.includes("Romance")) profiles.push("Love Story");
  if (film.genre.includes("Thriller")) profiles.push("Edge-of-Seat Suspense");
  if (film.genre.includes("Comedy")) profiles.push("Laugh-Out-Loud");
  if (film.genre.includes("Drama")) profiles.push("Emotional Journey");
  
  // Tone-based profiles
  if (film.tone === "Dark") profiles.push("Gritty Realism");
  if (film.tone === "Uplifting") profiles.push("Feel-Good Vibes");
  if (film.tone === "Intense") profiles.push("High Stakes Drama");
  if (film.tone === "Nostalgic") profiles.push("Memory Lane");
  
  // Theme-based profiles
  if (film.theme.includes("Family")) profiles.push("Family Bonds");
  if (film.theme.includes("Social Justice")) profiles.push("Consciousness Raising");
  if (film.theme.includes("Self-Discovery")) profiles.push("Personal Growth");
  
  return profiles.length > 0 ? profiles : ["General Entertainment"];
};

export const getViewingRecommendation = (film) => {
  const recommendations = {
    mood: [],
    audience: [],
    occasion: []
  };
  
  // Mood recommendations
  if (film.tone === "Uplifting" || film.tone === "Inspirational") {
    recommendations.mood.push("When you need motivation");
  }
  if (film.tone === "Dark" || film.tone === "Intense") {
    recommendations.mood.push("When you want something gripping");
  }
  if (film.tone === "Light" || film.tone === "Heartwarming") {
    recommendations.mood.push("When you want to relax");
  }
  
  // Audience recommendations
  if (film.maturity === "U") {
    recommendations.audience.push("Perfect for family viewing");
  }
  if (film.maturity === "A") {
    recommendations.audience.push("Adult audiences only");
  }
  if (film.theme.includes("Family")) {
    recommendations.audience.push("Great for multi-generational viewing");
  }
  
  // Occasion recommendations
  if (film.genre.includes("Comedy")) {
    recommendations.occasion.push("Movie night with friends");
  }
  if (film.genre.includes("Romance")) {
    recommendations.occasion.push("Date night");
  }
  if (film.theme.includes("Social Issues")) {
    recommendations.occasion.push("Thought-provoking evening");
  }
  
  return recommendations;
};