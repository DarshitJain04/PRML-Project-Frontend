import React, { Component } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Doctor1 from './assets/Doctor1.png';
import Doctor2 from './assets/Doctor2.png';
import Doctor3 from './assets/Doctor3.png';
import Tabletop from 'tabletop';
import Emotions from './emotionsChart';
import Conditions from './conditionsChart';

class App extends Component {
	constructor() {
		super();
		this.state = {
			condition: '',
			conditionsFlag: false,
			conditionsData: [],
			uniqueConditions: [],
			conditionDrugs: [],
			conditionsPredictions: [],
			drug: '',
			drugFlag: false,
			emotionsData: [],
			drugSelected: [],
		};
	}

	handleConditionChange = (event) => {
		this.setState({
			condition: event.target.value,
			conditionsFlag: false,
			conditionDrugs: [],
			conditionsPredictions: [],
		});
	};

	handleConditionSubmit = (event) => {
		if (this.state.condition !== '') {
			var tempConditions = this.state.conditionsData.filter((condition) =>
				condition.condition.includes(this.state.condition)
			);
			var drugs = [];
			var drugsPred = [];
			var sum = 0;
			for (var item, i = 0; (item = tempConditions[i++]); ) {
				var drugName = item.drugName;
				var drugPred = item.predictions;
				sum = sum + parseFloat(drugPred);
				drugs.push(drugName);
				drugsPred.push(parseFloat(drugPred));
			}
			console.log(sum);
			console.log(drugsPred);
			for (var j = 0, length = drugsPred.length; j < length; j++) {
				drugsPred[j] = 100 * (drugsPred[j] / sum);
			}
			console.log(drugsPred);
			this.setState({
				conditionsFlag: true,
				conditionDrugs: drugs,
				conditionsPredictions: drugsPred,
			});
		}
	};

	handleConditionClear = (event) => {
		this.setState({
			condition: '',
			conditionsFlag: false,
			conditionDrugs: [],
			conditionsPredictions: [],
		});
	};

	handleDrugChange = (event) => {
		this.setState({
			drug: event.target.value,
			drugSelected: [],
			drugFlag: false,
		});
	};

	handleDrugSubmit = (event) => {
		if (this.state.drug !== '') {
			var tempDrug = this.state.emotionsData.filter((drug) =>
				drug.DrugName.includes(this.state.drug)
			);
			this.setState({
				drugSelected: tempDrug,
				drugFlag: true,
			});
		}
	};

	handleDrugClear = (event) => {
		this.setState({ drug: '', drugSelected: [], drugFlag: false });
	};

	componentDidMount() {
		Tabletop.init({
			key: '1x6wMW_1i66aLaWAfwLpYd5PDyujEShyHt7bIXU5b4fQ',
			simpleSheet: true,
		})
			.then((data, tabletop) => {
				this.setState({
					conditionsData: data,
				});
			})
			.then(() => {
				var lookup = {};
				var result = [];
				for (var item, i = 0; (item = this.state.conditionsData[i++]); ) {
					var condition = item.condition;
					if (!(condition in lookup)) {
						lookup[condition] = 1;
						result.push(condition);
					}
				}
				this.setState({ uniqueConditions: result });
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
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
					spacing={8}
					style={{ width: '100%', height: '90vh', margin: 'auto' }}
				>
					<Grid item xs={12} sm={12} md={6} lg={6} style={{ margin: 'auto' }}>
						<p className="problemStatement">
							We understood how Data Science and Text Mining have been of
							significant importance in the health care industry and aim to
							answer the following questions through our platform: How to use
							sentiment analysis and predictive modelling to recommend the most
							effective drugs for the given condition? What is the emotional
							inclination of users towards a chosen drug? In this project the
							main aim is to examine the use of sentiment analysis on drug
							reviews that can aid in identify new opportunities and challenges
							for any pharmaceutical business. The project aims at classifying
							the various reviews on the specified drugs based on their polarity
							with the aid of their rating.
						</p>
					</Grid>
					<Grid item xs={12} sm={12} md={6} lg={6} style={{ margin: 'auto' }}>
						<img src={Doctor1} className="DoctorImage1" alt="Stay Safe ;)" />
					</Grid>
				</Grid>
				<div className="content">
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
						spacing={8}
						style={{ width: '100%', height: '100vh', margin: 'auto' }}
					>
						<Grid item xs={12} sm={12} md={6} lg={6} style={{ margin: 'auto' }}>
							{!this.state.conditionsFlag ? (
								<img
									src={Doctor2}
									className="DoctorImage2"
									alt="Stay Safe ;)"
								/>
							) : (
								<Conditions
									condition={`Top drug for ${this.state.condition}`}
									labels={this.state.conditionDrugs}
									data={this.state.conditionsPredictions}
								/>
							)}
						</Grid>
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
									{this.state.uniqueConditions.map((condition) => {
										return (
											<MenuItem key={condition} value={condition}>
												{condition}
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
									<button id="clearButton" onClick={this.handleConditionClear}>
										Clear
									</button>
								</div>
							</div>
						</Grid>
					</Grid>
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
						spacing={8}
						style={{ width: '100%', height: '95vh', margin: 'auto' }}
					>
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
						<Grid item xs={12} sm={12} md={6} lg={6} style={{ margin: 'auto' }}>
							{!this.state.drugFlag ? (
								<img
									src={Doctor3}
									className="DoctorImage3"
									alt="Stay Safe ;)"
								/>
							) : (
								<Emotions drugData={this.state.drugSelected} />
							)}
						</Grid>
					</Grid>
					<div style={{ width: '100%', height: '5vh', margin: 'auto' }}>
						<p className="footer">
							Made with {'<3'} by{' '}
							<a
								href="mailto:goyal.16@iitj.ac.in"
								target="_blank"
								rel="noreferrer"
							>
								Aditi,
							</a>{' '}
							<a
								href="mailto:jain.38@iitj.ac.in"
								target="_blank"
								rel="noreferrer"
							>
								Darshit,
							</a>{' '}
							and{' '}
							<a
								href="mailto:agarwal.10@iitj.ac.in"
								target="_blank"
								rel="noreferrer"
							>
								Harsh
							</a>{' '}
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
