import React, { Component, FormEvent } from 'react';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import ClientFormModal from 'components/forms/client_form_modal';
import AutoFormModal from 'components/forms/auto_form_modal';
import { Params, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { ToastContainer } from 'react-toastify';

//models
import { Client } from '../../models';

//store
import ClientCollectionStore from '../../store/client-colection-store';
import carClientService from '../../store/carClientlService';

//styles
import css from './styles.scss';

interface IProps {
  params: Params;
  clientsStore?: typeof ClientCollectionStore;
  //carBrandsStore?: typeof carBrandsStore;
}

interface IState {
  isModalClientOpen: boolean;
  isModalCarOpen: boolean;
  clientId?: number;
  carId?: number;
}
@inject('clientsStore')
@observer
class ClientPage extends Component<IProps, IState> {
  private tableHeaderItems = [
    '№',
    'Марка авто',
    'Номер авто',
    'Год выпуска',
    'Место',
    'Дата начисления',
    'Цена места',
    'Оплатить',
  ];

  constructor(props: IProps) {
    super(props);

    this.state = {
      isModalClientOpen: false,
      isModalCarOpen: false,
    };
  }
  componentDidMount(): void {
    const clientId = Number(this.props.params.id);
    this.fetchClient(clientId);
  }

  // componentDidUpdate(prevData: any): void {
  //   console.log('Update Klient', prevData);
  // }

  private fetchClient = (id: number) => {
    console.log('Fetch Client with Car');

    this.props.clientsStore?.findByIdWithCars(id);
  };

  private handleModalClientOpen = () => {
    this.setState({ isModalClientOpen: true });
  };

  private handleModalCarOpen = () => {
    this.setState({ isModalCarOpen: true });
  };

  private handleModalClientClose = () => {
    this.setState({ isModalClientOpen: false });
  };

  private handleModalCarClose = () => {
    this.setState({ isModalCarOpen: false, carId: undefined });
  };

  private handleEditCar = (id: number) => {
    this.setState({ carId: id, isModalCarOpen: true });
  };

  private handleEditClient = (clientId: any) => {
    console.log('clientId', clientId);
    this.setState({ clientId, isModalClientOpen: true });
  };

  private handleClientSubmit = (clientData: Client) => {
    console.log('clientData', clientData);

    if (this.state.clientId) {
      console.log('OnSubmit Update', clientData);
      const res = this.props.clientsStore
        ?.update(clientData)
        .then(data => console.log('Клиент обновлен', data))
        .catch(error => {
          console.log('Adding Error', error);
        });
    } else {
      console.log('OnSubmit Create', clientData);
      const res = this.props.clientsStore
        ?.create(clientData)
        .then(data => console.log('Клиент добавлен', data))
        .catch(error => {
          console.log('Adding Error', error);
        });
    }
  };

  private handleCarSubmit = async (data: any) => {
    if (this.state.carId) {
      console.log('Car update', data);
      await carClientService.update({ id: this.state.carId, ...data });
    } else {
      console.log('Car create', data);
      await carClientService.createCar({
        ...data,
        clientId: this.props.params.id,
      });
    }
    console.log('fetchClient', this.props.params.id);
    this.fetchClient(Number(this.props.params.id));
  };

  private handleDeleteUser = () => {
    console.log('Клиента нельзя удалять', this.state.clientId);
  };

  render() {
    const { isModalCarOpen, isModalClientOpen } = this.state;
    const { clientsStore } = this.props;
    console.log('CLient Props', this.props);
    const [carForEdit] = clientsStore?.client.cars.filter(
      item => item.id == this.state.carId,
    )!;
    return (
      <section>
        <Container>
          <Row className={css.clientInfoWrapper}>
            <Col>
              <h1 className={css.clientInfoHeader}>Клиент</h1>
              <div className={css.clientInfoBlock}>
                <div className={css.clientInfoSection}>
                  <div className={css.clientInfo}>
                    <span>ФИО</span>
                    <p>{clientsStore!.client.fullName}</p>
                  </div>
                  <div className={css.clientInfo}>
                    <span>Телефон</span>
                    <p>{clientsStore!.client.phone}</p>
                  </div>

                  <div className={css.clientInfo}>
                    <span>Дата рождения</span>
                    <p> {clientsStore!.client.bDate}</p>
                  </div>
                </div>
              </div>
              <div className={css.actionButton}>
                <button
                  onClick={() => this.handleEditClient(clientsStore!.client.id)}
                >
                  изменить клиента
                </button>
                <span>&nbsp;/&nbsp; </span>
                <button onClick={this.handleDeleteUser}>удалить клиента</button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>Автомобили</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {this.tableHeaderItems.map((headName, key) => (
                      <th key={key + headName}>{headName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {clientsStore!.client.cars.map((car, key) => (
                    <tr key={car.regNumber}>
                      <td>{key + 1}</td>
                      <td>
                        <button onClick={() => this.handleEditCar(car.id)}>
                          {car.fullModel}
                        </button>
                      </td>
                      <td>{car.regNumber}</td>
                      <td>{car.year}</td>
                      <td>{car.place.id}</td>
                      <td>{car.place.startDate}</td>
                      <td>{car.place.price}</td>
                      <td>
                        <button onClick={this.handleModalCarOpen}>
                          оплатить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col>
              <button onClick={this.handleModalCarOpen}>Добавить Авто</button>
            </Col>
            <Col className={css.paymentButtonContainer}>
              <button onClick={this.handleModalCarOpen}>
                История платежей
              </button>
            </Col>
          </Row>
        </Container>

        <AutoFormModal
          clientId={clientsStore?.client.id!}
          car={carForEdit}
          onSubmit={this.handleCarSubmit}
          onClose={this.handleModalCarClose}
          isOpen={isModalCarOpen}
        />
        <ClientFormModal
          client={clientsStore?.client}
          onClose={this.handleModalClientClose}
          onSubmit={this.handleClientSubmit}
          isOpen={isModalClientOpen}
        />
        <ToastContainer />
      </section>
    );
  }
}

function withParams(Component: React.ComponentClass) {
  return (props: any) => <Component {...props} params={useParams()} />;
}

export default withParams(ClientPage);
