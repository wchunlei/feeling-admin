import fetch from 'utils/fetch';

export function addbanner(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=addbanner',
        method: 'post',
        data
    });
}

export function updatebanner(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=updatebanner',
        method: 'post',
        data
    });
}

export function bannerlist(query) {
    return fetch({
        url: '?act=bannerlist',
        method: 'get',
        params: query
    });
}

export function upbanner(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=upbanner',
        method: 'post',
        data
    });
}

export function sortbanner(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=sortbanner',
        method: 'post',
        data
    });
}

export function delbanner(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=delbanner',
        method: 'post',
        data
    });
}

export function bannerinfo(query) {
    return fetch({
        url: '?act=bannerinfo',
        method: 'get',
        params: query
    });
}
