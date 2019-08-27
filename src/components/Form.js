import React from 'react';
import styled from '@emotion/styled';

const Input = styled.input`
  height: 3.5rem;
  width: 360px;
  border: none;
  outline: none;
  margin-left: 10px;
  font-size: 2rem;
  padding: .8rem;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.p`
  padding: 2rem 1rem;
  border-left: 3px solid hsl(345, 85%, 35%);
  background-color: hsl(345, 85%, 95%);
  color: hsl(345, 85%, 25%);
`;

const Form = ({ createNote }) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);
  const handleChange = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.length > 1) {
      createNote({ name: value, status: 'new' });
      setError(null);
      setValue('');
    } else {
      setError('Please enter a note');
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      <Input type="text" name="note" value={value} placeholder="Enter a note" onChange={handleChange} onBlur={handleChange} />
    </StyledForm>
  );
}

export default Form;