
  import React, { Component } from 'react';
  import { connect } from 'react-redux';
  import { TopBar } from '../TopBar/TopBar';
  import { DraweNavigation } from '../DrawerNavigation/DrawerNavigation';

  class BodyApp extends Component {
    
  componentWillMount = () => {
      this.props.getData();   
  }
    

  componentWillReceiveProps(nextProps) {
    nextProps.categories.then(function(data) {
        console.log(data)
    });
  }
    
    render() {
      return (
        <div className="App">
          <TopBar />
        </div>
      );
    }
  }


  const mapStateToProps = state => ({
    categories: state.CategoriesRx,
  });

  const mapDispatchToProps = dispatch => ({
    getData: async () => {
      await dispatch({ type: 'GET_DATA_CATEGORIES' });
    },
  });


  export default connect(mapStateToProps, mapDispatchToProps)(BodyApp);
