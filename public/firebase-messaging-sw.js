importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
const config =  { 
    apiKey: "AIzaSyBK0Rkrkp5tf3PV-7wMUcZ67t5YIAmb_AI",
    authDomain: "study-forest.firebaseapp.com",
    projectId: "study-forest",
    storageBucket: "study-forest.appspot.com",
    messagingSenderId: "399146202149",
    appId: "1:399146202149:web:85cbaafdfef2093f137bcc",
    measurementId: "G-02VVMCPY3F"
}; 
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
	const title  =  payload.data.title;
	const options  = {
		body: payload.data.message,
	};
    console.log(payload);
	return self.registration.showNotification(title, options);
})