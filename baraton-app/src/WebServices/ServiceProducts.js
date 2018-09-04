import Api from '../Api/Api';

const ServiceProducts = async function () {

  const actionName = 'https://raw.githubusercontent.com/jhonalx018/baraton-web/master/JSONDATA/products.json';
  const ApiInstance = new Api({ actionName, method: 'GET' });
  let result = [];
  result = await ApiInstance.newRequest();
  return result.data.products;

};

export { ServiceProducts };
