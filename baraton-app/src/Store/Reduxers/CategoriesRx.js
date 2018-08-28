import { ServiceCategories } from '../../WebServices/CategoriesService';

const CategoriesRx = async (state = [], action) => {
  switch (action.type) {
    case 'GET_DATA_CATEGORIES':
      const data = await ServiceCategories();

      return [
        ...state,
        ...data,
      ];
      break;
    case 'SET_ID_CATEGORIE_FILTER':
      return { datosFiltrados: action.payload };
      break;
    default:
      return state;
      break;
  }
};

export { CategoriesRx };
