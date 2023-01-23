// Fetch the database's profile data for the user and display it
function getProfileData (user) {
	// Fetch the user's data
	const userData = db.collection('userData').doc(user.uid);
	
	// Display the user's name
	document.getElementById('user-name').textContent = user.displayName;
	document.getElementById('user-name').innerHTML += '<button type="button" class="btn btn-sm btn-link btn-edit" data-bs-toggle="modal" data-bs-target="#editDisplayNameModal"><img src="/assets/icons/edit.svg" alt="Edit name" /></button>';
	
	// Display the user's account details
	const details = document.getElementById('user-details');
	
	let detailsContent = `<div class="row"><div class="col-5"><p><strong>Business Name</strong></p></div><div class="col-7"><p id="business-name"></p></div></div>`;
	detailsContent += `<div class="row"><div class="col-5"><p><strong>Email</strong></p></div><div class="col-7"><p id="email"></p></div></div>`;
	detailsContent += `<div class="row"><div class="col-5"><p><strong>Linked accounts</strong></p></div>`;
	detailsContent += `<div class="col-7">`;
	user.providerData.forEach((profile) => {
		const provider = profile.providerId;
		switch (provider) {
			case 'google.com':
				detailsContent += '<img src="/assets/providers/google.svg" class="provider" alt="Google" width="24" height="24">';
				break;
			default:
				alert ('Error getting linked accounts');
		}
	});
	detailsContent += `</div>`;
	detailsContent += `<div class="col-12"><button class="btn btn-sm btn-link" onclick="resetPassword()">Send password reset email</button></div></row>`;
	details.innerHTML = detailsContent;
	
	userData.get().then((doc) => {
		const data = doc.data();
		document.getElementById('business-name').textContent = data.settings.business_name;
		document.getElementById('business-name').innerHTML += `<button type="button" class="btn btn-sm btn-link btn-edit" data-bs-toggle="modal" data-bs-target="#editBizNameModal"><img src="/assets/icons/edit.svg" alt="Edit business name" /></button>`;
	}).catch((error) => {
		console.log('Error getting user settings: ', error);
	});
	
	document.getElementById('email').textContent = user.email;
	document.getElementById('email').innerHTML += `<button type="button" class="btn btn-sm btn-link btn-edit" data-bs-toggle="modal" data-bs-target="#editEmailModal"><img src="/assets/icons/edit.svg" alt="Edit email address" /></button>`;
	
	document.getElementById('settings').innerHTML = `<p>Production queue visibility:</p><div class="form-check"><input class="form-check-input" type="radio" name="setQueueVis" id="setQueueVisPrivate" checked><label class="form-check-label" for="setQueueVisPrivate">Private</label></div><div class="form-check"><input class="form-check-input" type="radio" name="setQueueVis" id="setQueueVisPublic"><label class="form-check-label" for="setQueueVisPublic">Public</label></div>`;
	
	// Check to see what user settings exist
	userData.get().then((doc) => {
		const data = doc.data();
		if (data.settings.queue_public) {
			document.getElementById('setQueueVisPublic').checked = true;
			document.getElementById('setQueueVisPrivate').checked = false;
		} else {
			document.getElementById('setQueueVisPublic').checked = false;
			document.getElementById('setQueueVisPrivate').checked = true;
		}
	}).catch((error) => {
		console.log('Error getting user settings: ', error);
	});
	
	document.getElementById('deleteDiv').innerHTML = '<button class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete my account and data</button>';
}

// Changes the user's displayName
function changeName () {
	// Get the new name entered
	const newName = document.getElementById('newName').value;
	
	// If the user didn't enter a new name
	if (newName == null) {
		alert ('Please enter a new name.');
		return;
	}
	
	// Update the database with the new name
	const user = firebase.auth().currentUser;
	user.updateProfile({
		displayName: newName
	}).then(() => {
		location.reload();
	}).catch((error) => {
		console.log ('Error updating name: ', error);
	});
}

function changeBizName () {
	const user = firebase.auth().currentUser;
	if (user) {
		const userData = db.collection('userData').doc(user.uid);
		const newBizName = document.getElementById('newBizName').value;
		userData.set({
			settings: {
				business_name: newBizName
			}
		}, { merge: true }).then(() => {
			location.reload();
		}).catch ((error) => {
			console.error ('Error updating user data: ', error);
		});
	} else {
		console.log ('Error changing user settings.');
	}
}

function changeEmail () {
	// Get the new name entered
	const newEmail = document.getElementById('newEmail').value;
	
	// If the user didn't enter a new name
	if (newEmail == null) {
		alert ('Please enter a new email address.');
		return;
	}

	var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	if (newEmail.match(validRegex)) {
		const user = firebase.auth().currentUser;
	
		user.updateEmail(newEmail).then(() => {
			location.reload();
		}).catch((error) => {
			alert ('Please sign in again to continue.');
			location.href = './signin.html';
		});
	} else {
		alert('Please enter a valid email address.');
		return;
	}
}

function resetPassword () {
	const user = firebase.auth().currentUser;
	const email = user.email;  
	firebase.auth().sendPasswordResetEmail(email)
	.then(() => {
		const toastDiv = document.getElementById('toast-container');
		toastDiv.innerHTML = `<div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true" id="resetToast"><div class="d-flex"><div class="toast-body">Password reset email sent.</div><button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div></div>`;
		const resetToast = document.getElementById('resetToast');
		const toast = new bootstrap.Toast(resetToast);
		toast.show();
	})
	.catch((error) => {
		console.log ('Error resetting password', error);
	});
}

function deleteUser () {
	const user = firebase.auth().currentUser;
	const userData = db.collection('userData').doc(user.uid);
	
	userData.delete().then(() => {
		user.delete().then(() => {
			alert ('Your account and data has been deleted.');
			location.href = './index.html';
		}).catch((error) => {
			alert ('Please sign in again to continue.');
			location.href = './signin.html';
		});
	}).catch((error) => {
		console.error('Error deleting user data: ', error);
	});
}