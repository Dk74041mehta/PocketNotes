import React from 'react';

const CreateGroupPopup = ({ show, onSubmit, groupName, onGroupNameChange, inputError, groupColors, selectedColor, onColorSelect }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="popup-title">Create New Notes Group</h2>
        <form onSubmit={onSubmit}>
          <div className="popup-input-container">
            <label className="popup-label">Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={onGroupNameChange}
              placeholder="Enter group name"
              className="popup-input"
            />
          </div>
          <div className="popup-color-container">
            <label className="popup-label">Choose colour</label>
            <div className="color-options">
              {groupColors.map(color => (
                <div
                  key={color}
                  className={`color-circle ${selectedColor === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => onColorSelect(color)}
                />
              ))}
            </div>
          </div>
          {inputError && <p className="popup-error">{inputError}</p>}
          <div className="popup-actions">
            <button type="submit" className="popup-create-btn">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupPopup;
