import fetch from 'utils/fetch';

export function reslist(storyinfo) {
    const data = storyinfo;
    return fetch({
        url: '?act=reslist',
        method: 'post',
        data
    });
}
