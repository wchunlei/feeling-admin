import fetch from 'utils/fetch';

export function loginByEmail(email, password) {
  const data = {
    email,
    password
  };
  return fetch({
    url: '?act=login',
    method: 'post',
    data
  });
}
export function loginByEmailMessage(loginInfo) {
  const data = loginInfo;
  return fetch({
    url: '?act=login',
    method: 'post',
    data
  });
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  });
}

export function getInfo(token) {
  const data = {
    token
  };
  return fetch({
    url: '?act=userinfo',
    method: 'post',
    data
    //params: { data }
  });
}
