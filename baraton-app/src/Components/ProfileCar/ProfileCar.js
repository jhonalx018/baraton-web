import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import '../../assets/ProfileCar/ProfileCar.css';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';

class Orders extends Component {
  constructor() {
    super();
    this.stylesBarOpen = {
      height: '80%'
    }
    this.state = {
      openBar: false,
      stylesBar: {}
    }

  }
  changeStatusBar = () => {
    const newStatus = !this.state.openBar;
    const newStyle = (newStatus === true)
      ? this.stylesBarOpen
      : {};
    this.setState({openBar: newStatus, stylesBar: newStyle});
  }

  getSubItems = (listItems) => {
    const lista = listItems.map((item) => {
      return <li>
        <div>Item: {item.name}</div>
        <div>Quantity: {item.carQuantity}</div>
        <div>total: $<NumberFormat
          decimalSeparator="."
          thousandSeparator=","
          value={item.total}
          className="number-formar"></NumberFormat>
        </div>
      </li>
    });
    return lista;
  }

  render() {
    const elementsItems = this.props.orders;
    return (
      <div className="content-buy" style={this.state.stylesBar}>
        <div className="title-navigation">Complete Orders</div>
        <i
          className="material-icons navigation-top"
          onClick={() => {
          this.changeStatusBar()
        }}>
          expand_less
        </i>
        {this.state.openBar == true && <div className="content-order-list">
          {elementsItems.map(item => <div className="content-items">
            <div className="titles-item">{item.date}</div>
            <div className="titles-item">$
              <NumberFormat
                decimalSeparator="."
                thousandSeparator=","
                value={item.total}
                className="number-formar"></NumberFormat>
            </div>
            <p>Details</p>
            <ul>{this.getSubItems(item.elements)}</ul>
          </div>)}
        </div>
}
      </div>
    )
  }
}

class ProfileCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carShopping: (JSON.parse(localStorage.getItem('carShopping')) === null)
        ? []
        : JSON.parse(localStorage.getItem('carShopping')),
      itemInput: {},
      total: 0,
      orders: (JSON.parse(localStorage.getItem('orders')) == null)
        ? []
        : JSON.parse(localStorage.getItem('orders'))
    }
  }

  componentWillMount = () => {
    this.recalcComponent();
  }

  recalcComponent = () => {
    const {carShopping} = this.state;
    let price = 0;
    let newElements = carShopping.map((item) => {
      if (item.carQuantity === undefined) {
        item['carQuantity'] = 1;
        item['total'] = this.parseToNumber(item.price);
        price = price + item['total'];
      }

      return item;
    });
    this.setState({carShopping: newElements, total: price});
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

  changeQuantity = (event, item) => {
    const val = event.target.value;

    if (!Number.isInteger(parseInt(val))) {
      return false;
    }

    if (parseInt(val) < 1) {
      return false;
    }
    let totals = 0;
    const {carShopping} = this.state;
    let result = carShopping.map((element) => {
      if (item.id === element.id) {
        let base = (element.total / element.carQuantity);
        element.total = (base * val);
        element.carQuantity = parseInt(val);
      }
      totals += element.total;
      return element
    });

    this.setState({carShopping: result, total: totals});
  }

  buyNow = () => {
    const items = this.state.carShopping;
    let storage = this.state.orders;
    const order = {
      elements: items,
      date: new Date().toLocaleString(),
      total: this.state.total
    }
    storage.push(order);
    localStorage.setItem('orders', JSON.stringify(storage));
    localStorage.setItem('carShopping', JSON.stringify([]));
    this.setState({orders: storage, carShopping: [], total: 0});
    this
      .props
      .cleanData();
  }

  render() {
    const {carShopping} = this.state;
    return (
      <div className="content-profile">
        <div className="total-elements">Summary $<NumberFormat
          decimalSeparator="."
          thousandSeparator=","
          value={this.state.total}
          className="number-formar"></NumberFormat>
          <Button
            color="secondary"
            onClick={() => {
            this.buyNow()
          }}
            className="btn-buy">Buy Now!</Button>
        </div>
        {carShopping.map((item) => (
          <div className="content-items-car" key={'c' + item.id}>
            <div className="content-box">
              <div className="order-elements">
                <div className="center-content">
                  {item.name}
                </div>
              </div>
              <div className="order-elements">
                <div className="center-content">
                  Base {item.price}
                </div>
              </div>
              <div className="order-elements">
                <div className="center-content">
                  Total: $<NumberFormat
                    decimalSeparator="."
                    thousandSeparator=","
                    value={item.total}
                    className="number-formar"></NumberFormat>
                </div>
              </div>
              <div className="order-elements">
                <TextField
                  label="Quantity"
                  type="number"
                  value={item.carQuantity}
                  className="number-text-field"
                  onChange={(event) => this.changeQuantity(event, item)}/>
              </div>
            </div>

          </div>
        ))}
        <Orders orders={this.state.orders}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({shopping: state.ShoppingCarRx});

const mapDispatchToProps = dispatch => ({
  cleanData: (payload) => {
    dispatch({type: 'CLEAR_DATA'})
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileCar)