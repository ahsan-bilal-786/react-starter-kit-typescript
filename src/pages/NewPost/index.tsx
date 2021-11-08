import React, { useState, FunctionComponent, useEffect } from 'react';
import { Card, Alert } from 'react-bootstrap';
import { APP_NAME } from 'config';
import { AppActions } from 'actions/types';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { startAddPost } from 'actions/postsActions';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FilledButton, BorderedButton } from 'elements/Button';
import { FormButtons } from './styles';

const initStates = {
  title: '',
  body: '',
};

const postValidation = Yup.object({
  title: Yup.string().required('Post title should not be empty.'),
  body: Yup.string().required('Post body should not be empty.'),
});

const NewPost: FunctionComponent<ComponentProps> = ({ addPostAction }) => {
  const [errorMsg, handleErrorMsg] = useState('');
  const [isSubmitting, handleSubmission] = useState(false);

  useEffect(() => {
    console.log(addPostAction);
  }, []);
  const formik = useFormik({
    initialValues: initStates,
    validationSchema: postValidation,
    onSubmit: (values, { resetForm }) => {
      const { title, body } = values;
      resetForm({});
      handleFormSubmit(title, body);
    },
  });

  const handleFormSubmit = (title: string, body: string) => {
    handleSubmission(true);
    addPostAction({ title, body });
    toast.info('Post Created!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    // dispatch(createPostAction(title, body));
    handleSubmission(false);
  };

  return (
    <Card className='px-2 py-4'>
      <Card.Title className='text-center'>{APP_NAME}</Card.Title>
      <Card.Body>
        {errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
        <form onSubmit={formik.handleSubmit}>
          <label className='form-label' htmlFor='title'>
            Post Title
          </label>
          <input
            className='form-control'
            id='title'
            type='text'
            {...formik.getFieldProps('title')}
          />

          {formik.touched.title && formik.errors.title ? (
            <p className='text-danger'>{formik.errors.title}</p>
          ) : null}
          <label className='form-label' htmlFor='body'>
            Post Body
          </label>
          <input
            className='form-control'
            id='body'
            type='text'
            {...formik.getFieldProps('body')}
          />

          {formik.touched.body && formik.errors.body ? (
            <p className='text-danger'>{formik.errors.body}</p>
          ) : null}
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
              onClick={formik.handleReset}
            >
              Reset
            </BorderedButton>
          </FormButtons>
        </form>
      </Card.Body>
    </Card>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  addPostAction: bindActionCreators(startAddPost, dispatch),
});

const connector = connect(null, mapDispatchToProps);
type ComponentProps = ConnectedProps<typeof connector>;

export default connector(NewPost);
