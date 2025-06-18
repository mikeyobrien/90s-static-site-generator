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
retro-ssg build
```

### Start Development Server
```bash
retro-ssg server
```

## 🛠️ Development Status

This project is currently under active development. Check our [GitHub Issues](https://github.com/mikeyobrien/90s-static-site-generator/issues) for the implementation roadmap.

### Current Status: Step 1 - CLI Foundation ✅

- [x] Basic CLI structure
- [x] Command routing (new, build, server)
- [x] Help system
- [ ] Site creation (Step 2)
- [ ] Theme system (Step 3)
- [ ] Markdown parsing (Step 4)
- [ ] Build process (Step 5)
- [ ] And more...

## 🧪 Testing

Run the test suite to verify CLI functionality:

```bash
npm test
```

This will test all available commands and show their placeholder outputs.

## 🎨 Example Site Structure

```
my-site/
├── content/          # Your markdown files
├── public/           # Generated HTML output
├── themes/           
│   └── retro90s/    # Default 90s theme
└── config.yml       # Site configuration
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) (coming soon) for details.

## 📜 License

MIT License - Feel free to use this for your own radical 90s websites!

## 🏄 Get Ready to Surf!

Remember when the web was fun? We're bringing that back, one static site at a time!

---

*Best viewed in Netscape Navigator 4.0 or higher* 😉