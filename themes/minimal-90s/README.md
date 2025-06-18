# Minimal 90s Blog Theme

A clean, minimalist blog theme for the 90s Static Site Generator that captures authentic 90s web design aesthetics without the distracting elements.

## Features

- **Clean, Single-Column Layout**: Focus on readability with a simple blog layout
- **Dark Mode Support**: Toggle between light and dark themes with persistent preference
- **Authentic 90s HTML**: Table-based layout using period-appropriate HTML practices
- **No Distractions**: No animated GIFs, marquees, or flashing elements
- **Professional Typography**: Times New Roman for body text, Arial for headers
- **Simple Navigation**: Clean post navigation with Previous | Home | Next links

## Color Schemes

### Light Mode (Default)
- Background: #F5F5F5
- Text: #333333
- Links: Blue (#0000EE) / Purple (#551A8B)
- Borders: #CCCCCC

### Dark Mode
- Background: #1A1A1A
- Text: #E0E0E0
- Links: Cyan (#00CCFF) / Light Purple (#CC99FF)
- Borders: #444444

## Templates

- `index.html` - Main blog listing page
- `post.html` - Individual blog post template
- `page.html` - Static page template
- `archive.html` - Chronological post archive

## Usage

To use this theme in your site configuration:

```yaml
theme: minimal-90s
```

Or in your config.json:

```json
{
  "theme": "minimal-90s"
}
```

## Customization

You can customize the theme by:
1. Modifying the CSS variables in `assets/css/minimal-90s.css`
2. Editing the templates to adjust layout
3. Adding your own subtle background pattern

## Browser Compatibility

This theme uses authentic 90s HTML practices for maximum compatibility:
- HTML 4.01 Transitional
- Table-based layout
- No modern CSS features
- JavaScript used only for dark mode toggle

Perfect for personal blogs, journals, and minimalist websites that want to capture the 90s web aesthetic without overwhelming visitors.