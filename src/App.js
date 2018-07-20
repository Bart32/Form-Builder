import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class FormBuilder extends Component {
  constructor(){
    super()
    this.addSubInput = this.addSubInput.bind(this);
    this.deleteInput = this.deleteInput.bind(this);
    this.createForm = this.createForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      arrayOfSubInputs : [],
      numberOfSubInputs : 0,
      dynamicMarginLeft: 85,
      nextQuestionCondition: 'textField' // NAZWA ROBOCZA DO ZMIANY 
    }
  }
  
  addSubInput(){
    this.setState (prevState => {
      return{
      numberOfSubInputs : prevState.numberOfSubInputs +1,
      dynamicMarginLeft : 85 + (this.state.arrayOfSubInputs.length *10)
      }
    });
  }

  handleChange(event){
    this.setState({
      nextQuestionCondition: event.target.value
    });

  }

deleteInput(event) {
  const list = this.state.arrayOfSubInputs;
  let indexElement = parseInt(event.target.id);
  let howMany = this.state.arrayOfSubInputs.length - indexElement;
  list.splice(indexElement, howMany );
  this.setState(prevState => {
    return{
    arrayOfSubInputs: list,
    numberOfSubInputs : prevState.numberOfSubInputs - howMany
    }
   });
}
createForm(){
}

  render(){
    for (let i = this.state.arrayOfSubInputs.length; i < this.state.numberOfSubInputs; i ++) {
      this.state.arrayOfSubInputs.push(<SubInput key={i} index={i} addSubInput={this.addSubInput} dynamicMarginLeft={this.state.dynamicMarginLeft} deleteInput={this.deleteInput} nextQuestionCondition={this.nextQuestionCondition} />);
    };
    return (
      <div>
      <h1 className="headerText"> Form Builder by Bartosz Kosiec </h1>
        <div className="builder">
          Question<input type="text" className="form-control"  placeholder="" />
          Type <select className="form-control" onChange={this.handleChange}>
            <option value='textField'>Text</option>
            <option value='textField'>Number</option>
            <option value="chooseField">Yes / No </option>
          </select>
          <button type="submit" className="btn btn-success" onClick={this.addSubInput}>Add Sub-Input</button>
        </div>
        <div>
          {this.state.arrayOfSubInputs}
        </div>
        <button type="submit" className="btn btn-primary addInputButton" onClick={this.createForm}>Add Input</button>
      </div>

    );
  }
};

class SubInput extends Component {
  constructor(props){
  super(props)
  this.handleChange = this.handleChange.bind(this);
  this.state = {
    condition: 'oneOption',
  }
}
handleChange(event){
  this.setState({
    condition: event.target.value
  })
  alert(this.state.condition)
}
  render() {
    var SubInputBuilderStyle = {
      marginLeft: this.props.dynamicMarginLeft + 'px'
    };
    let conditionOptions
      if(this.state.condition === 'threeOptions'){
        conditionOptions = (
          <select className="form-control">
          <option>Equals</option>
          <option>Greater than</option>
          <option>Less than</option>
          </select>
        )}
        else(
          conditionOptions = (
          <select className="form-control">
          <option>Equals</option>
          </select>
          )
        );
      let conditionAnswerOptions
        if(this.props.nextQuestionCondition === 'chooseField'){
          conditionAnswerOptions = (
            <select className="form-control">
            <option>Yes</option>
            <option>No</option>
            </select>
          )}
          else(
            conditionAnswerOptions = (
            <input type="text" className="form-control"  placeholder="" />
            )
          );
    return (
      <div>
        <div className="SubInputBuilder" style={SubInputBuilderStyle}>
        <div className="form-group condition">
            Condition {conditionOptions}
        </div>
        <div className="form-group condition">
        {conditionAnswerOptions}
        </div>
          <div className="form-group">
            Question<input type="text" className="form-control"  placeholder="" />
          </div>
          <div className="form-group">
            Type <select className="form-control" onChange={this.handleChange}>
              <option value='oneOption'>Text</option>
              <option value='threeOptions'>Number</option>
              <option value='oneOption'>Yes / No </option>
            </select>
          </div>
            <button type="submit" className="btn btn-primary" onClick={this.props.addSubInput}>Add Sub-Input</button>
            <button type="submit" className="btn btn-danger"  onClick={this.props.deleteInput} id={this.props.index}>Delete</button>
          </div>
        </div>
    );
  }
}


class App extends Component {
  render() {
    return (
      <FormBuilder />
    );
  }
}
export default App;
