import { useState } from 'react';

export function useFormInput(initialValue = '', { trim = false } = {}) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState();
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = event => {
    setValue(trim ? event.target.value.trim() : event.target.value);
    setIsDirty(true);

    // Resolve errors as soon as input becomes valid
    if (error && event.target.checkValidity()) {
      setError(null);
    }
  };

  const handleInvalid = event => {
    // Prevent native errors appearing
    event.preventDefault();
    setError(event.target.validationMessage);
  };

  const handleBlur = event => {
    if (isDirty) {
      event.target.checkValidity();
    }
  };

  return {
    value,
    error,
    onChange: handleChange,
    onBlur: handleBlur,
    onInvalid: handleInvalid,
  };
}
