import React, { useEffect, useState } from 'react';
import map from 'lodash/map';
import { Col, Container, Row } from 'react-bootstrap';
import { PostCard, PostCardActions, PostsWrapper } from './style';
import { RootStateOrAny, useDispatch, connect, useSelector } from 'react-redux';
import {
  fetchPostsAction,
  deletePostAction,
  fetchPostCommentsAction,
} from 'actions/postsActions';
import Loader from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import { MainRoutes } from 'routes';
import { useHistory, withRouter } from 'react-router-dom';
interface IPostTypes {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const Posts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const posts = useSelector((state: RootStateOrAny) => state.posts);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(fetchPostsAction());
      setIsLoading(false);
    }, 1000);
    return () => {
      // cleanup
    };
  }, [dispatch]);

  const deletePostHandler = (id: number, title: string) => {
    toast.error(`Removed ${title}!`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    dispatch(deletePostAction(id));
  };
  const fetchPostCommentsHandler = (id: number) => {
    dispatch(fetchPostCommentsAction(id));
    history.push(MainRoutes.COMMENTS.path);
  };

  return (
    <PostsWrapper>
      <h3 className='text-center'>Posts</h3>
      {/* <UpdateModal /> */}
      <Container>
        {isLoading ? (
          <Loader typeOfVariant='primary' />
        ) : (
          <Row xl={4} lg={3} md={2} sm={1} xs={1}>
            {map(posts.data, (post: IPostTypes) => {
              return (
                <Col key={post.id}>
                  <PostCard>
                    <strong className='d-block text-center mb-2 text-capitalize'>
                      {post.title}
                    </strong>
                    <span className='d-block'>{post.body}</span>
                    <PostCardActions>
                      <li
                        className='list-inline-item action'
                        onClick={() => fetchPostCommentsHandler(post.id)}
                      >
                        <a>Comments</a>
                      </li>
                      <li className='list-inline-item action'>
                        <a>Edit</a>
                      </li>
                      <li
                        className='list-inline-item action'
                        onClick={() => {
                          deletePostHandler(post.id, post.title);
                        }}
                      >
                        <a>Remove</a>
                      </li>
                    </PostCardActions>
                  </PostCard>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </PostsWrapper>
  );
};

export default withRouter(Posts);
