import React, { useState } from 'react';

function TextArea() {
  const [value, setValue] = useState<string>('');

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  return (
    <textarea
      value={value}
      onChange={handleOnChange}
      placeholder="Enter text here"
      style={{ height: '40px' }}
    />
  );
}

export default TextArea;
