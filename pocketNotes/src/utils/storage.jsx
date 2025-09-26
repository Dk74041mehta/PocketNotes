export const saveGroups = (groups) => {
  localStorage.setItem('notesAppGroups', JSON.stringify(groups));
};

export const getGroups = () => {
  return JSON.parse(localStorage.getItem('notesAppGroups')) || [];
};

export const saveSelectedGroupId = (groupId) => {
  if (groupId) {
    localStorage.setItem('notesAppSelectedGroupId', groupId);
  } else {
    localStorage.removeItem('notesAppSelectedGroupId');
  }
};

export const getSelectedGroup = (groups) => {
  const storedSelectedGroupId = localStorage.getItem('notesAppSelectedGroupId');
  if (storedSelectedGroupId) {
    return groups.find(g => g.id === storedSelectedGroupId) || null;
  }
  return null;
};

export const saveNotes = (groupId, notes) => {
  localStorage.setItem(`notesAppNotes_${groupId}`, JSON.stringify(notes));
};

export const getNotes = (groupId) => {
  return JSON.parse(localStorage.getItem(`notesAppNotes_${groupId}`)) || [];
};
