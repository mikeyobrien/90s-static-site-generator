# 🌐 Retro-SSG: 90s Static Site Generator

Welcome to the information superhighway! Retro-SSG is a minimalist static site generator that brings back the nostalgic charm of 90s web design while leveraging modern web technologies.

## 🚀 Features (Planned)

- **Hugo-like CLI interface** - Familiar commands for easy adoption
- **Full Markdown support** - Write content in modern Markdown
- **Authentic 90s themes** - Tiled backgrounds, "Under Construction" GIFs, and more!
- **Fast builds** - Minimal dependencies for quick generation
- **Live development server** - See changes instantly
- **No JavaScript required** - Pure HTML/CSS output for that authentic feel

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/mikeyobrien/90s-static-site-generator.git
cd 90s-static-site-generator

# Install globally (once npm packaging is ready)
npm install -g retro-ssg

# Or run locally
npm link
```

## 🎮 Usage

### Quick Start
```bash
# Create a directory for your site
mkdir my-90s-site && cd my-90s-site

# Create a config file
cat > config.yml << EOF
title: "My Awesome 90s Site"
author: "Your Name"
description: "Welcome to my corner of the web!"
theme: minimal-90s  # or 'default' for full 90s experience
EOF

# Create content directories
mkdir -p content/{posts,pages,assets}

# Create your first post
cat > content/posts/hello-world.md << EOF
---
title: Hello World!
date: 2025-01-18
---

# Welcome to my site!

This is my first post on the World Wide Web!
EOF

# Build your site
retro-ssg build

# View your site
python3 -m http.server 8000 --directory output
```

### Create a New Site (Coming Soon)
```bash
retro-ssg new my-awesome-site
cd my-awesome-site
```

### Build Your Site
```bash
# Build your site from markdown files
retro-ssg build

# Your site will be generated in the 'output' directory
```

The build command will:
- Read site configuration from `config.yml` (if present)
- Process all Markdown files in `content/posts/` and `content/pages/`
- Parse YAML front matter for metadata
- Convert Markdown to HTML
- Apply the selected theme (from config.yml or default)
- Generate an index page with recent posts
- Copy static assets from `content/assets/` and theme assets

### Start Development Server
```bash
retro-ssg server
```

## ⚙️ Configuration

Create a `config.yml` file in your site root to configure your site:

```yaml
# Site metadata
title: "My Radical 90s Website"
author: "WebMaster"
description: "Welcome to the World Wide Web!"
tagline: "Best viewed in Netscape Navigator 4.0+"

# Theme selection
theme: default  # or 'minimal-90s'

# Output directory (optional, defaults to 'output')
outputDir: output
```

## 📝 Content Structure

Create your content using Markdown with YAML front matter:

```markdown
---
title: My Awesome Post
date: 1997-03-15
author: WebMaster
tags: [web, technology, nostalgia]
---

# Welcome to my post!

This is written in **Markdown** but will be rendered with 90s style!
```

## 🛠️ Development Status

This project is currently under active development. Check our [GitHub Issues](https://github.com/mikeyobrien/90s-static-site-generator/issues) for the implementation roadmap.

### Current Status: Step 2 - Basic Static Site Generation ✅

- [x] Basic CLI structure
- [x] Command routing (new, build, server)
- [x] Help system
- [x] Markdown to HTML conversion
- [x] Front matter parsing (YAML)
- [x] EJS template system
- [x] Basic 90s theme with authentic styling
- [x] Minimal 90s blog theme with dark mode
- [x] Static asset copying
- [ ] Site creation wizard (Step 3)
- [ ] Advanced theming (Step 4)
- [ ] Navigation generation (Step 5)
- [ ] And more...

## 🧪 Testing

Run the test suite to verify CLI functionality:

```bash
npm test
```

This will test all available commands and show their placeholder outputs.

## 🎨 Site Structure

```
my-site/
├── content/              # Your content
│   ├── posts/           # Blog posts
│   │   └── *.md
│   ├── pages/           # Static pages
│   │   └── *.md
│   └── assets/          # Images, files, etc.
├── output/              # Generated HTML (created by build)
├── themes/              # Theme files
│   ├── default/         # Default 90s theme
│   │   ├── layouts/     # Base templates
│   │   ├── templates/   # Page-specific templates
│   │   └── css/         # Stylesheets
│   └── minimal-90s/     # Clean blog theme with dark mode
│       ├── layouts/     # Base templates
│       ├── templates/   # Page-specific templates
│       ├── css/         # Stylesheets
│       └── js/          # Dark mode toggle
└── config.yml          # Site configuration (coming soon)
```

## 🎨 Available Themes

### default
The full 90s experience with all the nostalgic elements:
- Animated backgrounds and GIFs
- "Under Construction" badges
- Retro color schemes
- Perfect for fun, nostalgic sites

### minimal-90s
A clean, blog-focused theme that captures 90s aesthetics without the distractions:
- Table-based layout (authentic to the era)
- Dark mode toggle with cookie persistence
- Simple navigation and typography
- No animated GIFs or flashing elements
- Perfect for personal blogs and journals

To use a theme, specify it in your config.yml:
```yaml
theme: minimal-90s
```

## 🌟 Features

### Currently Implemented (Step 2)
- **Markdown Processing** - Full CommonMark support with code highlighting
- **Front Matter** - YAML metadata for posts and pages
- **EJS Templates** - Flexible templating with layouts
- **90s Styling** - Authentic retro CSS with table layouts
- **Asset Management** - Automatic copying of images and files
- **Debug Logging** - Detailed build output for troubleshooting

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) (coming soon) for details.

## 📜 License

MIT License - Feel free to use this for your own radical 90s websites!

## 🏄 Get Ready to Surf!

Remember when the web was fun? We're bringing that back, one static site at a time!

---

*Best viewed in Netscape Navigator 4.0 or higher* 😉