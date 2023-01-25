const salesChannels = {
	etsy: {
		url:			"https://www.etsy.com/",
		logo:			"/assets/channels/etsy.svg",
		name:			"Etsy",
		fee_flat:		0.2,
		fee_percent:	6.5,
		pay_flat:		0.25,
		pay_percent:	3
	},
	ebay: {
		url:			"https://www.ebay.com/",
		logo:			"/assets/channels/ebay.svg",
		name:			"eBay",
		fee_flat:		0.3,
		fee_percent:	13.5,
		pay_flat:		0,
		pay_percent:	0
	},
	woocommerce_stripe: {
		url:			"https://woocommerce.com/",
		logo:			"/assets/channels/woocommerce.svg",
		name:			"Woocommerce (Stripe)",
		fee_flat:		0,
		fee_percent:	0,
		pay_flat:		0.3,
		pay_percent:	2.9
	}
};

const channelsDiv = document.getElementById('channelsContainer');
let channelsContent = '';

for (channelIndex in salesChannels) {
	const channel = salesChannels[channelIndex];
	channelsContent += `<div class="col"><div class="card">`;
	channelsContent += `<div class="card-header"><h5>${channel.name}</h5><label class="toggle-switch"><input type="checkbox"><span class="slider"></span></label></div>`;
	channelsContent += `<table class="table fee-table"><tbody>`;
	channelsContent += `<tr><td>Transaction fee</td><td><td>$${channel.fee_flat.toFixed(2)} + ${channel.fee_percent}%</td></tr>`;
	channelsContent += `<tr><td>Payment processing fee</td><td><td>$${channel.pay_flat.toFixed(2)} + ${channel.pay_percent}%</td></tr>`;
	channelsContent += `</tbody></table>`;
	channelsContent += `</div></div>`;
}

channelsDiv.innerHTML += channelsContent;

function getChannels (user) {
	console.log ('getting user channels');
}