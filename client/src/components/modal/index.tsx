import React, {Component, ReactNode} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface IProps{
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

interface IState{
  isOpen: boolean;
}

class ModalWindow extends Component<IProps, IState>{
    

  private handleSaveButton = () =>{

  }

  private handleCloseButton = () =>{
    this.props.onClose?.();
  }

  render(){
    const {title, children, isOpen} = this.props;
 
    return(
      <Modal show={isOpen} onHide={this.handleCloseButton}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCloseButton}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSaveButton}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  
}

export default ModalWindow;