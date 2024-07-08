import React from 'react';

// Define the SVG as a separate React component for cleaner code

const SquareButtonIcon = ({icon, text}) => {
  // Define the button styles
  const buttonStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '160%',
    gap: '4px',
    cursor: 'pointer',
  };

  const iconContainerStyle = {
    width: '44px',
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(207, 219, 213, 0.7)',
    borderRadius: '8px',
  };

  return (
    <div style={buttonStyle}>
      <div style={iconContainerStyle}>
        {icon}
      </div>
      {text}
    </div>
  );
};

export default SquareButtonIcon;
