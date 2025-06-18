// ABOUTME: Core static site generator module that processes markdown files
// ABOUTME: and generates HTML output using EJS templates

const fs = require('fs-extra');
const path = require('path');
const MarkdownIt = require('markdown-it');
const matter = require('gray-matter');
const ejs = require('ejs');

class Generator {
  constructor(config = {}) {
    this.config = {
      contentDir: config.contentDir || 'content',
      outputDir: config.outputDir || 'output',
      themesDir: config.themesDir || 'themes',
      theme: config.theme || 'default',
      siteTitle: config.siteTitle || 'My 90s Website',
      siteDescription: config.siteDescription || 'Welcome to the World Wide Web!',
      baseUrl: config.baseUrl || '',
      ...config
    };
    
    this.md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true
    });
    
    console.log('Generator initialized with config:', this.config);
  }

  async build() {
    console.log('Starting site build...');
    
    try {
      // Clean output directory
      await fs.emptyDir(this.config.outputDir);
      console.log(`Cleaned output directory: ${this.config.outputDir}`);
      
      // Process markdown files
      const posts = await this.processDirectory(path.join(this.config.contentDir, 'posts'), 'post');
      const pages = await this.processDirectory(path.join(this.config.contentDir, 'pages'), 'page');
      
      console.log(`Processed ${posts.length} posts and ${pages.length} pages`);
      
      // Copy static assets
      await this.copyAssets();
      
      // Copy theme CSS
      await this.copyThemeAssets();
      
      console.log('Build completed successfully!');
      
      return { posts, pages };
    } catch (error) {
      console.error('Build failed:', error);
      throw error;
    }
  }

  async processDirectory(dirPath, type) {
    const files = [];
    
    if (!await fs.pathExists(dirPath)) {
      console.log(`Directory ${dirPath} does not exist, skipping...`);
      return files;
    }
    
    const entries = await fs.readdir(dirPath);
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry);
      const stat = await fs.stat(fullPath);
      
      if (stat.isFile() && entry.endsWith('.md')) {
        console.log(`Processing ${type}: ${entry}`);
        const result = await this.processMarkdownFile(fullPath, type);
        files.push(result);
      }
    }
    
    return files;
  }

  async processMarkdownFile(filePath, type) {
    // Read and parse markdown file
    const content = await fs.readFile(filePath, 'utf-8');
    const { data: frontMatter, content: markdown } = matter(content);
    
    // Convert markdown to HTML
    const html = this.md.render(markdown);
    
    // Prepare page data
    const pageData = {
      title: frontMatter.title || 'Untitled',
      date: frontMatter.date || new Date().toISOString().split('T')[0],
      author: frontMatter.author || 'Anonymous',
      tags: frontMatter.tags || [],
      content: html,
      type: type,
      ...frontMatter
    };
    
    // Generate output path
    const relativePath = path.relative(this.config.contentDir, filePath);
    const outputPath = path.join(
      this.config.outputDir,
      relativePath.replace('.md', '.html')
    );
    
    // Render with template
    const renderedHtml = await this.renderTemplate(pageData, type);
    
    // Write output file
    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, renderedHtml);
    
    console.log(`Generated: ${outputPath}`);
    
    return {
      ...pageData,
      inputPath: filePath,
      outputPath: outputPath
    };
  }

  async renderTemplate(pageData, type) {
    const layoutPath = path.join(
      this.config.themesDir,
      this.config.theme,
      'layouts',
      'base.ejs'
    );
    
    const templatePath = path.join(
      this.config.themesDir,
      this.config.theme,
      'templates',
      `${type}.ejs`
    );
    
    // Check if specific template exists, otherwise use default
    const hasSpecificTemplate = await fs.pathExists(templatePath);
    const contentTemplate = hasSpecificTemplate ? 
      await fs.readFile(templatePath, 'utf-8') : 
      '<%- page.content %>';
    
    // Prepare template data
    const site = {
      title: this.config.siteTitle,
      description: this.config.siteDescription,
      author: this.config.siteAuthor,
      tagline: this.config.siteTagline,
      baseUrl: this.config.baseUrl
    };
    
    const templateData = {
      // Direct properties for minimal-90s theme
      ...pageData,
      site,
      // Page object for default theme
      page: pageData
    };
    
    // Render content with specific template
    const renderedContent = ejs.render(contentTemplate, templateData);
    
    // Render with base layout
    const layout = await fs.readFile(layoutPath, 'utf-8');
    const finalHtml = ejs.render(layout, {
      ...templateData,
      body: renderedContent,
      content: renderedContent // For compatibility
    });
    
    return finalHtml;
  }

  async copyAssets() {
    const assetsSource = path.join(this.config.contentDir, 'assets');
    const assetsTarget = path.join(this.config.outputDir, 'assets');
    
    if (await fs.pathExists(assetsSource)) {
      await fs.copy(assetsSource, assetsTarget);
      console.log('Copied content assets');
    }
  }

  async copyThemeAssets() {
    const themeAssetsSource = path.join(
      this.config.themesDir,
      this.config.theme,
      'css'
    );
    const themeAssetsTarget = path.join(this.config.outputDir, 'css');
    
    if (await fs.pathExists(themeAssetsSource)) {
      await fs.copy(themeAssetsSource, themeAssetsTarget);
      console.log('Copied theme CSS');
    }
  }
}

module.exports = Generator;