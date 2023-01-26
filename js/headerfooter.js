// Generate header and write contents to page
const header = document.getElementById('header');
const logoPath = '/assets/logo-light.svg';
const appName = 'Inventorion';

let headerContents = `<a class="navbar-brand col-12 col-md-3 col-lg-2 me-0 px-3 fs-6" href="/"><img src="${logoPath}" alt="" />${appName}</a>`;
headerContents += `<button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenuContainer" aria-controls="sidebarMenuContainer" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>`;
headerContents += `<h1 class="w-100 rounded-0 border-0 d-none d-md-block" id="storeName"></h1>`;
headerContents += `</div>`;

header.innerHTML = headerContents;