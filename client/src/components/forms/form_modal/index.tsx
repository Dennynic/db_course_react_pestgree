import React, { Component, ReactNode } from 'react';
import Modal from 'react-bootstrap/Modal';
import Header from './header';
import Footer from './footer';
import Form from './form';
import cn from 'classnames';

interface IProps {
  isOpen?: boolean;
  onClose: () => void;
  children?: ReactNode;
  defaultNoteType?: String;
  className?: string;
}

class FormModal extends Component<IProps> {
  static Header = Header;
  static Form = Form;
  static Footer = Footer;

  render() {
    const { isOpen, onClose, children, className } = this.props;
    const formClassName = cn(className);

    return (
      <Modal show={isOpen} onHide={onClose} className={formClassName}>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    );
  }
}

export default FormModal;
