import React, { memo, FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';

const FilledButton: FunctionComponent<any> = ({ children, ...rest }) => {
  return (
    <Button variant='dark' {...rest}>
      {children}
    </Button>
  );
};

export default memo(FilledButton);
