import React, {Component} from 'react';
import '../../assets/CreateTree/CreateTree.css';
import Checkbox from '@material-ui/core/Checkbox';

class CreateTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.dataTree,
      itemsList: [],
      elements: {},
      isLoaded: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.dataTree,
      itemsList: this.buildItemsList(nextProps.dataTree)
    });
    this.subLevelsClasses = {
      inactive: 'subelements subelements-disable',
      active: 'subelements'
    }
  }

  handleChange = (data) => {}

  showTree = (data) => {
    var elementos = this.state.elements;
    elementos[data] = (elementos[data] === this.subLevelsClasses.active)
      ? this.subLevelsClasses.inactive
      : this.subLevelsClasses.active;

    const context = this;

    this.setState({
      elements: elementos,
      isLoaded: true
    }, () => {
      context.setState({
        itemsList: this.buildItemsList(this.state.data)
      });
    });
  }

  getCode = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) 
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return text;
  }

  getIcon = (itemData, arr) => {
    if (arr === undefined) {
      return '';
    } else if (itemData === this.subLevelsClasses.active) {
      return '-';
    } else {
      return '+';
    }
  }

  buildItemsList = (data) => {
    if (data === undefined) {
      return '';
    }
    var lista = data.map((item) => {
      var i = item.id;

      if (!this.state.isLoaded) {
        var objItem = this.state.elements;
        objItem[i + '-cth'] = this.subLevelsClasses.inactive;
        this.setState({elements: objItem});
      }

      return (
        <div key={item.id + 'ctmh'}>
          <div className="item-tree" key={item.id + 'ctn'}>
            <div
              className="icon-deploy"
              onClick={() => {
              this.showTree(i + '-cth')
            }}>{this.getIcon(this.state.elements[i + '-cth'], item.sublevels)}</div>
            <Checkbox onChange={this.handleChange(item.id)}/>
            <span className="item-name-tree" key={item.id + 'ctm'}>
              {item.name}
            </span>
          </div>
          <div
            className={this.state.elements[i + '-cth']}
            id={i + '-cth'}
            key={i + '-cth'}>{this.buildItemsList(item.sublevels)}</div>
        </div>
      )
    });
    return lista;
  }
  render() {
    return (
      <div className="content-tree">
        {this.state.itemsList}
      </div>
    );
  }
}
export {CreateTree}