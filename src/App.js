import React from 'react';
import styled from '@emotion/styled';
import Amplify from 'aws-amplify';
import Form from './components/Form';
import Notes from './components/Notes';
import aws_exports from './aws-exports'; // your aws configuration information

// initialize the app with your aws backend
Amplify.configure(aws_exports);

const AppContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const FilterMenu = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    border:none;
    background: none;
    font-family: inherit;
    font-size: inherit;
    padding: 2rem 1rem;
    text-decoration: underline;
  }

  button:hover {
    cursor: pointer;
  }
`;

function App() {
  const [notes, setNotes] = React.useState([]);
  const [filter, setFilter] = React.useState('none');

  const createNote = async note => {
    const updatedNotes = [note, ...notes];
    setNotes(updatedNotes);
  }

  const updateNote = async note => {
    const updatedNote = {
      ...note,
      status: note.status === 'new' ? 'completed' : 'new'
    }
    const index = notes.findIndex(i => i.id === note.id);
    const updatedNotes = [...notes];
    updatedNotes[index] = updatedNote;
    setNotes(updatedNotes);
  }

  const deleteNote = async note => {
    const input = { id: note.id }
    const updatedNotes = notes.filter(n => n.id !== note.id);
    setNotes(updatedNotes);
  }

  const updateFilter = filter => setFilter(filter);
  let filteredNotes;
  if (filter === 'completed') {
    filteredNotes = notes.filter(note => note.status === 'completed');
  } else if (filter === 'new') {
    filteredNotes = notes.filter(note => note.status === 'new');

  } else {
    filteredNotes = notes;
  }
  return (

    <AppContainer>
      <h1>Notes</h1>
      <Form createNote={createNote} />
      <Notes
        notes={filteredNotes}
        deleteNote={deleteNote}
        updateNote={updateNote}
      />
      <FilterMenu>
        <button onClick={() => updateFilter('none')}>All</button>
        <button onClick={() => updateFilter('completed')}>Completed</button>
        <button onClick={() => updateFilter('new')}>Pending</button>
      </FilterMenu>
    </AppContainer>
  );
}

export default App;
