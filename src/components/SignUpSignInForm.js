import React, { useState, useReducer } from 'react'
import styled from '@emotion/styled';
import { Auth } from 'aws-amplify'

const initialFormState = {
  username: '', password: '', email: '', confirmationCode: ''
}

const FormContainer = styled.div`
  margin: 3.2rem auto 0;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;

const Input = styled.input`
  font-size: inherit;
  padding: 1.6rem 4px;
  margin-bottom: 2.4rem;
  color: inherit;
  border: none;
  border-bottom: 2px solid hsl(205, 85%, 95%);
  width: 300px;

  &:focus {
    outline: none;
    border-color: hsl(205, 85%, 45%);
  }
`;

const Button = styled.button`
  display: inline-block;
  width: 300px;
`;



export default function Form() {
  const [formType, updateFormType] = useState('signIn')
  const [formState, updateFormState] = useReducer(reducer, initialFormState)

  function renderForm() {
    switch (formType) {
      case 'signUp':
        return (
          <SignUp
            signUp={() => signUp(formState, updateFormType)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
          />
        )
      case 'confirmSignUp':
        return (
          <ConfirmSignUp
            confirmSignUp={() => confirmSignUp(formState, updateFormType)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
          />
        )
      case 'signIn':
        return (
          <SignIn
            signIn={() => signIn(formState)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
          />
        )
      default:
        return null
    }
  }


  return (
    <FormContainer>
      <FormWrapper>
        {renderForm(formState)}
      </FormWrapper>
      {
        formType === 'signUp' && (
          <p style={{ textAlign: 'center' }}>
            Already have an account? <span
              onClick={() => updateFormType('signIn')}
            >Sign In</span>
          </p>
        )
      }
      {
        formType === 'signIn' && (
          <p style={{ textAlign: 'center' }}>
            Need an account? <span

              onClick={() => updateFormType('signUp')}
            >Sign Up</span>
          </p>
        )
      }
    </FormContainer>
  )
}

function SignUp(props) {
  return (
    <>
      <Input
        name='username'
        onChange={e => { e.persist(); props.updateFormState(e) }}
        placeholder='username'
      />
      <Input
        type='password'
        name='password'
        onChange={e => { e.persist(); props.updateFormState(e) }}

        placeholder='password'
      />
      <Input
        name='email'
        onChange={e => { e.persist(); props.updateFormState(e) }}

        placeholder='email'
      />
      <Button onClick={props.signUp} className="primary">
        Sign Up
      </Button>
    </>
  )
}

function SignIn(props) {
  return (
    <>
      <Input
        name='username'
        onChange={e => { e.persist(); props.updateFormState(e) }}

        placeholder='username'
      />
      <Input
        type='password'
        name='password'
        onChange={e => { e.persist(); props.updateFormState(e) }}

        placeholder='password'
      />
      <Button onClick={props.signIn} className="primary">
        Sign In
      </Button>
    </>
  )
}

function ConfirmSignUp(props) {
  return (
    <>
      <Input
        name='confirmationCode'
        placeholder='Confirmation Code'
        onChange={e => { e.persist(); props.updateFormState(e) }}

      />
      <Button onClick={props.confirmSignUp} className="primary">
        Confirm Sign Up
      </Button>
    </>
  )
}

function reducer(state, action) {
  switch (action.type) {
    case 'updateFormState':
      return {
        ...state, [action.e.target.name]: action.e.target.value
      }
    default:
      return state
  }
}

async function signUp({ username, password, email }, updateFormType) {
  try {
    await Auth.signUp({
      username, password, attributes: { email }
    })
    console.log('sign up success!')
    updateFormType('confirmSignUp')
  } catch (err) {
    console.log('error signing up..', err)
  }
}

async function confirmSignUp({ username, confirmationCode }, updateFormType) {
  try {
    await Auth.confirmSignUp(username, confirmationCode)
    console.log('confirm sign up success!')
    updateFormType('signIn')
  } catch (err) {
    console.log('error signing up..', err)
  }
}

async function signIn({ username, password }) {
  try {
    await Auth.signIn(username, password)
    console.log('sign in success!')
  } catch (err) {
    console.log('error signing up..', err)
  }
}

