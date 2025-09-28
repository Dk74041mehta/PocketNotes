import React from 'react';

const CreateGroupPopup = ({
  show,
  onClose,              // <- yaha add karo
  onSubmit,
  groupName,
  onGroupNameChange,
  inputError,
  groupColors,
  selectedColor,
  onColorSelect
}) => {

  if (!show) return null;

  // Overlay par click ho toh popup close karo
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup-overlay')) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-content">
        <h2 className="popup-title">Create New Group</h2>

        <form onSubmit={onSubmit}>
          {/* Group Name Input */}
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

          {/* Color selection */}
          <div className="popup-color-container">
            <label className="popup-label">Choose Colour</label>
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

          {/* Error message */}
          {inputError && <p className="popup-error">{inputError}</p>}

          {/* Create button */}
          <div className="popup-actions">
            <button type="submit" className="popup-create-btn">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupPopup;
