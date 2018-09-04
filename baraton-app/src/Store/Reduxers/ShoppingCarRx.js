const saveInCookie = (param) => {

  const navigatorStorage = (localStorage.getItem('carShopping'))
    ? JSON.parse(localStorage.getItem('carShopping'))
    : [];

  const elements = navigatorStorage.filter(item => item.id === param.id);
  if (elements.length > 0) {
    alert('Element alrady');
    return navigatorStorage;
  }
  const resultStorage = [
    ...navigatorStorage,
    param,
  ];
  const parseData = resultStorage;
  localStorage.setItem('carShopping', JSON.stringify(resultStorage));
  return parseData;

};

const ShoppingCarRx = (state = [], action) => {
  switch (action.type) {
    case 'SAVE_ITEM_CAR':
      state = saveInCookie(action.payload);
      return state;
      break;
    case 'CLEAR_DATA':
      state = {};
      state = (action.payload === undefined)
        ? []
        : action.payload;

      return state;
      break;
    default:
      return state;
      break;
  }
};

export { ShoppingCarRx };
