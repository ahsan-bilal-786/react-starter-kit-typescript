import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { useHistory, generatePath } from 'react-router';
import { startRemovePost } from 'actions/postsActions';
import { IPost, AppActions } from 'actions/types';
import { MainRoutes } from 'routes';
import { PostCard, PostCardActions } from 'pages/Posts/style';

interface IPostProps {
  data?: IPost[];
}

const PostContainer: FC<IPostProps & ComponentProps> = ({
  data,
  deletePost,
}) => {
  const history = useHistory();

  const deletePostHandler = (id: number) => {
    deletePost(id);
  };

  const showCommentsHandler = (id: number) => {
    const showComments = generatePath(MainRoutes.COMMENTS.path, {
      pid: id,
    });
    history.push(showComments);
  };
  return (
    <Row xl={4} lg={3} md={2} sm={1} xs={1}>
      {data &&
        data.map((p: IPost) => {
          return (
            <Col key={p.id}>
              <PostCard>
                <strong className='d-block text-center mb-2 text-capitalize'>
                  {p.title}
                </strong>
                <span className='d-block'>{p.body}</span>
                <PostCardActions>
                  <li
                    className='list-inline-item action'
                    onClick={() => showCommentsHandler(p.id as number)}
                  >
                    <a>Comments</a>
                  </li>
                  <li className='list-inline-item action'>
                    <a>Edit</a>
                  </li>
                  <li
                    className='list-inline-item action'
                    onClick={() => deletePostHandler(p.id as number)}
                  >
                    <a>Remove</a>
                  </li>
                </PostCardActions>
              </PostCard>
            </Col>
          );
        })}
    </Row>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  deletePost: bindActionCreators(startRemovePost, dispatch),
});

const connector = connect(null, mapDispatchToProps);
type ComponentProps = ConnectedProps<typeof connector>;

export default connector(PostContainer);
