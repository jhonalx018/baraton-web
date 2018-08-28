import React, {Component} from 'react';
import '../../assets/ContentProducts/ContentProducts.css';
import {connect} from 'react-redux';

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
				this.state = {
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
												if (context.actives.length > 0 && data.datosFiltrados != undefined) {

														let dataClean = dataProducts.filter(item => context.validateItemCategorie(item));
														context.setState({products: dataClean});
												} else {
														context.setState({products: dataProducts});
												}

										});
						});
		}

		render() {
				return (
						<div className="App">
								<h3 className="title-products">Product List</h3>
								<div className="products-quantity">Quantity({this.state.products.length})</div>
								<div className="content-data">
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
