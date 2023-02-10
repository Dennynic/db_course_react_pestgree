import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import AddAutoFormModal from 'components/forms/add_auto_form_modal';
import { inject, observer } from 'mobx-react';
import carBrandsStore from '../../models/store/car-brands-store';

interface IProps {
  carBrandsStore?: typeof carBrandsStore;
}
@inject('carBrandsStore')
@observer
class CarPage extends Component<IProps> {
  componentDidMount() {
    this.props.carBrandsStore?.fetchList();
  }

  componentDidUpdate(prevData: any): void {
    console.log('Update CarPage', prevData);
  }

  private handleSubmit = () => {};
  private handleClose = () => {};

  render() {
    console.log('CArPageProps', this.props.carBrandsStore?.items);
    
    return (
      <section>
        <Container>
          <h1>Авто</h1>
          <Row>
            <Col>
              <AddAutoFormModal
                carBrands={this.props.carBrandsStore?.items}
                onSubmit={this.handleSubmit}
                onClose={this.handleClose}
              />
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default CarPage;
