import React, { Component, FormEvent } from 'react';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import ClientFormModal from 'components/forms/client_form_modal';

import data from '../../models/auto-client';

interface IProps {}

interface IState {
  isModalOpen: boolean;
}

class MainPage extends Component<IProps, IState> {
  private tableHeaderItems = [
    '№',
    'ФИО',
    'Дата рождения',
    'Номер телефона',
    'Марка авто',
    'Номер авто',
    'Год выпуска',
    'Номер парковки',
    'Цена места',
    'Сумма оплаты',
    'Дата оплаты',
    'Дата начисления',
  ];

  constructor(props: IProps) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
  }
  componentDidMount(): void {}

  private handleModalOpen = () => {
    this.setState({ isModalOpen: true });
  };

  private handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  private handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  render() {
    console.log('State', this.state);
    return (
      <section>
        <Container>
          <h1>Авто Клиенты</h1>
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
                  {data.map(item => {
                    const fio = `${item.name} ${item.lastName} ${item.secondName}`;
                    const auto = `${item.modelAuto} ${item.markAuto}`;
                    return (
                      <tr key={item.id + item.phone}>
                        <td>{item.id}</td>
                        <td>{fio}</td>
                        <td>{item.birtDate}</td>
                        <td>{item.phone}</td>
                        <td>{auto}</td>
                        <td>{item.autoiId}</td>
                        <td>{item.yearAuto}</td>
                        <td>{item.parckPlace}</td>
                        <td>{item.parckPrice}</td>
                        <td>{item.summPaymeyment}</td>
                        <td>{item.datePayment}</td>
                        <td>{item.startPayment}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <button onClick={this.handleModalOpen}>Добавить клиента</button>
            </Col>
          </Row>
        </Container>
        <ClientFormModal
          onClose={this.handleModalClose}
          onSubmit={this.handleSubmit}
          isOpen={this.state.isModalOpen}
        />
      </section>
    );
  }
}

export default MainPage;
