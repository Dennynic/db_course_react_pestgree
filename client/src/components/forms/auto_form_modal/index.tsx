import React, { Component } from 'react';
import FormModal from '../form_modal';
import Form from 'react-bootstrap/Form';
import cn from 'classnames';
import moment from 'moment';
import { inject, observer } from 'mobx-react';

import { toast } from 'react-toastify';

//models
import { CarBrandModel, CarModel } from 'models';

//store
import carBrandsStore from '../../../store/car-brands-store';

//styles
import css from './styles.scss';

interface IProps {
  isOpen: boolean;
  onSubmit: () => void;
  onClose: () => void;
  carBrands?: CarBrandModel[];
  carId?: number;
  carBrandsStore?: typeof carBrandsStore;
}

interface IState {
  carModels: CarModel[];
  carBrandId: number | null;
  carModel: string;
  regNumber: string;
  year: string;
  isAlert: boolean;
  alertMessage: string;
  isBrandOpen: boolean;
  isModelOpen: boolean;
}
@inject('carBrandsStore')
@observer
export default class AutoFormModal extends Component<IProps, IState> {
  public addBrandRef: React.RefObject<HTMLInputElement>;
  public addModelRef: React.RefObject<HTMLInputElement>;

  constructor(props: IProps) {
    super(props);
    this.addBrandRef = React.createRef();
    this.addModelRef = React.createRef();
  }

  state = {
    carModels: [],
    carBrandId: null,
    carModel: '',
    regNumber: '',
    year: '',
    isAlert: false,
    alertMessage: '',
    isBrandOpen: false,
    isModelOpen: false,
  };

  componentDidMount() {
    this.fetchCarModels();
  }

  componentDidUpdate(prevProps: IProps): void {
    if (prevProps !== this.props) {
      const models = this.props.carBrandsStore?.models;
    }
  }

  private fetchCarModels() {
    console.log('this.props.carBrandsStore', this.props.carBrandsStore);
    this.props.carBrandsStore?.fetchList();
  }

  handleBrandChange = (e: any) => {
    const models = this.props.carBrandsStore?.models;
    const [modelArr] =
      models?.filter(item => item.carid == e.target.value) || [];

    this.setState({
      carModels: modelArr?.models || [],
      carBrandId: modelArr?.carid,
    });
  };

  handleAddBrand = () => {
    const brand = this.addBrandRef.current!.value;

    this.props.carBrandsStore?.addBrand(brand.trim()).catch(error => {
      toast('Error Brand Already exist');
    });
  };
  handleAddModel = () => {
    const brandId = this.state.carBrandId || undefined;
    const model = this.addModelRef.current!.value;

    console.log('BrandId', brandId, 'Model', this.addModelRef.current!.value);
    this.props.carBrandsStore?.addModel(model.trim(), brandId).catch(error => {
      toast('Error Brand Already exist');
    });
  };

 
  handleModelChange = (e: any) => {
    console.log('EventModel', e.target.value);
  };

  handlRegNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ regNumber: e.target.value });
    if (!this.isValidRegNumber(this.state.regNumber)) {
      this.setState({ isAlert: true, alertMessage: 'Рег номер не валидный' });
    } else {
      this.setState({ isAlert: false, alertMessage: '' });
    }
  };

  handleBrandOpen = (e: any) => {
    e.preventDefault();
    this.setState({ isBrandOpen: !this.state.isBrandOpen });
  };

  handleModeldOpen = (e: any) => {
    e.preventDefault();
    const { carBrandId } = this.state;
    if (carBrandId) {
      this.setState({ isModelOpen: !this.state.isModelOpen });
    }
  };

  isValidRegNumber = (value: string) => {
    const regex = /^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/giu;
    return regex.test(value);
  };

  handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ year: e.target.value });
  };

  handleSubmit = () => {
    console.log('Form submit');
  };

  handleClose = () => {
    this.props.onClose?.();
  };

  render() {
    console.log('CarProps', this.props.carBrandsStore);
    console.log('CarState', this.state);
    const isOpen = true;
    const isAddBrand = true;

    const { onClose, onSubmit, carBrands } = this.props;
    const { carModels, regNumber, year, isBrandOpen, isModelOpen, carBrandId } =
      this.state;
    const maxValueYear = moment(new Date()).format('YYYY');
    const disabledModels = !this.props.carBrandsStore?.models.length;
    const regNumberClassNames = cn(
      css.regNumber,
      this.state.isAlert ? css.regNumberAlert : '',
    );

    const brandOpenClassname = cn(
      css.addBrandModal,
      isBrandOpen && css.brandModalOpen,
    );
    const modelOpenClassname = cn(
      css.addModelModal,
      isModelOpen && css.modelModalOpen,
    );

    console.log(
      '!carBrand',
      !carBrandId,
      '!carModels.length',
      !carModels.length,
    );

    const addModelClassName = cn(
      css.addCarOption,
      !carBrandId && !carModels.length && css.modelDisabled,
    );

    return (
      <>
        <FormModal
          onClose={onClose}
          isOpen={isOpen}
          className={css.formWrapper}
        >
          <FormModal.Header title={`Добавить авто`} />
          <FormModal.Form onClose={onClose} onSubmit={this.handleSubmit}>
            <Form.Group
              className={cn(css.formGroupSelect, css.formGroupAddBrand)}
            >
              <Form.Select
                onChange={this.handleBrandChange}
                disabled={disabledModels}
                value={carBrandId || ''}
              >
                <option>Выберите марку</option>
                {this.props.carBrandsStore?.models &&
                  this.props.carBrandsStore?.models.map(
                    (model: any, key: number) => {
                      return (
                        <option key={key} value={model.carid}>
                          {model.brand}
                        </option>
                      );
                    },
                  )}
              </Form.Select>

              <div className={css.addCarOption} onClick={this.handleBrandOpen}>
                {isBrandOpen ? '-' : '+'}
              </div>
            </Form.Group>

            <div className={brandOpenClassname}>
              <div className="input-group mb-3">
                <input
                  ref={this.addBrandRef}
                  type="text"
                  className="form-control"
                  placeholder="Добавить новую марку"
                  aria-label="Добавить  марку"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.handleAddBrand}
                >
                  ok
                </button>
              </div>
            </div>

            <Form.Group className={css.formGroupSelect}>
              <Form.Select
                onChange={this.handleModelChange}
                disabled={!carModels.length}
              >
                <option>Выберите модель</option>
                {carModels.map((item: any) => (
                  <option key={item.id} value={item.carid}>
                    {item.title}
                  </option>
                ))}
              </Form.Select>
              <div
                className={addModelClassName}
                onClick={this.handleModeldOpen}
              >
                {isModelOpen ? '-' : '+'}
              </div>
            </Form.Group>
            <div className={modelOpenClassname}>
              <div className="input-group mb-3">
                <input
                  ref={this.addModelRef}
                  type="text"
                  className="form-control"
                  placeholder="Добавить новую модель"
                  aria-label="Добавить модель"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.handleAddModel}
                >
                  ok
                </button>
              </div>
            </div>
            <Form.Group className={css.formGroupText}>
              <Form.Label className={regNumberClassNames}>
                Регистрационный номер
              </Form.Label>
              <Form.Control
                onChange={this.handlRegNumberChange}
                value={regNumber}
                type="text"
                placeholder="X777XX123"
                required
              />
            </Form.Group>
            <Form.Group className={css.formGroupText}>
              <Form.Label>Год выпуска</Form.Label>
              <Form.Control
                onChange={this.handleYearChange}
                value={year}
                type="number"
                placeholder="2011"
                min={1960}
                max={maxValueYear}
                required
              />
            </Form.Group>
          </FormModal.Form>
        </FormModal>
      </>
    );
  }
}
