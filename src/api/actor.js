import fetch from 'utils/fetch';

export function actorUpdate(actorinfo) {
  const data = actorinfo;
  return fetch({
    url: '?act=actorupdate',
    method: 'post',
    data
  });
}

export function actorList(query) {
  return fetch({
    url: '?act=actorlist',
    method: 'get',
    params: query
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
