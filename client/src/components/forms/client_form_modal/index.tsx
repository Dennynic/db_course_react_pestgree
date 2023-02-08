import React, { Component, FormEvent } from 'react';
import FormModal from '../form_modal';
import Form from 'react-bootstrap/Form';
import { IClient } from '../../../models/client';
import moment from 'moment';

interface IProps {
  client?: IClient;
  onClose: () => void;
  isOpen: boolean;
  onSubmit: (client: any) => void;
  defaultNoteType?: String;
}

interface IState {
  first_name: string;
  last_name: string;
  second_name: string;
  phone: string;
  birth_date: string;
}

class ClientFormModal extends Component<IProps, IState> {
  static defaultProps = {
    first_name: '',
    last_name: '',
    second_name: '',
    phone: '',
    birth_date: '',
  };
  state: IState = {
    ...ClientFormModal.defaultProps,
  };

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.client !== this.props.client) {
      if (this.props.client) {
        const { first_name, last_name, second_name, phone, birth_date } =
          this.props.client!;
        this.setState({
          first_name,
          last_name,
          second_name,
          phone,
          birth_date,
        });
      } else {
        this.setState({ ...ClientFormModal.defaultProps });
      }
    }
  }

  private handleLastNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ last_name: event.target.value.trim() });
  };
  private handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ first_name: event.target.value.trim() });
  };

  private handleSecondNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ second_name: event.target.value.trim() });
  };

  private handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ phone: event.target.value.trim() });
  };

  private handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ birth_date: event.target.value.trim() });
  };

  private handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { birth_date, first_name, last_name, second_name, phone } =
      this.state;
    this.props.onSubmit({
      birth_date,
      first_name,
      last_name,
      second_name,
      phone,
    });
  };

  render() {
    const { onClose, isOpen, client } = this.props;
    const { birth_date, first_name, last_name, second_name, phone } =
      this.state;
    const validDate = moment(birth_date).format('YYYY-MM-DD');
    const maxDate = moment().subtract(18, 'year').format('YYYY-MM-DD');
    const title = client ? 'Edit' : 'Add';
    return (
      <FormModal onClose={onClose} isOpen={isOpen}>
        <FormModal.Header title={`${title} client`} />
        <FormModal.Form onClose={onClose} onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="LastNameControl">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              onChange={this.handleLastNameChange}
              value={last_name}
              type="text"
              placeholder="Иванов"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="FirstNameControl">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              onChange={this.handleFirstNameChange}
              value={first_name}
              type="text"
              placeholder="Иван"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="SecondNameControl">
            <Form.Label>Отчество</Form.Label>
            <Form.Control
              onChange={this.handleSecondNameChange}
              value={second_name}
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
