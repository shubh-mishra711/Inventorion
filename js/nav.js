const navDiv = document.getElementById('sidebarMenu');
const navFooter = document.getElementById('sidebarFooter');

const navItems = {
	main: {
		dashboard: {
			title:		"Dashboard",
			path:		"/dashboard/"
		},
		orders: {
			title:		"Orders",
			path:		"/orders/"
		},
		products: {
			title:		"Products",
			path:		"/products/"
		},
		inventory: {
			title:		"Inventory",
			path:		"/inventory/"
		}
	},
	settings: {
		channels: {
			title:		"Sales channels",
			path:		"/channels/"
		}
	}
};

// Generate nav links sidebar
let navContent = '';
for (const sectionIndex in navItems) {
	const section = navItems[sectionIndex];
	if (sectionIndex != 'main') {
		navContent += `<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase"><span>${sectionIndex.toUpperCase()}</span></h6>`;
	}
	navContent += `<ul class="nav flex-column">`;
	for (const linkIndex in section) {
		const linkItem = section[linkIndex];
		if (linkItem.title) {
			navContent += `<li class="nav-item"><a class="nav-link" href="${linkItem.path}" id="nav-${linkIndex}">${linkItem.title}</a></li>`;
		}
	}
	navContent += `</ul>`
}
navDiv.innerHTML = navContent;

// Generate the user sidebar footer
let navFooterContent = `<p id="sidebarUser"></p>`;
navFooterContent += `<div class="dropdown"><a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img src="/assets/icons/up-arrow.svg" alt="Open user menu" aria-label="Open user menu" /></a>`;
navFooterContent += `<ul class="dropdown-menu">`;
navFooterContent += `<li><a class="dropdown-item" href="/profile/">Profile &amp; Settings</a></li>`;
navFooterContent += `<li><hr class="dropdown-divider"></li>`;
navFooterContent += `<li><a class="dropdown-item" onclick="logout()" href="#">Sign out</a></li>`;
navFooterContent+= `</ul>`;
navFooter.innerHTML = navFooterContent;

// Get the current page and adjust the nav's link to match
const currentPage = document.location.pathname.substring(1, document.location.pathname.length-1);
if (document.getElementById(`nav-${currentPage}`)) {
	const pageLink = document.getElementById(`nav-${currentPage}`);
	pageLink.classList.add("active");
	pageLink.ariaCurrent = 'page';
}