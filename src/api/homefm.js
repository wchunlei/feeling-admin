import fetch from 'utils/fetch';

export function addhomefm(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=addfm',
        method: 'post',
        data
    });
}

export function updatehomefm(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=updatefm',
        method: 'post',
        data
    });
}

export function diarydelete(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=diarydelete',
        method: 'post',
        data
    });
}

export function homefmlist(query) {
    return fetch({
        url: '?act=fmlist',
        method: 'get',
        params: query
    });
}

export function getDiary(query) {
    return fetch({
        url: '?act=getDiary',
        method: 'get',
        params: query
    });
}

export function adddiary(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=adddiary',
        method: 'post',
        data
    });
}

export function updatediary(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=updatediary',
        method: 'post',
        data
    });
}

export function diarylist(query) {
    return fetch({
        url: '?act=diarylist',
        method: 'get',
        params: query
    });
}

export function homefminfo(query) {
    return fetch({
        url: '?act=fminfo',
        method: 'get',
        params: query
    });
}

export function delhomefm(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=delfm',
        method: 'post',
        data
    });
}

export function sorthomefm(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=sortfm',
        method: 'post',
        data
    });
}

export function uphomefm(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=upfm',
        method: 'post',
        data
    });
}

export function addhomefmcomm(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=addfmcomm',
        method: 'post',
        data
    });
}
export function delhomefmcomm(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=delfmcomm',
        method: 'post',
        data
    });
}
export function sorthomefmcomm(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=sortfmcomm',
        method: 'post',
        data
    });
}
export function uphomefmcomm(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=upfmcomm',
        method: 'post',
        data
    });
}

/*export function homefmcomminfo(query) {
    return fetch({
        url: '?act=homefmcomminfo',
        method: 'get',
        params: query
    });
}

export function delfmcomment(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=delfmcomment',
        method: 'post',
        data
    });
}

export function sortfmcomment(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=sortfmcomment',
        method: 'post',
        data
    });
}

export function upfmcomment(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=upfmcomment',
        method: 'post',
        data
    });
}*/
