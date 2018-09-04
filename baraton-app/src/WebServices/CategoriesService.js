import Api from '../Api/Api';

const ServiceCategories = async function () {

  const actionName = 'https://raw.githubusercontent.com/jhonalx018/baraton-web/master/JSONDATA/categories.json';
  const ApiInstance = new Api({ actionName, method: 'GET' });
  let result = [];
  result = await ApiInstance.newRequest();
  return result.data.categories;

};

export { ServiceCategories };
