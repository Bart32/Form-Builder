import React, { Component } from 'react';
import './App.css';


class FormBuilder extends Component {
  constructor(){
    super()
    this.addInput = this.addInput.bind(this);
    this.state = {
      
      arrayOfInputs : [],
      numberOfInputs : 0,
      firstInput: true,
      dynamicMarginLeft: -20,
    }
  }


  addInput(){ 
    this.setState (prevState => {
      return{
      numberOfInputs : prevState.numberOfInputs +1,
      firstInput: true
      }
    });
  }

  render(){
    for (let i = this.state.arrayOfInputs.length; i < this.state.numberOfInputs; i ++) {
      this.state.arrayOfInputs.push(<ParentInput key={i} inputs={this.state.firstInput} dynamicMarginLeft={this.state.dynamicMarginLeft} handleChange={this.handleChange}/>);
    };
    return (
        <div>
        <h1 className="headerText"> Form Builder by Bartosz Kosiec </h1>
          <div>
            {this.state.arrayOfInputs}
          </div>
          <button type="submit" className="btn btn-primary addInputButton" onClick={this.addInput}>Add Input</button>
        </div>
    );
  }
};

class ParentInput extends Component {
  constructor(props){
    super(props)
    this.addSubInput = this.addSubInput.bind(this);
    this.deleteInput = this.deleteInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.resetValue = this.resetValue.bind(this);
    this.state = {
      arrayOfSubInputs : [],
      numberOfSubInputs : 0,
      hideInput: false,
      dynamicMarginLeft: props.dynamicMarginLeft,
      typeValue: 'text',
    }
  }

  componentDidMount(){
    if(this.state.arrayOfSubInputs.length === 0){
    this.setState (prevState => {
      return{
        dynamicMarginLeft : prevState.dynamicMarginLeft + 20
      }
    });
  }
}

  addSubInput(){
    this.setState (prevState => {
      return{
      numberOfSubInputs : prevState.numberOfSubInputs +1,
      }
    });
  }
  
  deleteInput() {  
    this.setState({
      hideInput: true
    });
  }

  handleChange(event){
    this.setState({
      typeValue: event.target.value,
    });

  }
  /*resetValue(){
    this.setState({
      typeValue: "text"
    })
  }
*/

  render(){
    alert(this.props.typeValue);
    for (let i = this.state.arrayOfSubInputs.length; i < this.state.numberOfSubInputs; i ++) {
      this.state.arrayOfSubInputs.push(<ParentInput key={i} resetValue={this.resetValue} dynamicMarginLeft={this.state.dynamicMarginLeft} typeValue={this.state.typeValue} />)
    };

    let SubInputBuilderStyle = {
      marginLeft: 50 + (this.props.dynamicMarginLeft),
    };

    let condition;
    if(this.props.typeValue === 'number'){
      condition = (
        <div>
          <div className="form-group condition">
          Condition
          <select className="form-control">
          <option>Equals</option>
          <option>Greater than</option>
          <option>Less than</option>
          </select>
        </div>
        <div className="form-group condition">
          <input type="text" className="form-control" />
        </div>
      </div>
    )}
    else if(this.props.typeValue === 'text'){
      condition = (
        <div>
          <div className="form-group condition">
          Condition
          <select className="form-control">
          <option>Equals</option>
          </select>
        </div>
        <div className="form-group condition">
          <input type="text" className="form-control" />
        </div>
      </div>
      )}
      else{
        condition = (
          <div>
            <div className="form-group condition">
            Condition
            <select className="form-control">
            <option>Equals</option>
            </select>
          </div>
          <div className="form-group condition">
            <select className="form-control">
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>
        )}
    return (
      this.state.hideInput ?
      <div className='hidden'></div>
      :
      this.props.inputs ?
      <div>
        <div className="firstInput">
          Question<input type="text" className="form-control"  placeholder="" />
          Type <select className="form-control" onChange={this.handleChange}>
            <option value='text'>Text</option>
            <option value='number'>Number</option>
            <option value="radio">Yes / No </option>
          </select>
          <button type="submit" className="btn btn-success" onClick={this.addSubInput}>Add Sub-Input</button>
          <button type="submit" className="btn btn-danger" onClick={this.deleteInput}>Delete</button>
        </div>
        <div>
          {this.state.arrayOfSubInputs}
        </div>
      </div>
      :
      <div>
        <div className="subInputBuilder" style={SubInputBuilderStyle}>
            {condition}
          <div className="form-group">
            Question<input type="text" className="form-control"  placeholder="" />
          </div>
          <div className="form-group">
            Type <select className="form-control" onChange={this.handleChange}>
              <option value='text'>Text</option>
              <option value='number'>Number</option>
              <option value='radio'>Yes / No </option>
            </select>
          </div>
            <button type="submit" className="btn btn-success" onClick={this.addSubInput}>Add Sub-Input</button>
            <button type="submit" className="btn btn-danger"  onClick={this.deleteInput }>Delete</button>
          </div>
          <div>
          {this.state.arrayOfSubInputs}
        </div>
        </div>
    );
  }
};

class App extends Component {
  render() {
    return (
      <FormBuilder />
    );
  }
}
export default App;
