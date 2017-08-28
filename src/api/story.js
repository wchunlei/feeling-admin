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

export function talkUpdate(storyinfo) {
  const data = storyinfo;
  return fetch({
    url: '?act=talkupdate',
    method: 'post',
    data
  });
}

export function gameUpdate(storyinfo) {
  const data = storyinfo;
  return fetch({
    url: '?act=gameupdate',
    method: 'post',
    data
  });
}

export function tvUpdate(storyinfo) {
  const data = storyinfo;
  return fetch({
    url: '?act=tvupdate',
    method: 'post',
    data
  });
}

export function pictureUpdate(storyinfo) {
  const data = storyinfo;
  return fetch({
    url: '?act=pictureupdate',
    method: 'post',
    data
  });
}

export function radioUpdate(storyinfo) {
  const data = storyinfo;
  return fetch({
    url: '?act=radioupdate',
    method: 'post',
    data
  });
}

export function videoInterUpdate(storyinfo) {
  const data = storyinfo;
  return fetch({
    url: '?act=videointerupdate',
    method: 'post',
    data
  });
}

export function telUpdate(storyinfo) {
  const data = storyinfo;
  return fetch({
    url: '?act=telupdate',
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

export function storyStatus(storyinfo) {
  const data = storyinfo;
  return fetch({
    url: '?act=storystatus',
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

export function storyListall(query) {
  return fetch({
    url: '?act=storylistall',
    method: 'get',
    params: query
  });
}
export function storyPage(query) {
  return fetch({
    url: '?act=storypage',
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
