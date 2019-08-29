import React from 'react';
import styled from '@emotion/styled';
import { FaTimes, FaCircle } from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';


const Container = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, .15);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.p`
  font-size: 18px;
  text-align: left;
  flex: 1;
  padding: 0 1.2rem;
`;

const NewIcon = styled(FaCircle)`
  margin-right: 10;
  cursor: pointer;
  opacity: .3;
`;

const Note = ({ note, ...props }) => {
  const { name, status, description } = note;


  return (
    <Container>
      {status === 'new' && (
        <NewIcon
          color='#FF9900'
          size={22}
          onClick={() => props.updateNote({ status: 'completed' })}
        />
      )}
      {status === 'completed' && (
        <MdCheckCircle
          color='#FF9900'
          size={22}
          onClick={() => props.updateNote({ status: 'new' })}
        />
      )}
      <Name>{name}</Name>
      <div>
        <FaTimes
          onClick={() => props.deleteNote()}
          color='red'
          size={22}
          style={{ opacity: '.7' }}
        />
      </div>
    </Container>
  );
}

export default Note;