import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class emotionsChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drugData: props.drugData,
			chartData: {
				labels: [
					'Anger',
					'Anticipation',
					'Disgust',
					'Fear',
					'Joy',
					'Negative',
					'Positive',
					'Sadness',
					'Surprise',
					'Trust',
				],
				datasets: [
					{
						label: 'Emotion associated with the chosen drug',
						data: [
							props.drugData[0]['Anger'],
							props.drugData[0]['Anticipation'],
							props.drugData[0]['Disgust'],
							props.drugData[0]['Fear'],
							props.drugData[0]['Joy'],
							props.drugData[0]['Negative'],
							props.drugData[0]['Positive'],
							props.drugData[0]['Sadness'],
							props.drugData[0]['Surprise'],
							props.drugData[0]['Trust'],
						],
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
			},
		};
	}

	render() {
		return (
			<div style={{ height: '100%', width: '90%', margin: 'auto' }}>
				<Doughnut
					data={this.state.chartData}
					options={{
						title: {
							display: true,
							text: 'Emotions associated with the chosen drug',
							fontSize: 20,
						},
						legend: {
							display: true,
							position: 'right',
						},
					}}
				/>
			</div>
		);
	}
}

export default emotionsChart;
