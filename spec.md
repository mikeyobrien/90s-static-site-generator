# 90s Static Site Generator Specification

## Overview
A minimalist static site generator that converts Markdown files to HTML with a 90s web aesthetic, using a Hugo-like command interface.

## Core Features

### Command Interface (Hugo-style)
- `new site <name>` - Create a new site with basic structure
- `new <filename.md>` - Create a new markdown file in content directory  
- `server` - Start development server with live reload
- `build` - Build static site to public directory

### Project Structure
```
my-site/
├── content/          # Markdown files go here
├── public/           # Generated HTML output
├── themes/           # Theme directory
│   └── retro90s/    # Default 90s theme
└── config.yml       # Site configuration
```

### Build Process
- Flat structure: Each .md file in `content/` becomes an .html file in `public/`
- Auto-generated index.html listing all posts (sorted by date)
- Apply selected theme to all pages
- Copy static assets from theme to public directory

### Configuration (config.yml)
```yaml
title: "My Rad 90s Site"
author: "Webmaster"
theme: "retro90s"
```

### Markdown Support
- Full CommonMark specification support
- Syntax highlighting for code blocks
- Tables, lists, blockquotes
- Image embedding
- Front matter for metadata (title, date, etc.)

### 90s Theme Elements (Basic)
- Tiled starfield or geometric background
- "Under Construction" GIF on index page
- Centered content with max-width
- Times New Roman or Comic Sans fonts
- Classic blue/purple visited link colors
- Simple CSS with inline styles where "authentic"
- Compatible with modern browsers but looks period-appropriate

### Output Structure
- Each page wrapped in theme template
- Minimal JavaScript (only for essential features)
- Static HTML/CSS output
- No build dependencies in final output

## Technical Implementation

### Technology Stack
- Language: Python or JavaScript/Node.js
- Markdown Parser: markdown-it or Python-Markdown
- Template Engine: Simple string templating
- Dev Server: Built-in HTTP server with file watching

### MVP Deliverables
1. CLI tool with basic commands
2. Default 90s theme  
3. Markdown to HTML conversion
4. Index page generation
5. Development server
6. Basic documentation

## Future Enhancements (Post-MVP)
- Multiple theme support
- RSS feed generation
- Customizable navigation
- Tag/category support
- More 90s features (visitor counter, guestbook, etc.)