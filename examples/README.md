# Example Sites

This directory contains example sites demonstrating different themes available in Retro-SSG.

## Available Examples

### 1. Default Theme (`default-theme/`)
A full 90s experience with animated GIFs, bright colors, and nostalgic elements.

### 2. Minimal 90s Theme (`minimal-90s-theme/`)
A clean, blog-focused theme with authentic 90s styling but without distracting elements. Features dark mode support.

## Building the Examples

### Prerequisites
1. Make sure you're in the root directory of the project
2. Install dependencies if you haven't already:
   ```bash
   npm install
   ```

### Building an Example Site

1. Navigate to the example directory:
   ```bash
   cd examples/default-theme
   # or
   cd examples/minimal-90s-theme
   ```

2. Create a symbolic link to the themes directory (required for the build to find themes):
   ```bash
   ln -s ../../themes themes
   ```

3. Build the site:
   ```bash
   ../../bin/retro-ssg.js build
   ```

4. The generated site will be in the `output` directory

### Viewing the Built Site

After building, you can view the site using any HTTP server:

```bash
# Using Python 3
python3 -m http.server 8000 --directory output

# Using Node.js
npx http-server output -p 8000

# Using PHP
php -S localhost:8000 -t output
```

Then open http://localhost:8000 in your browser.

## Example Content Structure

Each example includes:
- `config.yml` - Site configuration (Note: not yet used by build command)
- `content/posts/` - Blog posts in Markdown
- `content/pages/` - Static pages in Markdown
- `content/assets/` - Images and other static files (if any)
- `output/` - Generated HTML files (created after building)

## Configuration

Each example includes a `config.yml` file that specifies:
- `title` - Site title
- `author` - Site author
- `description` - Site description
- `tagline` - Site tagline (optional)
- `theme` - Theme to use (default or minimal-90s)
- `outputDir` - Output directory (defaults to 'output')

The build command reads these configuration files automatically.

## Features Demonstrated

### Default Theme Example
- Animated GIF backgrounds
- Bright 90s color schemes
- "Under Construction" badges
- Webring-style navigation
- Classic 90s web elements

### Minimal 90s Theme Example
- Clean, readable blog layout
- Dark mode toggle with cookie persistence
- Table-based layouts (authentic to the era)
- Simple navigation
- Focus on content over effects

## Contributing

When adding new themes:
1. Create a new example directory with appropriate content
2. Include a variety of content types (posts, pages) to showcase the theme
3. Update this README with build instructions
4. Test the build process before committing