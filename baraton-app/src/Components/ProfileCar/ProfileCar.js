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
    const lista = listItems.map((item, i) => {
      return <li key={i+'box'}>
        <div key={'as'+i}>
          Item: {item.name}
        </div>
        <div key={'qu'+i}>Quantity: {item.carQuantity}</div>
        <div key={'tt'+i}>total: $
        <NumberFormat
          key={'nn'+i}
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
          {elementsItems.map((item, i) => 
            <div key={i+'ctn'}className="content-items">
            <div key={i+'dt'}className="titles-item">{item.date}</div>
            <div key={i+'tt'}className="titles-item">$
              <NumberFormat
                key={i+'nf'}
                decimalSeparator="."
                thousandSeparator=","
                value={item.total}
                className="number-formar"></NumberFormat>
            </div>
            <p key={i+'pp'}>Details</p>
            <ul key={i+'ul'} >{this.getSubItems(item.elements)}</ul>
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
        item['base'] = this.parseToNumber(item.price);
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
  recalc = (event, item) => {
    let val = event.target.value;
    val = parseInt(val);    
    if(isNaN(val)){
      this.calcTotale(1, item);
    }
  }

  changeQuantity = (event, item) => {
    let val = event.target.value;
    let changeNumero = (val == '') ? true : false;
    
    val = parseInt(val);
   
    if (!Number.isInteger(val) && changeNumero == false) {
      return false;
    }

    if (val < 0 && changeNumero == false) {
      return false;
    }
   
    if (val > item.quantity) {
      return false;
    }
    
    this.calcTotale(val, item);
  }

  calcTotale = (val, item) => {
    let totals = 0;
   
    const newVal = (isNaN(val)) ? 0 : val;
    const {carShopping} = this.state;

    let result = carShopping.map((element) => {
      
      if (item.id === element.id) {
        
        element.total = (element.base * newVal);
        element.carQuantity = val;
      }
      
      totals += (isNaN(element.total)) ? 0 : parseInt(element.total);      
      return element;
    });
    
    this.setState({carShopping: result, total: totals});
  }

  buyNow = () => {
    const items = this.state.carShopping;
    if (items.length === 0) {
      return false;
    }
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

  calcPrice = (arr) => {
    let price = 0;
    arr.map((item) => {
      price = price + item.total;
    });
    return price;
  }

  deleteItem = (eli) => {
    const elements = this
      .state
      .carShopping
      .filter(item => item.id !== eli.id);

    this.setState({
      total: this.calcPrice(elements),
      carShopping: elements
    }, () => {
      localStorage.setItem('carShopping', JSON.stringify(elements));
      this
        .props
        .cleanData(this.state.carShopping);
    });
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
                  <i
                    className="material-icons delete-icon"
                    onClick={() => {
                    this.deleteItem(item)
                  }}>
                    delete_forever
                  </i>
                  <div className="item-name">{item.name}</div>
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
                    value={(isNaN(item.total)) ? 0 : parseInt(item.total)}
                    className="number-formar"></NumberFormat>
                </div>
              </div>
              <div className="order-elements">
                <TextField
                  label="Quantity"
                  type="number"
                  value={(isNaN(item.carQuantity)) ? '' : parseInt(item.carQuantity)}
                  className="number-text-field"
                  onChange={(event) => this.changeQuantity(event, item)}
                  onBlur={(event) => this.recalc(event, item)}/>
              </div>
            </div>

          </div>
        ))}
        <Orders orders={this.state.orders} key='orders'/>
      </div>
    );
  }
}

const mapStateToProps = state => ({shopping: state.ShoppingCarRx});

const mapDispatchToProps = dispatch => ({
  cleanData: (dataPayload) => {
    dispatch({type: 'CLEAR_DATA', payload: dataPayload})
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileCar)