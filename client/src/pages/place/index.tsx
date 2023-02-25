import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import placeStore from '../../store/place-store';
import { Place } from '../../models';
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';

interface IProps {
  placeStore?: typeof placeStore;
}

@inject('placeStore')
@observer
class PlacePage extends Component<IProps> {
  private tableHeaderItems = [
    '№ Места',
    'Цена',
    'Свободно',
    'Дата бронирования',
    'Авто',
  ];

  componentDidMount(): void {
    this.fetchPlaces();
  }

  componentDidUpdate(prevData: any): void {
    console.log('Update Place', prevData);
  }

  private fetchPlaces() {
    this.props.placeStore?.findAll();
  }

  handleCreatePlace = () => {
    placeStore.createRandom();
  };

  render() {
    const places = this.props.placeStore?.places || [];
    console.log('Places', places);

    return (
      <section>
        <Container>
          <h1>Места стоянки</h1>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {this.tableHeaderItems.map((headName, key) => (
                      <th key={key + headName}>{headName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {places!.map((item: any, key) => {
                    const { id, price, startDate, isVacant, autoId } = item;

                    return (
                      <tr key={key}>
                        <td>{id}</td>
                        <td>{price}</td>
                        <td>{isVacant ? '+' : '-'}</td>
                        <td>{startDate || '-'}</td>
                        <td>{autoId || '-'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <button onClick={this.handleCreatePlace}>Добавить место</button>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default PlacePage;
