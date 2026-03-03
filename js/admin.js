// Admin Dashboard Logic

// Auth Check
if (!localStorage.getItem('isAuthenticated')) {
    window.location.href = 'login.html';
}

let content = siteContent; // from store.js

function toggleAdminSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    if (sidebar) {
        // Toggle the translate class
        sidebar.classList.toggle('-translate-x-full');
    }
}

// Navigation
function switchTab(tabName) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
    const view = document.getElementById(`view-${tabName}`);
    if(view) view.classList.remove('hidden');
    
    // Update active nav state
    document.querySelectorAll('aside nav button').forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('text-slate-300', 'hover:bg-slate-700', 'hover:text-white');
    });
    const activeBtn = document.getElementById(`nav-${tabName}`);
    if (activeBtn) {
        activeBtn.classList.remove('text-slate-300', 'hover:bg-slate-700');
        activeBtn.classList.add('bg-blue-600', 'text-white');
    }

    // Update Header
    const headerTitle = tabName.charAt(0).toUpperCase() + tabName.slice(1).replace(/([A-Z])/g, ' $1').trim();
    const headerEl = document.getElementById('page-header');
    if(headerEl) headerEl.textContent = headerTitle;

    // Close sidebar on mobile after selection
    const sidebar = document.getElementById('admin-sidebar');
    if (window.innerWidth < 768 && sidebar && !sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.add('-translate-x-full');
    }
}

function logout() {
    localStorage.removeItem('isAuthenticated');
    window.location.href = 'login.html';
}

// File Upload Helper
function handleImageUpload(input, callback) {
    const file = input.files[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
        alert('File size too large (max 2MB)');
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
        callback(reader.result);
    };
    reader.readAsDataURL(file);
}

// --- Dashboard Stats ---
function renderDashboard() {
    document.getElementById('stat-products').textContent = content.caseStudies.studies.length;
    document.getElementById('stat-blog').textContent = content.blog.posts.length;
    document.getElementById('stat-services').textContent = content.home.services.length;
    document.getElementById('stat-testimonials').textContent = content.home.testimonials.length;
}

// --- Generic Update Helpers ---
function updateContent(key, value) {
    content[key] = value;
    saveContent(content);
}

function updateNested(parent, key, value) {
    content[parent][key] = value;
    saveContent(content);
}

function updateArray(parent, key, valueString) {
    content[parent][key] = valueString.split(',').map(s => s.trim());
    saveContent(content);
}

function updateNestedObject(parent, index, arrayName, key, value) {
    content[parent][arrayName][index][key] = value;
    saveContent(content);
}

// --- Renderers ---

function renderHeaderEditor() {
    const form = document.getElementById('header-form');
    if(!form) return;
    form.innerHTML = `
        <div class="space-y-4">
            <div>
                <label class="block text-slate-400 mb-1">Notification Bar</label>
                <input type="text" value="${content.notification}" onchange="updateContent('notification', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Logo Text</label>
                <input type="text" value="${content.header.logoText}" onchange="updateNested('header', 'logoText', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
            <div>
                <label class="block text-slate-400 mb-1">CTA Button</label>
                <input type="text" value="${content.header.ctaButton}" onchange="updateNested('header', 'ctaButton', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Categories (Comma separated)</label>
                <input type="text" value="${content.header.categories.join(', ')}" onchange="updateArray('header', 'categories', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
        </div>
    `;
}

function renderHeroEditor() {
    const form = document.getElementById('hero-form');
    if(!form) return;
    const hero = content.home.hero;
    form.innerHTML = `
        <div class="space-y-4">
            <div>
                <label class="block text-slate-400 mb-1">Badge</label>
                <input type="text" value="${hero.badge}" onchange="updateNestedHero('badge', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Title</label>
                <input type="text" value="${hero.title}" onchange="updateNestedHero('title', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Subtitle</label>
                <textarea onchange="updateNestedHero('subtitle', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white h-24">${hero.subtitle}</textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-slate-400 mb-1">Primary CTA</label>
                    <input type="text" value="${hero.ctaPrimary}" onchange="updateNestedHero('ctaPrimary', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
                </div>
                <div>
                    <label class="block text-slate-400 mb-1">Secondary CTA</label>
                    <input type="text" value="${hero.ctaSecondary}" onchange="updateNestedHero('ctaSecondary', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
                </div>
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Hero Image</label>
                <div class="flex gap-4 items-center">
                    <img src="${hero.heroImage}" class="w-20 h-20 object-cover rounded bg-slate-800" id="hero-img-preview">
                    <input type="file" accept="image/*" onchange="uploadHeroImage(this)" class="text-slate-400 text-sm">
                </div>
            </div>
        </div>
    `;
}

function updateNestedHero(key, value) {
    content.home.hero[key] = value;
    saveContent(content);
}

function uploadHeroImage(input) {
    handleImageUpload(input, (base64) => {
        content.home.hero.heroImage = base64;
        document.getElementById('hero-img-preview').src = base64;
        saveContent(content);
    });
}

