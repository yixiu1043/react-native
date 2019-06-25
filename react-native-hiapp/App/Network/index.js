/* eslint-disable no-param-reassign */

function buildQuery(obj) {
  const _ = encodeURIComponent;
  return Object.keys(obj).map(k => `${_(k)}=${_(obj[k])}`).join('&');
}

class Req {
  static httpDone(res) {
    if (!res.err_code) {
      return res;
    }
    return Promise.reject(res);
  }

  static httpFail(err) {
    return Promise.reject(err);
  }

  static fetch({
    url, query, data, headers, method = 'GET',
  }) {
    if (query) {
      url += `?${buildQuery(query)}`;
    }
    const params = {
      url,
      method,
      credentials: 'same-origin',
    };
    if (data) {
      params.body = JSON.stringify(data);
    }
    if (headers) {
      params.headers = headers;
    }
    return fetch(url, params)
      .then(resp => (resp.ok ? resp.json().then(this.httpDone) : this.httpFail(resp)))
      .catch(err => Promise.reject(err));
  }

  static get(url, params = {}) {
    params.url = params.url || url;
    return this.fetch(params);
  }

  static post(url, params = {}) {
    params.url = params.url || url;
    params.method = 'POST';
    return this.fetch(params);
  }
}

export default Req;
