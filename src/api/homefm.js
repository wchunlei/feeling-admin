import fetch from 'utils/fetch';

export function addhomefm(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=addhomefm',
        method: 'post',
        data
    });
}

export function updatehomefm(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=updatehomefm',
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
        url: '?act=homefmlist',
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
        url: '?act=homefminfo',
        method: 'get',
        params: query
    });
}

export function delhomefm(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=delhomefm',
        method: 'post',
        data
    });
}

export function sorthomefm(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=sorthomefm',
        method: 'post',
        data
    });
}

export function uphomefm(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=uphomefm',
        method: 'post',
        data
    });
}

export function addhomefmcomm(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=addhomefmcomm',
        method: 'post',
        data
    });
}

export function homefmcomminfo(query) {
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
}
