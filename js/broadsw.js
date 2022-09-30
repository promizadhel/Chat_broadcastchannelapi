// Service worker

self.addEventListener('install', (ev) => {});
self.addEventListener('activate', (ev) => {});
self.addEventListener('fetch', (ev) => {});
self.addEventListener('message', (ev) => {
	// message received on port or direct to service worker
});

let channel = new BroadcastChannel("promise");
channel.addEventListener('message', (ev) => {
	if(ev && ev.data && ev.data.message){
		sendBack(`${Date.now()} : Thanks for the message.`);
	}
});

function sendBack(msg){
	channel.postMessage({ message: msg });
}