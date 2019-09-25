import React, { Component } from 'react';

class Stage2 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      drinks: props.drinkTarget
    }
  }

  addDrinks(event) {
    this.setState({drinks: event.target.value});
    this.props.addDrinks(event.target.value)
  }

  render() {
    return <form>
              <div className="form-group">
                <label for="drinks">How many drinks do you want?</label>
                <input class="form-control" id="drinks" type="text" value={this.state.drinks} onChange={(e) => this.addDrinks(e)} placeholder="5" />
              </div>
            </form>

  }
}

export default Stage2;