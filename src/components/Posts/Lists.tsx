import { FunctionComponent } from "react";
import RsuiteTable from "elements/Table/RSuite";

const columns = [
  {
    title: "Title",
    dataKey: "title",
    flexGrow: 1,
  },
  {
    title: "Decription",
    dataKey: "body",
    flexGrow: 1,
  },
];

const Lists: FunctionComponent<any> = ({ posts }) => {
    console.log(posts);
  return (
    <>
      <RsuiteTable
        height="calc(100vh - 288px)"
        rowSelection={false}
        isLoading={posts.isLoading || posts.isFetching}
        columns={columns}
        data={posts.data}
      />
    </>
  );
};

export default Lists;
