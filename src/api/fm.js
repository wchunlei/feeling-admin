import fetch from 'utils/fetch';

export function addmaidfm(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=addmaidfm',
        method: 'post',
        data
    });
}

export function updatemaidfm(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=updatemaidfm',
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

export function maidfmlist(query) {
    return fetch({
        url: '?act=maidfmlist',
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
        url: '?act=maidfminfo',
        method: 'get',
        params: query
    });
}

export function delmaidfm(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=delmaidfm',
        method: 'post',
        data
    });
}

export function sortmaidfm(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=sortmaidfm',
        method: 'post',
        data
    });
}

export function upmaidfm(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=upmaidfm',
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
