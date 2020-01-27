/*global apiUrl, localStorage, $*/

'use strict';

const api = {
  getOrders() {
    const userId = localStorage.getItem('shoppyUserId');
    const token = localStorage.getItem('shoppyToken');
    const roles = localStorage.getItem('shoppyRoles').split(',');
    let url;
    if (roles.includes('admin') || roles.includes('support')) {
      url = apiUrl + `/orders`;
    } else {
      url = apiUrl + `/users/${userId}/orders`;
    }
    return $.ajax({
      type: 'GET',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).promise();
  },

  makeOrder(body, successCb, errCb) {
    const userName = localStorage.getItem('shoppyUserName');
    const userId = localStorage.getItem('shoppyUserId');
    const token = localStorage.getItem('shoppyToken');
    const url = apiUrl + `/users/${userId}/orders`;
    body.userId = userId;
    body.userName = userName;
    return $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(body),
      contentType: 'application/json',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: successCb,
      error: errCb,
    }).promise();
  },

  addToCart(body, successCb, errCb) {
    const userId = localStorage.getItem('shoppyUserId');
    const token = localStorage.getItem('shoppyToken');
    const url = apiUrl + `/shoppingCarts/${userId}/items`;
    $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(body),
      contentType: 'application/json',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: successCb,
      error: errCb,
    });
  },

  deleteShoppingCart() {
    const userId = localStorage.getItem('shoppyUserId');
    const token = localStorage.getItem('shoppyToken');
    if (userId) {
      const url = apiUrl + '/shoppingCarts/' + userId;
      return $.ajax({
        type: 'DELETE',
        url: url,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).promise();
    }
  },

  getShoppingCartItems(successCb, errCb) {
    const userId = localStorage.getItem('shoppyUserId');
    const token = localStorage.getItem('shoppyToken');
    if (userId) {
      const url = apiUrl + '/shoppingCarts/' + userId;
      return $.ajax({
        type: 'GET',
        url: url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        success: successCb,
        error: errCb,
      }).promise();
    }
  },

  updateCart(items, successCb, errCb) {
    const userId = localStorage.getItem('shoppyUserId');
    const token = localStorage.getItem('shoppyToken');
    const url = apiUrl + `/shoppingCarts/${userId}`;
    const body = {userId, items};
    const data = JSON.stringify(body);
    $.ajax({
      type: 'PUT',
      url: url,
      data,
      contentType: 'application/json',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: successCb,
      error: errCb,
    });
  },

  signUp(body, successCb, errCb) {
    const url = apiUrl + '/users';
    $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(body),
      contentType: 'application/json',
      success: successCb,
      error: errCb,
    });
  },

  logIn(body, successCb, errCb) {
    const url = apiUrl + '/users/login';
    $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(body),
      contentType: 'application/json',
      success: successCb,
      error: errCb,
    });
  },

  async me(successCb, errCb) {
    const url = apiUrl + '/users/me';
    const token = localStorage.getItem('shoppyToken');
    $.ajax({
      type: 'GET',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: successCb,
      error: errCb,
    });
  },

  getProducts(options, successCb, errCb) {
    const {skip = 0, limit = 4} = options;
    const url = apiUrl + `/products?filter[skip]=${skip}&filter[limit]=${limit}`;
    const token = localStorage.getItem('shoppyToken');
    $.ajax({
      type: 'GET',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: successCb,
      error: errCb,
    });
  },

  getProduct(id, successCb, errCb) {
    const url = apiUrl + '/products/' + id;
    const token = localStorage.getItem('shoppyToken');
    return $.ajax({
      type: 'GET',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: successCb,
      error: errCb,
    }).promise();
  },
};
