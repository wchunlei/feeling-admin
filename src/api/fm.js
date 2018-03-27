import fetch from 'utils/fetch';

export function addqa(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=addqa',
        method: 'post',
        data
    });
}

export function updateqa(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=updateqa',
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

export function qalist(query) {
    return fetch({
        url: '?act=qalist',
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

export function maidfminfo(query) {
    return fetch({
        url: '?act=qainfo',
        method: 'get',
        params: query
    });
}

export function delmaidfm(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=delqa',
        method: 'post',
        data
    });
}

export function sortmaidfm(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=sortqa',
        method: 'post',
        data
    });
}

export function upmaidfm(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=upqa',
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
        url: '?act=delqacomm',
        method: 'post',
        data
    });
}

export function sortfmcomment(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=sortqacomm',
        method: 'post',
        data
    });
}

export function upfmcomment(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=upqacomm',
        method: 'post',
        data
    });
}
