/**
 * Created by pengchaoyang on 2019/2/20
 */
self.importScripts('./faster/config.js');
function fasterImage (event,options={}) {
    options.convertToWebp=options.convertToWebp||true
    options.cdn=options.cdn||CDN.QINIU
    // Check if the image is a jpeg
    if (options.convertToWebp&&/\.jpe?g$|\.png$/.test(event.request.url)) {
        // Inspect the accept header for WebP support
        var supportsWebp = false;
        if (event.request.headers.has('accept')){
            supportsWebp = event.request.headers
                .get('accept')
                .includes('webp');
        }
        // If we support WebP
        if (supportsWebp)
        {
            // Clone the request
            var req = event.request.clone();
            // Build the return URL
            // var returnUrl = req.url.substr(0, req.url.lastIndexOf(".")) + ".webp";
            var returnUrl
            if(options.cdn===CDN.QINIU){
                returnUrl = req.url+"?imageView2/0/format/webp";      //七牛云
            }else if(options.cdn===CDN.YOUPAI){
                returnUrl = req.url+"!/format/webp";      //又拍云
            }
            event.respondWith(
                fetch(returnUrl, {
                    mode: 'no-cors'
                })
            );
            return true  //already been responded to
        }
    }
    return false
}