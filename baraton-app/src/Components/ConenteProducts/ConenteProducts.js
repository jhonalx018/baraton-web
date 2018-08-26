import React, {Component} from 'react';
import '../../assets/ConenteProducts/ConenteProducts.css';
import {connect} from 'react-redux';

const ProduxBox = (data) => {

		var listBox = data
				.data
				.map((item, i) => (
						<div className="content-external" key={'ctn-' + item.id}>
								<div className="content-box" key={item.id}>
										<div className="title-box" key={item + '-name'}>{item.name}</div>
										<div className="title-box element-table" key={item + '-price'}>{item.price}</div>
										<div className="title-box element-table" key={item + '-quantity'}>quantity: {item.quantity}</div>
								</div>
						</div>
				))

		return listBox;
}

class ConenteProducts extends Component {

		constructor() {
				super();
				this.state = {
						products: []
				}
		}

		componentWillMount = () => {
				this
						.props
						.getData();
		}

		componentWillReceiveProps = (nextProps) => {
				const context = this;
				nextProps
						.products
						.then(function (data) {
								context.setState({products: data});
						});
		}

		render() {
				return (
						<div className="App">
								<h3 className="title-products">Lista de Productos</h3>
								<div className="content-data">
										<ProduxBox data={this.state.products}/>
								</div>
						</div>
				);
		}
}

const mapStateToProps = state => ({products: state.ProductsRx});

const mapDispatchToProps = dispatch => ({
		getData: async() => {
				await dispatch({type: 'GET_DATA_PRODUCTS'});
		}
});

export default connect(mapStateToProps, mapDispatchToProps)(ConenteProducts);
