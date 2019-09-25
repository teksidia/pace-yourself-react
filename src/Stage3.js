import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeer } from '@fortawesome/free-solid-svg-icons'

class Stage3 extends Component {

  constructor(props) {
    super(props)

    var startDate = new Date();
    var endDate = new Date();
    var endTime = this.props.finishTime.split(/:|-/g);    
    endDate.setHours(endTime[0]);
    endDate.setMinutes(endTime[1]);

    var options = { hour: '2-digit' };
    var startHour = startDate.toLocaleString("en-GB", options);
    var endHour = endDate.toLocaleString("en-GB", options);

    if(startHour > endHour) {
      endDate.setDate(endDate.getDate() + 1);
    }

    var milliseconds = (endDate.getTime() - startDate.getTime());
    var timePerDrink = milliseconds / this.props.drinkTarget;
    var sessionHours = milliseconds / 1000 / 60 / 60;

    this.state = {
      timePerDrink: timePerDrink,
      sessionStart: startDate,
      sessionEnd: endDate,
      sessionHours: sessionHours.toFixed(1) + " hours",
      target: parseInt(this.props.drinkTarget),
      drinksConsumed: 0,
      targetMet: false,
      lastDrink: false
    }
  }

  nextDrink() {
    var drinksConsumed = this.state.drinksConsumed + 1;

    if(drinksConsumed ===  this.state.target) {
      this.setState({targetMet: true, lastDrink: false});
    }

    if(this.state.target - drinksConsumed === 1) {
      this.setState({lastDrink: true});
    }

    var startDate = new Date();
    var milliseconds = (this.state.sessionEnd.getTime() - startDate.getTime());
    var timePerDrink = milliseconds / (this.props.drinkTarget - drinksConsumed);

    this.setState({
      drinksConsumed,
      timePerDrink
    });
  }

  render() {

    // Random component
    const Completionist = () => <span>You are good to go!</span>;

    const Timer = () =>  <div className="card">
                            <div className="card-body">
                              <p>
                                { [...Array(this.state.target)].map((e, i) => renderDrink(i, this.state.drinksConsumed)) }
                              </p>
                              <p className="card-text" style={{marginLeft:'3px',marginTop:'0'}}>   
                              { !this.state.lastDrink && <><small>Time until next drink</small><br/></> } 
                              { getFeedback(this.state) }       
                                <Countdown date={Date.now() + this.state.timePerDrink} renderer={renderer} />
                              </p>
                             
                              <button className="btn btn-success" onClick={() => this.nextDrink()} style={{marginLeft:'0'}}>{ getButtonText(this.state.lastDrink) }</button>
                              <a href="/" style={{fontSize:'.8em'}}>Cancel Session</a>
                              <p style={{marginLeft:'3px',fontSize:'.8em'}}>
                                Session: {this.state.sessionStart.toLocaleString("en-GB", options)} to {this.state.sessionEnd.toLocaleString("en-GB", options)} ({this.state.sessionHours})
                              </p>
                            </div>
                         </div>

    const HomeTime = () => <div className="card">
                                <div className="card-body" style={{textAlign:'center'}}>
                                <FontAwesomeIcon icon={faBeer} style={{margin:'5px',fontSize:'8em'}} />
                                <div className="alert alert-success" role="alert">
                                  Session complete!
                                </div>
                                <a className="btn btn-success" href="/">Start Again</a>
                                </div>
                           </div>

    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return <Completionist />;
      } else {
        // Render a countdown
        return <span style={{fontSize:'4em',paddingTop:'0',lineHeight:'.8em'}}>{hours}h {minutes}m <span style={{fontSize:'0.5em'}}>{seconds}s</span></span>;
      }
    };

    var options = { hour: '2-digit', minute: '2-digit' };

    function getFeedback(state) {
      if(state.lastDrink) {
        return <div className="alert alert-warning" role="alert">
                  Last drink!
                </div>;
      }
      if(state.targetMet) {
        return <div className="alert alert-danger" role="alert">
                No more drinks allowed. Home time!
              </div>;
      }
      return <>&nbsp;</>;
    }

    function renderDrink(count, consumed) {
      if(count >= consumed) {
        return <FontAwesomeIcon key={count} icon={faBeer} style={{margin:'5px',fontSize:'4em'}} />;
      }
      return <FontAwesomeIcon key={count} icon={faBeer} style={{color:'lightgrey',margin:'5px',fontSize:'4em'}} />;
    }

    function getButtonText(lastDrink) {
      return lastDrink ? "Finish" : "Next Drink";
    }

    return <>

            { this.state.targetMet ? <HomeTime/> : <Timer/> }

           </>
  }
}

export default Stage3;