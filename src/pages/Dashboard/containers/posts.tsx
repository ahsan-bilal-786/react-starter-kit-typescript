import { useGetPostsQuery } from "api/posts";
import ListPage from "components/Posts/Lists";
import React from "react";

const ListContainer = (Content: any) => {
  const Component = (props: any) => {
    const postsQuery = useGetPostsQuery({
      skip: false,
    });
    return <Content posts={postsQuery} {...props} />;
  };
  return Component;
};

export const PostsContainer = ListContainer(ListPage);
