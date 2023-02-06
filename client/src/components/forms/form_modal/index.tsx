import React, { Component, ReactNode } from 'react';
import Modal from 'react-bootstrap/Modal';
import Header from './header';
import Footer from './footer';
import Form from './form';

interface IProps {
  isOpen?: boolean;
  onClose: () => void;
  children?: ReactNode;
  defaultNoteType?: String;
}

class FormModal extends Component<IProps> {
  static Header = Header;
  static Form = Form;
  static Footer = Footer;

  render() {
    const { isOpen, onClose, children } = this.props;

    return (
      <Modal show={isOpen} onHide={onClose}>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    );
  }
}

export default FormModal;
