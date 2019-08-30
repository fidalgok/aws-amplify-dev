import React from 'react';
import styled from '@emotion/styled';
import AppContainer from '../layout/AppContainer';
import SignUpSignInForm from './SignUpSignInForm';

const Header = styled.header`
  border-bottom: 2px solid hsl(205, 85%, 95%);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 1rem;
`;

const AppTitle = styled.p`
  padding: 2rem 0;
  margin: 0;
  font-size: 3.2rem;
`;

const LoggedOut = (props) => {
  return (
    <>
      <Header>
        <AppTitle>Scratch Pad</AppTitle>
      </Header>
      <AppContainer>
        <SignUpSignInForm />
      </AppContainer>
    </>
  );
}

export default LoggedOut;