import { useState } from 'react';
import { Input, Button } from '@fluentui/react-components';

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('');

  const submit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    }
  };

  return (
    <div>
      <Input
        value={text}
        onChange={(_, data) => setText(data.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a todo"
      />
      <Button appearance="primary" onClick={submit}>
        Add
      </Button>
    </div>
  );
}
