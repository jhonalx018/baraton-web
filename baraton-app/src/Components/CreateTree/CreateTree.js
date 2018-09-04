import React, {Component} from 'react';
import '../../assets/CreateTree/CreateTree.css';
import Checkbox from '@material-ui/core/Checkbox';

class CreateTree extends Component {
  constructor() {
    super();
    this.checkboxChildActives = {};
    this.state = {
      data: [],
      itemsList: [],
      elements: {},
      isLoaded: false,
      checkboxes: {}
    };
  }

  componentWillReceiveProps(nextProps) {

    this.setState({
      data: nextProps.dataTree,
      itemsList: this.buildItemsList(nextProps.dataTree)
    });

    this.subLevelsClass = {
      inactive: 'subelements subelements-disable',
      active: 'subelements'
    }

  }

  activeElements = (item, status) => {
    if (item.sublevels !== undefined) {
      item
        .sublevels
        .map((element) => {
          this.checkboxChildActives[element.id] = status;
          this.activeElements(element, status);
        });
    }
  }

  handleChange = (event, item) => {
    this.checkboxChildActives = {};
    const status = event.target.checked;
    const stateCheckbox = this.state.checkboxes;
    stateCheckbox[item.id] = status;

    this.activeElements(item, status);
    const allCheck = this.state.checkboxes;

    for (let i in this.checkboxChildActives) {
      allCheck[i] = this.checkboxChildActives[i];
    }
    allCheck[item.id] = status;
    this.setState({
      checkboxes: allCheck,
      itemsList: this.buildItemsList(this.state.data)
    }, () => {
      this
        .props
        .handleFilter(this.state.checkboxes);
    })

  }

  showTree = (data) => {
    let newElements = this.state.elements;
    newElements[data] = (newElements[data] === this.subLevelsClass.active)
      ? this.subLevelsClass.inactive
      : this.subLevelsClass.active;

    const context = this;

    this.setState({
      elements: newElements,
      isLoaded: true
    }, () => {
      context.setState({
        itemsList: this.buildItemsList(this.state.data)
      });
    });
  }

  getIcon = (itemData, arr) => {
    if (arr === undefined) {
      return '';
    } else if (itemData === this.subLevelsClass.active) {
      return '-';
    } else {
      return '+';
    }
  }

  empty = (obj) => {
    let cont = 0;
    for (let i in obj) {
      cont++;
    }
    return cont === 0;
  }

  getCheckBox = (item) => {

    const actual = this.state.checkboxes;
    actual[item.id] = (this.state.checkboxes[item.id] === undefined)
      ? false
      : this.state.checkboxes[item.id];

    this.setState({checkboxes: actual})
    const itemsHtml = <Checkbox
      checked={this.state.checkboxes[item.id]}
      onChange={(event) => {
      this.handleChange(event, item)
    }}/>

    return itemsHtml;
  };

  buildItemsList = (data) => {
    if (data === undefined) {
      return '';
    }
    var lista = data.map((item) => {
      var i = item.id;

      if (!this.state.isLoaded) {
        var objItem = this.state.elements;
        objItem[i + '-cth'] = this.subLevelsClass.inactive;
        this.setState({elements: objItem});
      }

      return (
        <div key={item.id + 'ctmh'}>
          <div className="item-tree" key={item.id + 'ctn'}>

            <div
              className="icon-deploy"
              onClick={() => {
              this.showTree(i + '-cth')
            }}>
              {this.getIcon(this.state.elements[i + '-cth'], item.sublevels)}
            </div>
            {this.getCheckBox(item)}
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