import React, { Component, ReactNode } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface IProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

interface IState {
  isOpen: boolean;
}

class ModalWindow extends Component<IProps, IState> {
  render() {
    const { title, children, isOpen } = this.props;

    return <></>;
  }
}

export default ModalWindow;
