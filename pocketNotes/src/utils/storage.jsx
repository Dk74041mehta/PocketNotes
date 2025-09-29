// localStorage se value uthata hai, agar nahi mile toh defaultValue return karta hai
export const getFromStorage = (key, defaultValue) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

// value ko localStorage me save karta hai, JSON me convert karke
export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
