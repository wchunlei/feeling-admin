import fetch from 'utils/fetch';

export function userSearch(name) {
  return fetch({
    url: '?act=actorlist',
    method: 'get',
    params: { name }
  });
}

export function addstory(storyinfo) {
  const data = storyinfo;
  return fetch({
    url: '?act=addstory',
    method: 'post',
    data
  });
}

export function addstoryday(storyinfo) {
  const data = storyinfo;
  return fetch({
    url: '?act=addstoryday',
    method: 'post',
    data
  });
}

export function storydel(storyinfo) {
  const data = storyinfo;
  return fetch({
    url: '?act=storydel',
    method: 'post',
    data
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

export function updatestory(storyinfo) {
  const data = storyinfo;
  return fetch({
    url: '?act=updatestory',
    method: 'post',
    data
  });
}

export function storyData(query) {
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

export function addscript(storyinfo) {
  const data = storyinfo;
  return fetch({
    url: '?act=addscript',
    method: 'post',
    data
  });
}

export function scriptlist(query) {
  return fetch({
    url: '?act=scriptlist',
    method: 'get',
    params: query
  });
}

export function upscript(storyinfo) {
  const data = storyinfo;
  return fetch({
    url: '?act=upscript',
    method: 'post',
    data
  });
}

export function sortscript(storyinfo) {
  const data = storyinfo;
  return fetch({
    url: '?act=sortscript',
    method: 'post',
    data
  });
}

export function delscript(storyinfo) {
  const data = storyinfo;
  return fetch({
    url: '?act=delscript',
    method: 'post',
    data
  });
}

export function scriptdetail(query) {
  return fetch({
    url: '?act=scriptdetail',
    method: 'get',
    params: query
  });
}
