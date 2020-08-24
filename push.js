const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BELEGj6HRetuMNAJRFD5cAoOd1PjeeGjGmBH9e9Mk8p3OPm7keqC7bwUC4qdR7AlGykYR6EaMH73tOtNYHkxSmI",
   "privateKey": "zNYdQ52JDlHP0voW9SVtAKjb7hEvv5b8XfZZTgMH82Y"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eImXyAY5uM0:APA91bHRPc9RhmonG1ae6dmEk8C15UMsLalHVLp4vo8gmc8nA27w5D88uUuZr6kW5Um5KLVPXHTn1YNzNJ1tittcKezRKp6w-0iyjfcMIn2FS871TFTH5pn8B24sNb0WlniljRlqbfSw",
   "keys": {
       "p256dh": "BBOhO352VaC2jK3gaiM8uGP1csAa5kZkJJpu8RVlznm7YngWK/luwvOHSOHSq03nYtBWHvw+pbKbXCajqqTaJ4Y=",
       "auth": "HJEgD1azBW7vnsnIUrs1Rg=="
   }
};
const payload = 'Test Push Submission 2 ! Aplikasi Bisa menerima push notifikasi!';
 
const options = {
   gcmAPIKey: '1045164443585',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);