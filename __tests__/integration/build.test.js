// ABOUTME: Integration tests for the build process
// ABOUTME: Tests full build workflow with real files and templates

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const Generator = require('../../src/generator');

describe('Build Integration Tests', () => {
  const testDir = path.join(__dirname, '..', 'test-site');
  const contentDir = path.join(testDir, 'content');
  const outputDir = path.join(testDir, 'output');
  const themesDir = path.join(testDir, 'themes');
  
  beforeEach(async () => {
    // Clean up and create test directories
    await fs.remove(testDir);
    await fs.ensureDir(path.join(contentDir, 'posts'));
    await fs.ensureDir(path.join(contentDir, 'pages'));
    await fs.ensureDir(path.join(contentDir, 'assets', 'images'));
    await fs.ensureDir(path.join(themesDir, 'default', 'layouts'));
    await fs.ensureDir(path.join(themesDir, 'default', 'templates'));
    await fs.ensureDir(path.join(themesDir, 'default', 'css'));
  });

  afterEach(async () => {
    await fs.remove(testDir);
  });

  describe('Full build process', () => {
    beforeEach(async () => {
      // Create test content
      await fs.writeFile(
        path.join(contentDir, 'posts', 'hello-world.md'),
        `---
title: Hello World
date: 1997-03-15
author: CyberDude
tags: [welcome, first-post]
---

# Welcome to my site!

This is my **first post** on the World Wide Web.

- Item 1
- Item 2
- Item 3

\`\`\`javascript
console.log('Hello, 90s!');
\`\`\`
`
      );

      await fs.writeFile(
        path.join(contentDir, 'pages', 'about.md'),
        `---
title: About Me
---

## About This Site

Welcome to my personal homepage on the information superhighway!

> "The future is now!" - Anonymous, 1997
`
      );

      // Create minimal templates
      await fs.writeFile(
        path.join(themesDir, 'default', 'layouts', 'base.ejs'),
        `<!DOCTYPE HTML>
<html>
<head>
  <title><%= page.title %> - <%= site.siteTitle %></title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <h1><%= site.siteTitle %></h1>
  <%- content %>
</body>
</html>`
      );

      await fs.writeFile(
        path.join(themesDir, 'default', 'templates', 'post.ejs'),
        `<article>
  <h2><%= page.title %></h2>
  <p>By <%= page.author %> on <%= page.date %></p>
  <%- page.content %>
</article>`
      );

      await fs.writeFile(
        path.join(themesDir, 'default', 'css', 'style.css'),
        `body { background: silver; font-family: "Times New Roman"; }`
      );

      // Create test asset
      await fs.writeFile(
        path.join(contentDir, 'assets', 'images', 'test.gif'),
        'GIF89a'
      );
    });

    it('should build site with posts and pages', async () => {
      const generator = new Generator({
        contentDir,
        outputDir,
        themesDir,
        siteTitle: 'Test 90s Site'
      });

      const result = await generator.build();

      // Check build results
      expect(result.posts).toHaveLength(1);
      expect(result.pages).toHaveLength(1);
      expect(result.posts[0].title).toBe('Hello World');
      expect(result.pages[0].title).toBe('About Me');

      // Check output files exist
      expect(await fs.pathExists(path.join(outputDir, 'posts', 'hello-world.html'))).toBe(true);
      expect(await fs.pathExists(path.join(outputDir, 'pages', 'about.html'))).toBe(true);
      expect(await fs.pathExists(path.join(outputDir, 'css', 'style.css'))).toBe(true);
      expect(await fs.pathExists(path.join(outputDir, 'assets', 'images', 'test.gif'))).toBe(true);
    });

    it('should generate valid HTML output', async () => {
      const generator = new Generator({
        contentDir,
        outputDir,
        themesDir,
        siteTitle: 'Test 90s Site'
      });

      await generator.build();

      const postHtml = await fs.readFile(
        path.join(outputDir, 'posts', 'hello-world.html'),
        'utf-8'
      );

      // Check HTML structure
      expect(postHtml).toContain('<!DOCTYPE HTML>');
      expect(postHtml).toContain('<title>Hello World - Test 90s Site</title>');
      expect(postHtml).toContain('<h1>Test 90s Site</h1>');
      expect(postHtml).toContain('<h2>Hello World</h2>');
      expect(postHtml).toContain('By CyberDude on');
      expect(postHtml).toContain('Welcome to my site!');
      expect(postHtml).toContain('<strong>first post</strong>');
      expect(postHtml).toContain('<code>console.log(\'Hello, 90s!\');</code>');
    });

    it('should handle missing directories gracefully', async () => {
      // Remove posts directory
      await fs.remove(path.join(contentDir, 'posts'));

      const generator = new Generator({
        contentDir,
        outputDir,
        themesDir,
        siteTitle: 'Test 90s Site'
      });

      const result = await generator.build();

      expect(result.posts).toHaveLength(0);
      expect(result.pages).toHaveLength(1);
    });

    it('should preserve directory structure', async () => {
      // Create nested content
      await fs.ensureDir(path.join(contentDir, 'posts', 'tutorials'));
      await fs.writeFile(
        path.join(contentDir, 'posts', 'tutorials', 'html-basics.md'),
        `---
title: HTML Basics
---

Learn HTML!`
      );

      const generator = new Generator({
        contentDir,
        outputDir,
        themesDir,
        siteTitle: 'Test 90s Site'
      });

      await generator.build();

      expect(await fs.pathExists(
        path.join(outputDir, 'posts', 'tutorials', 'html-basics.html')
      )).toBe(true);
    });
  });

  describe('CLI build command', () => {
    it('should execute build command successfully', async () => {
      // Create minimal content for CLI test
      await fs.writeFile(
        path.join(contentDir, 'posts', 'test.md'),
        '---\ntitle: Test\n---\nTest content'
      );

      // Copy themes from project root to test directory
      const projectThemesDir = path.join(__dirname, '..', '..', 'themes');
      if (await fs.pathExists(projectThemesDir)) {
        await fs.copy(projectThemesDir, themesDir);
      }

      // Run build command from test directory
      const binPath = path.join(__dirname, '..', '..', 'bin', 'retro-ssg.js');
      const output = execSync(`node ${binPath} build`, {
        cwd: testDir,
        encoding: 'utf-8'
      });

      expect(output).toContain('Building your radical 90s website');
      expect(output).toContain('Build complete!');
      expect(await fs.pathExists(path.join(outputDir, 'posts', 'test.html'))).toBe(true);
    });
  });
});