import fetch from 'utils/fetch';

export function appupdate(appinfo) {
    const data = appinfo;
    return fetch({
        url: '?act=appupdate',
        method: 'post',
        data
    });
}

export function applist(query) {
    return fetch({
        url: '?act=applist',
        method: 'get',
        params: query
    });
}

export function appdel(appinfo) {
    const data = appinfo;
    return fetch({
        url: '?act=appdel',
        method: 'post',
        data
    });
}
