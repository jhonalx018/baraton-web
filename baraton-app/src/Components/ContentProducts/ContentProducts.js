import React, {Component} from 'react';
import '../../assets/ContentProducts/ContentProducts.css';
import {connect} from 'react-redux';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

const SearchBar = props => (

		<div className="search-bar">
				<div
						className="products-label"
						style={{
						'textAlign': 'left',
						'padding': '0px 10px 10px',
						'cursor': 'pointer'
				}}>Filters</div>
				<Input
						type="text"
						onChange={props.eventKey}
						className="inputSearchBar"
						placeholder="Filter by name and quantity"/>
				<div className="content-form-control">
						<TextField
								label="Min Price"
								type="number"
								className="number-text-field"
								onChange={props.minPrice}/>
						<TextField
								label="Max Price"
								type="number"
								className="number-text-field"
								onChange={props.maxPrice}/>
				</div>
		</div>
);

const ProduxBox = (data) => {

		var listBox = data
				.data
				.map((item, i) => (
						<div className="content-external" key={'ctn-' + item.id}>
								<div className="content-box" key={'etc-' + item.id}>
										<div className="title-box" key={item + '-name'}>{item.name}</div>
										<div className="title-box element-table" key={item + '-price'}>{item.price}</div>
										<div className="title-box element-table" key={item + '-quantity'}>quantity: {item.quantity}</div>
								</div>
						</div>
				))

		return listBox;
}

class ContentProducts extends Component {

		constructor() {
				super();
				this.actives = [];
				this.maxPrice = 0;
				this.minPrice = 0;
				this.state = {
						valSearch: '',
						orginalData: [],
						products: [],
						categoriesSelected: []
				}
		}

		componentWillMount = () => {
				this
						.props
						.getData();
		}

		validateItemCategorie = (item) => {
				return this
						.actives
						.indexOf(item.sublevel_id) != -1;
		}

		componentWillReceiveProps = (nextProps) => {
				const context = this;
				nextProps
						.products
						.then(function (dataProducts) {

								nextProps
										.categoriesSelected
										.then(function (data) {
												//filter products with selected categories
												context.actives = [];
												for (let i in data.datosFiltrados) {
														if (data.datosFiltrados[i]) {
																context
																		.actives
																		.push(parseInt(i));
														}
												}
												let dataClean = dataProducts.filter(item => context.validateItemCategorie(item));
												let dataFull = (context.actives.length > 0 && data.datosFiltrados != undefined)
														? dataClean
														: dataProducts;
												context.setState({products: dataProducts, orginalData: dataFull});
												data
												context.filterComplety();

										});
						});
		}

		filterKey = (event) => {
				this.setState({
						valSearch: event.target.value
				}, () => {
						this.filterComplety();
				})
		}

		filterComplety = () => {

				const products = this.state.orginalData;
				const elements = products.filter(item => (item.quantity.toString().toLowerCase().indexOf(this.state.valSearch.toLowerCase()) != -1 || item.name.toString().toLowerCase().indexOf(this.state.valSearch.toLowerCase())) != -1);
				let finalElements = elements;

				if (this.minPrice > 0) {
						finalElements = elements.filter(item => this.parseToNumber(item.price) >= this.minPrice);
				}

				if (this.maxPrice > 0) {
						finalElements = finalElements.filter(item => this.maxPrice >= this.parseToNumber(item.price));
				}
				this.setState({products: finalElements});

		}

		maxPriceFunction = (event) => {
				this.maxPrice = this.parseToNumber(event.target.value);
				this.filterComplety();
		}

		minPriceFunction = (event) => {
				this.minPrice = this.parseToNumber(event.target.value);
				this.filterComplety();
		}

		parseToNumber = (numberString = 0) => {
				let arrayLetters = numberString.split('');

				let parseArr = arrayLetters.filter(item => (item.indexOf(',') === -1 && (item.indexOf('$') === -1) && (item.indexOf('.') === -1)));
				let finalString = '';
				parseArr.map(item => {
						finalString = finalString + item;
				});

				return parseInt(finalString);
		}

		render() {
				return (
						<div className="App">

								<h3 className="title-products">Product List</h3>
								<div className="products-label">Quantity({this.state.products.length})</div>
								<div className="content-data">
										<SearchBar
												eventKey={this.filterKey}
												maxPrice={this.maxPriceFunction}
												minPrice={this.minPriceFunction}/>
										<ProduxBox data={this.state.products}/>
								</div>
						</div>
				);
		}
}

const mapStateToProps = state => ({products: state.ProductsRx, categoriesSelected: state.CategoriesRx});

const mapDispatchToProps = dispatch => ({
		getData: async() => {
				await dispatch({type: 'GET_DATA_PRODUCTS'});
		}
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentProducts);
