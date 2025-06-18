// ABOUTME: Unit tests for the Generator class
// ABOUTME: Tests markdown processing, template rendering, and file operations

const fs = require('fs-extra');
const path = require('path');
const Generator = require('../../src/generator');

// Mock fs-extra
jest.mock('fs-extra');

describe('Generator', () => {
  let generator;
  const mockConfig = {
    contentDir: '/test/content',
    outputDir: '/test/output',
    themesDir: '/test/themes',
    theme: 'default',
    siteTitle: 'Test Site',
    siteDescription: 'Test Description',
    baseUrl: 'http://test.com'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    generator = new Generator(mockConfig);
    
    // Mock console methods
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
    console.error.mockRestore();
  });

  describe('constructor', () => {
    it('should initialize with default config if none provided', () => {
      const defaultGenerator = new Generator();
      expect(defaultGenerator.config.contentDir).toBe('content');
      expect(defaultGenerator.config.outputDir).toBe('output');
      expect(defaultGenerator.config.theme).toBe('default');
    });

    it('should merge provided config with defaults', () => {
      expect(generator.config.contentDir).toBe('/test/content');
      expect(generator.config.siteTitle).toBe('Test Site');
    });

    it('should initialize markdown-it instance', () => {
      expect(generator.md).toBeDefined();
      expect(generator.md.render).toBeInstanceOf(Function);
    });
  });

  describe('build', () => {
    beforeEach(() => {
      fs.emptyDir.mockResolvedValue();
      fs.pathExists.mockResolvedValue(true);
      fs.readdir.mockResolvedValue([]);
      fs.copy.mockResolvedValue();
    });

    it('should clean output directory before building', async () => {
      await generator.build();
      expect(fs.emptyDir).toHaveBeenCalledWith('/test/output');
    });

    it('should process posts and pages directories', async () => {
      const processSpy = jest.spyOn(generator, 'processDirectory');
      await generator.build();
      
      expect(processSpy).toHaveBeenCalledWith('/test/content/posts', 'post');
      expect(processSpy).toHaveBeenCalledWith('/test/content/pages', 'page');
    });

    it('should copy assets', async () => {
      const copyAssetsSpy = jest.spyOn(generator, 'copyAssets');
      const copyThemeSpy = jest.spyOn(generator, 'copyThemeAssets');
      
      await generator.build();
      
      expect(copyAssetsSpy).toHaveBeenCalled();
      expect(copyThemeSpy).toHaveBeenCalled();
    });

    it('should handle build errors gracefully', async () => {
      const error = new Error('Build failed');
      fs.emptyDir.mockRejectedValue(error);
      
      await expect(generator.build()).rejects.toThrow('Build failed');
    });
  });

  describe('processDirectory', () => {
    it('should return empty array if directory does not exist', async () => {
      fs.pathExists.mockResolvedValue(false);
      
      const result = await generator.processDirectory('/nonexistent', 'post');
      
      expect(result).toEqual([]);
    });

    it('should process markdown files in directory', async () => {
      fs.pathExists.mockResolvedValue(true);
      fs.readdir.mockResolvedValue(['post1.md', 'post2.md', 'image.png']);
      fs.stat.mockImplementation((path) => ({
        isFile: () => path.endsWith('.md') || path.endsWith('.png')
      }));
      
      const processSpy = jest.spyOn(generator, 'processMarkdownFile').mockResolvedValue({});
      
      const result = await generator.processDirectory('/test/posts', 'post');
      
      expect(processSpy).toHaveBeenCalledTimes(2);
      expect(processSpy).toHaveBeenCalledWith('/test/posts/post1.md', 'post');
      expect(processSpy).toHaveBeenCalledWith('/test/posts/post2.md', 'post');
    });
  });

  describe('processMarkdownFile', () => {
    const mockMarkdownContent = `---
title: Test Post
date: 2024-01-01
author: Test Author
tags: [test, sample]
---

# Test Content

This is a test post.`;

    beforeEach(() => {
      fs.readFile.mockResolvedValue(mockMarkdownContent);
      fs.ensureDir.mockResolvedValue();
      fs.writeFile.mockResolvedValue();
      
      // Mock renderTemplate
      jest.spyOn(generator, 'renderTemplate').mockResolvedValue('<html>Rendered HTML</html>');
    });

    it('should parse front matter and markdown content', async () => {
      const result = await generator.processMarkdownFile('/test/content/posts/test.md', 'post');
      
      expect(result.title).toBe('Test Post');
      expect(result.author).toBe('Test Author');
      expect(result.tags).toEqual(['test', 'sample']);
      expect(result.content).toContain('<h1>Test Content</h1>');
    });

    it('should generate correct output path', async () => {
      await generator.processMarkdownFile('/test/content/posts/test.md', 'post');
      
      expect(fs.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('output/posts/test.html'),
        expect.any(String)
      );
    });

    it('should handle files without front matter', async () => {
      fs.readFile.mockResolvedValue('# Just Markdown\n\nNo front matter here.');
      
      const result = await generator.processMarkdownFile('/test/content/pages/simple.md', 'page');
      
      expect(result.title).toBe('Untitled');
      expect(result.author).toBe('Anonymous');
      expect(result.content).toContain('<h1>Just Markdown</h1>');
    });
  });

  describe('renderTemplate', () => {
    const mockPageData = {
      title: 'Test Page',
      content: '<p>Test content</p>',
      author: 'Test Author',
      date: '2024-01-01'
    };

    beforeEach(() => {
      fs.pathExists.mockResolvedValue(true);
      fs.readFile.mockImplementation((path) => {
        if (path.includes('base.ejs')) {
          return Promise.resolve('<html><%= content %></html>');
        }
        if (path.includes('post.ejs')) {
          return Promise.resolve('<article><%= page.title %></article>');
        }
        return Promise.resolve('');
      });
    });

    it('should render page with base layout', async () => {
      const result = await generator.renderTemplate(mockPageData, 'post');
      
      expect(result).toContain('<html>');
      expect(result).toContain('Test Page');
    });

    it('should use default template if specific template does not exist', async () => {
      fs.pathExists.mockResolvedValue(false);
      
      const result = await generator.renderTemplate(mockPageData, 'custom');
      
      expect(result).toContain('Test content');
    });
  });

  describe('copyAssets', () => {
    it('should copy assets directory if it exists', async () => {
      fs.pathExists.mockResolvedValue(true);
      
      await generator.copyAssets();
      
      expect(fs.copy).toHaveBeenCalledWith(
        '/test/content/assets',
        '/test/output/assets'
      );
    });

    it('should skip if assets directory does not exist', async () => {
      fs.pathExists.mockResolvedValue(false);
      
      await generator.copyAssets();
      
      expect(fs.copy).not.toHaveBeenCalled();
    });
  });

  describe('copyThemeAssets', () => {
    it('should copy theme CSS if it exists', async () => {
      fs.pathExists.mockResolvedValue(true);
      
      await generator.copyThemeAssets();
      
      expect(fs.copy).toHaveBeenCalledWith(
        '/test/themes/default/css',
        '/test/output/css'
      );
    });

    it('should skip if theme CSS does not exist', async () => {
      fs.pathExists.mockResolvedValue(false);
      
      await generator.copyThemeAssets();
      
      expect(fs.copy).not.toHaveBeenCalled();
    });
  });
});