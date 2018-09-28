import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function City(props) {
  const result = props.data;
  let items = result.map(item =>
    <div key={item.RecordNumber} className="row justify-content-center">
      <div className="card col-lg-4 col-md-4">
        <h1 className="card-header">{item.LocationText}</h1>
        <ul>
          <li>State: {item.State}</li>
          <li>Location: ({item.Lat}, {item.Long})</li>
          <li>Population(Estimated): {item.EstimatedPopulation}</li>
          <li>Total Wages: {item.TotalWages}</li>
        </ul>
      </div>
    </div>
  );
  return (
    <div>{items}</div>);
}

function ZipSearchField(props) {
  return (
    <div className="App-subHeader">
      <label>Zip Code</label>
      <input type="search"
        onChange={props.onSearchChange}
        placeholder="search..." />
    </div>
  );
}

class App extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      items: []    //object by updated components
    };
  }

  performSearch = (event) => {
    if(event.target.value.length != 5) {
      this.setState({items: []});
      return;
    }

    fetch("http://ctp-zip-api.herokuapp.com/zip/" + event.target.value)
      .then((res) => {          //get the result from json
        if(res.status === 200) {
          return res.json();
        } else {
          throw "No Found";
        }
      })
      .then(responseData => {    //responseData function
        this.setState({items: responseData}) //update the state object array
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });  //error function
  }

  render() {
    console.log(this.state.items);
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className="container">
          <ZipSearchField onSearchChange={(e) => this.performSearch(e)} />
          <City data={this.state.items} />
        </div>
      </div>
    );
  }
}

export default App;
