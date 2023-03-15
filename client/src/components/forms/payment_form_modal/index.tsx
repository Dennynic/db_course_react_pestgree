import React, { Component, FormEvent } from 'react';
import FormModal from '../form_modal';
import Form from 'react-bootstrap/Form';
import Client from '../../../models/client';
import moment from 'moment';
import { toast } from 'react-toastify';

interface IProps {
  client?: Client;
  placeId?: number;
  onClose: () => void;
  isOpen: boolean;
  onSubmit: (client: any) => void;
}

interface IState {
  summ: number;
  paymentDate: string;
}

class PaymentFormModal extends Component<IProps, IState> {
  static defaultProps = {
    summ: 0,
    paymentDate: moment(new Date()).format('YYYY-MM-DD'),
  };

  state: IState = {
    ...PaymentFormModal.defaultProps,
  };

  componentDidUpdate(prevProps: IProps) {
    if (prevProps !== this.props) {
      this.setState({ ...PaymentFormModal.defaultProps });
    }
  }

  private handleSummChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ summ: Number(event.target.value.trim()) });
  };

  private handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ paymentDate: event.target.value.trim() });
  };

  private handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.onSubmit({ ...this.state });
  };

  render() {
    const { onClose, isOpen, placeId } = this.props;
    const { paymentDate, summ } = this.state;
    const validDate = paymentDate;
    const maxDate = moment(new Date()).format('YYYY-MM-DD');
    const title = `Оплата за ${placeId}`;
    return (
      <FormModal onClose={onClose} isOpen={isOpen}>
        <FormModal.Header title={`${title} место`} />
        <FormModal.Form onClose={onClose} onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="LastNameControl">
            <Form.Label>Сумма</Form.Label>
            <Form.Control
              onChange={this.handleSummChange}
              value={summ}
              type="text"
              placeholder="999"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Дата оплаты</Form.Label>
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

export default PaymentFormModal;
