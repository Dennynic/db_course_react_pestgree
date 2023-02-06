import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface IProps {
  onClose: () => void;
}

function Footer({ onClose }: IProps) {
  return (
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Закрыть
      </Button>
      <Button variant="primary" type="submit">
        Сохранить
      </Button>
    </Modal.Footer>
  );
}

export default Footer;
