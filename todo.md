# 90s Static Site Generator - Implementation Todo

## Project Status
- **Current Step**: Not started
- **Repository**: https://github.com/mikeyobrien/90s-static-site-generator
- **Technology**: Node.js/JavaScript

## Implementation Steps

### ✅ Planning Phase
- [x] Create project specification (spec.md)
- [x] Create implementation plan (plan.md)
- [x] Create GitHub repository
- [x] Create GitHub issues for all steps

### 📋 Development Phase

#### Step 1: Project Setup and Basic CLI Structure
- [ ] Initialize package.json
- [ ] Create CLI script with basic commands
- [ ] Add help message
- [ ] Make CLI executable
- [ ] Test basic command routing
- **Issue**: [#1](https://github.com/mikeyobrien/90s-static-site-generator/issues/1)
- **Status**: Not started

#### Step 2: Implement "new site" Command
- [ ] Parse site name from arguments
- [ ] Create directory structure
- [ ] Generate default config.yml
- [ ] Add error handling
- [ ] Show success message
- **Issue**: [#2](https://github.com/mikeyobrien/90s-static-site-generator/issues/2)
- **Status**: Not started

#### Step 3: Create Basic 90s Theme Structure
- [ ] Create theme templates (page.html, index.html)
- [ ] Add 90s-style CSS
- [ ] Include background images
- [ ] Document template variables
- **Issue**: [#3](https://github.com/mikeyobrien/90s-static-site-generator/issues/3)
- **Status**: Not started

#### Step 4: Implement Markdown Parser
- [ ] Install markdown-it dependency
- [ ] Create parser module
- [ ] Add front matter support
- [ ] Configure syntax highlighting
- [ ] Add error handling
- **Issue**: [#4](https://github.com/mikeyobrien/90s-static-site-generator/issues/4)
- **Status**: Not started

#### Step 5: Implement Basic Build Command
- [ ] Read markdown files from content/
- [ ] Parse with markdown module
- [ ] Apply theme templates
- [ ] Copy static assets
- [ ] Show build progress
- **Issue**: [#5](https://github.com/mikeyobrien/90s-static-site-generator/issues/5)
- **Status**: Not started

#### Step 6: Generate Index Page
- [ ] Collect post metadata
- [ ] Sort posts by date
- [ ] Generate posts list
- [ ] Apply index template
- [ ] Handle index.md specially
- **Issue**: [#6](https://github.com/mikeyobrien/90s-static-site-generator/issues/6)
- **Status**: Not started

#### Step 7: Implement Development Server
- [ ] Create HTTP server
- [ ] Add file watching
- [ ] Implement auto-rebuild
- [ ] Add live reload
- [ ] Handle errors gracefully
- **Issue**: [#7](https://github.com/mikeyobrien/90s-static-site-generator/issues/7)
- **Status**: Not started

#### Step 8: Implement "new" Command for Posts
- [ ] Parse filename argument
- [ ] Create markdown with front matter
- [ ] Support subdirectories
- [ ] Add error handling
- [ ] Optional editor integration
- **Issue**: [#8](https://github.com/mikeyobrien/90s-static-site-generator/issues/8)
- **Status**: Not started

#### Step 9: Add Theme Asset Processing
- [ ] Create theme module
- [ ] Intelligent asset copying
- [ ] Cache-busting for CSS
- [ ] Theme validation
- [ ] Partial template support
- **Issue**: [#9](https://github.com/mikeyobrien/90s-static-site-generator/issues/9)
- **Status**: Not started

#### Step 10: Polish and Error Handling
- [ ] Add version and help flags
- [ ] Colorize output
- [ ] Enhanced error messages
- [ ] Build optimizations
- [ ] Create documentation
- **Issue**: [#10](https://github.com/mikeyobrien/90s-static-site-generator/issues/10)
- **Status**: Not started

## Notes
- Each step builds on the previous ones
- No orphaned code - everything integrates
- Test after each step to ensure functionality
- Update this file as steps are completed

## Next Action
Start with Step 1 - Project Setup and Basic CLI Structure