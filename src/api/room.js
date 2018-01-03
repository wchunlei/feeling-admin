import fetch from 'utils/fetch';

export function addroom(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=addroom',
        method: 'post',
        data
    });
}

export function updateroom(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=updateroom',
        method: 'post',
        data
    });
}

export function roomlist(query) {
    return fetch({
        url: '?act=roomlist',
        method: 'get',
        params: query
    });
}

export function uproom(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=uproom',
        method: 'post',
        data
    });
}

export function sortroom(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=sortroom',
        method: 'post',
        data
    });
}

export function delroom(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=delroom',
        method: 'post',
        data
    });
}

export function roominfo(query) {
    return fetch({
        url: '?act=roominfo',
        method: 'get',
        params: query
    });
}
