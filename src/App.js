import React, { Component } from 'react';
import './App.css'
import Stage0 from './Stage0';
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Stage3 from './Stage3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeer } from '@fortawesome/free-solid-svg-icons'

class App extends Component {

  constructor(props) {
    super(props);

    var nowDate = new Date();
    var nowHour = parseInt(nowDate.toLocaleString("en-GB", { hour: '2-digit' }));
    var nowMinute = parseInt(nowDate.toLocaleString("en-GB", { minute: '2-digit' }));
    if(nowMinute > 30) {
      nowHour = nowHour+1;
      nowMinute = 0;
    } 
    if(nowMinute > 0) {
      nowMinute = 30;
    } 

    var defaultFinish = new Date();
    defaultFinish.setHours(nowHour + 4);
    defaultFinish.setMinutes(nowMinute);
    var targetDefault = defaultFinish.toLocaleString("en-GB", { hour: '2-digit', minute: '2-digit' })


    this.state = {
      stage: 0,
      drinkTarget: 2,
      finishTime: targetDefault
    }
    this.moveToNextStage = this.moveToNextStage.bind(this);
    this.addDrinks = this.addDrinks.bind(this);
    this.addFinish = this.addFinish.bind(this);
  }

  moveToNextStage() {
    this.setState({
      stage: this.state.stage + 1
    })
  }

  addDrinks(amount) {
      this.setState({
        drinkTarget: amount
      })
  }

  addFinish(time) {
    this.setState({
      finishTime: time
    })
  }

  render() {
    
    return (
      <div className="container-fluid">
        <div className="row" style={{padding:'10px',backgroundColor:'lightGrey',marginBottom:'15px'}}>
        <h1 style={{fontSize:'1.5em'}}><FontAwesomeIcon icon={faBeer}  /> Pace Yourself</h1>
        </div>
        <div className="row" style={{maxWidth:'450px'}}>
          <div class="col-sm">
            {this.state.stage === 0 && <Stage0 moveToStage={this.moveToStage}/> }
            {this.state.stage === 1 && <Stage1 moveToStage={this.moveToStage} addFinish={this.addFinish} {...this.state}/> }
            {this.state.stage === 2 && <Stage2 moveToStage={this.moveToStage} addDrinks={this.addDrinks} {...this.state}/> }
            {this.state.stage === 3 && <Stage3 moveToStage={this.moveToStage} {...this.state}/> }
            {this.state.stage < 3 && <button className="btn btn-success" onClick={() => this.moveToNextStage()} style={{marginLeft:'0'}}>Next</button> }
          </div>
         </div>
      </div>
    );
  }
}

export default App;
