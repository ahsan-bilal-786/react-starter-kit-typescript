import React, { FC, useState, useRef, useEffect } from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import map from "lodash/map";
import get from "lodash/get";
import without from "lodash/without";
import CheckBoxCell from "./CheckboxCell";
import { useStyles } from "elements/Table/styles";

interface IColumns {
  title?: any;
  dataKey?: any;
  width?: any;
  Cell?: any;
}

interface IRSuite {
  isLoading?: boolean;
  columns?: IColumns[];
  height?: string;
  data?: any;
  dataKey?: string;
  rowSelection?: boolean;
  handleSelectRow?: (data: any) => void;
}

const RsSuite: FC<IRSuite> = ({
  isLoading,
  height,
  columns,
  data,
  dataKey,
  rowSelection,
  handleSelectRow,
}) => {
  const [checkValues, setCheckValues] = useState<any[]>([]);
  const [wrapperHeight, setHeight] = useState(0);
  const ref = useRef(null);
  const classes = useStyles();

  const tableRef = React.useRef();

  const handleCheckCellChange = (value: any) => {
    value = +value;
    let nextCheckValues: any[] = [...checkValues];

    if (nextCheckValues.includes(value)) {
      nextCheckValues = without(nextCheckValues, value);
    } else {
      nextCheckValues.push(value);
    }
    setCheckValues(nextCheckValues);
    if (handleSelectRow) handleSelectRow(nextCheckValues);
  };

  const getTableWidth = (column: any) => {
    const data: any = {};
    if (column.width) data.width = column.width;
    if (column.flexGrow) data.flexGrow = column.flexGrow;
    return data;
  };

  useEffect(() => {
    if (get(ref, "current.clientHeight"))
      setHeight(get(ref, "current.clientHeight"));
  }, []);

  return (
    <div style={{ height }} className={classes.wrapper}>
      <div className="table-container"  ref={ref}>
      <Table
        height={wrapperHeight}
        data={data}
        ref={tableRef}
        shouldUpdateScroll={false}
        loading={isLoading}
      >
        {rowSelection && (
          <Column key="checkColumn" width={56} fixed>
            <HeaderCell className="checkbox-cell">#</HeaderCell>
            <CheckBoxCell
              dataKey={dataKey}
              checked={(value: any) => {
                return checkValues.includes(value);
              }}
              onChange={handleCheckCellChange}
            />
          </Column>
        )}
        {map(columns, (column: any) => (
          <Column
            key={column.dataKey}
            align="center"
            {...getTableWidth(column)}
            fixed={column?.fixed}
          >
            <HeaderCell>{column.title}</HeaderCell>
            <Cell dataKey={column.dataKey}>{column.Cell}</Cell>
          </Column>
        ))}
      </Table>
      </div>
    </div>
  );
};

RsSuite.defaultProps = {
  dataKey: "id",
  rowSelection: true,
  height: "400px"
};

export default RsSuite;
