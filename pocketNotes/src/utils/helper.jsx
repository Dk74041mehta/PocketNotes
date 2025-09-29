// Name se initials generate karta hai
export const generateInitials = (name) => {
  const words = name.trim().split(' ').filter(Boolean);
  if (words.length === 1) return words[0][0].toUpperCase();
  if (words.length === 2) return (words[0][0] + words[1][0]).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};
