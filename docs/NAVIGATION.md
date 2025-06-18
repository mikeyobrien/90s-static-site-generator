# 🧭 Navigation System Documentation

The 90s Static Site Generator includes a comprehensive navigation system that automatically generates site navigation, home pages, and sitemaps with authentic 90s styling.

## 🏠 Home Page Generation

The generator automatically creates an `index.html` home page with:

- **Welcome Banner** - Large, colorful site title with description
- **Recent Posts** - Latest 5 posts with "NEW!" badges for posts < 7 days old  
- **Quick Links** - Navigation to all pages
- **Random Quote** - Rotating 90s-era internet quotes
- **Live Clock** - JavaScript-powered time display
- **Visitor Counter** - Classic hit counter (randomized for demo)

### Home Page Configuration

The home page uses data from your site configuration:

```javascript
{
  siteTitle: "My Radical 90s Site",
  siteDescription: "Welcome to the World Wide Web!"
}
```

## 🗺️ Automatic Navigation

### Navigation Data Structure

During build, the generator creates a navigation object containing:

```javascript
{
  pages: [
    { title: "About", url: "/pages/about.html", order: 1 },
    { title: "Links", url: "/pages/links.html", order: 2 }
  ],
  recentPosts: [
    { 
      title: "New Post", 
      url: "/posts/new.html", 
      date: "2024-06-18",
      isNew: true 
    }
  ],
  allPosts: [...] // All posts sorted by date
}
```

### Page Ordering

Control page order in navigation using the `navOrder` front matter:

```yaml
---
title: About
navOrder: 1  # Lower numbers appear first
---
```

Pages without `navOrder` default to 999.

## 🎯 Navigation Components

### Horizontal Navigation Bar

Include in your templates:

```ejs
<%- include('partials/navigation-horizontal') %>
```

Features:
- Image-based buttons with hover effects
- Automatic inclusion of all pages
- Links to home and sitemap
- Fallback text navigation for accessibility

### Vertical Navigation Menu

For sidebar navigation:

```ejs
<%- include('partials/navigation-vertical') %>
```

Includes:
- Hierarchical page listing
- Recent posts with NEW badges
- Random page button
- Optional guestbook link

### Breadcrumb Navigation

```ejs
<%- include('partials/breadcrumb') %>
```

Requires `breadcrumb` data in page front matter:

```yaml
breadcrumb:
  - { title: "Home", url: "/" }
  - { title: "Blog", url: "/blog/" }
```

### Post Navigation (Previous/Next)

Automatically added to blog posts:

```ejs
<%- include('partials/post-navigation') %>
```

Shows:
- Previous post with title
- Home button
- Next post with title
- Disabled states for first/last posts

## 📑 Sitemap Generation

An HTML sitemap is automatically generated at `/sitemap.html` containing:

- All pages with last updated dates
- All posts sorted by date
- Site statistics (total pages/posts)
- Visual organization in columns

## 🎨 JavaScript Enhancements

### Status Bar Scrolling

Classic scrolling message in browser status bar:

```javascript
// Automatically enabled on all pages
window.status = "Welcome to my homepage!!! ";
```

### Random Page Navigation

JavaScript function for "Random Page" buttons:

```javascript
<a href="javascript:randomPage()">Random Page!</a>
```

### Right-Click Protection

Optional protection against right-clicking:

```javascript
window.enableRightClickProtection = true;
```

### Additional Effects

- **Browser Detection** - Warns if not using Netscape/IE
- **Snow Effect** - Falling characters in winter months
- **Image Rollovers** - Hover state changes
- **Last Modified** - Shows document.lastModified

## 🖼️ Navigation Images

### Button Types

Generated navigation buttons in `/images/buttons/`:
- `home.gif` / `home-hover.gif`
- `about.gif` / `about-hover.gif`
- `prev.gif` / `next.gif`
- `random.gif`
- `divider.gif`

### Icons

Navigation icons in `/images/icons/`:
- `arrow.gif` - Navigation arrows
- `bullet.gif` - List bullets
- `star.gif` - Decorative stars
- `home.gif` - Home icon

## 🔧 Customization

### Custom Navigation Order

```yaml
---
title: Important Page
navOrder: 0  # Will appear first
---
```

### Disable Navigation Elements

In generator config:

```javascript
{
  theme_components_guestbook: false,  // Hide guestbook links
  theme_effects_marquee: false        // Disable scrolling text
}
```

### Custom Home Page Sections

Edit `themes/default/templates/home.ejs` to customize:
- Welcome message
- Section layout
- Quote rotation
- Color schemes

## 📝 Example Usage

### Basic Site Structure

```
content/
├── pages/
│   ├── about.md (navOrder: 1)
│   ├── links.md (navOrder: 2)
│   └── contact.md (navOrder: 3)
└── posts/
    ├── welcome.md
    └── update.md
```

This generates:
- Home page with navigation to all pages
- Recent posts section showing both posts
- Sitemap with complete site structure
- Post pages with prev/next navigation

### Front Matter Examples

**Page with Navigation:**
```yaml
---
title: About Me
navOrder: 1
---
```

**Post with Navigation:**
```yaml
---
title: My First Post
date: 2024-06-18
author: WebMaster
---
```

The system automatically handles:
- NEW! badges for recent posts
- Previous/next links between posts
- Breadcrumb generation
- Navigation highlighting

## 🚀 Advanced Features

### JavaScript Navigation Data

Access navigation data in client-side JavaScript:

```javascript
// Available globally
window.navigationPages  // Array of page objects
window.navigationPosts  // Array of recent posts
```

### Dynamic Navigation

The navigation system supports:
- Conditional menu items based on theme settings
- Dynamic NEW! badges based on post age
- Automatic sitemap updates
- Smart post ordering

---

*Navigation best viewed at 800x600 resolution in Netscape Navigator 4.0!*