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
      
      // Build navigation data
      this.navigation = this.buildNavigation(pages, posts);
      
      // Generate home page
      await this.generateHomePage(posts, pages, this.navigation);
      
      // Generate sitemap
      await this.generateSitemap(posts, pages);
      
      // Copy static assets
      await this.copyAssets();
      
      // Copy theme CSS and assets
      await this.copyThemeAssets();
      
      console.log('Build completed successfully!');
      
      return { posts, pages, navigation };
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
      themeConfig: this.themeConfig,
      navigation: this.navigation || {}
    });
    
    // Render with base layout
    const layout = await fs.readFile(layoutPath, 'utf-8');
    const finalHtml = ejs.render(layout, {
      page: { ...pageData, content: renderedContent },
      site: this.config,
      theme: this.themeOptions,
      themeConfig: this.themeConfig,
      navigation: this.navigation || {},
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
    
    // Copy JavaScript
    const jsSource = path.join(themePath, 'js');
    const jsTarget = path.join(this.config.outputDir, 'js');
    
    if (await fs.pathExists(jsSource)) {
      await fs.copy(jsSource, jsTarget);
      console.log('Copied theme JavaScript');
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

  buildNavigation(pages, posts) {
    console.log('Building navigation structure...');
    
    // Sort posts by date (newest first)
    const sortedPosts = [...posts].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    // Check for new posts (less than 7 days old)
    const now = new Date();
    const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    
    sortedPosts.forEach(post => {
      post.isNew = new Date(post.date) > sevenDaysAgo;
    });
    
    // Build navigation structure
    const navigation = {
      pages: pages.map(page => ({
        title: page.title,
        url: page.outputPath.replace(this.config.outputDir, ''),
        order: page.navOrder || 999
      })).sort((a, b) => a.order - b.order),
      
      recentPosts: sortedPosts.slice(0, 5).map(post => ({
        title: post.title,
        url: post.outputPath.replace(this.config.outputDir, ''),
        date: post.date,
        isNew: post.isNew
      })),
      
      allPosts: sortedPosts
    };
    
    // Add previous/next navigation for posts
    sortedPosts.forEach((post, index) => {
      post.prevPost = index < sortedPosts.length - 1 ? {
        title: sortedPosts[index + 1].title,
        url: sortedPosts[index + 1].outputPath.replace(this.config.outputDir, '')
      } : null;
      
      post.nextPost = index > 0 ? {
        title: sortedPosts[index - 1].title,
        url: sortedPosts[index - 1].outputPath.replace(this.config.outputDir, '')
      } : null;
    });
    
    return navigation;
  }

  async generateHomePage(posts, pages, navigation) {
    console.log('Generating home page...');
    
    const homeTemplate = path.join(
      this.config.themesDir,
      this.config.theme,
      'templates',
      'home.ejs'
    );
    
    // Check if home template exists
    if (!await fs.pathExists(homeTemplate)) {
      console.log('No home template found, skipping home page generation');
      return;
    }
    
    const homeData = {
      title: 'Welcome to ' + this.config.siteTitle,
      description: this.config.siteDescription,
      navigation: navigation,
      recentPosts: navigation.recentPosts,
      lastUpdated: new Date().toISOString(),
      visitorCount: Math.floor(Math.random() * 99999) + 10000 // Random 90s counter
    };
    
    const html = await this.renderTemplate(homeData, 'home');
    const outputPath = path.join(this.config.outputDir, 'index.html');
    
    await fs.writeFile(outputPath, html);
    console.log(`Generated home page: ${outputPath}`);
  }

  async generateSitemap(posts, pages) {
    console.log('Generating sitemap...');
    
    const sitemapData = {
      title: 'Sitemap - ' + this.config.siteTitle,
      pages: pages.map(page => ({
        title: page.title,
        url: page.outputPath.replace(this.config.outputDir, ''),
        date: page.date
      })),
      posts: posts.sort((a, b) => new Date(b.date) - new Date(a.date)).map(post => ({
        title: post.title,
        url: post.outputPath.replace(this.config.outputDir, ''),
        date: post.date
      }))
    };
    
    const sitemapTemplate = path.join(
      this.config.themesDir,
      this.config.theme,
      'templates',
      'sitemap.ejs'
    );
    
    // Use default sitemap if template doesn't exist
    let html;
    if (await fs.pathExists(sitemapTemplate)) {
      html = await this.renderTemplate(sitemapData, 'sitemap');
    } else {
      // Generate basic sitemap
      html = await this.generateBasicSitemap(sitemapData);
    }
    
    const outputPath = path.join(this.config.outputDir, 'sitemap.html');
    await fs.writeFile(outputPath, html);
    console.log(`Generated sitemap: ${outputPath}`);
  }

  async generateBasicSitemap(data) {
    const layout = `<!DOCTYPE HTML>
<html>
<head>
  <title>${data.title}</title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <h1>Site Map</h1>
  <hr>
  <h2>Pages</h2>
  <ul>
    ${data.pages.map(page => `<li><a href="${page.url}">${page.title}</a></li>`).join('\n    ')}
  </ul>
  <h2>Posts</h2>
  <ul>
    ${data.posts.map(post => `<li><a href="${post.url}">${post.title}</a> - ${post.date}</li>`).join('\n    ')}
  </ul>
  <hr>
  <a href="/">Back to Home</a>
</body>
</html>`;
    return layout;
  }
}

module.exports = Generator;