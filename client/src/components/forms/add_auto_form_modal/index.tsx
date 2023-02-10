import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import css from './styles.scss';
import { BrandModel } from 'models';


interface IProps{
  onSubmit: () => void;
  onClose: () => void;
  carBrands?: BrandModel[];
}

export default class AddAutoFormModal extends Component<IProps> {

  componetnDidMount(){
    
  }

  state = {
    carModels: []
  }
  
  handleBrandChange = (e: any) =>{
    
    const { carBrands} = this.props;
    const [modelArr] = carBrands?.filter(item => item.id == e.target.value) || [];
    console.log("EventBrand", modelArr);
    //this.setState({carModels: modelArr.items})
  }

  handleModelChange = (e: any) => {
    console.log("EventModel", e.target.value);
  }

  render() {
    const isOpen = true;
    const {onClose, onSubmit, carBrands} = this.props;
    const {carModels} = this.state;
    const disabledModels = !carBrands?.length;
    console.log("!!", carBrands);
    return (
      <Form className={css.formWrapper}>
      <Form.Group className={css.formGroup}>
        <Form.Select aria-label="Default select example" onChange={this.handleBrandChange} disabled={disabledModels}>
        <option>Выберите модель</option>
        {carBrands && carBrands.map((model:any) => {
          return(
            <option key={model.id} value={model.id}>{model.title}</option>
          )
        })}
        
      </Form.Select>
      </Form.Group>
      <Form.Group className={css.formGroup}>
        <Form.Select aria-label="Default select example" onChange={this.handleModelChange}>
        <option>Выберите марку</option>
        {carModels.map((item:any) => (<option key={item.id} value={item.id}>{item.title}</option>))}
      </Form.Select>
      </Form.Group>
      </Form>
      
    )
  }
}
