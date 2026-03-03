const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'image/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    // Handle API requests
    if (req.url === '/api/save' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                // Validate JSON
                const jsonData = JSON.parse(body);
                
                // Basic Server-Side Validation
                if (!jsonData.header || !jsonData.home) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, message: 'Invalid data structure' }));
                    return;
                }

                // Write to file (Database simulation)
                fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 4), (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: false, message: 'Server error writing data' }));
                    } else {
                        // Regenerate Sitemap
                        generateSitemap(jsonData);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: true, message: 'Data saved successfully' }));
                    }
                });
            } catch (e) {
                console.error('JSON Parse error:', e);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Invalid JSON' }));
            }
        });
        return;
    }

    if (req.url === '/api/content' && req.method === 'GET') {
        fs.readFile(DATA_FILE, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Error reading data' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
        return;
    }

    // Serve Static Files
    // Parse URL to separate path and query
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    let urlPath = parsedUrl.pathname;
    
    let filePath = '.' + urlPath;
    
    // Handle Product Slugs /product/slug -> product.html
    if (urlPath.startsWith('/product/')) {
        filePath = './product.html';
    } else if (urlPath.startsWith('/blog/')) {
        filePath = './blog-details.html';
    } else if (filePath === './' || filePath === './index') {
        filePath = './index.html';
    } else if (!path.extname(filePath) && !urlPath.startsWith('/api/')) {
        filePath += '.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(path.join(__dirname, filePath), (error, content) => {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, '404.html'), (error, content) => {
                    if (error) {
                        // Fallback 404
                        res.writeHead(404);
                        res.end('404 Not Found');
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

function generateSitemap(data) {
    const baseUrl = "https://realshopusa.com";
    const date = new Date().toISOString().split('T')[0];
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>${baseUrl}/</loc><lastmod>${date}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>
    <url><loc>${baseUrl}/shop</loc><lastmod>${date}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>
    <url><loc>${baseUrl}/services</loc><lastmod>${date}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
    <url><loc>${baseUrl}/about</loc><lastmod>${date}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>${baseUrl}/blog</loc><lastmod>${date}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>
    <url><loc>${baseUrl}/contact</loc><lastmod>${date}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
`;

    // Add Products
    if (data.caseStudies && data.caseStudies.studies) {
        data.caseStudies.studies.forEach(product => {
            const slug = product.slug || product.id;
            xml += `    <url><loc>${baseUrl}/product/${slug}</loc><priority>0.8</priority></url>\n`;
        });
    }

    xml += '</urlset>';

    fs.writeFile(path.join(__dirname, 'sitemap.xml'), xml, (err) => {
        if (err) console.error('Error generating sitemap:', err);
        else console.log('Sitemap regenerated');
    });
}

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
