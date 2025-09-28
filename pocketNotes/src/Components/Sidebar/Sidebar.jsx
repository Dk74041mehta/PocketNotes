import React from 'react';

const Sidebar = ({ groups, selectedGroup, onGroupSelect, onCreateGroupClick }) => {
  return (
    <div className="sidebar">
      {/* Sidebar ka title */}
      <h1 className="sidebar-title">Pocket Notes</h1>

      {/* Groups list */}
      <div className="group-list">
        {groups.map(group => (
          <div
            key={group.id}
            className={`group-item ${selectedGroup?.id === group.id ? 'active' : ''}`} // Active group highlight
            onClick={() => onGroupSelect(group)} // Group select handler
          >
            <div className="group-initials" style={{ backgroundColor: group.color }}>
              {/* Group ke initials */}
              {group.initials} 
            </div>
            <div className="group-name">{group.name}</div> {/* Group ka naam */}
          </div>
        ))}
      </div>

      {/* button to create new group */}
      <button onClick={onCreateGroupClick} className="add-btn">+</button>
    </div>
  );
};

export default Sidebar;
