import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

import css from './styles.scss';

interface IProps {
  type?: string;
  message?: string;
  isShow: boolean;
}

interface IState {
  isShow: boolean;
}

export class Notification extends Component<IProps, IState> {
  state = {
    isShow: false,
  };

  componentDidMount(): void {
    this.setState({ isShow: this.props.isShow });
  }

  componentDidUpdate(prevProps: Readonly<IProps>): void {
    if (prevProps.isShow !== this.props.isShow) {
      this.setState({ isShow: this.props.isShow });
    }
  }

  handleSetShow = (isShow: boolean) => {
    this.setState({ isShow });
  };

  render() {
    const { isShow } = this.state;
    const { message } = this.props;
    return (
      <Row className={css.notiWrapper}>
        <Col xs={6}>
          <Toast
            onClose={() => this.handleSetShow(false)}
            show={isShow}
            delay={3000}
            autohide
            className={css.toastContainer}
          >
            <Toast.Header>
              <strong className="me-auto">Event!</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </Col>
      </Row>
    );
  }
}

export default Notification;
