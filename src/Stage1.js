import React, { Component } from 'react';

class Stage1 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      finishTime: props.finishTime
    }
  }

  addFinish(event) {
    this.setState({finishTime: event.target.value});
    this.props.addFinish(event.target.value)
  }

  render() {
    return <>
    <form>
      <div className="form-group">
        <label for="time">When do you intend to finish your night?</label>
        <input class="form-control" id="time" type="text" value={this.state.finishTime} onChange={(e) => this.addFinish(e)} placeholder="23:00" />
      </div>
    </form>
   </>
  }
}

export default Stage1;