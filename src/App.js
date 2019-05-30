import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import Chart from './components/Chart';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newData: [],
      chartData: this.teamData,
    }
  }
  // Do initial database call
  componentDidMount() {
    this.getChartData();
  }

  // Initial teams object, structured for ChartJS
  teamData = {
    labels: [],
    datasets: [
      {
        label: 'APG',
        data: [],
        borderColor: '#a6cee3',
        backgroundColor: '#a6cee3',
      },
      {
        label: 'Bomb',
        data: [],
        borderColor: '#ff7f00',
        backgroundColor: '#ff7f00',
      },
      {
        label: 'Bugs',
        data: [],
        borderColor: '#a1fc2a',
        backgroundColor: '#a1fc2a',
      },
      {
        label: 'CD',
        data: [],
        borderColor: '#6a3d9a',
        backgroundColor: '#6a3d9a',
      },
      {
        label: 'EL',
        data: [],
        borderColor: '#fdbf6f',
        backgroundColor: '#fdbf6f',
      },
      {
        label: 'For',
        data: [],
        borderColor: '#787f6e',
        backgroundColor: '#787f6e',
      },
      {
        label: 'HGH',
        data: [],
        borderColor: '#e31a1c',
        backgroundColor: '#e31a1c',
      },
      {
        label: 'Leg',
        data: [],
        borderColor: '#fb9a99',
        backgroundColor: '#fb9a99',
      },
      {
        label: 'OC',
        data: [],
        borderColor: '#b15928',
        backgroundColor: '#b15928',
      },
      {
        label: 'RP',
        data: [],
        borderColor: '#cab2d6',
        backgroundColor: '#cab2d6',
      },
      {
        label: 'SM',
        data: [],
        borderColor: '#1f78b4',
        backgroundColor: '#1f78b4',
      },
      {
        label: 'SSP',
        data: [],
        borderColor: '#b2df8a',
        backgroundColor: '#b2df8a',
      },
      {
        label: 'TBD',
        data: [],
        borderColor: '#030914',
        backgroundColor: '#030914',
      },
      {
        label: 'Big T',
        data: [],
        borderColor: '#ffff99',
        backgroundColor: '#ffff99',
      },
      {
        label: 'DSq',
        data: [],
        borderColor: '#33a02c',
        backgroundColor: '#33a02c',
      },
      {
        label: 'HH',
        data: [],
        borderColor: '#d031d6',
        backgroundColor: '#d031d6',
      },
    ],
  }

  // Initial db call on page load
  getChartData() {
    fetch('http://localhost:3001/stats')
      .then(response => response.json())
      .then(({ data }) => {
        // Calculate number of weeks of data retrieved - number of records divided by number of teams (16)
        const weeks = data.length / 16;

        // Add week numbers to chart label once data retrieved
        for (let i = 1; i <= weeks; i++) {
          this.teamData.labels.push(`Week ${i}`)
        }
        
        // Save db data, weeks in state for further use
        this.setState({
          newData: data,
          weeks
        })
      })
      // Call function to show rank chart on page load
      .then(() => this.rankInfo())
      .catch(err => console.log(err));
  }

  // Update teams with rank info from db
  rankInfo() { 
    console.log(this.state.newData.length);
    
    // Set team and counter to 0
    let team = 0, counter = 0
    
    // For loop goes through each database record
    for (let i = 0; i < this.state.newData.length; i++) {  
      // Records are groups alphabetically by team, so the first team's records will all be in a row. So we need to keep a counter to check when it's time to move to the next team. Once the counter is greater than the number of weeks in the data, we know it's time to move on. Add one to the team counter and reset the other counter.
      if (counter >= this.state.weeks) {
        team++;
        counter = 0;
      }
      // Push the rank from the record into the team's data. Advance the counter. 
      this.teamData.datasets[team].data.push(this.state.newData[i].rank);
      counter ++;
    }
    // Set state with the new team data
    this.setState({
      chartData: this.teamData
    })
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <h1>LPH Pythagorean</h1>
          </Row>
          <Chart
            chartData={this.state.chartData}
          />
        </Container>
      </div>
    )
  };
}

export default App;
