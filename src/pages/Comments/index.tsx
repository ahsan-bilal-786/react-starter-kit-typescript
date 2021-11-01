import React, { FC, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PostCard, PostsWrapper } from './style';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { fetchPostCommentsAction } from 'actions/postsActions';
import Loader from 'components/Loader/Loader';
import map from 'lodash/map';

interface IComments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
const Comments: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const posts = useSelector((state: RootStateOrAny) => state.posts);

  useEffect(() => {}, [posts]);

  return (
    <PostsWrapper>
      <h3 className='text-center'>{`Post's Comments`}</h3>
      {/* <UpdateModal /> */}
      <Container>
        {isLoading ? (
          <Loader typeOfVariant='primary' />
        ) : (
          <Row sm='1'>
            {map(posts.comments, (c: IComments) => {
              return (
                <Col key={c.id}>
                  <PostCard>
                    <strong className='d-block mb-2 text-capitalize'>
                      {c.name}
                    </strong>
                    <strong className='d-block mb-2 text-capitalize'>
                      {c.email}
                    </strong>
                    <span className='d-block'>{c.body}</span>
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

export default Comments;
