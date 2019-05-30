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
  async componentDidMount() {
    this.getChartData();
  }

  // Initial teams object
  teamData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
    datasets: [
      {
        label: 'APG',
        data: [],
        borderColor: '#a6cee3',
      },
      {
        label: 'Bom',
        data: [],
        borderColor: '#ff7f00',
      },
      {
        label: 'Bugs',
        data: [],
        borderColor: '#a1fc2a',
      },
      {
        label: 'CD',
        data: [],
        borderColor: '#6a3d9a',
      },
      {
        label: 'EL',
        data: [],
        borderColor: '#fdbf6f',
      },
      {
        label: 'For',
        data: [],
        borderColor: '#787f6e',
      },
      {
        label: 'HGH',
        data: [],
        borderColor: '#e31a1c',
      },
      {
        label: 'Leg',
        data: [],
        borderColor: '#fb9a99',
      },
      {
        label: 'OC',
        data: [],
        borderColor: '#b15928',
      },
      {
        label: 'RP',
        data: [],
        borderColor: '#cab2d6',
      },
      {
        label: 'SM',
        data: [],
        borderColor: '#1f78b4',
      },
      {
        label: 'SSP',
        data: [],
        borderColor: '#b2df8a',
      },

      {
        label: 'TBD',
        data: [],
        borderColor: '#00000',
      },
      {
        label: 'BT',
        data: [],
        borderColor: '#ffff99',
      },
      {
        label: 'DSq',
        data: [],
        borderColor: '#33a02c',
      },
      {
        label: 'HH',
        data: [],
        borderColor: '#f5fc2a',
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
        
        this.setState({
          newData: data,
          weeks
        })
      })
      // Will show rank chart on page load
      .then(() => this.rankInfo())
      .catch(err => console.log(err));
  }

  // Update teams with rank info from db
  rankInfo() { 
    let team = 0, counter = 0
    for (let i = 0; i < 48; i++) {  
      if (counter >= this.state.weeks) {
        team++;
        counter = 0;
      } 
      this.teamData.datasets[team].data.push(this.state.newData[i].rank);
      counter ++;
    }
    
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
