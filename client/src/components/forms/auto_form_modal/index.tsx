import React, { Component } from 'react';
import FormModal from '../form_modal';
import Form from 'react-bootstrap/Form';
import cn from 'classnames';
import moment from 'moment';
import { inject, observer } from 'mobx-react';

import { toast } from 'react-toastify';

import CarListForm from './car_list_form';

//models
import { Car, Place } from '../../../models';
//store
import carBrandsStore from '../../../store/car-brands-store';
import CarClientService from '../../../store/carClientService';
import placeStore from '../../../store/place-store';

//styles
import css from './styles.scss';

interface IProps {
  isOpen: boolean;
  onSubmit: (data: any) => void;
  onClose: () => void;
  car?: Car;
  clientId?: number;
  carBrandsStore?: typeof carBrandsStore;
  placeStore?: typeof placeStore;
  clientCars?: Car[];
}

interface IState {
  carBrandId: number | null;
  carModelId: number | null;
  regNumber: string;
  year: string;
  place: number | null;
  isAlert: boolean;
  startDate: string;
  alertMessage: string;
  isBrandOpen: boolean;
  isModelOpen: boolean;
  isShowCarList: boolean;
}
@inject('carBrandsStore')
@inject('placeStore')
@observer
export default class AutoFormModal extends Component<IProps, IState> {
  public addBrandRef: React.RefObject<HTMLInputElement>;
  public addModelRef: React.RefObject<HTMLInputElement>;

  constructor(props: IProps) {
    super(props);
    this.addBrandRef = React.createRef();
    this.addModelRef = React.createRef();
  }
  defaultCarProps = {
    carBrandId: null,
    carModelId: null,
    regNumber: '',
    year: '',
    place: null,
    startDate: '',
  };

  state = {
    ...this.defaultCarProps,
    isAlert: false,
    alertMessage: '',
    isBrandOpen: false,
    isModelOpen: false,
    isShowCarList: false,
  };

  componentDidMount() {
    this.fetchCarModels();
    this.fetchPlaces();
  }

  componentDidUpdate(prevProps: IProps): void {
    if (prevProps !== this.props) {
      if (this.props.car) {
        const { car } = this.props;
        const modelsStore = this.props.carBrandsStore?.models;
        const brand = modelsStore?.filter(item => item.brand == car.brand);
        const model = brand?.[0].models.filter(item => item.title == car.model);
        this.setState({
          carBrandId: brand?.[0].brandid!,
          carModelId: model?.[0].id!,
          year: car.year,
          regNumber: car.regNumber,
          place: car.place.id,
          startDate: car.place.startDate,
        });
      } else {
        this.setState({ ...this.defaultCarProps });
      }
    }
  }

  // private async fetchCar(id: number) {
  //   try {
  //     const car = await carClientService.findCarById(id);
  //     const modelsStore = this.props.carBrandsStore?.models;
  //     const brand = modelsStore?.filter(item => item.brand == car.brand);
  //     const model = brand?.[0].models.filter(item => item.title == car.model);

  //     this.setState({
  //       carBrandId: brand?.[0].brandid!,
  //       carModelId: model?.[0].id!,
  //       year: car.year,
  //       regNumber: car.regNumber,
  //     });

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  private fetchCarModels() {
    this.props.carBrandsStore?.fetchList();
  }

  private fetchPlaces() {
    this.props.placeStore?.findAll();
  }

  private getVacant = () => {
    return this.props.placeStore?.places.filter(item => item.isVacant == true);
  };

  handleBrandChange = (e: any) => {
    this.setState({
      carBrandId: Number(e.target.value),
    });
  };

  getCarModels = (id: number) => {
    const modelsStore = this.props.carBrandsStore?.models;

    let models: any[] = [];
    if (id) {
      const [model] = modelsStore?.filter(item => item.brandid == id) || [];
      models = model?.models;
    }
    return models;
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

    this.props.carBrandsStore?.addModel(model.trim(), brandId).catch(error => {
      toast('Error Brand Already exist');
    });
  };

  handleModelChange = (e: any) => {
    this.setState({ carModelId: Number(e.target.value) });
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

  handlePlaceChange = (e: any) => {
    this.setState({ place: Number(e.target.value) });
  };

  handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ startDate: event.target.value });
  };

  handleShowCarList = () => {
    this.setState({ isShowCarList: !this.state.isShowCarList });
  };

  handleSelectExistCar = (carId: number) => {
    CarClientService.addClientCar({
      clientId: this.props.clientId,
      autoId: carId,
    });
    this.handleClose();
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.onSubmit?.({ ...this.state });
  };

  handleClose = () => {
    this.setState({ isShowCarList: false });
    this.props.onClose?.();
  };

  render() {
    const { onClose, isOpen, car } = this.props;
    const {
      regNumber,
      year,
      isBrandOpen,
      isModelOpen,
      carBrandId,
      carModelId,
      startDate,
      isShowCarList,
    } = this.state;

    const carModels = this.getCarModels(carBrandId!);

    const maxValueYear = new Date().getFullYear();
    const places = car ? this.props.placeStore?.places : this.getVacant();

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

    const addModelClassName = cn(
      css.addCarOption,
      !carBrandId && !carModels.length && css.modelDisabled,
    );

    const maxDate = moment(new Date()).format('YYYY-MM-DD');
    const validDate = moment(startDate).format('YYYY-MM-DD');
    const title = this.props.car ? 'Редактировать' : 'Добавить';
    return (
      <>
        <FormModal
          onClose={onClose}
          isOpen={isOpen}
          className={css.formWrapper}
        >
          <FormModal.Header title={`${title} авто`} />
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
                        <option key={key} value={model.brandid}>
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
                value={carModelId || ''}
              >
                <option>Выберите модель</option>
                {carModels.map((item: any, key) => (
                  <option key={key} value={item.id}>
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
            <div className={css.addCarFromList}>
              <button
                className="linkbutton"
                type="button"
                onClick={this.handleShowCarList}
              >
                из списка
              </button>
            </div>
            {isShowCarList && (
              <CarListForm
                onChange={this.handleSelectExistCar}
                classNames={css.formGroupText}
                clientCars={this.props.clientCars}
              />
            )}
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
                placeholder={maxValueYear.toString()}
                min={1960}
                max={maxValueYear}
                required
              />
            </Form.Group>
            <Form.Group className={css.formGroupText}>
              <Form.Select
                onChange={this.handlePlaceChange}
                disabled={!places?.length}
                value={this.state.place || ''}
              >
                <option>Выберите место</option>
                {places?.map((item: any, key) => (
                  <option key={key + '_' + item.id} value={item.id}>
                    {item.id} - {item.price}р. -{' '}
                    {item.isVacant ? 'free' : 'ordered'}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className={css.formGroupText}>
              <Form.Label>Дата бронирования</Form.Label>
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
      </>
    );
  }
}
