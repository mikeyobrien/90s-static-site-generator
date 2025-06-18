// ABOUTME: Integration tests for 90s design elements
// ABOUTME: Tests that generated pages include proper 90s styling and components

const fs = require('fs-extra');
const path = require('path');
const Generator = require('../../src/generator');

describe('90s Design Integration', () => {
  const testDir = path.join(__dirname, '..', 'test-90s-site');
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

  it('should generate page with 90s CSS and assets', async () => {
    // Create test content
    await fs.writeFile(
      path.join(contentDir, 'posts', 'retro-post.md'),
      `---
title: Welcome to the 90s!
date: 1997-06-15
author: WebMaster
isNew: true
---

This is a **rad** post with 90s styling!`
    );

    const generator = new Generator({
      contentDir,
      outputDir,
      themesDir,
      theme: 'default',
      themeVariant: 'personal',
      siteTitle: 'My Awesome 90s Site'
    });

    await generator.build();

    // Check CSS files exist
    expect(await fs.pathExists(path.join(outputDir, 'css', 'style.css'))).toBe(true);
    expect(await fs.pathExists(path.join(outputDir, 'css', '90s.css'))).toBe(true);

    // Check images were copied
    expect(await fs.pathExists(path.join(outputDir, 'images', 'animations', 'under-construction.gif'))).toBe(true);
    expect(await fs.pathExists(path.join(outputDir, 'images', 'badges', 'new.gif'))).toBe(true);

    // Read generated HTML
    const html = await fs.readFile(
      path.join(outputDir, 'posts', 'retro-post.html'),
      'utf-8'
    );

    // Check for 90s CSS link
    expect(html).toContain('<link rel="stylesheet" type="text/css" href="/css/90s.css">');

    // Check for theme class
    expect(html).toContain('class="theme-personal');

    // Check for NEW badge (since isNew: true)
    expect(html).toContain('/images/badges/new.gif');

    // Check for flame divider
    expect(html).toContain('class="flame"');
  });

  it('should apply different theme variants correctly', async () => {
    await fs.writeFile(
      path.join(contentDir, 'pages', 'corporate.md'),
      `---
title: Corporate Page
---

Professional content.`
    );

    // Test corporate variant
    const corporateGen = new Generator({
      contentDir,
      outputDir,
      themesDir,
      theme: 'default',
      themeVariant: 'corporate'
    });

    await corporateGen.build();

    const corporateHtml = await fs.readFile(
      path.join(outputDir, 'pages', 'corporate.html'),
      'utf-8'
    );

    expect(corporateHtml).toContain('class="theme-corporate');

    // Test hacker variant
    await fs.remove(outputDir);
    
    const hackerGen = new Generator({
      contentDir,
      outputDir,
      themesDir,
      theme: 'default',
      themeVariant: 'hacker'
    });

    await hackerGen.build();

    const hackerHtml = await fs.readFile(
      path.join(outputDir, 'pages', 'corporate.html'),
      'utf-8'
    );

    expect(hackerHtml).toContain('class="theme-hacker');
  });

  it('should conditionally include 90s components based on theme options', async () => {
    await fs.writeFile(
      path.join(contentDir, 'pages', 'components-test.md'),
      `---
title: Testing Components
underConstruction: true
---

Testing 90s components.`
    );

    // Generator with all components enabled
    const generator = new Generator({
      contentDir,
      outputDir,
      themesDir,
      theme: 'default',
      theme_components_counter: true,
      theme_components_webring: true,
      theme_components_badges: true,
      theme_components_construction: true,
      theme_effects_marquee: true
    });

    await generator.build();

    const html = await fs.readFile(
      path.join(outputDir, 'pages', 'components-test.html'),
      'utf-8'
    );

    // Check for marquee
    expect(html).toContain('class="marquee"');

    // Check for under construction (page has underConstruction: true)
    expect(html).toContain('UNDER CONSTRUCTION');
    expect(html).toContain('under-construction.gif');

    // Check for counter
    expect(html).toContain('You are visitor number');

    // Check for webring
    expect(html).toContain('90s Web Enthusiasts Ring');

    // Check for badges
    expect(html).toContain('Best viewed at 800x600');
  });

  it('should include partials correctly', async () => {
    await fs.writeFile(
      path.join(contentDir, 'posts', 'partial-test.md'),
      `---
title: Testing Partials
email: webmaster@example.com
---

Content with email link.`
    );

    const generator = new Generator({
      contentDir,
      outputDir,
      themesDir,
      theme: 'default'
    });

    await generator.build();

    const html = await fs.readFile(
      path.join(outputDir, 'posts', 'partial-test.html'),
      'utf-8'
    );

    // Check email partial was included
    expect(html).toContain('mailto:webmaster@example.com');
    expect(html).toContain('/images/icons/email.gif');
    expect(html).toContain('Email Author');
  });
});