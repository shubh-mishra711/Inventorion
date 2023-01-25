const db = firebase.firestore();

// Get user data; if data does not exist, initialize
function getUserData (user) {
	const userData = db.collection('userData').doc(user.uid);
	userData.get().then((doc) => {
        if (doc.exists) {
			const data = doc.data();
			document.getElementById('storeName').textContent = data.settings.business_name;
			if (document.location.pathname == '/profile/' ) {
				getProfileData (user);
			} else if (document.location.pathname == '/channels/') {
				getChannels (user);
			}else {
				return;
			}
		} else {
			userData.set({
				settings:	{
					queue_public:	false,
					business_name:	"My Online Business"
				}
			}).then(() => {
				return;
			}).catch((error) => {
				console.error('Error creating user data: ', error);
			});
		}
    }).catch((error) => {
		console.log('Error getting user data: ', error);
	});
}

// Log the user out
function logout () {
	firebase.auth().signOut()
		.then(function() {
			location.href = '/index.html';
		})
		.catch(function(error) {
			console.log ('Sign out error');
		});
}

// Check whether the user is logged in
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		document.getElementById('sidebarUser').textContent = user.displayName;
		getUserData(user);
	} else {
		// Insert "please log in again" experience here
	}
});
