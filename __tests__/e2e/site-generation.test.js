// ABOUTME: End-to-end tests for complete site generation workflow
// ABOUTME: Tests real-world usage scenarios from start to finish

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

describe('E2E Site Generation', () => {
  const testWorkspace = path.join(__dirname, '..', 'e2e-workspace');
  const binPath = path.join(__dirname, '..', '..', 'bin', 'retro-ssg.js');
  
  beforeEach(async () => {
    await fs.remove(testWorkspace);
    await fs.ensureDir(testWorkspace);
  });

  afterEach(async () => {
    await fs.remove(testWorkspace);
  });

  it('should complete full site generation workflow', async () => {
    // Step 1: Set up site structure
    const siteDir = path.join(testWorkspace, 'my-90s-site');
    await fs.ensureDir(path.join(siteDir, 'content', 'posts'));
    await fs.ensureDir(path.join(siteDir, 'content', 'pages'));
    await fs.ensureDir(path.join(siteDir, 'content', 'assets', 'images'));
    
    // Copy themes
    const themesSource = path.join(__dirname, '..', '..', 'themes');
    const themesDest = path.join(siteDir, 'themes');
    await fs.copy(themesSource, themesDest);

    // Step 2: Create content
    await fs.writeFile(
      path.join(siteDir, 'content', 'posts', 'welcome.md'),
      `---
title: Welcome to My 90s Homepage!
date: 1997-01-01
author: WebMaster2000
tags: [introduction, personal]
---

# Hello, Cyberspace!

Welcome to my corner of the **World Wide Web**! I've been working on this site using the latest HTML technology.

## What You'll Find Here

- My thoughts on the internet revolution
- Cool links to other sites
- Pictures from my digital camera
- Guestbook (coming soon!)

### Technical Specs

This site is:
- Best viewed in Netscape Navigator 3.0
- Optimized for 800x600 resolution
- Under construction (always improving!)

\`\`\`html
<blink>Thanks for visiting!</blink>
\`\`\`

Don't forget to bookmark this page!
`
    );

    await fs.writeFile(
      path.join(siteDir, 'content', 'pages', 'about.md'),
      `---
title: About Me
date: 1997-01-01
showLastUpdated: true
---

## Who Am I?

I'm just a regular person exploring this amazing new frontier called the Internet!

### My Interests

1. Web Design
2. Computer Programming
3. Science Fiction
4. Online Gaming (Doom II anyone?)

### Contact Me

Send me an email at: webmaster@example.com

> "The Internet is becoming the town square for the global village of tomorrow." - Bill Gates
`
    );

    await fs.writeFile(
      path.join(siteDir, 'content', 'pages', 'links.md'),
      `---
title: Cool Links
---

## My Favorite Sites on the Web

Check out these awesome websites I've discovered:

- [Yahoo!](http://yahoo.com) - The best web directory
- [AltaVista](http://altavista.com) - My favorite search engine
- [GeoCities](http://geocities.com) - Free web hosting!
- [ICQ](http://icq.com) - Chat with friends online

### Web Rings

This site is part of the "90s Web Enthusiasts" web ring!

[<< Previous] [Random] [Next >>]
`
    );

    // Create a simple image asset
    await fs.writeFile(
      path.join(siteDir, 'content', 'assets', 'images', 'under-construction.gif'),
      Buffer.from('R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=', 'base64')
    );

    // Step 3: Run build command
    const buildOutput = execSync(`node ${binPath} build`, {
      cwd: siteDir,
      encoding: 'utf-8'
    });

    expect(buildOutput).toContain('Building your radical 90s website');
    expect(buildOutput).toContain('Build complete!');

    // Step 4: Verify output
    const outputDir = path.join(siteDir, 'output');
    
    // Check that all files were generated
    const expectedFiles = [
      'posts/welcome.html',
      'pages/about.html',
      'pages/links.html',
      'css/style.css',
      'assets/images/under-construction.gif'
    ];

    for (const file of expectedFiles) {
      const filePath = path.join(outputDir, file);
      expect(await fs.pathExists(filePath)).toBe(true);
    }

    // Step 5: Validate HTML content
    const welcomeHtml = await fs.readFile(
      path.join(outputDir, 'posts', 'welcome.html'),
      'utf-8'
    );

    // Check for proper HTML structure
    expect(welcomeHtml).toMatch(/<!DOCTYPE HTML/i);
    expect(welcomeHtml).toContain('<title>Welcome to My 90s Homepage!');
    expect(welcomeHtml).toContain('Hello, Cyberspace!');
    expect(welcomeHtml).toContain('WebMaster2000');
    expect(welcomeHtml).toContain('1997');
    expect(welcomeHtml).toContain('<strong>World Wide Web</strong>');
    expect(welcomeHtml).toContain('&lt;blink&gt;Thanks for visiting!&lt;/blink&gt;');

    // Check CSS is linked
    expect(welcomeHtml).toContain('<link rel="stylesheet" type="text/css" href="/css/style.css">');

    // Step 6: Validate About page
    const aboutHtml = await fs.readFile(
      path.join(outputDir, 'pages', 'about.html'),
      'utf-8'
    );

    expect(aboutHtml).toContain('About Me');
    expect(aboutHtml).toContain('Who Am I?');
    expect(aboutHtml).toContain('Last updated:');
    expect(aboutHtml).toContain('Bill Gates');

    // Step 7: Validate Links page
    const linksHtml = await fs.readFile(
      path.join(outputDir, 'pages', 'links.html'),
      'utf-8'
    );

    expect(linksHtml).toContain('Cool Links');
    expect(linksHtml).toContain('Yahoo!');
    expect(linksHtml).toContain('href="http://yahoo.com"');

    // Step 8: Check CSS file
    const cssContent = await fs.readFile(
      path.join(outputDir, 'css', 'style.css'),
      'utf-8'
    );

    expect(cssContent).toContain('background-color: #C0C0C0');
    expect(cssContent).toContain('font-family: "Times New Roman"');
  });

  it('should handle edge cases gracefully', async () => {
    const siteDir = path.join(testWorkspace, 'edge-case-site');
    await fs.ensureDir(siteDir);
    
    // Copy themes
    const themesSource = path.join(__dirname, '..', '..', 'themes');
    const themesDest = path.join(siteDir, 'themes');
    await fs.copy(themesSource, themesDest);

    // Create content with edge cases
    await fs.ensureDir(path.join(siteDir, 'content', 'posts'));
    
    // File with no front matter
    await fs.writeFile(
      path.join(siteDir, 'content', 'posts', 'no-frontmatter.md'),
      '# Just a heading\n\nSome content without front matter.'
    );

    // File with special characters
    await fs.writeFile(
      path.join(siteDir, 'content', 'posts', 'special-chars.md'),
      `---
title: Special <Characters> & "Quotes"
---

Content with <tags> & special characters.`
    );

    // Empty file
    await fs.writeFile(
      path.join(siteDir, 'content', 'posts', 'empty.md'),
      ''
    );

    // Run build
    const buildOutput = execSync(`node ${binPath} build`, {
      cwd: siteDir,
      encoding: 'utf-8'
    });

    expect(buildOutput).toContain('Build complete!');

    // Verify files were generated
    const outputDir = path.join(siteDir, 'output');
    expect(await fs.pathExists(path.join(outputDir, 'posts', 'no-frontmatter.html'))).toBe(true);
    expect(await fs.pathExists(path.join(outputDir, 'posts', 'special-chars.html'))).toBe(true);
    expect(await fs.pathExists(path.join(outputDir, 'posts', 'empty.html'))).toBe(true);

    // Check special characters are properly escaped
    const specialCharsHtml = await fs.readFile(
      path.join(outputDir, 'posts', 'special-chars.html'),
      'utf-8'
    );
    expect(specialCharsHtml).toContain('Special &lt;Characters&gt; &amp; "Quotes"');
  });

  it('should generate site with multiple posts maintaining order', async () => {
    const siteDir = path.join(testWorkspace, 'blog-site');
    await fs.ensureDir(path.join(siteDir, 'content', 'posts'));
    
    // Copy themes
    const themesSource = path.join(__dirname, '..', '..', 'themes');
    const themesDest = path.join(siteDir, 'themes');
    await fs.copy(themesSource, themesDest);

    // Create multiple posts with different dates
    const posts = [
      { file: 'post1.md', title: 'First Post', date: '1997-01-01' },
      { file: 'post2.md', title: 'Second Post', date: '1997-02-15' },
      { file: 'post3.md', title: 'Third Post', date: '1997-03-20' }
    ];

    for (const post of posts) {
      await fs.writeFile(
        path.join(siteDir, 'content', 'posts', post.file),
        `---
title: ${post.title}
date: ${post.date}
author: Blogger
---

This is the content of ${post.title}.`
      );
    }

    // Build site
    execSync(`node ${binPath} build`, {
      cwd: siteDir,
      encoding: 'utf-8'
    });

    // Verify all posts were generated
    const outputDir = path.join(siteDir, 'output');
    for (const post of posts) {
      const htmlFile = post.file.replace('.md', '.html');
      const htmlPath = path.join(outputDir, 'posts', htmlFile);
      expect(await fs.pathExists(htmlPath)).toBe(true);
      
      const content = await fs.readFile(htmlPath, 'utf-8');
      expect(content).toContain(post.title);
    }
  });
});