import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class emotionsChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			conditionsData: props.conditionsData,
			chartData: {
				labels: props.labels,
				datasets: [
					{
						label: props.condition,
						data: props.data,
						backgroundColor: [
							'#DE4839',
							'#E07C24',
							'#6AC47E',
							'#D9AAF6',
							'#FF6666',
							'#F7CD2E',
							'#3DBE29',
							'#CAD5E2',
							'#51E1ED',
							'#2827CC',
						],
					},
				],
				options: {
					title: {
						display: true,
						text: props.condition,
						fontSize: 40,
					},
					legend: {
						display: true,
						position: 'right',
					},
				},
			},
		};
	}

	render() {
		return (
			<div style={{ height: '100%', width: '100%', margin: 'auto' }}>
				<Bar data={this.state.chartData} />
			</div>
		);
	}
}

export default emotionsChart;
