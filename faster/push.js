/**
 * Created by pengchaoyang on 2019/2/20
 */
self.importScripts('./faster/config.js');
var push=config.push
function handlePushMsg (event) {
    var title = push.title;
    var body = push.body;
    var icon = push.icon;
    var tag = push.tag;
    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: icon,
            tag: tag
        })
    );
}