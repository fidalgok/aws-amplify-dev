import React from 'react';
import styled from '@emotion/styled';
import AppContainer from '../layout/AppContainer';
import Form from './Form'
import Notes from './Notes'
import { UserContext } from '../App';
import { Auth } from 'aws-amplify';


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

const Header = styled.header`
  text-align: center;
`;

const SignOut = styled.button`
  color: #777;
`;


const LoggedIn = (props) => {
  const [notes, setNotes] = React.useState([]);
  const [filter, setFilter] = React.useState('none');
  const user = React.useContext(UserContext);


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
      <Header>
        <h1 style={{ textAlign: 'center' }}>Notes for {user.username}</h1>
        <SignOut onClick={() => Auth.signOut().then(() => window.location.reload())}>Signout</SignOut>
      </Header>
      <Form setNotes={setNotes} />
      <Notes
        notes={filteredNotes}
        setNotes={setNotes}
      />
      <FilterMenu>
        <button onClick={() => updateFilter('none')}>All</button>
        <button onClick={() => updateFilter('completed')}>Completed</button>
        <button onClick={() => updateFilter('new')}>Pending</button>
      </FilterMenu>
    </AppContainer>
  );
}

export default LoggedIn;