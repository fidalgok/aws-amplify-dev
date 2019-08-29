import React from 'react';

import LoggedOut from './components/LoggedOut';
import LoggedIn from './components/LoggedIn';

import useAmplifyAuth from './useAmplifyAuth';

export const UserContext = React.createContext();

function App(props) {
  const { state } = useAmplifyAuth();
  console.log({ amplifyAuthState: state })
  if (state.isLoading) return null;
  return !state.user ? (
    <LoggedOut />
  ) : (
      <UserContext.Provider value={state.user}>

        <LoggedIn />
      </UserContext.Provider>
    )
}


export default App;
