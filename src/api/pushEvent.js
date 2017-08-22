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

export function bubbleDelete(bubbleinfo) {
    const data = bubbleinfo;
    return fetch({
        url: '?act=delweatherevent',
        method: 'post',
        data
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

export function storyList(query) {
    return fetch({
        url: '?act=storyeventinfo',
        method: 'get',
        params: query
    });
}

export function storypageList(query) {
    return fetch({
        url: '?act=storyeventpage',
        method: 'get',
        params: query
    });
}

export function storyDelete(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=delstoryevent',
        method: 'post',
        data
    });
}

export function channelUpdate(channelinfo) {
    const data = channelinfo;
    return fetch({
        url: '?act=addevent',
        method: 'post',
        data
    });
}

export function channelList() {
    return fetch({
        url: '?act=eventlist',
        method: 'get',
        params: '',
    });
}

export function channelDelete(channelinfo) {
    const data = channelinfo;
    return fetch({
        url: '?act=delevent',
        method: 'post',
        data
    });
}
