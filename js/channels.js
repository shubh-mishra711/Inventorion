const salesChannels = {
	etsy: {
		url:			"https://www.etsy.com/",
		logo:			"/assets/channels/etsy.svg",
		name:			"Etsy",
		id:				"etsy",
		fee_flat:		0.2,
		fee_percent:	6.5,
		pay_flat:		0.25,
		pay_percent:	3
	},
	ebay: {
		url:			"https://www.ebay.com/",
		logo:			"/assets/channels/ebay.svg",
		name:			"eBay",
		id:				"ebay",
		fee_flat:		0.3,
		fee_percent:	13.5,
		pay_flat:		0,
		pay_percent:	0
	},
	woocommerce_stripe: {
		url:			"https://woocommerce.com/",
		logo:			"/assets/channels/woocommerce.svg",
		name:			"Woocommerce (Stripe)",
		id:				"woocommerce-stripe",
		fee_flat:		0,
		fee_percent:	0,
		pay_flat:		0.3,
		pay_percent:	2.9
	}
};

// Fetch user channel settings and display
function getProfileData (user) {
	// Fetch the user's data
	const userData = db.collection('userData').doc(user.uid);
	
	// Display it
	userData.get().then((doc) => {
		const data = doc.data();
		for (channelIndex in data.channels) {
			const channel = data.channels[channelIndex];
			if (channelIndex.substring(0, 6) === 'custom') {
				/*let customChannel = '';
				customChannel += `<div class="col"><div class="card">`;
				customChannel += `<div class="card-header"><h5>${channel.name}</h5><label class="toggle-switch"><input type="checkbox" id="toggle-${channel.id}"><span class="slider"></span></label></div>`;
				customChannel += `<table class="table fee-table"><tbody>`;
				customChannel += `<tr><td>Transaction fee</td><td><td>$${channel.fee_flat.toFixed(2)} + ${channel.fee_percent}%</td></tr>`;
				customChannel += `<tr><td>Payment processing fee</td><td><td>$${channel.pay_flat.toFixed(2)} + ${channel.pay_percent}%</td></tr>`;
				customChannel += `</tbody></table>`;
				customChannel += `</div></div>`;*/
			} else {
				document.getElementById(`toggle-${channelIndex}`).checked = channel;
			}
		}
	}).catch((error) => {
		console.error('Error getting user settings: ', error);
	});
}

// Toggle settings for channels
function toggleChannel (event) {
	event = event || window.event;
    event.target = event.target || event.srcElement;
    let element = event.target;
	let channelID = element.id.substring(7, element.id.length);
	let channelSetting = element.checked;
	
	const user = firebase.auth().currentUser;
	if (user) {
		const userData = db.collection('userData').doc(user.uid);
		userData.set({
			channels: {
				[channelID]: channelSetting
			}
		}, { merge: true }).catch ((error) => {
			console.error ('Error updating user data: ', error);
		});
	}
}

// Adds a custom user-defined sales channel
function addCustomChannel () {
	const channelName = document.getElementById('channelName').value;
	const channelID = `custom-${channelName.toLowerCase()}`;
	const channelFeeFlat = parseFloat(document.getElementById('channelFeeFlat').value);
	const channelFeePercent = parseFloat(document.getElementById('channelFeePercent').value);
	const channelPayFlat = parseFloat(document.getElementById('channelPayFlat').value);
	const channelPayPercent = parseFloat(document.getElementById('channelPayPercent').value);
	
	const user = firebase.auth().currentUser;
	if (user) {
		const userData = db.collection('userData').doc(user.uid);
		userData.set({
			channels: {
				[channelID]: {
					name:			channelName,
					id:				channelID,
					enabled:		true,
					fee_flat:		channelFeeFlat,
					fee_percent:	channelFeePercent,
					pay_flat:		channelPayFlat,
					pay_percent:	channelPayPercent
				}
			}
		}, { merge: true }).catch ((error) => {
			console.error ('Error updating user data: ', error);
		});
	}
}

const channelsDiv = document.getElementById('channelsContainer');
let channelsContent = '';

// Write built-in sales channels to page
for (channelIndex in salesChannels) {
	const channel = salesChannels[channelIndex];
	channelsContent += `<div class="col"><div class="card">`;
	channelsContent += `<div class="card-header"><h5>${channel.name}</h5><label class="toggle-switch"><input type="checkbox" id="toggle-${channel.id}"><span class="slider"></span></label></div>`;
	channelsContent += `<table class="table fee-table"><tbody>`;
	channelsContent += `<tr><td>Transaction fee</td><td><td>$${channel.fee_flat.toFixed(2)} + ${channel.fee_percent}%</td></tr>`;
	channelsContent += `<tr><td>Payment processing fee</td><td><td>$${channel.pay_flat.toFixed(2)} + ${channel.pay_percent}%</td></tr>`;
	channelsContent += `</tbody></table>`;
	channelsContent += `</div></div>`;
}
channelsDiv.innerHTML += channelsContent;

// Add event listeners for their toggles
for (channelIndex in salesChannels) {
	const channel = salesChannels[channelIndex];
	const channelToggle = document.getElementById(`toggle-${channel.id}`);
	channelToggle.addEventListener('click', toggleChannel, false);
}