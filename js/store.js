// Data Store - Mimics the Zustand store structure
// This data will be used to populate the website content

const defaultContent = {
    notification: "🔥 Special Offer: Buy 100+ Gmail Accounts & Get 10% OFF! | 24/7 Support Available",
    header: {
        logoText: "RealShopUSA",
        ctaButton: "Order Now",
        categories: ["Facebook", "Google", "Instagram", "Email", "Reviews", "Bank", "Social Media"]
    },
    contact: {
        title: "Contact Us",
        subtitle: "Have questions about our accounts? Reach out to us anytime.",
        email: "support@realshopusa.com",
        phone: "+1 (781) 281-8745",
        address: "339 1st Ave, New York, NY 10003, USA",
        locationSubtitle: "Available 24/7"
    },
    footer: {
        description: "We are provide all kinds of PVA Account & Reviews Service. Buy Facebook, Google, Instagram, and other verified accounts.",
        copyright: "RealShopUSA. All rights reserved.",
        designedBy: "Trusted by 1000+ Clients"
    },
    home: {
        hero: {
            badge: "Best PVA Account Seller",
            title: "We provide all kinds of PVA Account & Reviews Service",
            subtitle: "\"Reviews\" typically refers to evaluations or assessments of products, services, or experiences. \"PVA accounts\" stands for \"Phone Verified Accounts.\"",
            ctaPrimary: "Order Now",
            ctaSecondary: "View Services",
            heroImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        stats: [
            { label: "Accounts Sold", value: "5000+" },
            { label: "Satisfaction", value: "100%" },
            { label: "Happy Clients", value: "1200+" }
        ],
        servicesTitle: "Our Feature Service",
        servicesSubtitle: "High quality verified accounts and reviews for your business growth.",
        services: [
            {
                title: "Buy Facebook Accounts",
                description: "Old and new verified Facebook accounts with marketplace access and ads manager enabled.",
                image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                link: "shop?category=Facebook"
            },
            {
                title: "Buy Google Reviews",
                description: "5-star permanent reviews from real devices to boost your GMB ranking.",
                image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                link: "shop?category=Reviews"
            },
            {
                title: "Buy Google Voice",
                description: "USA/UK verified Google Voice numbers for calling and texting.",
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                link: "shop?category=Google"
            }
        ],
        whyChoose: {
            title: "Why Choose RealShopUSA?",
            subtitle: "We prioritize transparency and efficiency, delivering verified accounts promptly to meet your immediate financial needs.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            floatingImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            points: [
                "100% Verified Accounts",
                "Instant Delivery",
                "Secure Payment Methods",
                "24/7 Customer Support",
                "Replacement Guarantee"
            ]
        },
        testimonialsTitle: "What Our Clients Say",
        testimonialsSubtitle: "We have thousands of satisfied customers who trust us for their account needs.",
        testimonials: [
            {
                quote: "I bought 10 Facebook accounts and they all worked perfectly. Great service!",
                author: "David Wilson",
                role: "Marketing Manager",
                image: "https://randomuser.me/api/portraits/men/44.jpg"
            },
            {
                quote: "The Google Voice numbers were delivered instantly. Highly recommended.",
                author: "Sarah Jenkins",
                role: "Business Owner",
                image: "https://randomuser.me/api/portraits/women/32.jpg"
            },
            {
                quote: "Best place to buy reviews. My GMB ranking improved significantly.",
                author: "Mike Brown",
                role: "Local Business",
                image: "https://randomuser.me/api/portraits/men/68.jpg"
            }
        ],
        ctaTitle: "Ready to Grow Your Business?",
        ctaSubtitle: "Order your verified accounts today and see the difference.",
        ctaButton: "Shop Now"
    },
    about: {
        name: "RealShopUSA Team",
        role: "Premium Account Provider",
        description1: "We are a dedicated team providing high-quality Phone Verified Accounts (PVA) and social media services.",
        description2: "Our mission is to help businesses grow by providing reliable, verified accounts for marketing and outreach. We ensure all accounts are created with unique IPs and real phone numbers.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        stats: [
            { label: "Accounts", value: "Premium Quality", subtext: "" },
            { label: "Delivery", value: "Instant", subtext: "" },
            { label: "Support", value: "24/7 Live", subtext: "" },
            { label: "Experience", value: "5+ Years", subtext: "" }
        ],
        experienceTitle: "Our Expertise",
        experience: [
            {
                role: "Social Media Accounts",
                company: "Facebook, Instagram, Twitter",
                period: "Always Available",
                description: "We provide aged and fresh accounts for all major social media platforms."
            },
            {
                role: "Email Accounts",
                company: "Gmail, Yahoo, Outlook",
                period: "In Stock",
                description: "Phone verified email accounts ready for use."
            },
            {
                role: "Payment Accounts",
                company: "PayPal, CashApp, Wise",
                period: "Verified",
                description: "Fully verified payment accounts for smooth transactions."
            }
        ],
        ctaTitle: "Need Custom Orders?",
        ctaSubtitle: "Contact us for bulk orders and special requirements.",
        ctaButton: "Contact Support"
    },
    servicesPage: {
        title: "All PVA Services",
        subtitle: "Explore our wide range of verified accounts and services.",
        customThemeTitle: "Social Media Accounts",
        customThemeItems: [
            { title: "Facebook Accounts", desc: "Old/New accounts, Marketplace enabled, Ads Manager ready." },
            { title: "Instagram Accounts", desc: "Phone verified, aged accounts with followers." },
            { title: "Twitter/X Accounts", desc: "Verified profiles, aged accounts available." },
            { title: "LinkedIn Accounts", desc: "Professional profiles with connections." }
        ],
        includedItems: [
            "Phone Verified",
            "Email Verified",
            "Unique IP Created",
            "Replacement Guarantee",
            "Instant Delivery",
            "24/7 Support",
            "Login Guide Included",
            "Secure Transfer"
        ],
        pluginTitle: "Email & Other Services",
        technicalExpertise: [
            { title: "Gmail Accounts", desc: "Old and fresh Gmails, PVA, forwarding enabled." },
            { title: "Google Voice", desc: "Personal and business numbers available." },
            { title: "Outlook/Hotmail", desc: "Verified Microsoft accounts for business use." }
        ],
        pluginDesc1: "We also provide verified accounts for various other platforms including payment gateways and review sites.",
        pluginDesc2: "All accounts are checked before delivery to ensure 100% validity.",
        pricingTitle: "Popular Packages",
        pricingSubtitle: "Choose the best package for your needs.",
        pricing: [
            {
                title: "Starter Pack",
                price: "$50",
                description: "Ideal for testing our services.",
                features: ["5 Facebook Accounts", "2 Gmail Accounts", "Basic Support", "24h Replacement"],
                cta: "Buy Now",
                highlight: false
            },
            {
                title: "Business Pack",
                price: "$150",
                description: "Perfect for small businesses.",
                features: ["20 Facebook Accounts", "10 Gmail Accounts", "5 Google Voice", "Priority Support"],
                cta: "Buy Now",
                highlight: true
            },
            {
                title: "Agency Pack",
                price: "$450",
                description: "For agencies and resellers.",
                features: ["50 Facebook Accounts", "30 Gmail Accounts", "15 Google Voice", "Dedicated Support"],
                cta: "Contact Sales",
                highlight: false
            }
        ]
    },
    productPage: {
        sidebarTitle: "Why Buy From Us?",
        sidebarPoints: [
            { icon: "CheckCircle", text: "100% Verified Accounts" },
            { icon: "Zap", text: "Instant Delivery" },
            { icon: "Headphones", text: "24/7 Live Support" }
        ],
        generalDescription: "We provide high-quality accounts verified with real phone numbers. Our accounts are created using unique IPs to ensure maximum safety and longevity.\n\n• 100% Phone Verified\n• Recovery Email Included\n• 24/7 Customer Support\n• Instant Delivery"
    },
    caseStudies: {
        title: "All Products",
        subtitle: "Browse our premium quality verified accounts.",
        categories: ['All', 'Facebook', 'Google', 'Instagram', 'Reviews', 'Bank', 'Email', 'Social Media'],
        studies: [
            {
                id: 1,
                slug: "buy-facebook-accounts-new",
                title: "Facebook Accounts (New)",
                category: "Facebook",
                client: "Instant Delivery",
                image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                gallery: [],
                description: "Freshly created Facebook accounts. Phone verified. Comes with profile picture and cover photo. Good for general use.",
                specs: { age: "0-30 Days", ip: "USA/UK/Mix", format: "ID:Pass:2FA", warranty: "24 Hours" },
                reviews: [
                    { id: 1, user: "Alex M.", rating: 5, comment: "Works perfectly. Instant delivery!", date: "2024-03-01" },
                    { id: 2, user: "John D.", rating: 4, comment: "Good quality accounts.", date: "2024-02-24" }
                ],
                faqs: [
                    { question: "Are these accounts phone verified?", answer: "Yes, all accounts are 100% phone verified with real SIM cards." },
                    { question: "Do you provide replacement?", answer: "Yes, we provide 24-hour replacement guarantee for locked accounts." }
                ]
            },
            {
                id: 2,
                slug: "buy-facebook-accounts-aged-2010-2019",
                title: "Facebook Accounts (Aged 2010-2019)",
                category: "Facebook",
                client: "Instant Delivery",
                image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                gallery: [],
                description: "Old Facebook accounts with high trust score. Marketplace and Ads Manager enabled. Perfect for advertising.",
                specs: { age: "2-10 Years", ip: "USA/EU", format: "ID:Pass:2FA:Cookie", warranty: "48 Hours" }
            },
            {
                id: 3,
                slug: "buy-gmail-accounts-new",
                title: "Gmail Accounts (New)",
                category: "Email",
                client: "Instant Delivery",
                image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                gallery: [],
                description: "Fresh Gmail accounts, phone verified (PVA). Recovery email included. 100% unique IPs.",
                specs: { age: "New", ip: "Worldwide", format: "Email:Pass:Recovery", warranty: "24 Hours" }
            },
            {
                id: 4,
                slug: "buy-gmail-accounts-aged",
                title: "Gmail Accounts (Aged)",
                category: "Email",
                client: "Instant Delivery",
                image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                gallery: [],
                description: "Old Gmail accounts created 2+ years ago. Very stable and trusted by Google.",
                specs: { age: "2018-2022", ip: "USA/Mix", format: "Email:Pass:Recovery", warranty: "72 Hours" }
            },
            {
                id: 5,
                slug: "buy-google-voice-numbers",
                title: "Google Voice Numbers",
                category: "Google",
                client: "Instant Delivery",
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                gallery: [],
                description: "USA verified Google Voice numbers. Can send/receive SMS and calls. Works for verification on other sites.",
                specs: { age: "N/A", ip: "USA", format: "Email:Pass:Recovery:Phone", warranty: "30 Days" }
            },
            {
                id: 6,
                slug: "buy-instagram-accounts-pva",
                title: "Instagram Accounts (PVA)",
                category: "Instagram",
                client: "Instant Delivery",
                image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                gallery: [],
                description: "Phone verified Instagram accounts. Ready to use. Comes with profile picture.",
                specs: { age: "1-6 Months", ip: "Global", format: "User:Pass:Email", warranty: "24 Hours" }
            },
            {
                id: 7,
                slug: "buy-google-5-star-reviews",
                title: "Google 5-Star Reviews",
                category: "Reviews",
                client: "24-48h Delivery",
                image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                gallery: [],
                description: "Permanent 5-star Google Maps reviews from real local accounts. Boost your GMB ranking.",
                specs: { age: "N/A", ip: "Local", format: "Link Delivery", warranty: "Non-Drop" }
            },
            {
                id: 8,
                slug: "buy-trustpilot-reviews",
                title: "Trustpilot Reviews",
                category: "Reviews",
                client: "24-48h Delivery",
                image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                gallery: [],
                description: "Positive Trustpilot reviews to improve your business reputation. Non-drop guarantee.",
                specs: { age: "N/A", ip: "Worldwide", format: "Link Delivery", warranty: "Non-Drop" }
            },
            {
                id: 9,
                slug: "buy-verified-wise-accounts",
                title: "Verified Wise Accounts",
                category: "Bank",
                client: "Instant Delivery",
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                gallery: [],
                description: "Fully verified Wise (TransferWise) accounts. Documents submitted and approved. Ready for transactions.",
                specs: { age: "New", ip: "UK/EU/USA", format: "Full Access + Docs", warranty: "7 Days" }
            },
            {
                id: 10,
                slug: "buy-verified-paypal-accounts",
                title: "Verified PayPal Accounts",
                category: "Bank",
                client: "Instant Delivery",
                image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                gallery: [],
                description: "Personal and Business PayPal accounts. Phone and ID verified. US/UK/EU available.",
                specs: { age: "New/Aged", ip: "USA/UK", format: "Full Access + Docs", warranty: "7 Days" }
            },
            {
                id: 11,
                slug: "buy-twitter-x-accounts",
                title: "Twitter/X Accounts",
                category: "Social Media",
                client: "Instant Delivery",
                image: "https://images.unsplash.com/photo-1611605698335-8b15f7537f16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                gallery: [],
                description: "Phone verified Twitter (X) accounts. Email included. Token login available.",
                specs: { age: "New", ip: "Global", format: "User:Pass:Email:Token", warranty: "24 Hours" }
            },
            {
                id: 12,
                slug: "buy-linkedin-accounts",
                title: "LinkedIn Accounts",
                category: "Social Media",
                client: "Instant Delivery",
                image: "https://images.unsplash.com/photo-1611944212129-29990970f63d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                gallery: [],
                description: "Professional LinkedIn profiles with 50+ connections. Good for outreach and marketing.",
                specs: { age: "1-2 Years", ip: "USA/UK", format: "Email:Pass:Cookie", warranty: "48 Hours" }
            }
        ]
    },
    blog: {
        title: "Latest News",
        subtitle: "Updates and tips about PVA accounts and digital marketing.",
        posts: [
            {
                id: 1,
                title: "How to Keep Your Accounts Safe",
                excerpt: "Tips to prevent your purchased accounts from getting locked.",
                content: "Always use clean IPs and avoid logging in from multiple locations simultaneously...",
                image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                date: "March 1, 2024",
                author: "Admin",
                category: "Safety"
            }
        ]
    },
    seo: {
        siteTitle: "RealShopUSA | Buy Verified PVA Accounts",
        siteDescription: "Buy verified Facebook, Google, Instagram, and other PVA accounts at the best prices. 100% satisfaction guaranteed.",
        siteKeywords: "buy pva accounts, facebook accounts, google voice, gmail accounts, buy reviews",
        ogImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    social: {
        whatsapp: "+17812818745",
        telegram: "RealShopUSA",
        cvLink: "#",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        twitter: "https://twitter.com"
    }
};

