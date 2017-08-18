import fetch from 'utils/fetch';

export function bubbleUpdate(bubbleinfo) {
    const data = bubbleinfo;
    return fetch({
        url: '?act=weathereventupdate',
        method: 'post',
        data
    });
}

export function bubbleList(query) {
    return fetch({
        url: '?act=wethereventlist',
        method: 'get',
        params: query
    });
}

export function storyUpdate(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=addstoryevent',
        method: 'post',
        data
    });
}
/*
export function clothclassUpdate(clothinfo) {
    const data = clothinfo;
    return fetch({
        url: '?act=desstypeupdate',
        method: 'post',
        data
    });
}
 *
export function clothclassList(query) {
    return fetch({
        url: '?act=dresstypelist',
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
}*/
