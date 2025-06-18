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

### Create a New Site
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
- Process all Markdown files in `content/posts/` and `content/pages/`
- Parse YAML front matter for metadata
- Convert Markdown to HTML
- Apply the retro 90s theme
- Copy static assets from `content/assets/`

### Start Development Server
```bash
retro-ssg server
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

### Current Status: Step 4 - Site Navigation and Home Page ✅

- [x] Basic CLI structure
- [x] Command routing (new, build, server)
- [x] Help system
- [x] Markdown to HTML conversion
- [x] Front matter parsing (YAML)
- [x] EJS template system with partials
- [x] Comprehensive 90s CSS styling
- [x] Multiple theme variants
- [x] 90s visual effects and components
- [x] Asset library with GIFs and patterns
- [x] Theme configuration system
- [x] Automatic navigation generation
- [x] Home page with recent posts
- [x] Sitemap generation
- [x] JavaScript 90s effects
- [ ] Hit counter and guestbook (Step 5)
- [ ] WebRing integration (Step 6)
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
│   └── default/         # Default 90s theme
│       ├── layouts/     # Base templates
│       ├── templates/   # Page-specific templates
│       └── css/         # Stylesheets
└── config.yml          # Site configuration (coming soon)
```

## 🌟 Features

### Currently Implemented (Step 2-4)
- **Markdown Processing** - Full CommonMark support with code highlighting
- **Front Matter** - YAML metadata for posts and pages
- **EJS Templates** - Flexible templating with layouts and partials
- **90s Styling** - Authentic retro CSS with table layouts
- **Theme System** - Multiple theme variants (Personal, Corporate, Hacker)
- **90s Components** - Marquees, counters, webrings, badges, and more!
- **Visual Effects** - Blink text, rainbow gradients, glow effects
- **Asset Library** - Pre-built GIFs and patterns for authentic 90s look
- **Navigation System** - Auto-generated menus, breadcrumbs, and post navigation
- **Home Page Generation** - Classic 90s homepage with recent posts and features
- **Sitemap Generation** - Automatic HTML sitemap creation
- **JavaScript Effects** - Status bar scrolling, random pages, and more
- **Asset Management** - Automatic copying of images and files
- **Debug Logging** - Detailed build output for troubleshooting

See documentation:
- [THEMING.md](docs/THEMING.md) - Theme customization guide
- [NAVIGATION.md](docs/NAVIGATION.md) - Navigation system guide

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) (coming soon) for details.

## 📜 License

MIT License - Feel free to use this for your own radical 90s websites!

## 🏄 Get Ready to Surf!

Remember when the web was fun? We're bringing that back, one static site at a time!

---

*Best viewed in Netscape Navigator 4.0 or higher* 😉