import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Params, useParams } from 'react-router-dom';
import ReportBody from '../../components/reportTable/reportBody';
import ReportMenu from '../../components/reportMenu';
import { REPORT_MENU } from 'config/consts';

interface IProps {
  params: Params;
}

interface IState {}

class ReportPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  render() {
    const id = Number(this.props.params.id);
    const [page] = REPORT_MENU.filter(item => item.type == id);

    return (
      <section>
        <Container>
          <Row>
            <Col>
              <ReportMenu menuItems={REPORT_MENU} />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <h1>{page.title}</h1>

              <ReportBody type={id} />
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

function withParams(Component: React.ComponentClass) {
  return (props: any) => <Component {...props} params={useParams()} />;
}

export default withParams(ReportPage);
