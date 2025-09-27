import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import MainContent from './Components/MainContent/MainContent';
import CreateGroupPopup from './Components/CreateGroupPopup/CreateGroupPopup';
import './App.css';
import { getFromStorage, saveToStorage } from './utils/storage';
import { generateInitials } from './utils/helper';

const App = () => {
  const [groups, setGroups] = useState(() => getFromStorage('notesAppGroups', []));
  const [groupNotes, setGroupNotes] = useState(() => getFromStorage('notesAppAllNotes', {}));
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupColor, setNewGroupColor] = useState('#B38B59');
  const [newNoteText, setNewNoteText] = useState('');
  const [inputError, setInputError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showMainContent, setShowMainContent] = useState(false);

  const groupColors = ['#B38B59', '#FF79F2', '#43E6F6', '#0047FF', '#6691FF', '#9E9E9E'];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load selected group
  useEffect(() => {
    const storedSelectedGroupId = localStorage.getItem('notesAppSelectedGroupId');
    if (storedSelectedGroupId) {
      const group = groups.find(g => g.id === storedSelectedGroupId);
      if (group) {
        setSelectedGroup(group);
        if (isMobile) setShowMainContent(true);
      }
    }
  }, [groups, isMobile]);

  // Persist data
  useEffect(() => saveToStorage('notesAppGroups', groups), [groups]);
  useEffect(() => saveToStorage('notesAppAllNotes', groupNotes), [groupNotes]);
  useEffect(() => {
    if (selectedGroup) localStorage.setItem('notesAppSelectedGroupId', selectedGroup.id);
    else localStorage.removeItem('notesAppSelectedGroupId');
  }, [selectedGroup]);

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    if (isMobile) setShowMainContent(true);
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    const trimmedName = newGroupName.trim();

    if (trimmedName.length < 2) {
      setInputError('Group name must be at least 2 characters long.');
      return;
    }

    if (groups.some(g => g.name.toLowerCase() === trimmedName.toLowerCase())) {
      setInputError('Group with this name already exists.');
      return;
    }

    const newGroup = {
      id: Date.now().toString(),
      name: trimmedName,
      initials: generateInitials(trimmedName),
      color: newGroupColor,
      createdAt: new Date().toISOString(),
    };

    setGroups([...groups, newGroup]);
    setSelectedGroup(newGroup);
    setGroupNotes(prev => ({ ...prev, [newGroup.id]: [] }));
    setNewGroupName('');
    setShowPopup(false);
    setInputError('');
    if (isMobile) setShowMainContent(true);
  };

  const handleAddNewNote = () => {
    if (!selectedGroup || newNoteText.trim() === '') return;

    const newNote = { id: Date.now().toString(), text: newNoteText.trim(), createdAt: new Date().toISOString() };

    setGroupNotes(prev => ({
      ...prev,
      [selectedGroup.id]: [...(prev[selectedGroup.id] || []), newNote],
    }));

    setNewNoteText('');
  };

  const handleGoBack = () => setShowMainContent(false);

  const notesForSelectedGroup = selectedGroup ? groupNotes[selectedGroup.id] || [] : [];

  return (
    <div className="app-container">
      {(!isMobile || (isMobile && !showMainContent)) && (
        <Sidebar
          groups={groups}
          selectedGroup={selectedGroup}
          onGroupSelect={handleGroupSelect}
          onCreateGroupClick={() => setShowPopup(true)}
        />
      )}

      {(!isMobile || (isMobile && showMainContent)) && (
        <MainContent
          selectedGroup={selectedGroup}
          notes={notesForSelectedGroup}
          newNoteText={newNoteText}
          onNoteInputChange={(e) => setNewNoteText(e.target.value)}
          onNoteInputKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleAddNewNote();
            }
          }}
          onAddNote={handleAddNewNote}
          isMobile={isMobile}
          onGoBack={handleGoBack}
        />
      )}

      <CreateGroupPopup
        show={showPopup}
        onSubmit={handleCreateGroup}
        groupName={newGroupName}
        onGroupNameChange={(e) => { setNewGroupName(e.target.value); setInputError(''); }}
        inputError={inputError}
        groupColors={groupColors}
        selectedColor={newGroupColor}
        onColorSelect={setNewGroupColor}
      />
    </div>
  );
};

export default App;
