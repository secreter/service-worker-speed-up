/**
 * Created by pengchaoyang on 2019/2/20
 */
var CDN={
    NONE:0,
    QINIU:1,
    YOUPAI:2
}
var config={
    image:{
        convertToWebp:true,    //need img use cdn
        cdn:CDN.QINIU
    },
    push:{
        isOpen:true,
        title:'massage from push',
        body:'We have received a push message.',
        icon:'/img/icon.jpg',
        tag:'simple-push-example-tag',
    },
    cache:{
        isOpen:true,
        cacheName:'my-site-cache-v1',
        urlsToCache:[
            '/',
            '/css/index.css',
        ]
    }
}
