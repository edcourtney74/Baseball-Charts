import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static defaultProps = {
        titleText: 'Rank',
        stepSize: 1,
        reverse: true,
    }

    teamData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
        datasets: [
          {
            label: 'APG',
            data: [1],
            borderColor: '#a6cee3',
          },
          {
            label: 'Bom',
            data: [2],
            borderColor: '#ff7f00',
          },
          {
            label: 'Bugs',
            data: [3],
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



    render() {
        console.log(this.props.chartData)
        return (
            <div className="chart">
                <Line
                    data={this.props.chartData}
                    options={{
                        title: {
                            display: true,
                            text: `${this.props.titleText}`,
                            fontSize: 20
                        },
                        /*legend: {
                            position: this.props.legendPosition,
                        },*/
                        scales: {
                            yAxes: [{
                                ticks: {
                                    stepSize: `${this.props.stepSize}`,
                                    reverse: `${this.props.reverse}`
                                },
                            }]
                        },
                        elements: {
                            line: {
                                fill: false,
                                tension: 0
                            }
                        }
                    }}
                />
            </div>
        )
    }
}

export default Chart;