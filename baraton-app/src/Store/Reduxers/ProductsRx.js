import { ServiceProducts } from '../../WebServices/ServiceProducts';
import { element } from 'prop-types';

const replaceQuantity = (data) => {
  const prevBuy = (localStorage.getItem('orders'))
  ? JSON.parse(localStorage.getItem('orders'))
  : [];
  
  const result = data.map((item) => {

    const res = prevBuy.map((itemEl) => {
    
      let filtEl  = itemEl.elements.filter((elm) => {
        
        if(elm.id === item.id){
           console.log('aqui');
           return elm;
        }
      });  
      
      if(filtEl.length > 0){
        
        item.quantity = parseInt(item.quantity) - parseInt(filtEl[0].carQuantity);
        item.available = (item.quantity === 0) ? false: true;
      }

    });
    return item;

  }); 
  return result;
};

const ProductsRx = async (state = [], action) => {
  switch (action.type) {
    case 'GET_DATA_PRODUCTS':
      let data = await ServiceProducts();
      let datos = replaceQuantity(data)
      return [
        ...state,
        ...datos,
      ];
      break;
    case 'SET_FILTER_CATEGORIE':
      return state;
      break;
    default:
      return state;
      break;
  }
};

export { ProductsRx };
