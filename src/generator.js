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
      themeVariant: config.themeVariant || 'personal',
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
    
    this.themeConfig = null;
    this.themeOptions = {};
    
    console.log('Generator initialized with config:', this.config);
  }

  async build() {
    console.log('Starting site build...');
    
    try {
      // Load theme configuration
      await this.loadThemeConfig();
      
      // Clean output directory
      await fs.emptyDir(this.config.outputDir);
      console.log(`Cleaned output directory: ${this.config.outputDir}`);
      
      // Process markdown files
      const posts = await this.processDirectory(path.join(this.config.contentDir, 'posts'), 'post');
      const pages = await this.processDirectory(path.join(this.config.contentDir, 'pages'), 'page');
      
      console.log(`Processed ${posts.length} posts and ${pages.length} pages`);
      
      // Copy static assets
      await this.copyAssets();
      
      // Copy theme CSS and assets
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
    
    // Render content with specific template
    const renderedContent = ejs.render(contentTemplate, {
      page: pageData,
      site: this.config,
      theme: this.themeOptions,
      themeConfig: this.themeConfig
    });
    
    // Render with base layout
    const layout = await fs.readFile(layoutPath, 'utf-8');
    const finalHtml = ejs.render(layout, {
      page: { ...pageData, content: renderedContent },
      site: this.config,
      theme: this.themeOptions,
      themeConfig: this.themeConfig,
      content: renderedContent
    }, {
      filename: layoutPath,
      root: path.join(this.config.themesDir, this.config.theme)
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
    const themePath = path.join(this.config.themesDir, this.config.theme);
    
    // Copy CSS
    const cssSource = path.join(themePath, 'css');
    const cssTarget = path.join(this.config.outputDir, 'css');
    
    if (await fs.pathExists(cssSource)) {
      await fs.copy(cssSource, cssTarget);
      console.log('Copied theme CSS');
    }
    
    // Copy theme images
    const imagesSource = path.join(themePath, 'images');
    const imagesTarget = path.join(this.config.outputDir, 'images');
    
    if (await fs.pathExists(imagesSource)) {
      await fs.copy(imagesSource, imagesTarget);
      console.log('Copied theme images');
    }
  }

  async loadThemeConfig() {
    const themeConfigPath = path.join(
      this.config.themesDir,
      this.config.theme,
      'theme.json'
    );
    
    if (await fs.pathExists(themeConfigPath)) {
      this.themeConfig = await fs.readJson(themeConfigPath);
      console.log(`Loaded theme config for '${this.themeConfig.displayName}'`);
      
      // Apply variant if specified
      if (this.config.themeVariant && this.themeConfig.variants[this.config.themeVariant]) {
        const variant = this.themeConfig.variants[this.config.themeVariant];
        this.config.bodyClass = variant.bodyClass;
        this.config.themeBackground = variant.background;
        console.log(`Applied theme variant: ${variant.name}`);
      }
      
      // Merge theme options with config
      this.themeOptions = this.mergeThemeOptions();
    }
  }

  mergeThemeOptions() {
    const options = {};
    
    if (this.themeConfig && this.themeConfig.options) {
      // Set defaults from theme config
      Object.keys(this.themeConfig.options).forEach(category => {
        options[category] = {};
        Object.keys(this.themeConfig.options[category]).forEach(key => {
          const option = this.themeConfig.options[category][key];
          options[category][key] = this.config[`theme_${category}_${key}`] !== undefined
            ? this.config[`theme_${category}_${key}`]
            : option.default;
        });
      });
    }
    
    return options;
  }
}

module.exports = Generator;