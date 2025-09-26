// LocalStorage helpers
export const saveGroupsToStorage = (groups) => {
  localStorage.setItem('notesAppGroups', JSON.stringify(groups));
};

export const getGroupsFromStorage = () => {
  return JSON.parse(localStorage.getItem('notesAppGroups')) || [];
};

export const saveSelectedGroupId = (groupId) => {
  localStorage.setItem('notesAppSelectedGroupId', groupId);
};

export const getSelectedGroupId = () => {
  return localStorage.getItem('notesAppSelectedGroupId');
};

export const saveNotesToStorage = (groupId, notes) => {
  localStorage.setItem(`notesAppNotes_${groupId}`, JSON.stringify(notes));
};

export const getNotesFromStorage = (groupId) => {
  return JSON.parse(localStorage.getItem(`notesAppNotes_${groupId}`)) || [];
};

// Abbreviation helper
export const getInitials = (name) => {
  const nameWords = name.trim().split(' ').filter(word => word.length > 0);
  if (nameWords.length === 1) return nameWords[0].charAt(0).toUpperCase();
  if (nameWords.length === 2) return (nameWords[0][0] + nameWords[1][0]).toUpperCase();
  if (nameWords.length >= 3) return (nameWords[0][0] + nameWords[nameWords.length - 1][0]).toUpperCase();
  return nameWords.slice(0, 2).map(word => word[0]).join('').toUpperCase();
};
