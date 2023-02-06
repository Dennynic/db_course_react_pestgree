import React, { Component, FormEvent } from 'react';
import FormModal from '../form_modal';
import Form from 'react-bootstrap/Form';
import moment from 'moment';

interface IProps {
  onClose: () => void;
  isOpen: boolean;
  onSubmit: (event: FormEvent) => void;
  defaultNoteType?: String;
}

interface IState {
  firstName: String;
  lastName: String;
  secondName: String;
  phone: String;
  bDate: String;
}

class ClientFormModal extends Component<IProps, IState> {
  state = {
    firstName: '',
    lastName: '',
    secondName: '',
    phone: '',
    bDate: '',
  };

  private handleLastNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ lastName: event.target.value });
  };
  private handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ firstName: event.target.value });
  };

  private handleSecondNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ secondName: event.target.value });
  };

  private handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ phone: event.target.value });
  };

  private handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ bDate: event.target.value });
  };

  private handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('State', this.state);
  };

  render() {
    const { onClose, isOpen } = this.props;
    const { firstName, lastName, secondName, phone, bDate } = this.state;
    const maxDate = moment().subtract(18, 'year').format('YYYY-MM-DD');

    return (
      <FormModal onClose={onClose} isOpen={isOpen}>
        <FormModal.Header title={'Add Client'} />
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
              value={bDate}
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