function renderServicesEditor() {
    const form = document.getElementById('services-form');
    if(!form) return;
    
    // Prepare product options for dropdown
    const productOptions = content.caseStudies.studies.map(p => 
        `<option value="${p.id}">${p.title} (${p.category})</option>`
    ).join('');

    form.innerHTML = `
        <div class="space-y-4 mb-6">
            <div>
                <label class="block text-slate-400 mb-1">Section Title</label>
                <input type="text" value="${content.home.servicesTitle}" onchange="updateNested('home', 'servicesTitle', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Section Subtitle</label>
                <textarea onchange="updateNested('home', 'servicesSubtitle', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white h-20">${content.home.servicesSubtitle}</textarea>
            </div>
        </div>
        
        <div class="flex justify-between items-center mb-4">
            <h4 class="text-white font-bold">Featured Services</h4>
            <button onclick="addService()" class="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded">Add Service</button>
        </div>

        <div class="space-y-4" id="services-list">
            ${content.home.services.map((service, index) => `
                <div class="bg-slate-800 p-4 rounded border border-slate-700 relative group">
                    <button onclick="removeService(${index})" class="absolute top-2 right-2 text-red-400 hover:text-red-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <div class="mb-2">
                        <label class="block text-slate-400 text-xs mb-1">Title</label>
                        <input type="text" value="${service.title}" onchange="updateNestedObject('home', ${index}, 'services', 'title', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
                    </div>
                    <div class="mb-2">
                        <label class="block text-slate-400 text-xs mb-1">Description</label>
                        <textarea onchange="updateNestedObject('home', ${index}, 'services', 'description', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white h-16">${service.description}</textarea>
                    </div>
                    <div class="mb-2">
                        <label class="block text-slate-400 text-xs mb-1">Link Product (Auto-fill)</label>
                        <select onchange="fillServiceFromProduct(this, ${index})" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white text-sm">
                            <option value="">Select a product to auto-fill...</option>
                            ${productOptions}
                        </select>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function addService() {
    content.home.services.push({
        title: "New Service",
        description: "Service description",
        image: "https://via.placeholder.com/800x600",
        link: "shop"
    });
    saveContent(content);
    renderServicesEditor();
}

function removeService(index) {
    if(confirm('Remove this service?')) {
        content.home.services.splice(index, 1);
        saveContent(content);
        renderServicesEditor();
    }
}

function fillServiceFromProduct(select, index) {
    const productId = parseInt(select.value);
    if (!productId) return;
    
    const product = content.caseStudies.studies.find(p => p.id === productId);
    if (product) {
        content.home.services[index].title = `Buy ${product.title}`;
        content.home.services[index].description = product.description.substring(0, 100) + '...';
        content.home.services[index].image = product.image;
        content.home.services[index].link = getProductLink(product);
        saveContent(content);
        renderServicesEditor();
    }
}

function renderServicesPageEditor() {
    const form = document.getElementById('servicesPage-form');
    if(!form) return;
    const page = content.servicesPage;
    form.innerHTML = `
        <div class="space-y-4 mb-6">
            <div>
                <label class="block text-slate-400 mb-1">Page Title</label>
                <input type="text" value="${page.title}" onchange="updateNested('servicesPage', 'title', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Page Subtitle</label>
                <textarea onchange="updateNested('servicesPage', 'subtitle', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white h-20">${page.subtitle}</textarea>
            </div>
        </div>
        <h4 class="text-lg font-bold text-white mb-2">Custom Theme Items</h4>
        <div class="space-y-4">
            ${page.customThemeItems.map((item, index) => `
                <div class="bg-slate-800 p-4 rounded border border-slate-700">
                    <div class="mb-2">
                        <label class="block text-slate-400 text-xs mb-1">Title</label>
                        <input type="text" value="${item.title}" onchange="updateNestedObject('servicesPage', ${index}, 'customThemeItems', 'title', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
                    </div>
                    <div class="mb-2">
                        <label class="block text-slate-400 text-xs mb-1">Description</label>
                        <textarea onchange="updateNestedObject('servicesPage', ${index}, 'customThemeItems', 'desc', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white h-16">${item.desc}</textarea>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderWhyChooseEditor() {
    const form = document.getElementById('whyChoose-form');
    if(!form) return;
    const why = content.home.whyChoose;
    form.innerHTML = `
        <div class="space-y-4">
            <div>
                <label class="block text-slate-400 mb-1">Title</label>
                <input type="text" value="${why.title}" onchange="updateNested('home', 'whyChoose', { ...content.home.whyChoose, title: this.value })" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"> 
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Subtitle</label>
                <textarea class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white h-24" onchange="updateNested('home', 'whyChoose', { ...content.home.whyChoose, subtitle: this.value })">${why.subtitle}</textarea>
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Main Image</label>
                <input type="text" value="${why.image}" onchange="updateNested('home', 'whyChoose', { ...content.home.whyChoose, image: this.value })" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Floating Team Image</label>
                <input type="text" value="${why.floatingImage || ''}" onchange="updateNested('home', 'whyChoose', { ...content.home.whyChoose, floatingImage: this.value })" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Points (Comma separated)</label>
                <textarea class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white h-32" onchange="updateNested('home', 'whyChoose', { ...content.home.whyChoose, points: this.value.split(',').map(s => s.trim()) })">${why.points.join(', ')}</textarea>
            </div>
        </div>
    `;
}

function renderTestimonialsEditor() {
    const form = document.getElementById('testimonials-form');
    if(!form) return;
    form.innerHTML = `
        <div class="space-y-4 mb-6">
            <div>
                <label class="block text-slate-400 mb-1">Section Title</label>
                <input type="text" value="${content.home.testimonialsTitle}" onchange="updateNested('home', 'testimonialsTitle', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
        </div>
        <div class="space-y-4">
            ${content.home.testimonials.map((t, index) => `
                <div class="bg-slate-800 p-4 rounded border border-slate-700">
                    <div class="grid grid-cols-2 gap-4 mb-2">
                        <div>
                            <label class="block text-slate-400 text-xs mb-1">Author</label>
                            <input type="text" value="${t.author}" onchange="updateNestedObject('home', ${index}, 'testimonials', 'author', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
                        </div>
                        <div>
                            <label class="block text-slate-400 text-xs mb-1">Role</label>
                            <input type="text" value="${t.role}" onchange="updateNestedObject('home', ${index}, 'testimonials', 'role', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
                        </div>
                    </div>
                    <div>
                        <label class="block text-slate-400 text-xs mb-1">Quote</label>
                        <textarea onchange="updateNestedObject('home', ${index}, 'testimonials', 'quote', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white h-16">${t.quote}</textarea>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderAboutEditor() {
    const form = document.getElementById('about-form');
    if(!form) return;
    const about = content.about;
    form.innerHTML = `
        <div class="space-y-4">
            <div>
                <label class="block text-slate-400 mb-1">Name</label>
                <input type="text" value="${about.name}" onchange="updateNested('about', 'name', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Role</label>
                <input type="text" value="${about.role}" onchange="updateNested('about', 'role', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Description 1</label>
                <textarea onchange="updateNested('about', 'description1', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white h-24">${about.description1}</textarea>
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Description 2</label>
                <textarea onchange="updateNested('about', 'description2', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white h-24">${about.description2}</textarea>
            </div>
        </div>
    `;
}

function renderProductPageEditor() {
    const form = document.getElementById('productPage-form');
    if(!form) return;
    const pp = content.productPage;
    form.innerHTML = `
        <div class="space-y-4">
            <div>
                <label class="block text-slate-400 mb-1">Sidebar Title</label>
                <input type="text" value="${pp.sidebarTitle}" onchange="updateNested('productPage', 'sidebarTitle', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
            <div>
                <label class="block text-slate-400 mb-1">General Description</label>
                <textarea onchange="updateNested('productPage', 'generalDescription', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white h-40">${pp.generalDescription}</textarea>
            </div>
        </div>
    `;
}

function renderSeoEditor() {
    const form = document.getElementById('seo-form');
    if(!form) return;
    const seo = content.seo;
    form.innerHTML = `
        <div class="space-y-4">
            <div>
                <label class="block text-slate-400 mb-1">Site Title</label>
                <input type="text" value="${seo.siteTitle}" onchange="updateNested('seo', 'siteTitle', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Site Description</label>
                <textarea onchange="updateNested('seo', 'siteDescription', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white h-20">${seo.siteDescription}</textarea>
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Keywords</label>
                <input type="text" value="${seo.siteKeywords}" onchange="updateNested('seo', 'siteKeywords', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
        </div>
    `;
}

function renderContactEditor() {
    const form = document.getElementById('contact-form');
    if(!form) return;
    const contact = content.contact;
    form.innerHTML = `
        <div class="space-y-4">
            <div>
                <label class="block text-slate-400 mb-1">Title</label>
                <input type="text" value="${contact.title}" onchange="updateNested('contact', 'title', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Email</label>
                <input type="text" value="${contact.email}" onchange="updateNested('contact', 'email', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Phone</label>
                <input type="text" value="${contact.phone}" onchange="updateNested('contact', 'phone', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Address</label>
                <input type="text" value="${contact.address}" onchange="updateNested('contact', 'address', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
        </div>
    `;
}

function renderFooterEditor() {
    const form = document.getElementById('footer-form');
    if(!form) return;
    const footer = content.footer;
    form.innerHTML = `
        <div class="space-y-4">
            <div>
                <label class="block text-slate-400 mb-1">Description</label>
                <textarea onchange="updateNested('footer', 'description', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white h-24">${footer.description}</textarea>
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Copyright</label>
                <input type="text" value="${footer.copyright}" onchange="updateNested('footer', 'copyright', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
        </div>
    `;
}

// --- Products (Case Studies) Editor ---
function renderProducts() {
    const list = document.getElementById('products-list');
    if(!list) return;
    list.innerHTML = '';
    content.caseStudies.studies.forEach(p => {
        const item = document.createElement('div');
        item.className = "flex items-center justify-between bg-slate-800 p-4 rounded-lg border border-slate-700 mb-2";
        item.innerHTML = `
            <div class="flex items-center gap-4">
                <img src="${p.image}" class="w-12 h-12 object-cover rounded">
                <div>
                    <h4 class="font-bold text-white">${p.title}</h4>
                    <p class="text-sm text-slate-400">${p.category} | ${p.client}</p>
                </div>
            </div>
            <div class="flex gap-2">
                <button onclick="editProduct(${p.id})" class="text-blue-400 hover:text-blue-300">Edit</button>
                <button onclick="deleteProduct(${p.id})" class="text-red-400 hover:text-red-300">Delete</button>
            </div>
        `;
        list.appendChild(item);
    });
}

function editProduct(id) {
    const product = content.caseStudies.studies.find(p => p.id === id);
    if(!product) return;
    showProductModal(product);
}

function removeRepeaterRow(button) {
    const row = button.closest('.repeater-row');
    if (row) row.remove();
}

function buildGalleryRow(url = '') {
    const row = document.createElement('div');
    row.className = 'repeater-row grid grid-cols-[1fr_auto] gap-2';
    row.innerHTML = `
        <input type="text" data-field="url" placeholder="https://example.com/image.jpg" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
        <button type="button" onclick="removeRepeaterRow(this)" class="bg-red-600/20 hover:bg-red-600/30 text-red-300 px-3 rounded">Remove</button>
    `;
    row.querySelector('[data-field="url"]').value = url || '';
    return row;
}

function buildReviewRow(review = {}) {
    const row = document.createElement('div');
    row.className = 'repeater-row bg-slate-900/40 border border-slate-700 rounded-lg p-3 space-y-2';
    row.innerHTML = `
        <div class="grid grid-cols-2 gap-2">
            <input type="text" data-field="user" placeholder="Reviewer name" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            <input type="number" data-field="rating" min="1" max="5" step="0.1" placeholder="Rating (1-5)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
        </div>
        <input type="date" data-field="date" placeholder="Date (e.g. 2026-03-03)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
        <textarea data-field="comment" rows="2" placeholder="Review comment" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"></textarea>
        <div class="flex justify-end">
            <button type="button" onclick="removeRepeaterRow(this)" class="bg-red-600/20 hover:bg-red-600/30 text-red-300 px-3 py-1 rounded text-sm">Remove Review</button>
        </div>
    `;
    row.querySelector('[data-field="user"]').value = review.user || '';
    row.querySelector('[data-field="rating"]').value = review.rating ?? '';
    row.querySelector('[data-field="date"]').value = review.date || '';
    row.querySelector('[data-field="comment"]').value = review.comment || '';
    return row;
}

function buildFaqRow(faq = {}) {
    const row = document.createElement('div');
    row.className = 'repeater-row bg-slate-900/40 border border-slate-700 rounded-lg p-3 space-y-2';
    row.innerHTML = `
        <input type="text" data-field="question" placeholder="Question" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
        <textarea data-field="answer" rows="2" placeholder="Answer" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"></textarea>
        <div class="flex justify-end">
            <button type="button" onclick="removeRepeaterRow(this)" class="bg-red-600/20 hover:bg-red-600/30 text-red-300 px-3 py-1 rounded text-sm">Remove FAQ</button>
        </div>
    `;
    row.querySelector('[data-field="question"]').value = faq.question || '';
    row.querySelector('[data-field="answer"]').value = faq.answer || '';
    return row;
}

function addGalleryRow(url = '', atTop = false) {
    const container = document.getElementById('gallery-rows');
    if (!container) return;
    const row = buildGalleryRow(url);
    if (atTop) container.prepend(row);
    else container.appendChild(row);
}

function addReviewRow(review = {}, atTop = false) {
    const container = document.getElementById('review-rows');
    if (!container) return;
    const row = buildReviewRow(review);
    if (atTop) container.prepend(row);
    else container.appendChild(row);
}

function addFaqRow(faq = {}, atTop = false) {
    const container = document.getElementById('faq-rows');
    if (!container) return;
    const row = buildFaqRow(faq);
    if (atTop) container.prepend(row);
    else container.appendChild(row);
}

function resetProductRepeaters(product = null) {
    const galleryContainer = document.getElementById('gallery-rows');
    const reviewContainer = document.getElementById('review-rows');
    const faqContainer = document.getElementById('faq-rows');
    if (!galleryContainer || !reviewContainer || !faqContainer) return;

    galleryContainer.innerHTML = '';
    reviewContainer.innerHTML = '';
    faqContainer.innerHTML = '';

    (product?.gallery || []).forEach(imageUrl => addGalleryRow(imageUrl));
    (product?.reviews || []).forEach(review => addReviewRow(review));
    (product?.faqs || []).forEach(faq => addFaqRow(faq));

    if (!galleryContainer.children.length) addGalleryRow('');
    if (!reviewContainer.children.length) addReviewRow({});
    if (!faqContainer.children.length) addFaqRow({});
}

function collectGallery(form) {
    return Array.from(form.querySelectorAll('#gallery-rows .repeater-row'))
        .map(row => row.querySelector('[data-field="url"]')?.value.trim())
        .filter(Boolean);
}

function collectReviews(form) {
    return Array.from(form.querySelectorAll('#review-rows .repeater-row'))
        .map(row => {
            const user = row.querySelector('[data-field="user"]')?.value.trim() || '';
            const ratingValue = row.querySelector('[data-field="rating"]')?.value.trim() || '';
            const date = row.querySelector('[data-field="date"]')?.value.trim() || '';
            const comment = row.querySelector('[data-field="comment"]')?.value.trim() || '';
            if (!user && !ratingValue && !date && !comment) return null;
            const numericRating = Number(ratingValue);
            const rating = Number.isFinite(numericRating) && numericRating > 0 ? Math.min(Math.max(numericRating, 1), 5) : 5;
            return { user, rating, date, comment };
        })
        .filter(Boolean);
}

function collectFaqs(form) {
    return Array.from(form.querySelectorAll('#faq-rows .repeater-row'))
        .map(row => {
            const question = row.querySelector('[data-field="question"]')?.value.trim() || '';
            const answer = row.querySelector('[data-field="answer"]')?.value.trim() || '';
            if (!question && !answer) return null;
            return { question, answer };
        })
        .filter(Boolean);
}

function showProductModal(product = null) {
    const modal = document.getElementById('product-modal');
    const form = document.getElementById('product-form');
    const title = document.getElementById('product-modal-title');
    
    // Reset or Fill
    if(product) {
        title.textContent = "Edit Product";
        form.dataset.id = product.id;
        form.querySelector('[name="title"]').value = product.title || '';
        form.querySelector('[name="category"]').value = product.category || 'Facebook';
        form.querySelector('[name="price"]').value = product.client || '';
        form.querySelector('[name="image"]').value = product.image || '';
        form.querySelector('[name="slug"]').value = product.slug || '';
        form.querySelector('[name="shortDescription"]').value = product.shortDescription || '';
        form.querySelector('[name="description"]').value = product.description || '';
        
        // Specs
        form.querySelector('[name="spec_age"]').value = product.specs?.age || '';
        form.querySelector('[name="spec_ip"]').value = product.specs?.ip || '';
        form.querySelector('[name="spec_format"]').value = product.specs?.format || '';
        form.querySelector('[name="spec_warranty"]').value = product.specs?.warranty || '';
        resetProductRepeaters(product);

    } else {
        title.textContent = "Add New Product";
        form.dataset.id = "new";
        form.reset();
        form.querySelector('[name="image"]').value = "https://via.placeholder.com/400";
        resetProductRepeaters();
    }
    
    modal.classList.remove('hidden');
}

function saveProduct(e) {
    e.preventDefault();
    const form = e.target;
    const id = form.dataset.id;
    const formData = new FormData(form);
    const gallery = collectGallery(form);
    const reviews = collectReviews(form);
    const faqs = collectFaqs(form);

    const newProductData = {
        title: formData.get('title'),
        category: formData.get('category'),
        client: formData.get('price'),
        image: formData.get('image'),
        slug: formData.get('slug') ? formData.get('slug').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '',
        shortDescription: formData.get('shortDescription'),
        description: formData.get('description'),
        specs: { 
            age: formData.get('spec_age'),
            ip: formData.get('spec_ip'),
            format: formData.get('spec_format'),
            warranty: formData.get('spec_warranty')
        },
        gallery: gallery,
        reviews: reviews,
        faqs: faqs
    };

    if (id === "new") {
        newProductData.id = Date.now();
        // Generate simple slug if empty
        if (!newProductData.slug) {
            newProductData.slug = newProductData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }
        content.caseStudies.studies.push(newProductData);
    } else {
        const idx = content.caseStudies.studies.findIndex(p => p.id == id);
        if(idx !== -1) {
            // Keep existing slug if not provided in edit
            if (!newProductData.slug) {
                newProductData.slug = content.caseStudies.studies[idx].slug;
            }
            content.caseStudies.studies[idx] = { ...content.caseStudies.studies[idx], ...newProductData };
        }
    }
    
    saveContent(content);
    renderProducts();
    renderDashboard();
    document.getElementById('product-modal').classList.add('hidden');
}

function deleteProduct(id) {
    if(confirm('Are you sure?')) {
        content.caseStudies.studies = content.caseStudies.studies.filter(p => p.id !== id);
        saveContent(content);
        renderProducts();
        renderDashboard();
    }
}

// --- Server Save Logic ---
async function saveToServer() {
    const btn = document.getElementById('save-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Saving...`;
    btn.disabled = true;

    try {
        const response = await fetch('/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            alert('Changes saved permanently!');
        } else {
            alert('Error saving data: ' + (result.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Save error:', error);
        alert('Failed to connect to server. Ensure server.cjs is running.');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    renderHeaderEditor();
    renderHeroEditor();
    renderServicesEditor();
    renderServicesPageEditor();
    renderWhyChooseEditor();
    renderTestimonialsEditor();
    renderAboutEditor();
    renderProductPageEditor();
    renderProducts();
    renderSeoEditor();
    renderContactEditor();
    renderFooterEditor();
    renderBlogList();
    renderAllReviews();
    renderAllFaqs();
    renderCategoriesEditor();
});

// --- Categories Logic ---
function renderCategoriesEditor() {
    const list = document.getElementById('categories-list');
    if(!list) return;
    list.innerHTML = '';
    
    // Sync header categories and shop categories
    // We assume they should be the same list generally, but the store has them separate.
    // For simplicity, we'll manage the `header.categories` list and ensure `caseStudies.categories` also has them (plus 'All').
    
    const categories = content.header.categories;
    
    if (categories.length === 0) {
        list.innerHTML = '<p class="text-slate-500 italic">No categories found.</p>';
        return;
    }

    categories.forEach((cat, index) => {
        const item = document.createElement('div');
        item.className = "flex items-center justify-between bg-slate-800 p-3 rounded-lg border border-slate-700";
        item.innerHTML = `
            <span class="text-white font-medium">${cat}</span>
            <button onclick="removeCategory(${index})" class="text-red-400 hover:text-red-300 bg-red-400/10 p-2 rounded hover:bg-red-400/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
        `;
        list.appendChild(item);
    });
}

function addCategory() {
    const input = document.getElementById('new-category-input');
    const newCat = input.value.trim();
    
    if (!newCat) {
        alert("Please enter a category name");
        return;
    }
    
    if (content.header.categories.includes(newCat)) {
        alert("Category already exists");
        return;
    }
    
    // Add to Header Categories
    content.header.categories.push(newCat);
    
    // Add to Shop Categories if not present (Shop usually has 'All' at start)
    if (!content.caseStudies.categories.includes(newCat)) {
        content.caseStudies.categories.push(newCat);
    }
    
    saveContent(content);
    renderCategoriesEditor();
    input.value = '';
}

function removeCategory(index) {
    if(!confirm("Delete this category?")) return;
    
    const catToRemove = content.header.categories[index];
    
    // Remove from Header
    content.header.categories.splice(index, 1);
    
    // Remove from Shop
    const shopIndex = content.caseStudies.categories.indexOf(catToRemove);
    if (shopIndex > -1) {
        content.caseStudies.categories.splice(shopIndex, 1);
    }
    
    saveContent(content);
    renderCategoriesEditor();
}

// --- All Reviews Logic ---
function renderAllReviews() {
    const list = document.getElementById('all-reviews-list');
    if (!list) return;
    list.innerHTML = '';
    
    // Add New Button at top of section handled in HTML, but we need the Select Product dropdown logic
    const select = document.getElementById('review-product-select');
    if (select) {
        select.innerHTML = '<option value="">-- Select Product --</option>';
        content.caseStudies.studies.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.title;
            select.appendChild(opt);
        });
    }

    // Render List
    content.caseStudies.studies.forEach(p => {
        if (!p.reviews || p.reviews.length === 0) return;
        
        const group = document.createElement('div');
        group.className = "bg-slate-800 p-4 rounded-lg border border-slate-700";
        group.innerHTML = `<h4 class="text-blue-400 font-bold mb-3 border-b border-slate-700 pb-2">${p.title}</h4>`;
        
        const ul = document.createElement('div');
        ul.className = "space-y-2";
        
        p.reviews.forEach((r, idx) => {
            const item = document.createElement('div');
            item.className = "flex justify-between items-start bg-slate-900/50 p-3 rounded";
            item.innerHTML = `
                <div>
                    <div class="font-bold text-white text-sm">${r.user} <span class="text-yellow-500 text-xs ml-2">★ ${r.rating}</span></div>
                    <div class="text-slate-500 text-xs mb-1">${r.date}</div>
                    <p class="text-slate-400 text-sm line-clamp-1">${r.comment}</p>
                </div>
                <div class="flex gap-2">
                    <button onclick="editGlobalReview(${p.id}, ${idx})" class="text-blue-400 hover:text-blue-300 text-xs">Edit</button>
                    <button onclick="deleteGlobalReview(${p.id}, ${idx})" class="text-red-400 hover:text-red-300 text-xs">Delete</button>
                </div>
            `;
            ul.appendChild(item);
        });
        
        group.appendChild(ul);
        list.appendChild(group);
    });
    
    // Global "Add" button triggers modal with empty fields
    // We'll attach listener to the "Add" button in HTML if we added one, 
    // but the user asked for separate sections. 
    // I didn't add an "Add" button in the HTML view-section header for Reviews/FAQs yet.
    // Let's add it dynamically or rely on the HTML I wrote which had a placeholder text.
    // Actually, I should add an "Add Review" button to the view-allReviews header in HTML.
    // I will do that in a separate patch if needed, but for now let's ensure functionality exists.
    
    // Wait, I missed adding the "Add" button in the HTML for these sections.
    // I'll add it via JS for now to save a turn, or just let the user edit existing.
    // User said "sohoje review ba faqs add korte pari", so Add button is essential.
    // I will prepend it to the list container if missing.
    if (!list.previousElementSibling.querySelector('button')) {
        const btn = document.createElement('button');
        btn.className = "bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2";
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg> Add Review`;
        btn.onclick = () => openGlobalReviewModal();
        list.previousElementSibling.appendChild(btn);
    }
}

function openGlobalReviewModal(productId = null, reviewIndex = -1) {
    const modal = document.getElementById('global-review-modal');
    const form = document.getElementById('global-review-form');
    const title = document.getElementById('review-modal-title');
    
    form.reset();
    form.review_index.value = reviewIndex;
    
    if (productId && reviewIndex > -1) {
        title.textContent = "Edit Review";
        const product = content.caseStudies.studies.find(p => p.id === productId);
        const review = product.reviews[reviewIndex];
        
        form.product_id.value = productId;
        form.user.value = review.user;
        form.rating.value = review.rating;
        form.date.value = review.date;
        form.comment.value = review.comment;
    } else {
        title.textContent = "Add Review";
        form.product_id.value = "";
    }
    
    modal.classList.remove('hidden');
}

function editGlobalReview(productId, index) {
    openGlobalReviewModal(productId, index);
}

function saveGlobalReview(e) {
    e.preventDefault();
    const form = e.target;
    const productId = parseInt(form.product_id.value);
    const index = parseInt(form.review_index.value);
    
    if (!productId) {
        alert("Please select a product");
        return;
    }
    
    const productIndex = content.caseStudies.studies.findIndex(p => p.id === productId);
    if (productIndex === -1) return;
    
    const newReview = {
        user: form.user.value,
        rating: Number(form.rating.value),
        date: form.date.value,
        comment: form.comment.value
    };
    
    if (!content.caseStudies.studies[productIndex].reviews) {
        content.caseStudies.studies[productIndex].reviews = [];
    }
    
    if (index > -1) {
        content.caseStudies.studies[productIndex].reviews[index] = newReview;
    } else {
        // Add to top
        content.caseStudies.studies[productIndex].reviews.unshift(newReview);
    }
    
    saveContent(content);
    renderAllReviews();
    document.getElementById('global-review-modal').classList.add('hidden');
}

function deleteGlobalReview(productId, index) {
    if(!confirm("Delete this review?")) return;
    const pIdx = content.caseStudies.studies.findIndex(p => p.id === productId);
    if (pIdx > -1) {
        content.caseStudies.studies[pIdx].reviews.splice(index, 1);
        saveContent(content);
        renderAllReviews();
    }
}

// --- All FAQs Logic ---
function renderAllFaqs() {
    const list = document.getElementById('all-faqs-list');
    if (!list) return;
    list.innerHTML = '';
    
    // Populate Select
    const select = document.getElementById('faq-product-select');
    if (select) {
        select.innerHTML = '<option value="">-- Select Product --</option>';
        content.caseStudies.studies.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.title;
            select.appendChild(opt);
        });
    }

    // Render List
    content.caseStudies.studies.forEach(p => {
        if (!p.faqs || p.faqs.length === 0) return;
        
        const group = document.createElement('div');
        group.className = "bg-slate-800 p-4 rounded-lg border border-slate-700";
        group.innerHTML = `<h4 class="text-blue-400 font-bold mb-3 border-b border-slate-700 pb-2">${p.title}</h4>`;
        
        const ul = document.createElement('div');
        ul.className = "space-y-2";
        
        p.faqs.forEach((f, idx) => {
            const item = document.createElement('div');
            item.className = "flex justify-between items-start bg-slate-900/50 p-3 rounded";
            item.innerHTML = `
                <div>
                    <div class="font-bold text-white text-sm">Q: ${f.question}</div>
                    <p class="text-slate-400 text-sm line-clamp-1">A: ${f.answer}</p>
                </div>
                <div class="flex gap-2">
                    <button onclick="editGlobalFaq(${p.id}, ${idx})" class="text-blue-400 hover:text-blue-300 text-xs">Edit</button>
                    <button onclick="deleteGlobalFaq(${p.id}, ${idx})" class="text-red-400 hover:text-red-300 text-xs">Delete</button>
                </div>
            `;
            ul.appendChild(item);
        });
        
        group.appendChild(ul);
        list.appendChild(group);
    });

    // Add Button
    if (!list.previousElementSibling.querySelector('button')) {
        const btn = document.createElement('button');
        btn.className = "bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2";
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg> Add FAQ`;
        btn.onclick = () => openGlobalFaqModal();
        list.previousElementSibling.appendChild(btn);
    }
}

function openGlobalFaqModal(productId = null, index = -1) {
    const modal = document.getElementById('global-faq-modal');
    const form = document.getElementById('global-faq-form');
    const title = document.getElementById('faq-modal-title');
    
    form.reset();
    form.faq_index.value = index;
    
    if (productId && index > -1) {
        title.textContent = "Edit FAQ";
        const product = content.caseStudies.studies.find(p => p.id === productId);
        const faq = product.faqs[index];
        
        form.product_id.value = productId;
        form.question.value = faq.question;
        form.answer.value = faq.answer;
    } else {
        title.textContent = "Add FAQ";
        form.product_id.value = "";
    }
    
    modal.classList.remove('hidden');
}

function editGlobalFaq(productId, index) {
    openGlobalFaqModal(productId, index);
}

function saveGlobalFaq(e) {
    e.preventDefault();
    const form = e.target;
    const productId = parseInt(form.product_id.value);
    const index = parseInt(form.faq_index.value);
    
    if (!productId) {
        alert("Please select a product");
        return;
    }
    
    const productIndex = content.caseStudies.studies.findIndex(p => p.id === productId);
    if (productIndex === -1) return;
    
    const newFaq = {
        question: form.question.value,
        answer: form.answer.value
    };
    
    if (!content.caseStudies.studies[productIndex].faqs) {
        content.caseStudies.studies[productIndex].faqs = [];
    }
    
    if (index > -1) {
        content.caseStudies.studies[productIndex].faqs[index] = newFaq;
    } else {
        content.caseStudies.studies[productIndex].faqs.unshift(newFaq);
    }
    
    saveContent(content);
    renderAllFaqs();
    document.getElementById('global-faq-modal').classList.add('hidden');
}

function deleteGlobalFaq(productId, index) {
    if(!confirm("Delete this FAQ?")) return;
    const pIdx = content.caseStudies.studies.findIndex(p => p.id === productId);
    if (pIdx > -1) {
        content.caseStudies.studies[pIdx].faqs.splice(index, 1);
        saveContent(content);
        renderAllFaqs();
    }
}

// --- Blog Logic ---
function renderBlogList() {
    const list = document.getElementById('blog-list');
    if(!list) return;
    list.innerHTML = '';
    
    // Blog Settings Form
    const settingsDiv = document.getElementById('blog-form');
    settingsDiv.innerHTML = `
        <div class="grid gap-4 bg-slate-800 p-4 rounded-lg border border-slate-700 mb-6">
            <div>
                <label class="block text-slate-400 mb-1">Section Title</label>
                <input type="text" value="${content.blog.title}" onchange="updateNested('blog', 'title', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white">
            </div>
            <div>
                <label class="block text-slate-400 mb-1">Section Subtitle</label>
                <textarea onchange="updateNested('blog', 'subtitle', this.value)" class="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white h-20">${content.blog.subtitle}</textarea>
            </div>
        </div>
    `;

    content.blog.posts.forEach(p => {
        const item = document.createElement('div');
        item.className = "flex items-center justify-between bg-slate-800 p-4 rounded-lg border border-slate-700 mb-2";
        item.innerHTML = `
            <div class="flex items-center gap-4">
                <img src="${p.image}" class="w-12 h-12 object-cover rounded">
                <div>
                    <h4 class="font-bold text-white">${p.title}</h4>
                    <p class="text-sm text-slate-400">${p.category} | ${p.date}</p>
                </div>
            </div>
            <div class="flex gap-2">
                <button onclick="editBlogPost(${p.id})" class="text-blue-400 hover:text-blue-300">Edit</button>
                <button onclick="deleteBlogPost(${p.id})" class="text-red-400 hover:text-red-300">Delete</button>
            </div>
        `;
        list.appendChild(item);
    });
}

function editBlogPost(id) {
    const post = content.blog.posts.find(p => p.id === id);
    if(!post) return;
    showBlogModal(post);
}

function showBlogModal(post = null) {
    const modal = document.getElementById('blog-modal');
    const form = document.getElementById('blog-form-modal');
    const title = document.getElementById('blog-modal-title');
    
    if(post) {
        title.textContent = "Edit Blog Post";
        form.dataset.id = post.id;
        form.querySelector('[name="title"]').value = post.title;
        form.querySelector('[name="category"]').value = post.category;
        form.querySelector('[name="date"]').value = post.date;
        form.querySelector('[name="excerpt"]').value = post.excerpt;
        form.querySelector('[name="content"]').value = post.content;
    } else {
        title.textContent = "Add New Post";
        form.dataset.id = "new";
        form.reset();
    }
    
    modal.classList.remove('hidden');
}

function saveBlogPost(e) {
    e.preventDefault();
    const form = e.target;
    const id = form.dataset.id;
    const formData = new FormData(form);
    
    const newPostData = {
        title: formData.get('title'),
        category: formData.get('category'),
        date: formData.get('date'),
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        image: "https://via.placeholder.com/800x400", // Default image
        author: "Admin"
    };

    if(id === "new") {
        newPostData.id = Date.now();
        content.blog.posts.push(newPostData);
    } else {
        const idx = content.blog.posts.findIndex(p => p.id == id);
        if(idx !== -1) {
            content.blog.posts[idx] = { ...content.blog.posts[idx], ...newPostData };
        }
    }
    
    saveContent(content);
    renderBlogList();
    renderDashboard();
    document.getElementById('blog-modal').classList.add('hidden');
}

function deleteBlogPost(id) {
    if(confirm('Are you sure?')) {
        content.blog.posts = content.blog.posts.filter(p => p.id !== id);
        saveContent(content);
        renderBlogList();
        renderDashboard();
    }
}
