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
        url: '?act=dresstypeupdate',
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

export function clothclassdelete(clothinfo) {
    const data = clothinfo;
    return fetch({
        url: '?act=deldresstype',
        method: 'post',
        data
    });
}

export function getcloth(query) {
    return fetch({
        url: '?act=dressinfo',
        method: 'get',
        params: query
    });
}

export function clothActorList(query) {
    return fetch({
        url: '?act=dresslist',
        method: 'get',
        params: query
    });
}

export function clothList(query) {
    return fetch({
        url: '?act=dresslistall',
        method: 'get',
        params: query
    });
}

export function clothdelete(clothinfo) {
    const data = clothinfo;
    return fetch({
        url: '?act=deldress',
        method: 'post',
        data
    });
}
