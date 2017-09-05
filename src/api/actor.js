import fetch from 'utils/fetch';

export function actorUpdate(actorinfo) {
  const data = actorinfo;
  return fetch({
    url: '?act=actorupdate',
    method: 'post',
    data
  });
}

export function actorstatus(actorinfo) {
  const data = actorinfo;
  return fetch({
    url: '?act=actorstatus',
    method: 'post',
    data
  });
}

export function actordel(actorinfo) {
  const data = actorinfo;
  return fetch({
    url: '?act=actordel',
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

export function actorListAll(query) {
  return fetch({
    url: '?act=actorlistall',
    method: 'get',
    params: query
  });
}

export function addPhotos(phoptinfo) {
  const data = phoptinfo;
  return fetch({
    url: '?act=addphotos',
    method: 'post',
    data
  });
}

export function delPhotos(phoptinfo) {
  const data = phoptinfo;
  return fetch({
    url: '?act=delphotos',
    method: 'post',
    data
  });
}

export function addPhoto(phoptinfo) {
  const data = phoptinfo;
  return fetch({
    url: '?act=addphoto',
    method: 'post',
    data
  });
}

export function thumbnaillist(query) {
  return fetch({
    url: '?act=thumbnaillist',
    method: 'get',
    params: query
  });
}

export function addMvs(phoptinfo) {
  const data = phoptinfo;
  return fetch({
    url: '?act=addmv',
    method: 'post',
    data
  });
}

export function delMv(phoptinfo) {
  const data = phoptinfo;
  return fetch({
    url: '?act=delmv',
    method: 'post',
    data
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
