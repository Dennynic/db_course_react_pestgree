import React, { Component, FormEvent } from 'react';
import FormModal from '../form_modal';
import Form from 'react-bootstrap/Form';
import Client from '../../../models/client';
import moment from 'moment';
import { toast } from 'react-toastify';

interface IProps {
  client?: Client;
  onClose: () => void;
  isOpen: boolean;
  onSubmit: (client: any) => void;
  defaultNoteType?: String;
}

interface IState {
  firstName: string;
  lastName: string;
  secondName: string;
  phone: string;
  bDate: string;
}

class ClientFormModal extends Component<IProps, IState> {
  static defaultProps = {
    firstName: '',
    lastName: '',
    secondName: '',
    phone: '',
    bDate: '',
  };
  state: IState = {
    ...ClientFormModal.defaultProps,
  };

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.client !== this.props.client) {
      if (this.props.client) {
        const { firstName, lastName, secondName, phone, bDate } =
          this.props.client!;
        this.setState({
          firstName,
          lastName,
          secondName,
          phone,
          bDate,
        });
      } else {
        this.setState({ ...ClientFormModal.defaultProps });
      }
    }
  }

  private handleLastNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ lastName: event.target.value.trim() });
  };
  private handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ firstName: event.target.value.trim() });
  };

  private handleSecondNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ secondName: event.target.value.trim() });
  };

  private handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ phone: event.target.value.trim() });
  };

  private handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ bDate: event.target.value.trim() });
  };

  private handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Handle state', this.state);
    this.props.onSubmit({id: this.props.client?.id, ...this.state})
      
  };

  render() {
    const { onClose, isOpen, client } = this.props;
    const { firstName, lastName, secondName, phone, bDate } = this.state;
    const validDate = moment(bDate).format('YYYY-MM-DD');
    const maxDate = moment().subtract(18, 'year').format('YYYY-MM-DD');
    const title = client ? 'Редактировать' : 'Добавить';
    return (
      <FormModal onClose={onClose} isOpen={isOpen}>
        <FormModal.Header title={`${title} клиента`} />
        <FormModal.Form onClose={onClose} onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="LastNameControl">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              onChange={this.handleLastNameChange}
              value={lastName}
              type="text"
              placeholder="Иванов"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="FirstNameControl">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              onChange={this.handleFirstNameChange}
              value={firstName}
              type="text"
              placeholder="Иван"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="SecondNameControl">
            <Form.Label>Отчество</Form.Label>
            <Form.Control
              onChange={this.handleSecondNameChange}
              value={secondName}
              type="text"
              placeholder="Иванович"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="PhoneControl">
            <Form.Label>Телефон</Form.Label>
            <Form.Control
              onChange={this.handlePhoneChange}
              value={phone}
              type="tel"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              placeholder="912-345-6789"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Дата рождения</Form.Label>
            <Form.Control
              onChange={this.handleDateChange}
              value={validDate}
              type="date"
              max={maxDate}
              required
            />
          </Form.Group>
        </FormModal.Form>
      </FormModal>
    );
  }
}

export default ClientFormModal;
