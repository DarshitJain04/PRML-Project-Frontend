import React, { Component } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Doctor from './assets/Doctors1.png';

class App extends Component {
	constructor() {
		super();
		this.state = {
			dataFlag: false,
			condition: '',
		};
	}

	handleChange = (event) => {
		this.setState({ condition: event.target.value }, () =>
			console.log(this.state.condition)
		);
	};

	handleClear = (event) => {
		this.setState({ condition: '' }, () => console.log(this.state.condition));
	};

	render() {
		return (
			<div className="App">
				<h1 className="heading">Pill Recommendation System</h1>
				<div className="content">
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
						spacing={8}
						style={{ width: '100%', height: '100%', margin: 'auto' }}
					>
						<Grid item xs={12} sm={12} md={6} lg={6} style={{ margin: 'auto' }}>
							<div className="form">
								<h1>
									Analyzing the drugs descriptions, conditions, reviews and then
									recommending it using Deep Learning Models, for each health
									condition of a patient
								</h1>
								<Select
									displayEmpty
									style={{ width: '50%' }}
									value={this.state.condition}
									onChange={this.handleChange}
								>
									<MenuItem value="" disabled>
										Condition
									</MenuItem>
									<MenuItem value={'Corona'}>Corona</MenuItem>
									<MenuItem value={'Depression'}>Depression</MenuItem>
									<MenuItem value={'Headache'}>Headache</MenuItem>
									<MenuItem value={'Birth Control'}>Birth Control</MenuItem>
									<MenuItem value={'ADHD'}>ADHD</MenuItem>
									<MenuItem value={'Frozen Shoulder'}>Frozen Shoulder</MenuItem>
								</Select>
								<div className="buttons">
									<button id="submitButton" onClick={this.handleSubmit}>
										Search
									</button>
									<button id="clearButton" onClick={this.handleClear}>
										Clear
									</button>
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={6} style={{ margin: 'auto' }}>
							{!this.state.dataFlag ? (
								<img src={Doctor} className="DoctorImage" alt="Stay Safe ;)" />
							) : (
								<h1>Data</h1>
							)}
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default App;
