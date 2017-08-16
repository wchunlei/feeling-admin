import fetch from 'utils/fetch';

export function diaryUpdate(diaryinfo) {
    const data = diaryinfo;
    return fetch({
        url: '?act=momentsupdate',
        method: 'post',
        data
    });
}

export function diaryList(query) {
    return fetch({
        url: '?act=momentslistall',
        method: 'get',
        params: query
    });
}

export function getDiary(query) {
    return fetch({
        url: '?act=momentsinfo',
        method: 'get',
        params: query
    });
}
