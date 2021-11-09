import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { useHistory, generatePath } from 'react-router';
import { Post } from 'actions/types';
import { startRemovePost } from 'actions/postsActions';
import { AppActions } from 'actions/types';
import { PostCard, PostCardActions } from 'pages/Posts/style';
import { MainRoutes } from 'routes';

interface IPostProps {
  data: Post[] | undefined;
}

const PostContainer: FC<IPostProps & ComponentProps> = ({
  data,
  deletePost,
}) => {
  const history = useHistory();

  const deletePostHandler = (id: number, title: string) => {
    deletePost(id);
  };

  const showCommentsHandler = (id: number) => {
    const pathToComments = generatePath(MainRoutes.COMMENTS.path, {
      pid: id,
    });
    history.push(pathToComments);
  };
  return (
    <Row xl={4} lg={3} md={2} sm={1} xs={1}>
      {data &&
        data.map((p: any) => {
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
                    onClick={() => {
                      showCommentsHandler(p.id);
                    }}
                  >
                    <a>Comments</a>
                  </li>
                  <li className='list-inline-item action'>
                    <a>Edit</a>
                  </li>
                  <li
                    className='list-inline-item action'
                    onClick={() => {
                      deletePostHandler(p.id, p.title);
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
  );
};

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  deletePost: bindActionCreators(startRemovePost, dispatch),
});

const connector = connect(null, mapDispatchToProps);
type ComponentProps = ConnectedProps<typeof connector>;

export default connector(PostContainer);