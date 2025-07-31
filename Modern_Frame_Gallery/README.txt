The Modern Frame Art Gallery Website
====================================

Student Name: [Your Name]
Project: Static Desktop-Oriented Art Gallery Website
Date: 2024

PROJECT OVERVIEW
---------------
This is a static, desktop-oriented website for "The Modern Frame", a fictional contemporary art gallery. The website showcases artwork, exhibitions, artist bios, and contact details using only HTML and CSS (no JavaScript).

IMPLEMENTED FEATURES
-------------------

HTML Features:
✓ Proper DOCTYPE, html, head, body structure
✓ Semantic HTML tags: header, nav, main, section, article, footer
✓ Meta charset="UTF-8" and viewport meta tags
✓ Descriptive title tags for all pages
✓ H1-H6 headings used appropriately
✓ Paragraphs, blockquotes, and strong/em formatting
✓ Ordered list of past exhibitions (About page)
✓ Unordered list of gallery staff (About page)
✓ Studio hours table with Day, Opening Time, Closing Time columns (Contact page)
✓ Internal navigation links between all pages
✓ External link with target="_blank" and rel="noopener" (Virtual Tour)
✓ 4+ images with proper alt attributes using placeholder images
✓ Video element with controls (gallery tour)
✓ Contact information table with address, phone, email

CSS Features:
✓ External stylesheet (css/styles.css) linked to all pages
✓ Element, class, ID, and descendant selectors used
✓ Margin and padding for visual spacing
✓ Text alignment (center for headings)
✓ Float used for text wrapping around images
✓ Box-sizing: border-box on key elements
✓ Position: fixed (header), absolute (featured badge), relative, static
✓ Horizontal navigation using display: flex
✓ Custom list styling with pseudo-elements
✓ Text transformations: text-transform, letter-spacing, text-decoration, text-shadow
✓ Flexbox for navigation and content alignment
✓ CSS Grid for gallery layout (2x2 grid)
✓ Background images with repeat, position, and size properties
✓ Border-radius, borders, and box-shadows
✓ Transform: scale() on image hover
✓ Transitions for smooth color/size changes
✓ CSS animations using @keyframes (blinking banner, pulse animation)
✓ Color formats: named colors, HEX, RGB, HSL

Pages Implemented:
✓ Home Page (index.html) - Welcome message, featured artwork, upcoming exhibition
✓ Gallery Page (gallery.html) - Structured artwork layout with titles and descriptions
✓ About Page (about.html) - Gallery history, notable artists, exhibition timeline
✓ Contact Page (contact.html) - Address, phone, email, studio hours table

BROWSER TESTING
---------------
Tested and compatible with:
- Google Chrome (latest version)
- Mozilla Firefox (latest version)
- Microsoft Edge (latest version)
- Safari (latest version)

KNOWN ISSUES
-----------
- Website is designed for desktop viewing only (not responsive for mobile devices)
- Some placeholder images may take time to load from external service
- Video element uses sample video URLs that may not always be available

FOLDER STRUCTURE
---------------
Modern_Frame_Gallery/
├── index.html
├── gallery.html
├── about.html
├── contact.html
├── css/
│   └── styles.css
├── images/
│   └── (placeholder images via external URLs)
├── videos/
│   └── (video files if using local videos)
└── README.txt

TECHNICAL NOTES
--------------
- All images use placeholder URLs from picsum.photos
- Video uses sample video URLs from sample-videos.com
- External link points to YouTube (dummy URL for demonstration)
- CSS animations include blinking banner and pulse effects
- Gallery uses CSS Grid for 2x2 layout as specified
- Fixed header with smooth navigation transitions
- Hover effects on all interactive elements 