import axios from 'axios';

const Api = function (...params) {

  let actionName = null;
  const headers = {};
  let paramsSend = {};
  const responType = 'JSON';
  const methods = 'get';
  const hostname = process.env.REACT_APP_HOSTNAME;
  

  const STATUS = {
    SUCCESS: true,
    ERROR: false,
  };
  const ERROR_MSN = {
    NONE_ACTION: 'Dont specific action',
  };

  /**
     *
     * @param {FUNCTION CALLBACK TO EXCUTE AFTER TO RESPONSE} callback
     */
  this.newRequest = async function (callback) {
    if (typeof actionName !== 'string') {
      callback(ERROR_MSN.NONE_ACTION, STATUS.ERROR);
    }

    let result = [];

    await axios({
      method: methods,
      url: hostname+actionName,
      data: paramsSend,
      responseType: responType,
    }).then((data) => {
      result = data;
    }).catch((err) => {
      result = err;
    });
    return result;
  },
  /**
     *
     * @param {NAME PARAM FOR AGREGATE} namep
     * @param {VALUE PARAM} paramp
     */
  this.addParams = function (namep, paramp) {
    paramsSend[namep] = paramp;
  },
  /**
     *
     * @param {NAME OF URL OR ACTION NAME TO FETCH} newActionName
     */
  this.addaction = function (newActionName) {
    actionName = (typeof newActionName === 'string') ? newActionName.trim() : null;
  },
  /**
     * Constructor execute only with any instanceof o this OBJECT CLASS TYPE
     */
  (function (elements) {
    if (elements.length === 0) {
      return;
    }
    const newElements = elements[0];
    actionName = newElements.actionName || null;
    paramsSend = newElements.params || {};
  }
  (params));

};

export default Api;
