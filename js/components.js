// Shared Components (Header & Footer)

function loadSharedComponents() {
    const headerHtml = `
    <div class="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white text-center py-2 px-4 relative z-[60] text-sm font-medium border-b border-blue-700/50" id="top-bar-container">
        <div class="container mx-auto flex items-center justify-center">
            <span id="top-bar-content"></span>
            <button 
              onclick="document.getElementById('top-bar-container').style.display='none'"
              class="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close notification"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
        </div>
    </div>

    <header class="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div class="container mx-auto px-4 md:px-6">
            <div class="flex h-16 items-center justify-between">
                <!-- Logo -->
                <a href="/" class="flex items-center gap-2">
                    <div class="bg-blue-600/10 p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag text-blue-600"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    </div>
                    <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700" id="logo-text">
                        RealShopUSA
                    </span>
                </a>

                <!-- Desktop Navigation -->
                <nav class="hidden md:flex items-center gap-8">
                    <a href="/" id="nav-home" class="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Home</a>
                    <a href="/shop" id="nav-shop" class="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Shop</a>
                    
                    <!-- Categories Dropdown -->
                    <div class="relative group">
                        <button class="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 font-medium focus:outline-none">
                            Categories <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
                        </button>
                        
                        <div class="absolute top-full left-0 w-48 bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                            <div class="p-2 flex flex-col gap-1" id="desktop-categories"></div>
                        </div>
                    </div>

                    <a href="/services" id="nav-services" class="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">Services</a>
                    <a href="/about" id="nav-about" class="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">About</a>
                    <a href="/blog" id="nav-blog" class="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">Blog</a>
                    <a href="/contact" id="nav-contact" class="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</a>

                    <a href="/contact" class="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5" id="cta-button">
                        Order Now
                    </a>
                </nav>

                <!-- Mobile Menu Button -->
                <button class="md:hidden p-2 text-gray-600 hover:text-blue-600 focus:outline-none" onclick="toggleMenu()" aria-label="Toggle menu">
                    <svg id="menu-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                    <svg id="close-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x hidden"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </div>
        </div>

        <!-- Mobile Navigation -->
        <div id="mobile-menu" class="hidden md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-xl max-h-[85vh] overflow-y-auto z-40">
            <div class="container mx-auto px-4 py-6 flex flex-col gap-4">
                <a href="/" class="text-lg py-3 text-slate-700 font-medium border-b border-slate-50 hover:text-blue-600 transition-colors" onclick="toggleMenu()">Home</a>
                <a href="/shop" class="text-lg py-3 text-slate-700 font-medium border-b border-slate-50 hover:text-blue-600 transition-colors" onclick="toggleMenu()">Shop</a>
                
                <div class="border-b border-slate-50 pb-2">
                    <button onclick="toggleCategory()" class="flex items-center justify-between w-full text-lg py-3 text-slate-700 font-medium hover:text-blue-600 transition-colors">
                        Categories <svg id="category-chevron" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down transition-transform"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div id="mobile-categories" class="hidden pl-4 flex-col gap-2 mt-2 bg-slate-50 rounded-lg p-3"></div>
                </div>

                <a href="/services" class="text-lg py-3 text-slate-700 font-medium border-b border-slate-50 hover:text-blue-600 transition-colors" onclick="toggleMenu()">Services</a>
                <a href="/about" class="text-lg py-3 text-slate-700 font-medium border-b border-slate-50 hover:text-blue-600 transition-colors" onclick="toggleMenu()">About</a>
                <a href="/blog" class="text-lg py-3 text-slate-700 font-medium border-b border-slate-50 hover:text-blue-600 transition-colors" onclick="toggleMenu()">Blog</a>
                <a href="/contact" class="text-lg py-3 text-slate-700 font-medium border-b border-slate-50 hover:text-blue-600 transition-colors" onclick="toggleMenu()">Contact</a>
                
                <div class="pt-4">
                    <a href="/contact" class="block w-full bg-blue-600 text-white text-center px-6 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95" id="mobile-cta-button">Order Now</a>
                </div>
            </div>
        </div>
    </header>
    `;

    const footerHtml = `
    <footer class="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
        <div class="container mx-auto px-4 md:px-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <div class="space-y-4">
                    <a href="/" class="flex items-center gap-2 mb-4">
                        <div class="bg-blue-600 p-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag text-white"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                        </div>
                        <span class="text-xl font-bold" id="footer-logo"></span>
                    </a>
                    <p class="text-slate-400 text-sm leading-relaxed" id="footer-desc"></p>
                    <div class="flex items-center gap-2 text-sm text-green-400 font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg> Verified Seller
                    </div>
                    <div class="flex gap-4 pt-2">
                        <a href="#" class="bg-white/10 p-2 rounded-full hover:bg-blue-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                        </a>
                        <a href="#" class="bg-white/10 p-2 rounded-full hover:bg-blue-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                        </a>
                        <a href="#" class="bg-white/10 p-2 rounded-full hover:bg-blue-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                        </a>
                    </div>
                </div>
                <div>
                    <h3 class="text-lg font-bold mb-6 text-white">Quick Links</h3>
                    <ul class="space-y-3 text-slate-400 text-sm">
                        <li><a href="/shop" class="hover:text-blue-400 transition-colors">All Products</a></li>
                        <li><a href="/about" class="hover:text-blue-400 transition-colors">About Company</a></li>
                        <li><a href="/contact" class="hover:text-blue-400 transition-colors">Contact Support</a></li>
                        <li><a href="/blog" class="hover:text-blue-400 transition-colors">Latest News</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg font-bold mb-6 text-white">Policy & Terms</h3>
                    <ul class="space-y-3 text-slate-400 text-sm">
                        <li><a href="#" class="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" class="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                        <li><a href="#" class="hover:text-blue-400 transition-colors">Refund Policy</a></li>
                        <li><a href="#" class="hover:text-blue-400 transition-colors">Replacement Guide</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg font-bold mb-6 text-white">Contact Us</h3>
                    <ul class="space-y-4 text-slate-400 text-sm">
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail text-blue-500 mt-0.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            <span id="footer-email"></span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone text-blue-500 mt-0.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            <span id="footer-phone"></span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin text-blue-500 mt-0.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span id="footer-address"></span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <p class="text-slate-500 text-sm">&copy; <span id="current-year"></span> <span id="footer-copyright"></span></p>
                <div class="flex items-center gap-4">
                    <span class="text-xs text-slate-500 font-bold uppercase tracking-wider">We Accept:</span>
                    <div class="flex gap-2 opacity-70">
                        <div class="bg-white/10 px-2 py-1 rounded text-xs font-bold">VISA</div>
                        <div class="bg-white/10 px-2 py-1 rounded text-xs font-bold">MasterCard</div>
                        <div class="bg-white/10 px-2 py-1 rounded text-xs font-bold">Crypto</div>
                        <div class="bg-white/10 px-2 py-1 rounded text-xs font-bold">Wise</div>
                    </div>
                </div>
            </div>
        </div>
<!-- Footer injected via js/components.js -->

    <!-- WhatsApp Button -->
    <div class="fixed bottom-6 right-6 z-50 group">
        <div class="absolute bottom-full right-0 mb-2 w-max bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Live Chat Now
            <div class="absolute bottom-[-4px] right-6 w-2 h-2 bg-slate-900 rotate-45"></div>
        </div>
        <a href="#" id="whatsapp-float" class="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
            <span class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        </a>
    </div>
    `;

    // Insert Header at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', headerHtml);
    // Insert Footer & WhatsApp at the end of body
    document.body.insertAdjacentHTML('beforeend', footerHtml);

    // Initialize WhatsApp Link
    const content = siteContent;
    const waNumber = content.social?.whatsapp?.replace(/\+/g, '') || '17812818745';
    const waFloat = document.getElementById('whatsapp-float');
    if (waFloat) waFloat.href = `https://wa.me/${waNumber}`;

    // Set Active State for Nav Links
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navIdMap = {
        'index.html': 'nav-home',
        '/': 'nav-home',
        'shop': 'nav-shop', 
        '/shop': 'nav-shop', 
        'services': 'nav-services',
        '/services': 'nav-services',
        'about': 'nav-about',
        '/about': 'nav-about',
        'blog': 'nav-blog',
        '/blog': 'nav-blog',
        'contact': 'nav-contact',
        '/contact': 'nav-contact'
    };
    
    // Check if we are in a product page
    if (window.location.pathname.startsWith('/product/')) {
        const shopLink = document.getElementById('nav-shop');
        if (shopLink) {
            shopLink.classList.remove('text-slate-600', 'font-medium');
            shopLink.classList.add('text-blue-600', 'font-semibold');
        }
        return;
    }

    const activeId = navIdMap[currentPath] || navIdMap[window.location.pathname] || (currentPath === '' ? 'nav-home' : null);
    if (activeId) {
        const activeLink = document.getElementById(activeId);
        if (activeLink) {
            activeLink.classList.remove('text-slate-600', 'font-medium');
            activeLink.classList.add('text-blue-600', 'font-semibold');
        }
    }
}

// Global UI Handlers
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

function toggleCategory() {
    const mobileCategories = document.getElementById('mobile-categories');
    const chevron = document.getElementById('category-chevron');
    
    if (mobileCategories.classList.contains('hidden')) {
        mobileCategories.classList.remove('hidden');
        mobileCategories.classList.add('flex');
        chevron.classList.add('rotate-180');
    } else {
        mobileCategories.classList.add('hidden');
        mobileCategories.classList.remove('flex');
        chevron.classList.remove('rotate-180');
    }
}

function updateSharedContent() {
    const content = siteContent;
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Top Bar & Header
    document.getElementById('top-bar-content').textContent = content.notification;
    document.getElementById('logo-text').textContent = content.header.logoText;
    document.getElementById('cta-button').textContent = content.header.ctaButton;
    document.getElementById('mobile-cta-button').textContent = content.header.ctaButton;

    // Categories
    const desktopCats = document.getElementById('desktop-categories');
    const mobileCats = document.getElementById('mobile-categories');
    if(desktopCats) desktopCats.innerHTML = '';
    if(mobileCats) mobileCats.innerHTML = '';

    content.header.categories.forEach(cat => {
        if(desktopCats) {
            const dLink = document.createElement('a');
            dLink.href = `shop?category=${encodeURIComponent(cat)}`;
            dLink.className = "px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors text-left";
            dLink.textContent = cat;
            desktopCats.appendChild(dLink);
        }
        if(mobileCats) {
            const mLink = document.createElement('a');
            mLink.href = `shop?category=${encodeURIComponent(cat)}`;
            mLink.className = "py-2 text-sm text-gray-600 hover:text-blue-600";
            mLink.textContent = cat;
            mLink.onclick = toggleMenu;
            mobileCats.appendChild(mLink);
        }
    });

    // Add "View All" link to categories
    if(desktopCats) {
        const dViewAll = document.createElement('a');
        dViewAll.href = "shop";
        dViewAll.className = "px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors text-left font-semibold border-t border-gray-100 mt-1";
        dViewAll.textContent = "View All";
        desktopCats.appendChild(dViewAll);
    }

    // Footer
    const footerLogo = document.getElementById('footer-logo');
    if (footerLogo) footerLogo.textContent = content.header.logoText;
    
    const footerDesc = document.getElementById('footer-desc');
    if (footerDesc) footerDesc.textContent = content.footer.description;
    
    const footerCopyright = document.getElementById('footer-copyright');
    if (footerCopyright) footerCopyright.textContent = content.footer.copyright;
    
    const footerEmail = document.getElementById('footer-email');
    if (footerEmail) footerEmail.textContent = content.contact.email;
    
    const footerPhone = document.getElementById('footer-phone');
    if (footerPhone) footerPhone.textContent = content.contact.phone;
    
    const footerAddress = document.getElementById('footer-address');
    if (footerAddress) footerAddress.textContent = content.contact.address;
}

// Auto-load on script import
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadSharedComponents();
        updateSharedContent();
    });
} else {
    loadSharedComponents();
    updateSharedContent();
}

// Listen for store updates
window.addEventListener('contentUpdated', updateSharedContent);
