import React, { FunctionComponent } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from 'components/Header';

const Dashboard = (Content: any) => {
  const Component: FunctionComponent<any> = (props: any) => {
    return (
      <>
        <Header />
        <Container fluid>
          <Row>
            <Col sm='12'>
              <Content {...props} />
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  return Component;
};

export default Dashboard;
