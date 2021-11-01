import React, { useState, FunctionComponent } from 'react';
import { APP_NAME } from 'config';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Card, Alert } from 'react-bootstrap';
import { useHistory, withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { MainRoutes } from '../../routes';
import TextField from 'elements/Form/TextField';
import { FilledButton, BorderedButton } from 'elements/Button';
import { createPostAction } from '../../actions/postsActions';
import { FormButtons } from './styles';

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
  const [formValue, setFormValues] = useState(initStates);
  const [isSubmitting, handleSubmission] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const getFormData = (values: { title: string; body: string }) => {
    console.log('getFormData::', values);
  };

  const handleSubmit = (values: any, { resetForm }: any) => {
    handleSubmission(true);
    const { title, body } = values;
    toast.info('Post Created!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    dispatch(createPostAction(title, body));
    history.push(MainRoutes.POSTS.path);
    resetForm({});
    handleSubmission(false);
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
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            resetForm,
            /* and other goodies */
          }) => {
            setFormValues(initStates);
            getFormData(values);
            return (
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
                  <BorderedButton
                    type='reset'
                    className='float-right'
                    onClick={resetForm}
                  >
                    Reset
                  </BorderedButton>
                </FormButtons>
              </Form>
            );
          }}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default withRouter(NewPost);
