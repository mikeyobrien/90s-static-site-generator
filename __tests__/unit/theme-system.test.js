// ABOUTME: Unit tests for the theme configuration system
// ABOUTME: Tests theme loading, variant application, and option merging

const fs = require('fs-extra');
const path = require('path');
const Generator = require('../../src/generator');

jest.mock('fs-extra');

describe('Theme System', () => {
  let generator;
  const mockThemeConfig = {
    name: 'default',
    displayName: 'Classic 90s',
    variants: {
      personal: {
        name: 'Personal Homepage',
        bodyClass: 'theme-personal',
        background: 'stars'
      },
      corporate: {
        name: 'Corporate',
        bodyClass: 'theme-corporate',
        background: 'solid'
      }
    },
    options: {
      effects: {
        blink: { default: true },
        marquee: { default: true }
      },
      components: {
        counter: { default: true },
        webring: { default: false }
      }
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    fs.pathExists.mockResolvedValue(true);
    fs.readJson.mockResolvedValue(mockThemeConfig);
  });

  describe('loadThemeConfig', () => {
    it('should load theme configuration from theme.json', async () => {
      generator = new Generator({
        theme: 'default',
        themesDir: '/themes'
      });

      await generator.loadThemeConfig();

      expect(fs.readJson).toHaveBeenCalledWith('/themes/default/theme.json');
      expect(generator.themeConfig).toEqual(mockThemeConfig);
    });

    it('should apply theme variant when specified', async () => {
      generator = new Generator({
        theme: 'default',
        themeVariant: 'corporate',
        themesDir: '/themes'
      });

      await generator.loadThemeConfig();

      expect(generator.config.bodyClass).toBe('theme-corporate');
      expect(generator.config.themeBackground).toBe('solid');
    });

    it('should handle missing theme config gracefully', async () => {
      fs.pathExists.mockResolvedValue(false);
      
      generator = new Generator({
        theme: 'default',
        themesDir: '/themes'
      });

      await generator.loadThemeConfig();

      expect(generator.themeConfig).toBeNull();
      expect(generator.themeOptions).toEqual({});
    });
  });

  describe('mergeThemeOptions', () => {
    it('should use default values from theme config', async () => {
      generator = new Generator({
        theme: 'default',
        themesDir: '/themes'
      });

      await generator.loadThemeConfig();

      expect(generator.themeOptions.effects.blink).toBe(true);
      expect(generator.themeOptions.effects.marquee).toBe(true);
      expect(generator.themeOptions.components.counter).toBe(true);
      expect(generator.themeOptions.components.webring).toBe(false);
    });

    it('should override defaults with config values', async () => {
      generator = new Generator({
        theme: 'default',
        themesDir: '/themes',
        theme_effects_blink: false,
        theme_components_webring: true
      });

      await generator.loadThemeConfig();

      expect(generator.themeOptions.effects.blink).toBe(false);
      expect(generator.themeOptions.components.webring).toBe(true);
    });
  });

  describe('copyThemeAssets', () => {
    beforeEach(() => {
      fs.copy.mockResolvedValue();
    });

    it('should copy CSS and images directories', async () => {
      generator = new Generator({
        theme: 'default',
        themesDir: '/themes',
        outputDir: '/output'
      });

      await generator.copyThemeAssets();

      expect(fs.copy).toHaveBeenCalledWith(
        '/themes/default/css',
        '/output/css'
      );
      expect(fs.copy).toHaveBeenCalledWith(
        '/themes/default/images',
        '/output/images'
      );
    });

    it('should handle missing directories gracefully', async () => {
      fs.pathExists.mockResolvedValue(false);
      
      generator = new Generator({
        theme: 'default',
        themesDir: '/themes',
        outputDir: '/output'
      });

      await expect(generator.copyThemeAssets()).resolves.not.toThrow();
      expect(fs.copy).not.toHaveBeenCalled();
    });
  });

  describe('renderTemplate with theme options', () => {
    it('should pass theme options to templates', async () => {
      const mockLayout = '<%= theme.effects.blink %>';
      const mockTemplate = '<%= themeConfig.displayName %>';
      
      fs.readFile.mockImplementation((path) => {
        if (path.includes('base.ejs')) return Promise.resolve(mockLayout);
        if (path.includes('.ejs')) return Promise.resolve(mockTemplate);
        return Promise.resolve('');
      });

      generator = new Generator({
        theme: 'default',
        themesDir: '/themes'
      });
      
      await generator.loadThemeConfig();
      
      const result = await generator.renderTemplate({
        title: 'Test',
        content: 'Test content'
      }, 'post');

      expect(result).toContain('true'); // blink effect default
      expect(result).toContain('Classic 90s'); // theme display name
    });
  });
});