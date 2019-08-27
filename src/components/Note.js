import React from 'react';
import styled from '@emotion/styled';
import { FaTimes, FaCircle } from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';

const Container = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, .15);
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const Name = styled.p`
  font-size: 18px;
  text-align: left;
`;

const NewIcon = styled(FaCircle)`
  margin-right: 10;
  cursor: pointer;
  opacity: .3;
`;

const Note = ({ note, ...props }) => {
  const { name, status } = note;
  return (
    <Container>
      {status === 'new' && (
        <NewIcon
          color='#FF9900'
          size={22}
          onClick={() => props.updateNote(note)}
        />
      )}
      {status === 'completed' && (
        <MdCheckCircle
          color='#FF9900'
          size={22}
          onClick={() => props.updateNote(note)}
        />
      )}
      <p>{name}</p>
      <div>
        <FaTimes
          onClick={() => props.deleteNote(note)}
          color='red'
          size={22}
          style={{ opacity: '.7' }}
        />
      </div>
    </Container>
  );
}

export default Note;