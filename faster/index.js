/**
 * Created by pengchaoyang on 2019/2/19
 */
if ( 'serviceWorker' in navigator ) {
    //https://juejin.im/post/5b02e5f1f265da0b767dc81d#heading-1
    navigator.serviceWorker.register('../serviceWorker.js',{scope: '/'})
        .then( registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch( err => console.log('ServiceWorker registration failed: ', err));
}

// Setup Push notifications

var pushButton = document.querySelector('.js-push-button');
pushButton.addEventListener('click', subscribe);
var isPushEnabled = false;
function subscribe() {
    // Disable the button so it can't be changed while
    // we process the permission request
    pushButton.disabled = true;

    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly: true })
            .then(function(subscription) {
                // The subscription was successful
                isPushEnabled = true;
                pushButton.textContent = 'Disable Push Messages';
                pushButton.disabled = false;

                // TODO: Send the subscription.endpoint to your server
                // and save it to send a push message at a later date
                // return sendSubscriptionToServer(subscription);
            })
            .catch(function(e) {
                if(Notification.permission === 'denied') {
                    // The user denied the notification permission which
                    // means we failed to subscribe and the user will need
                    // to manually change the notification permission to
                    // subscribe to push messages
                    console.warn('Permission for Notifications was denied');
                    pushButton.disabled = true;
                } else {
                    // A problem occurred with the subscription; common reasons
                    // include network errors, and lacking gcm_sender_id and/or
                    // gcm_user_visible_only in the manifest.
                    console.error('Unable to subscribe to push.', e);
                    pushButton.disabled = false;
                    pushButton.textContent = 'Enable Push Messages';
                }
            });
    });
}