import { ServiceProducts } from '../../WebServices/ServiceProducts';

const ProductsRx = async (state = [], action) => {
  switch (action.type) {
    case 'GET_DATA_PRODUCTS':
      const data = await ServiceProducts();
      return [
        ...state,
        ...data,
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