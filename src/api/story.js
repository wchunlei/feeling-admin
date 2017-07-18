import fetch from 'utils/fetch';

export function userSearch(name) {
  return fetch({
    url: '?act=actorlist',
    method: 'get',
    params: { name }
  });
}

export function videoUpdate(storyinfo) {
  const data = storyinfo;
  return fetch({
    url: '?act=videoupdate',
    method: 'post',
    data
  });
}

export function storyUpdate(storyinfo) {
  const data = storyinfo;
  return fetch({
    url: '?act=storyupdate',
    method: 'post',
    data
  });
}

export function storyList(query) {
  return fetch({
    url: '?act=storylist',
    method: 'get',
    params: query
  });
}

export function getInfo(token) {
  const data = {
    token
  };
  return fetch({
    url: '?act=storyinfo',
    method: 'post',
    data
    //params: { data }
  });
}
