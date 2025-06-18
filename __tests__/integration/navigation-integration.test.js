// ABOUTME: Integration tests for navigation and home page generation
// ABOUTME: Tests the complete navigation system with real templates

const fs = require('fs-extra');
const path = require('path');
const Generator = require('../../src/generator');

describe('Navigation Integration', () => {
  const testDir = path.join(__dirname, '..', 'test-nav-site');
  const contentDir = path.join(testDir, 'content');
  const outputDir = path.join(testDir, 'output');
  const themesDir = path.join(__dirname, '..', '..', 'themes');

  beforeEach(async () => {
    await fs.remove(testDir);
    await fs.ensureDir(path.join(contentDir, 'posts'));
    await fs.ensureDir(path.join(contentDir, 'pages'));
  });

  afterEach(async () => {
    await fs.remove(testDir);
  });

  it('should generate complete site with navigation', async () => {
    // Create test content
    const today = new Date();
    const oldDate = new Date(today - 30 * 24 * 60 * 60 * 1000);
    
    await fs.writeFile(
      path.join(contentDir, 'posts', 'new-post.md'),
      `---
title: Brand New Post
date: ${today.toISOString().split('T')[0]}
author: TestAuthor
---

This is a new post!`
    );

    await fs.writeFile(
      path.join(contentDir, 'posts', 'old-post.md'),
      `---
title: Old Post
date: ${oldDate.toISOString().split('T')[0]}
---

This is an old post.`
    );

    await fs.writeFile(
      path.join(contentDir, 'pages', 'about.md'),
      `---
title: About Us
navOrder: 1
---

About page content.`
    );

    await fs.writeFile(
      path.join(contentDir, 'pages', 'contact.md'),
      `---
title: Contact
navOrder: 2
---

Contact us!`
    );

    const generator = new Generator({
      contentDir,
      outputDir,
      themesDir,
      siteTitle: 'Navigation Test Site'
    });

    await generator.build();

    // Check home page was generated
    expect(await fs.pathExists(path.join(outputDir, 'index.html'))).toBe(true);
    
    const homeHtml = await fs.readFile(path.join(outputDir, 'index.html'), 'utf-8');
    expect(homeHtml).toContain('WELCOME TO NAVIGATION TEST SITE!');
    expect(homeHtml).toContain('Brand New Post');
    expect(homeHtml).toContain('new.gif'); // NEW badge
    
    // Check sitemap was generated
    expect(await fs.pathExists(path.join(outputDir, 'sitemap.html'))).toBe(true);
    
    const sitemapHtml = await fs.readFile(path.join(outputDir, 'sitemap.html'), 'utf-8');
    expect(sitemapHtml).toContain('SITE MAP');
    expect(sitemapHtml).toContain('About Us');
    expect(sitemapHtml).toContain('Contact');
    expect(sitemapHtml).toContain('Brand New Post');
    expect(sitemapHtml).toContain('Old Post');
    
    // Check navigation appears in regular pages
    const aboutHtml = await fs.readFile(path.join(outputDir, 'pages', 'about.html'), 'utf-8');
    expect(aboutHtml).toContain('navigation-horizontal'); // Navigation partial included
    
    // Check post navigation
    const newPostHtml = await fs.readFile(path.join(outputDir, 'posts', 'new-post.html'), 'utf-8');
    expect(newPostHtml).toContain('post-navigation'); // Post navigation partial
    expect(newPostHtml).toContain('Old Post'); // Link to previous post
  });

  it('should handle sites with no content gracefully', async () => {
    const generator = new Generator({
      contentDir,
      outputDir,
      themesDir,
      siteTitle: 'Empty Site'
    });

    await generator.build();

    // Should still generate home page and sitemap
    expect(await fs.pathExists(path.join(outputDir, 'index.html'))).toBe(true);
    expect(await fs.pathExists(path.join(outputDir, 'sitemap.html'))).toBe(true);
    
    const homeHtml = await fs.readFile(path.join(outputDir, 'index.html'), 'utf-8');
    expect(homeHtml).toContain('No posts yet');
  });

  it('should include JavaScript effects', async () => {
    await fs.writeFile(
      path.join(contentDir, 'pages', 'test.md'),
      `---
title: Test Page
---

Test content.`
    );

    const generator = new Generator({
      contentDir,
      outputDir,
      themesDir
    });

    await generator.build();

    // Check JS was copied
    expect(await fs.pathExists(path.join(outputDir, 'js', '90s-effects.js'))).toBe(true);
    
    // Check JS is included in pages
    const pageHtml = await fs.readFile(path.join(outputDir, 'pages', 'test.html'), 'utf-8');
    expect(pageHtml).toContain('90s-effects.js');
    expect(pageHtml).toContain('window.navigationPages');
  });
});