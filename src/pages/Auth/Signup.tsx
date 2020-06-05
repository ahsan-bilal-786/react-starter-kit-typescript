import React, { useState, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Card, Alert } from 'react-bootstrap';
import { APP_NAME } from 'config';
import { registerUserAction } from 'pages/Auth/ducks/actions';
import { AppRoutes } from 'routes';
import TextField from 'elements/Form/TextField';
import { FilledButton, BorderedButton } from 'elements/Button';

interface ISignup {
  registerUser: any;
  history: any;
}

const initStates = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
};

const validation = Yup.object({
  firstName: Yup.string().min(3).required('First Name should not be empty.'),
  lastName: Yup.string().min(3).required('Last Name should not be empty.'),
  email: Yup.string().email().required('Emails should not be empty.'),
  password: Yup.string().required('Password should not be empty.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password should not be empty.'),
});

const Signup: FunctionComponent<ISignup> = ({ registerUser, history }) => {
  const [errorMsg, handleErrorMsg] = useState('');
  const [isSubmitting, handleSubmission] = useState(false);
  const handleSubmit = (values: any, { setErrors }: any) => {
    handleSubmission(true);
    const { firstName, lastName, email, password } = values;
    registerUser(email, password, firstName, lastName)
      .then((resp: any) => {
        if (resp) {
          history.push(AppRoutes.DASHBOARD.path);
        }
        handleSubmission(false);
      })
      .catch((error: any) => {
        handleSubmission(false);
        history.push(AppRoutes.DASHBOARD.path);
        if (error && error.message) {
          handleErrorMsg(error.message);
        }
        const { firstName, lastName, email, password } = error;
        setErrors({ firstName, lastName, email, password });
      });
  };

  return (
    <Card className='px-2 py-4'>
      <Card.Title className='text-center'>{APP_NAME}</Card.Title>
      <Card.Body>
        {errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
        <Formik
          initialValues={initStates}
          validationSchema={validation}
          onSubmit={handleSubmit}
        >
          <Form>
            <TextField
              label='First Name'
              name='firstName'
              type='text'
              placeholder='First Name'
            />
            <TextField
              label='Last Name'
              name='lastName'
              type='text'
              placeholder='Last Name'
            />
            <TextField
              label='Email'
              name='email'
              type='text'
              placeholder='Email'
            />
            <TextField
              label='Password'
              name='password'
              type='password'
              placeholder='Password'
            />
            <TextField
              label='Confirm Password'
              name='confirmPassword'
              type='password'
              placeholder='Confirm Password'
            />
            <FilledButton
              type='submit'
              disabled={isSubmitting ? true : false}
              className='mr-2'
            >
              Submit
            </FilledButton>
            <BorderedButton type='reset' className='float-right'>
              Reset
            </BorderedButton>
          </Form>
        </Formik>
      </Card.Body>
    </Card>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    registerUser: (
      email: string,
      password: string,
      firstName: string,
      lastName: string
    ) => dispatch(registerUserAction(email, password, firstName, lastName)),
  };
};

export default connect(null, mapDispatchToProps)(Signup);
