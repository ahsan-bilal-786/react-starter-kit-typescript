import React, { useState, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Card, Alert } from 'react-bootstrap';
import { APP_NAME } from 'config';
import { authenticateUserAction } from 'pages/Auth/ducks/actions';
import { AppRoutes } from 'routes';
import TextField from 'elements/Form/TextField';
import { FilledButton, BorderedButton } from 'elements/Button';

interface ILogin {
  authenticateUser: any;
  history: any;
}

const initStates = {
  email: '',
  password: '',
};

const validation = Yup.object({
  email: Yup.string().email().required('Emails should not be empty.'),
  password: Yup.string().required('Password should not be empty.'),
});

const Login: FunctionComponent<ILogin> = ({ authenticateUser, history }) => {
  const [errorMsg, handleErrorMsg] = useState('');
  const [isSubmitting, handleSubmission] = useState(false);
  const handleSubmit = (values: any, { setErrors }: any) => {
    handleSubmission(true);
    const { email, password } = values;
    authenticateUser(email, password)
      .then((resp: any) => {
        if (resp) {
          history.push(AppRoutes.DASHBOARD.path);
        }
        handleSubmission(false);
      })
      .catch((error: any) => {
        history.push(AppRoutes.DASHBOARD.path);
        let fieldError = {};
        if (error && error.message) {
          handleErrorMsg(error.message);
        }
        if (error.email) {
          fieldError = error.email;
        }
        if (error.password) {
          fieldError = error.password;
        }
        setErrors(fieldError);
        handleSubmission(false);
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
        <div className='text-center pt-4'>
          <Link to={AppRoutes.SIGNUP.path}>
            Signup if you don't have an account yet
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    authenticateUser: (email: string, password: string) =>
      dispatch(authenticateUserAction(email, password)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
