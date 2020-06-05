import React, { useState, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Card, Alert } from 'react-bootstrap';
import { updateProfileAction } from 'pages/Auth/ducks/actions';
import TextField from 'elements/Form/TextField';
import { FilledButton, BorderedButton } from 'elements/Button';

interface IProfile {
  updateProfile: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<any>;
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
  password: Yup.string(),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), ''],
    'Passwords must match'
  ),
});

const successNotification = 'User profile has been successully updated.';

const Profile: FunctionComponent<IProfile> = ({ updateProfile }) => {
  const [errorMsg, handleErrorMsg] = useState('');
  const [successMsg, handleSuccessMsg] = useState('');
  const [isSubmitting, handleSubmission] = useState(false);
  const handleSubmit = (values: any, { setErrors }: any) => {
    handleSubmission(true);
    handleSuccessMsg('');
    handleErrorMsg('');
    const { firstName, lastName, email, password } = values;
    updateProfile(email, password, firstName, lastName)
      .then((resp: any) => {
        handleSubmission(false);
        handleSuccessMsg(successNotification);
      })
      .catch((error: any) => {
        handleSubmission(false);
        if (error && error.message) {
          handleErrorMsg(error.message);
        }
        const { firstName, lastName, email, password } = error;
        setErrors({ firstName, lastName, email, password });
      });
  };
  return (
    <Card className='px-2 py-4 mt-4'>
      <Card.Title className='text-center'>Profile</Card.Title>
      <Card.Body>
        {errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
        {successMsg && <Alert variant='success'>{successMsg}</Alert>}
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
    updateProfile: (
      email: string,
      password: string,
      firstName: string,
      lastName: string
    ) => dispatch(updateProfileAction(email, password, firstName, lastName)),
  };
};

export default connect(null, mapDispatchToProps)(Profile);
