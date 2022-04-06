// api.js
import {req,reqloading} from './request'

export function getDataLIst(obj) {
    return reqloading({ //不需要loading加载
        url: '/list',
        method: 'get',
        params: obj,   //根据需求data或params
    })
}
export function getuserInfos(obj) {
    return reqloading({ //需要loading加载
        url: '/index.php',
        method: 'get',
        params: obj,
    })
}

export function getContentData(obj){
    return reqloading({ //需要loading加载
        url: '/getContent',
        method: 'get',
        params: obj,
    })
}

export function getCommentData(obj){
    return reqloading({ //需要loading加载
        url: '/getComment',
        method: 'get',
        params: obj,
    })
}
