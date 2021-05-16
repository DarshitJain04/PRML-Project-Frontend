import React, { Component } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Doctor from './assets/Doctors1.png';
import DoctorNext from './assets/Doctors3.png';
import Tabletop from 'tabletop';
import Emotions from './emotionsChart';

class App extends Component {
	constructor() {
		super();
		this.state = {
			totalData: [],
			condition: '',
			medicines: [],
			predictions: [],
			dataFlag: false,
			emotionsData: [],
			drug: '',
			drugSelected: [],
			drugFlag: false,
		};
	}

	handleConditionSubmit = (event) => {
		if (this.state.condition !== '') {
		}
	};

	handleConditionChange = (event) => {
		this.setState({ condition: event.target.value });
	};

	handleConditionClear = (event) => {
		this.setState({ condition: '', dataFlag: false });
	};

	handleDrugChange = (event) => {
		this.setState(
			{ drug: event.target.value, drugSelected: [], drugFlag: false },
			() => console.log(this.state.drug)
		);
	};

	handleDrugSubmit = (event) => {
		if (this.state.drug !== '') {
			const tempDrug = this.state.emotionsData.filter((drug) =>
				drug.DrugName.includes(this.state.drug)
			);
			this.setState(
				{
					drugSelected: tempDrug,
					drugFlag: true,
				},
				() => console.log(this.state.drugSelected)
			);
		}
	};

	handleDrugClear = (event) => {
		this.setState({ drug: '', drugSelected: [], drugFlag: false });
	};

	componentDidMount() {
		Tabletop.init({
			key: '1LruvrwScdnPR1wMENxsjsd5W8N26lHpjEdylvUFgtC8',
			simpleSheet: true,
		}).then((data, tabletop) => {
			this.setState({
				totalData: data,
			});
		});

		Tabletop.init({
			key: '1y0tJFI-PgyzZMnH96qzaSmjFp-6aU_Co2NeIT5w4Q9o',
			simpleSheet: true,
		}).then((data, tabletop) => {
			this.setState({
				emotionsData: data,
			});
		});
	}

	render() {
		return (
			<div className="App">
				<h1 className="heading">
					Pill Recommendation System{' '}
					<span role="img" aria-label="wink">
						💊
					</span>
				</h1>
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
								<p className="description">
									Analyzing the drugs descriptions, conditions, reviews and then
									recommending it using Deep Learning Models, for each health
									condition of a patient
								</p>
								<Select
									displayEmpty
									style={{ width: '50%' }}
									value={this.state.condition}
									onChange={this.handleConditionChange}
								>
									<MenuItem value="" disabled>
										Condition
									</MenuItem>
									{this.state.totalData.map((condition) => {
										return (
											<MenuItem
												key={condition['condition']}
												value={condition['condition']}
											>
												{condition['condition']}
											</MenuItem>
										);
									})}
								</Select>
								<div className="buttons">
									<button
										id="submitButton"
										onClick={this.handleConditionSubmit}
									>
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
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
						spacing={8}
						style={{ width: '100%', height: '100vh', margin: 'auto' }}
					>
						<Grid item xs={12} sm={12} md={6} lg={6} style={{ margin: 'auto' }}>
							{!this.state.drugFlag ? (
								<img
									src={DoctorNext}
									className="DoctorImageNext"
									alt="Stay Safe ;)"
								/>
							) : (
								<Emotions drugData={this.state.drugSelected} />
							)}
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={6} style={{ margin: 'auto' }}>
							<div className="form">
								<p className="description">
									Check emotions associated with a particular drug
								</p>
								<Select
									displayEmpty
									style={{ width: '50%' }}
									value={this.state.drug}
									onChange={this.handleDrugChange}
								>
									<MenuItem value="" disabled>
										Drug
									</MenuItem>
									{this.state.emotionsData.map((drug) => {
										return (
											<MenuItem key={drug['DrugName']} value={drug['DrugName']}>
												{drug['DrugName']}
											</MenuItem>
										);
									})}
								</Select>
								<div className="buttons">
									<button id="submitButton" onClick={this.handleDrugSubmit}>
										Search
									</button>
									<button id="clearButton" onClick={this.handleDrugClear}>
										Clear
									</button>
								</div>
							</div>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default App;
