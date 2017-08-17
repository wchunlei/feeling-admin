import fetch from 'utils/fetch';

export function clothUpdate(clothinfo) {
    const data = clothinfo;
    return fetch({
        url: '?act=dressupdate',
        method: 'post',
        data
    });
}

export function clothclassUpdate(clothinfo) {
    const data = clothinfo;
    return fetch({
        url: '?act=desstypeupdate',
        method: 'post',
        data
    });
}

export function clothclassList(query) {
    return fetch({
        url: '?act=dresstypelist',
        method: 'get',
        params: query
    });
}

export function clothList(query) {
    return fetch({
        url: '?act=dresslist',
        method: 'get',
        params: query
    });
}