// Global content object
let siteContent = defaultContent; // Initialize with default

// Function to fetch content from server
async function fetchContent() {
    try {
        const response = await fetch('/api/content');
        if (response.ok) {
            const data = await response.json();
            siteContent = data;
            // Dispatch update event
            window.dispatchEvent(new CustomEvent('contentUpdated', { detail: siteContent }));
            return data;
        }
    } catch (e) {
        console.log('Running in static mode or server offline, using default/local storage');
    }
    return getContent(); // Fallback to localStorage
}

// Function to load content from localStorage or default
function getContent() {
    const stored = localStorage.getItem('portfolio-content-storage');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            // Check if it has 'state' (Zustand format) or just the object
            const content = parsed.state || parsed || defaultContent;
            siteContent = content; // Update global
            return content;
        } catch (e) {
            console.error("Error parsing stored content:", e);
            return defaultContent;
        }
    }
    return defaultContent;
}

// Initialize
fetchContent();

// Function to save content to localStorage (and trigger update)
function saveContent(newContent) {
    // Save locally for immediate feedback
    localStorage.setItem('portfolio-content-storage', JSON.stringify({ 
        state: newContent, 
        version: 0 
    }));
    // Update the global object
    Object.assign(siteContent, newContent);
    
    // Dispatch a custom event for real-time updates within the same tab/window
    window.dispatchEvent(new CustomEvent('contentUpdated', { detail: newContent }));
}

