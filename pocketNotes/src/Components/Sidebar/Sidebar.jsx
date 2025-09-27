import React from 'react';

const Sidebar = ({ groups, selectedGroup, onGroupSelect, onCreateGroupClick }) => {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">Pocket Notes</h1>
      <div className="group-list">
        {groups.map(group => (
          <div
            key={group.id}
            className={`group-item ${selectedGroup?.id === group.id ? 'active' : ''}`}
            onClick={() => onGroupSelect(group)}
          >
            <div className="group-initials" style={{ backgroundColor: group.color }}>
              {group.initials}
            </div>
            <div className="group-name">{group.name}</div>
          </div>
        ))}
      </div>
      <button onClick={onCreateGroupClick} className="add-btn">+</button>
    </div>
  );
};

export default Sidebar;
