# 🎨 90s Theme System Documentation

Welcome to the radical world of 90s web theming! This guide will help you customize your retro website with authentic 90s design elements.

## 📺 Theme Variants

The default theme includes three pre-configured variants:

### Personal Homepage 🏠
```javascript
{
  themeVariant: 'personal'
}
```
- Comic Sans font family
- Starry background pattern
- Bright, fun colors
- Maximum personality!

### Corporate 💼
```javascript
{
  themeVariant: 'corporate'
}
```
- Arial font family
- Clean white background
- Professional blue headers
- Business-ready styling

### 1337 H4x0r 💻
```javascript
{
  themeVariant: 'hacker'
}
```
- Courier New (monospace)
- Black background
- Matrix-green text
- Glow effects

## 🎛️ Theme Options

Customize your 90s experience with these options:

### Effects
```javascript
{
  theme_effects_blink: true,      // Enable blinking text
  theme_effects_marquee: true,    // Scrolling announcements
  theme_effects_rainbow: false,   // Rainbow gradient text
  theme_effects_flames: true      // Animated flame dividers
}
```

### Layout
```javascript
{
  theme_layout_width: "800",      // Fixed width (640, 800, 1024)
  theme_layout_frames: false,     // Classic frames layout
  theme_layout_tables: true       // Table-based layouts
}
```

### Components
```javascript
{
  theme_components_counter: true,      // Hit counter display
  theme_components_guestbook: true,    // Guestbook link
  theme_components_webring: false,     // Webring navigation
  theme_components_construction: false,// Under construction banner
  theme_components_badges: true        // Browser compatibility badges
}
```

### Colors
```javascript
{
  theme_colors_background: "#C0C0C0",  // Classic gray
  theme_colors_text: "#000000",        // Black text
  theme_colors_link: "#0000FF",        // Blue links
  theme_colors_visited: "#800080"      // Purple visited links
}
```

## 🖼️ Available Assets

### Backgrounds
- `stars.gif` - Animated starfield
- `grid.gif` - Classic grid pattern
- More patterns in `/themes/default/images/backgrounds/`

### Animations
- `under-construction.gif` - Construction worker
- `email.gif` - Spinning envelope
- `globe.gif` - Rotating Earth

### Badges
- `new.gif` - NEW! indicator
- `netscape.gif` - Best viewed with Netscape
- `800x600.gif` - Resolution badge

### Dividers
- `flame.gif` - Animated flames
- `rainbow.gif` - Rainbow bar

## 📝 Using Components in Templates

### Marquee
```ejs
<%- include('partials/marquee', { 
  text: 'Welcome to my awesome site!' 
}) %>
```

### Under Construction
```ejs
<%- include('partials/under-construction') %>
```

### Hit Counter
```ejs
<%- include('partials/counter', { 
  count: 31337 
}) %>
```

### Webring
```ejs
<%- include('partials/webring', { 
  ringName: '90s Web Enthusiasts',
  prevUrl: 'http://prev-site.com',
  nextUrl: 'http://next-site.com',
  randomUrl: 'http://random.com',
  listUrl: 'http://list.com'
}) %>
```

### Email Link
```ejs
<%- include('partials/email-link', { 
  email: 'webmaster@example.com',
  text: 'Email me!' 
}) %>
```

### Browser Badges
```ejs
<%- include('partials/badges', { 
  badges: {
    netscape: true,
    ie: false,
    resolution: '800x600',
    html: true
  }
}) %>
```

## 🚀 Creating Custom Themes

1. Copy the `themes/default` directory
2. Modify `theme.json` with your settings
3. Update CSS files and assets
4. Reference your theme in the generator config

Example theme.json structure:
```json
{
  "name": "my-theme",
  "displayName": "My Radical Theme",
  "variants": {
    "custom": {
      "name": "Custom Style",
      "bodyClass": "theme-custom",
      "background": "pattern"
    }
  },
  "options": {
    // Your default options
  }
}
```

## 🎨 CSS Classes

### Text Effects
- `.text-rainbow` - Rainbow gradient
- `.text-shadow` - Drop shadow
- `.text-glow` - Neon glow
- `.text-bevel` - 3D beveled text
- `.blink` - Blinking animation

### Backgrounds
- `.bg-stars` - Starfield pattern
- `.bg-grid` - Grid pattern
- `.bg-gradient-cyber` - Blue gradient
- `.bg-gradient-sunset` - Pink/orange gradient

### Layout Helpers
- `.container-800` - Fixed 800px width
- `.center-table` - Centered table
- `.spacer-10/20/50` - Spacer elements

### Special Effects
- `.marquee` - Scrolling text container
- `.spin` - Rotating animation
- `.pulse-glow` - Pulsing glow effect
- `.matrix-text` - Matrix-style terminal text

## 🌈 Web-Safe Color Reference

Use these classic web-safe colors:
- `#000000` - Black
- `#FFFFFF` - White
- `#C0C0C0` - Silver (Windows gray)
- `#808080` - Gray
- `#FF0000` - Red
- `#00FF00` - Lime (Matrix green)
- `#0000FF` - Blue
- `#FFFF00` - Yellow
- `#FF00FF` - Fuchsia (Hot pink)
- `#00FFFF` - Aqua (Cyan)
- `#800080` - Purple
- `#000080` - Navy

## 📼 Tips for Authentic 90s Design

1. **Use table layouts** - Divs are for modern sites!
2. **Fixed widths** - 800x600 was the standard
3. **Animated GIFs** - The more, the better
4. **Visitor counters** - Everyone needs to know
5. **"Under Construction"** - Always improving
6. **Email links** - With animated envelopes
7. **Guestbooks** - Social media of the 90s
8. **Webrings** - Community connections
9. **MIDI music** - (Coming in Step 7!)
10. **Comic Sans** - Unironically

Remember: In the 90s, more is more! Don't be afraid to use ALL the effects! 🎉

---

*This documentation best viewed in Netscape Navigator 4.0 at 800x600 resolution*