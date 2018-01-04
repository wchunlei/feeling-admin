import fetch from 'utils/fetch';

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

export function diaryinfo(query) {
    return fetch({
        url: '?act=diaryinfo',
        method: 'get',
        params: query
    });
}

export function deldiary(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=deldiary',
        method: 'post',
        data
    });
}

export function sortdiary(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=sortdiary',
        method: 'post',
        data
    });
}
