import React from 'react';
import bg from '../assets/bg.png';

const MainContent = ({ selectedGroup, notes, newNoteText, onNoteInputChange, onNoteInputKeyDown, onAddNote, isMobile, onGoBack }) => {
  
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${day} ${month} ${year}   ${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  if (!selectedGroup) {
    return (
      <div className="main-content">
        <div className="initial-screen">
          <div className="pocket-notes-image">
            <img src={bg} alt="Pocket Notes Illustration" />
          </div>
          <h1 className="initial-title">Pocket Notes</h1>
          <p className="initial-subtitle">
            Send and receive messages without keeping your phone online.<br />
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone
          </p>
          <p className="encryption-text">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: 'middle', marginRight: '5px' }}>
              <path d="M12 11.25c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM18 10h-1v-2c0-2.76-2.24-5-5-5s-5 2.24-5 5v2h-1c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            </svg>
            end-to-end encrypted
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="notes-header">
        {isMobile && (
          <button className="back-btn" onClick={onGoBack}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
        )}
        <div className="notes-initials" style={{ backgroundColor: selectedGroup.color }}>{selectedGroup.initials}</div>
        <div className="notes-group-name">{selectedGroup.name}</div>
      </div>
      <div className="notes-body">
        <div className="scrollable-notes-container">
          {notes.length === 0 ? (
            <div className="no-notes-message">No notes yet. Start writing!</div>
          ) : (
            notes.map(note => (
              <div key={note.id} className="note-item">
                <p className="note-text">{note.text}</p>
                <div className="note-metadata">{formatDateTime(note.createdAt)}</div>
              </div>
            ))
          )}
        </div>
      </div>
<div className="notes-footer" style={{ position: 'relative' }}>
  <textarea
    placeholder="Enter your text here........"
    value={newNoteText}
    onChange={onNoteInputChange}
    onKeyDown={onNoteInputKeyDown}
    className="note-input"
  />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`note-footer-svg ${newNoteText.trim().length > 0 ? 'active' : ''}`}
    onClick={() => {
      if (newNoteText.trim().length > 0) onAddNote();
    }}
  >
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
</div>

    </div>
  );
};

export default MainContent;
