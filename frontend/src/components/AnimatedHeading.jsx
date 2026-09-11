import React from 'react';

const AnimatedHeading = ({ as: Tag = 'h2', className = '', children, ...props }) => {
  const words = String(children).split(' ');

  return (
    <Tag className={`animated-heading ${className}`.trim()} {...props}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="animated-heading-word" style={{ '--word-index': index }}>
          {word}
        </span>
      ))}
    </Tag>
  );
};

export default AnimatedHeading;
