import React from 'react';
import Note from './Note';
import styled from '@emotion/styled';

const Container = styled.div`
  @media (max-width: 360px) {
    width: calc(100% - 40px);
    margin: 0 auto;
  }
`;
const Notes = (props) => {
  return (
    <Container>
      {
        props.notes.map((note, i) => (
          <Note
            key={i}
            note={note}
            deleteNote={props.deleteNote}
            updateNote={props.updateNote}
          />
        ))
      }
    </Container>
  );
}

export default Notes;