const APP = {
	channel: new BroadcastChannel(channelName),
	win: null,
	init: () => {
		const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const channelName = urlParams.has('channel') ? urlParams.get('channel').toLowerCase() : 'world';
        document.getElementById('channelName').innerHTML = channelName;

		// add button listeners
		document.getElementById('createPrivateChannel').addEventListener('click', APP.openNewChannel);
		document.getElementById('enterPrivateChannel').addEventListener('click', APP.openTab);
		document.getElementById('sendBtn').addEventListener('click', APP.sendMessage);
		// register server worker
		navigator.serviceWorker.register("js/broadsw.js");
		// listen for broadcast messages
		APP.channel.addEventListener("message", APP.gotMessage);
	},
	openNewChannel: (ev) => {
		let channelName = prompt('Please enter new channel name');

      	window.open('index.html?channel=' + channelName );
	},
	openTab: (ev) => {
		let channelName = prompt('Please enter channel name');
		// open new tab
		APP.win = window.location.href = "index.html?channel=" + channelName;
	},
	sendMessage: (ev) => {
		let msg = document.getElementById('txtMessage').value;
		let sender = document.getElementById('txtName').value;
		// send the message on the broadcast channel
		if(msg){
			APP.channel.postMessage({ message: sender + ": " + msg });
			document.getElementById('messages').innerHTML += '<p><span class="log-sender">' + msg + ' </span></p>';
		}
	},
	gotMessage: (ev) => {
		// message receive on the broadcast channel
		if(ev && ev.data){
			document.getElementById('messages').innerHTML += `<p><span class='log-recv'>${ev.data.message} </span></p>`;
		}
	},
};

// once DOM has loaded as each page loads
document.addEventListener("DOMContentLoaded", APP.init);