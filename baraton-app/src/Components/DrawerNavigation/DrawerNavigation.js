import React, {Component} from 'react';
import {CreateTree} from '../CreateTree/CreateTree';
import {connect} from 'react-redux';
import '../../assets/DrawerNavigation/DrawerNavigation.css';

class DraweNavigation extends Component {
  constructor() {
    super();
    this.dataSelected = null;
    this.itemsSelected = [];
    this.state = {
      open: true,
      categories: []
    };
  }

  componentWillMount = () => {
    this
      .props
      .getData();
  }

  filterCateforie = (data) => {
    this
      .props
      .setDataFilterCategorie(data);
  }

  componentWillReceiveProps(nextProps) {
    const context = this;
    nextProps
      .categories
      .then(function (data) {
        if (data.datosFiltrados === undefined) {
          context.setState({categories: data});
        }
      });
  }

  render() {
    return (
      <div
        className="content-drawer"
        style={{
        left: (this.state.open === true)
          ? '0px'
          : '-340px'
      }}>
        <i
          className={(this.state.open === false)
          ? 'material-icons icon-menu-drawer material-icons-active'
          : 'material-icons icon-menu-drawer'}
          style={{
          right: (this.state.open === true)
            ? '10px'
            : '-65px'
        }}
          onClick={() => {
          this.setState({
            open: !this.state.open
          });
        }}>menu</i>
        <span className="title-drawer">Categorias</span>
        <CreateTree
          dataTree={this.state.categories}
          handleFilter={this.filterCateforie}></CreateTree>
      </div>
    );
  }
}

const mapStateToProps = state => ({categories: state.CategoriesRx});

const mapDispatchToProps = dispatch => ({
  getData: async() => {
    await dispatch({type: 'GET_DATA_CATEGORIES', payload: {}});
  },
  setDataFilterCategorie: (dataPayload = []) => {
    dispatch({type: 'SET_ID_CATEGORIE_FILTER', payload: dataPayload})
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DraweNavigation);