// Listen for storage events (changes from other tabs/windows)
window.addEventListener('storage', (e) => {
    if (e.key === 'portfolio-content-storage') {
        const newContent = getContent();
        Object.assign(siteContent, newContent);
        // Dispatch event so UI can re-render
        window.dispatchEvent(new CustomEvent('contentUpdated', { detail: newContent }));
    }
});

// Function to get icon SVG (mimicking Lucide React)
function getIcon(name, className = "w-6 h-6") {
    const icons = {
        CheckCircle: `<svg xmlns="http://www.w3.org/2000/svg" class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
        Zap: `<svg xmlns="http://www.w3.org/2000/svg" class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
        Headphones: `<svg xmlns="http://www.w3.org/2000/svg" class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`,
        Menu: `<svg xmlns="http://www.w3.org/2000/svg" class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>`,
        X: `<svg xmlns="http://www.w3.org/2000/svg" class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
        ArrowRight: `<svg xmlns="http://www.w3.org/2000/svg" class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
        ShoppingCart: `<svg xmlns="http://www.w3.org/2000/svg" class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`
    };
    return icons[name] || '';
}

// Product Link Helper
function getProductLink(product) {
    if (!product) return '#';
    const slug = product.slug || product.id;
    return `product.html?slug=${slug}`;
}
