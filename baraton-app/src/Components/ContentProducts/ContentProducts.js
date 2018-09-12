import React, {Component} from 'react';
import '../../assets/ContentProducts/ContentProducts.css';
import {connect} from 'react-redux';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const SearchBar = props => (

		<div className="search-bar">
				<div
						className="products-label"
						style={{
						'textAlign': 'left',
						'padding': '0px 10px 10px',
						'cursor': 'pointer'
				}}>Filters</div>
				<div className="content-check">
						<FormControl>
								<InputLabel htmlFor="demo-controlled-open-select">Available Filter</InputLabel>
								<Select onChange={props.changeStatusFilter} value={props.availableFilter}>
										<MenuItem value="none">None</MenuItem>
										<MenuItem value="Avaliable">Avaliable</MenuItem>
										<MenuItem value="Unavailable">Unavailable</MenuItem>
								</Select>
						</FormControl>
				</div>
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
						<div
								className="products-label"
								style={{
								'textAlign': 'left',
								'cursor': 'pointer'
						}}>Ordering</div>
						<div className="InputOrdenring">
								<FormControl>
										<InputLabel htmlFor="demo-controlled-open-select">Field</InputLabel>
										<Select value={props.fieldOrder} onChange={props.fieldOrderSet}>
												<MenuItem value="price">Price</MenuItem>
												<MenuItem value="quantity">Quantity</MenuItem>
										</Select>
								</FormControl>
								<FormControl>
										<InputLabel htmlFor="demo-controlled-open-select">Type</InputLabel>
										<Select value={props.fieldType} onChange={props.orderType}>
												<MenuItem value="asc">Asc</MenuItem>
												<MenuItem value="desc">Desc</MenuItem>
										</Select>
								</FormControl>
						</div>

				</div>
		</div>
);

const ProduxBox = (data) => {

		var listBox = data
				.data
				.map((item, i) => (
						<div className="content-external" key={'ctn-' + item.id}>
								<div className="content-box" key={'etc-' + item.id}>
										<div className="content-icon-car" key={'icon-content-' + item.id}>
												{item.available == true && <i
														className="material-icons success-icon"
														key={'icon-' + item.id}
														onClick={() => {
														data.addCard(item)
												}}>
														add_shopping_cart
												</i>
}
												{item.available == false && <i className="material-icons" key={'icon-' + item.id}>
														error_outline
												</i>
}
										</div>
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
						categoriesSelected: [],
						fieldOrder: '',
						fieldType: '',
						availableFilter: 'none'
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
				const statusAvailable = this.state.availableFilter;
				const elements = products.filter(item => (item.quantity.toString().toLowerCase().indexOf(this.state.valSearch.toLowerCase()) != -1 || item.name.toString().toLowerCase().indexOf(this.state.valSearch.toLowerCase())) != -1);
				let finalElements = elements;

				if (statusAvailable == 'Avaliable') {
						finalElements = finalElements.filter(item => item.available == true);
				} else if (statusAvailable == 'Unavailable') {
						finalElements = finalElements.filter(item => item.available == false);
				}

				if (this.minPrice > 0) {
						finalElements = finalElements.filter(item => this.parseToNumber(item.price) >= this.minPrice);
				}

				if (this.maxPrice > 0) {
						finalElements = finalElements.filter(item => this.maxPrice >= this.parseToNumber(item.price));
				}
				this.setState({products: finalElements}, () => {
					this.applyOrder();
			});
		}

		applyOrder = () => {
				const context = this;

				if (this.state.fieldType != '' && this.state.fieldOrder != '') {
						let elements = this.state.products;
						elements.sort((a, b) => {
								if (context.state.fieldType == 'asc') {
										if (this.parseToNumber(a[context.state.fieldOrder]) > this.parseToNumber(b[context.state.fieldOrder])) {
												return 1;
										}
										if (this.parseToNumber(a[context.state.fieldOrder]) < this.parseToNumber(b[context.state.fieldOrder])) {
												return -1;
										}
										return 0;
								} else {
										if (this.parseToNumber(a[context.state.fieldOrder]) > this.parseToNumber(b[context.state.fieldOrder])) {
												return -1;
										}
										if (this.parseToNumber(a[context.state.fieldOrder]) < this.parseToNumber(b[context.state.fieldOrder])) {
												return 1;
										}
										return 0;
								}
						});

						this.setState({products: elements});
				}
		}

		orderType = (event) => {

				this.setState({
						fieldType: event.target.value
				}, () => {
						this.applyOrder();
				});

		}

		fieldOrderSet = (event) => {
				this.setState({
						fieldOrder: event.target.value
				}, () => {
						this.applyOrder();
				});
		}

		maxPriceFunction = (event) => {
				this.maxPrice = this.parseToNumber(event.target.value);
				this.filterComplety();
		}

		minPriceFunction = (event) => {
				this.minPrice = this.parseToNumber(event.target.value);
				this.filterComplety();
		}

		changeStatusFilter = (event) => {
				this.setState({
						availableFilter: event.target.value
				}, () => {
						this.filterComplety();
				});
		}

		parseToNumber = (numberString = 0) => {

				if (Number.isInteger(numberString)) {
						return numberString;
				}
				let arrayLetters = numberString.split('');

				let parseArr = arrayLetters.filter(item => (item.indexOf(',') === -1 && (item.indexOf('$') === -1) && (item.indexOf('.') === -1)));
				let finalString = '';
				parseArr.map(item => {
						finalString = finalString + item;
				});

				return parseInt(finalString);
		}

		addCard = (item) => {
				this
						.props
						.saveItem(item);
				//window.location.pathname = 'car';
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
												minPrice={this.minPriceFunction}
												orderType={this.orderType}
												fieldOrder={this.state.fieldOrder}
												fieldType={this.state.fieldType}
												fieldOrderSet={this.fieldOrderSet}
												availableFilter={this.state.availableFilter}
												changeStatusFilter={this.changeStatusFilter}/>
										<ProduxBox data={this.state.products} addCard={this.addCard}/>
								</div>
						</div>
				);
		}
}

const mapStateToProps = state => ({products: state.ProductsRx, categoriesSelected: state.CategoriesRx});

const mapDispatchToProps = dispatch => ({
		getData: async() => {
				await dispatch({type: 'GET_DATA_PRODUCTS'});
		},
		saveItem: (dataPayload) => {
				dispatch({type: 'SAVE_ITEM_CAR', payload: dataPayload});
		}
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentProducts);
