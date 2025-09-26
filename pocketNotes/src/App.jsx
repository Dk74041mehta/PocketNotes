import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import MainContent from './Components/MainContent';
import CreateGroupPopup from './Components/CreateGroupPopup';
import './App.css';

const App = () => {
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem('notesAppGroups');
    return saved ? JSON.parse(saved) : [];
  });

  const [groupNotes, setGroupNotes] = useState(() => {
    const saved = localStorage.getItem('notesAppAllNotes');
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupColor, setNewGroupColor] = useState('#B38B59');
  const [newNoteText, setNewNoteText] = useState('');
  const [inputError, setInputError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showMainContent, setShowMainContent] = useState(false);

  const groupColors = ['#B38B59', '#FF79F2', '#43E6F6', '#0047FF', '#6691FF', '#9E9E9E'];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load selected group from storage
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

  // Save groups
  useEffect(() => {
    localStorage.setItem('notesAppGroups', JSON.stringify(groups));
  }, [groups]);

  // Save notes
  useEffect(() => {
    localStorage.setItem('notesAppAllNotes', JSON.stringify(groupNotes));
  }, [groupNotes]);

  // Save selected group
  useEffect(() => {
    if (selectedGroup) {
      localStorage.setItem('notesAppSelectedGroupId', selectedGroup.id);
    } else {
      localStorage.removeItem('notesAppSelectedGroupId');
    }
  }, [selectedGroup]);

  // Select a group
  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    if (isMobile) setShowMainContent(true);
  };

  // Create a new group
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

    // Generate initials
    const words = trimmedName.split(' ').filter(Boolean);
    let initials = '';
    if (words.length === 1) initials = words[0][0].toUpperCase();
    else if (words.length === 2) initials = (words[0][0] + words[1][0]).toUpperCase();
    else initials = (words[0][0] + words[words.length - 1][0]).toUpperCase();

    const newGroup = {
      id: Date.now().toString(),
      name: trimmedName,
      initials,
      color: newGroupColor,
      createdAt: new Date().toISOString(),
    };

    setGroups([...groups, newGroup]);
    setSelectedGroup(newGroup);
    setGroupNotes(prev => ({ ...prev, [newGroup.id]: [] })); // empty notes for new group
    setNewGroupName('');
    setShowPopup(false);
    setInputError('');
    if (isMobile) setShowMainContent(true);
  };

  // Add a new note
  const handleAddNewNote = () => {
    if (!selectedGroup || newNoteText.trim() === '') return;

    const newNote = {
      id: Date.now().toString(),
      text: newNoteText.trim(),
      createdAt: new Date().toISOString(),
    };

    setGroupNotes(prev => {
      const updated = { ...prev };
      const notesForGroup = updated[selectedGroup.id] || [];
      updated[selectedGroup.id] = [...notesForGroup, newNote];
      return updated;
    });

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
