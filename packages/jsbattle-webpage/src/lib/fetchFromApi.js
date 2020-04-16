
function sequenceFetch(actionList) {
  return async (dispatch) => {
    for(let i=0; i < actionList.length; i++) {
      await actionList[i](dispatch);
    }
  };
}

function fetchFromApi(url, type, opts, localFetch) {
  return async (dispatch) => {
    localFetch = localFetch || fetch;
    dispatch({type: type + "_REQUEST"});
    try {
      let opsData;
      if(typeof opts == 'function') {
        opsData = await opts();
      } else {
        opsData = opts;
      }
      let response = await localFetch(url, opsData);
      if (!response.ok) {
        let responseText = await response.text();
        return dispatch({type: type + "_FAILURE", payload: new Error(`Error ${response.status}: ${responseText || response.statusText}`), error: true});
      }
      let json = await response.json();
      dispatch({type: type + "_SUCCESS", payload: json});
    } catch (err) {
      dispatch({type: type + "_FAILURE", payload: err, error: true});
    }
  };
}

class FetchResponse {

  constructor(data) {
    this._data = data;
    this.headers = [];
    this.ok = !(this._data instanceof Error);
    this.status = (this._data instanceof Error) ? 1 : 200;
    this.type = 'basic';
    this.url = '/';
    this.statusText = "OK";
    this.redirected  = false;
    this.useFinalURL  = true;
  }

  clone() {
    let copy = new FetchResponse();
    copy.headers = this.headers;
    copy.ok = this.ok;
    copy._data = this._data;
    copy.status = this.status;
    copy.type = this.type;
    copy.url = this.url;
    copy.redirected = this.redirected;
    copy.useFinalURL = this.useFinalURL;
    return copy;
  }

  error() {
    let copy = this.clone();
    copy.ok = false;
    return copy;
  }

  redirect(url, status) {
    let copy = this.clone();
    copy.redirected = true;
    copy.url = url;
    copy.status = status;
    return copy;
  }

  text() {
    if(this._data instanceof Error) {
      return this._data.message;
    }
    return JSON.stringify(this._data);
  }

  json() {
    if(this._data instanceof Error) {
      return {};
    }
    return this._data;
  }
}

function attachFetch(fn, mapArgs) {
  mapArgs = mapArgs || (() => []);
  fn.fetch = async (uri, opts) => {
    let params = {};
    let uriComponents = uri.split('?');
    if(uriComponents.length > 1) {
      params = uriComponents[1]
        .split('&')
        .map((row) => row.split('='))
        .reduce((result, value) => {
          result[value[0]] = value[1];
          return result;
        }, {});
    }
    let uriElements = uriComponents[0].split('/');
    while(uriElements.length && uriElements[0] == '') {
      uriElements.shift();
    }
    while(uriElements.length && uriElements[uriElements.length && -1] == '') {
      uriElements.pop();
    }
    let body = {};
    if(opts && opts.body) {
      body = JSON.parse(opts.body);
    }
    let request = {
      uri,
      uriBase: uriComponents[0],
      uriElements,
      opts,
      params,
      body
    };
    let result;
    let method = opts.method || 'GET';
    try {
      console.log(`Local fetch: ${method} ${uri}`);
      result = await fn.apply(null, mapArgs(request));
    } catch (err) {
      result = err;
    }
    return new FetchResponse(result);
  };
  return fn;
}


export {
  FetchResponse,
  fetchFromApi,
  sequenceFetch,
  attachFetch
};
