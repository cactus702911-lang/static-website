// SEO Utilities
const SEO = {
    updateMeta: (data) => {
        // Title
        document.title = data.title || 'BestPvaShop | Buy Verified PVA Accounts';

        // Meta Description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = data.description || 'Buy verified Facebook, Google, Instagram, and other PVA accounts at the best prices. 100% satisfaction guaranteed.';

        // Keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = "keywords";
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.content = data.keywords || 'buy pva accounts, facebook accounts, google voice, gmail accounts, buy reviews';

        // Open Graph
        SEO.updateOG('og:title', data.title);
        SEO.updateOG('og:description', data.description);
        SEO.updateOG('og:image', data.image);
        SEO.updateOG('og:url', window.location.href);
        
        // Canonical
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = "canonical";
            document.head.appendChild(canonical);
        }
        canonical.href = window.location.href;
    },

    updateOG: (property, content) => {
        if (!content) return;
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('property', property);
            document.head.appendChild(tag);
        }
        tag.content = content;
    },

    injectSchema: (schemaData) => {
        let script = document.getElementById('json-ld-schema');
        if (script) script.remove();
        
        script = document.createElement('script');
        script.id = 'json-ld-schema';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schemaData);
        document.head.appendChild(script);
    },

    generateProductSchema: (product) => {
        return {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.title,
            "image": product.image,
            "description": product.description,
            "brand": {
                "@type": "Brand",
                "name": "BestPvaShop"
            },
            "sku": product.id,
            "offers": {
                "@type": "Offer",
                "url": window.location.href,
                "priceCurrency": "USD",
                "price": product.price || "10.00", // Default or extract from description
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "120"
            }
        };
    },

    generateOrganizationSchema: () => {
        return {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "BestPvaShop",
            "url": "https://bestpvashop.com",
            "logo": "https://bestpvashop.com/logo.png",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-781-281-8745",
                "contactType": "customer service"
            },
            "sameAs": [
                "https://facebook.com/realshopusa",
                "https://twitter.com/realshopusa",
                "https://linkedin.com/company/realshopusa"
            ]
        };
    }
};
