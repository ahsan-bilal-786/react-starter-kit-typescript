import React, { memo, FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';

const BorderedButton: FunctionComponent<any> = ({ children, ...rest }) => {
  return (
    <Button variant='outline-dark' {...rest}>
      {children}
    </Button>
  );
};

export default memo(BorderedButton);
