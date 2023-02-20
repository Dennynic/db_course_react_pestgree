import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import AddAutoFormModal from 'components/forms/auto_form_modal';
import { inject, observer } from 'mobx-react';
import carBrandsStore from '../../store/car-brands-store';

interface IProps {
  carBrandsStore?: typeof carBrandsStore;
}

interface IState{
  isOpen: boolean;
}

@inject('carBrandsStore')
@observer
class CarPage extends Component<IProps, IState> {
  state={
    isOpen: false,
  }
  componentDidMount() {
    this.props.carBrandsStore?.fetchList();
  }

  componentDidUpdate(prevData: any): void {
    //console.log('Update CarPage', prevData);
  }

  private handleSubmit = () => {};
  private handleClose = () => {
    this.setState({isOpen: false})
  };

  render() {
        const {isOpen} = this.state;
    return (
      <section>
        <Container>
          <h1>Авто</h1>
          <Row>
            <Col>
              <AddAutoFormModal
                carBrands={this.props.carBrandsStore?.models}
                onSubmit={this.handleSubmit}
                onClose={this.handleClose}
                isOpen={isOpen}
              />
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default CarPage;
