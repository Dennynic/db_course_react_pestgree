import React, { Component} from 'react';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import ClientFormModal from 'components/forms/client_form_modal';
import Client from '../../models/client';
import ClientCollectionStore from '../../store/client-colection-store';
import { CarClientModel } from '../../models';
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import {  CLIENT_PAGE } from 'config/consts';
interface IProps {
  clientsStore?: typeof ClientCollectionStore;
}

interface IState {
  isModalOpen: boolean;
  client: Client | undefined;
}


@inject('clientsStore')
@observer
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
      client: undefined,
    };
  }
  componentDidMount(): void {
    
    this.fetchClient();
  }

  private fetchClient() {
    this.props.clientsStore?.fetchAllClientInfo();
  }

  private handleModalOpen = () => {
    this.setState({ isModalOpen: true, client: undefined });
  };

  private handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  private handleEditClient = (item: any) => {
    this.setState({ client: item, isModalOpen: true });
  };

  private handleSubmit = (clientData: Client) => {
    const res = this.props.clientsStore?.create(clientData).then(data =>
      console.log('Клиент добавлен', data),
    );
  };

  render() {
    
    const carClients = this.props.clientsStore?.carClients;
    console.log("carClients", carClients);
    
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
                  {carClients!.map((item: CarClientModel, key) => {
                    
                    const {
                      clientId,
                      fullName,
                      model,
                      brand,
                      phone,
                      bDate,
                      regNumber,
                      year,
                      placeid,
                      price,
                      summPayment,
                      datePayment,
                      startDate,
                    } = item;
                    const carModel = brand && model ? `${brand} ${model}` : "-";
                    return (
                      <tr key={clientId + key}>
                        <td>{key+1}</td>
                        <td>
                          <NavLink to={`${CLIENT_PAGE}/${clientId}`}>{fullName}</NavLink>
                            
                        </td>
                        <td>{bDate}</td>
                        <td>{phone}</td>
                        <td>{carModel}</td>
                        <td>{regNumber || '-'}</td>
                        <td>{year || '-'}</td>
                        <td>{placeid || '-'}</td>
                        <td>{price || '-'}</td>
                        <td>{summPayment || '-'}</td>
                        <td>{datePayment || '-'}</td>
                        <td>{startDate || '-'}</td>
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
          client={this.state.client}
          onClose={this.handleModalClose}
          onSubmit={this.handleSubmit}
          isOpen={this.state.isModalOpen}
        />
      </section>
    );
  }
}

export default MainPage;
