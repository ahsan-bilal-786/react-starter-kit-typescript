import React, { useState, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Card, Alert } from 'react-bootstrap';
import { APP_NAME } from 'config';
import { MainRoutes } from '../../routes';
import TextField from 'elements/Form/TextField';
import { FilledButton, BorderedButton } from 'elements/Button';
import { FormButtons } from './styles';
import {createPostAction} from '../../actions/postsActions';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';



const initStates = {
  title: '',
  body: '',
};

const validation = Yup.object({
  title: Yup.string().required('Post title should not be empty.'),
  body: Yup.string().required('Post body should not be empty.'),
});

const NewPost: FunctionComponent = () => {
  const [errorMsg, handleErrorMsg] = useState('');
  const [isSubmitting, handleSubmission] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (values: any, { setErrors }: any) => {
    handleSubmission(true);
    // const { title, body } = values;
    toast.info('Post Created!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      });
    console.log(values);
    dispatch(createPostAction(values));
    history.push(MainRoutes.POSTS.path);
    handleSubmission(false);
  };

  const handleReset = () => {
    console.log('clicked reset')
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
          onReset={handleReset}
        >
          <Form>
            <TextField
              label='Title'
              name='title'
              type='text'
              placeholder='Enter post title'
            />
            <TextField
              label='Details'
              name='body'
              type='text'
              placeholder='Please enter post details'
            />
            <FormButtons>
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
            </FormButtons>
          </Form>
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default NewPost;