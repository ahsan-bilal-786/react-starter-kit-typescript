import React, { FC, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { getPosts } from 'actions/postsActions';
import { RootState } from 'store';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AppActions } from 'actions/types';
import Loader from 'components/Loader/Loader';
import PostContainer from 'components/Post';
import { PostsWrapper } from 'pages/Comments/style';

const Posts: FC<ComponentProps> = ({ posts, getPosts }) => {
  const { loading, data, error } = posts;
  useEffect(() => {
    getPosts();
    return () => {
      // cleanup
    };
  }, []);

  let postContent;
  const loader = <Loader typeOfVariant='circle' />;
  const postItems = <PostContainer data={data} />;
  if (!error?.length) {
    postContent = postItems;
  } else {
    postContent = <p className='text-center'>{error}</p>;
  }

  return (
    <PostsWrapper>
      <Container>
        <h3 className='text-center'>Posts</h3>
        {loading ? loader : postContent}
      </Container>
    </PostsWrapper>
  );
};

const mapStateToProps = (state: RootState) => ({
  posts: state.posts,
});

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  getPosts: bindActionCreators(getPosts, dispatch),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ComponentProps = ConnectedProps<typeof connector>;

export default connector(Posts);
