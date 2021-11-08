import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from 'store';
import { AppActions } from 'actions/types';
import { getComments } from 'actions/postsActions';
import map from 'lodash/map';
import Loader from 'components/Loader/Loader';
import { PostCard, PostsWrapper } from './style';

const Comments: FC<ComponentProps> = ({ comments, getComments }) => {
  const { pid } = useParams<{ pid: string }>();
  useEffect(() => {
    getComments(+pid);
  }, []);
  return (
    <PostsWrapper>
      <h3 className='text-center'>{`Post's Comments`}</h3>
      <Container>
        <Row sm='1'>
          {comments?.loading ? (
            <Loader typeOfVariant='primary' />
          ) : (
            map(comments?.data, (c: any) => {
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
            })
          )}
        </Row>
      </Container>
    </PostsWrapper>
  );
};

const mapStateToProps = (state: RootState) => ({
  comments: state.posts.comments,
});

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  getComments: bindActionCreators(getComments, dispatch),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ComponentProps = ConnectedProps<typeof connector>;

export default connector(Comments);
