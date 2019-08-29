import React from 'react';
import Note from './Note';
import styled from '@emotion/styled';
import { API, graphqlOperation } from 'aws-amplify';
import { listTodos } from '../graphql/queries';
import { updateTodo, deleteTodo } from '../graphql/mutations';

const Container = styled.div`
  @media (max-width: 360px) {
    width: calc(100% - 40px);
    margin: 0 auto;
  }
`;
const Notes = ({ notes, setNotes }) => {


  React.useEffect(() => {
    // go to api and find notes
    const fetchNotes = async () => {
      const result = await API.graphql(graphqlOperation(listTodos));
      console.log(result)
      setNotes(result.data.listTodos.items.sort((a, b) => {
        if (a.updatedAt > b.updatedAt) return -1;
        return 1;
      }))
    }
    fetchNotes();
  }, []);




  return (
    <Container>
      {
        notes.map((note, i) => (
          <Note
            key={i}
            note={note}
            deleteNote={
              async () => {
                const result = await API.graphql(graphqlOperation(deleteTodo, {
                  input: {
                    id: note.id
                  }
                }));
                console.log('deleted note: ', result);
                setNotes(notes.filter(n => n.id !== note.id));
              }
            }
            updateNote={
              async function updateNote(values) {
                const result = await API.graphql(graphqlOperation(updateTodo, {
                  input: {
                    ...note,
                    ...values
                  }
                }));
                console.log('updated note', result)
                setNotes(notes.map(n => n.id === note.id ? result.data.updateTodo : n));

              }
            }
          />
        ))
      }
    </Container>
  );
}

export default Notes;