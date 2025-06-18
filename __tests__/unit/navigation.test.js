// ABOUTME: Unit tests for navigation system
// ABOUTME: Tests navigation building, home page generation, and sitemap

const fs = require('fs-extra');
const path = require('path');
const Generator = require('../../src/generator');

jest.mock('fs-extra');

describe('Navigation System', () => {
  let generator;
  
  beforeEach(() => {
    jest.clearAllMocks();
    fs.pathExists.mockResolvedValue(true);
    fs.readFile.mockResolvedValue('');
    fs.writeFile.mockResolvedValue();
    fs.emptyDir.mockResolvedValue();
    fs.readJson.mockResolvedValue({});
    
    generator = new Generator({
      contentDir: '/test/content',
      outputDir: '/test/output',
      themesDir: '/test/themes',
      siteTitle: 'Test Site'
    });
  });

  describe('buildNavigation', () => {
    const mockPosts = [
      {
        title: 'Old Post',
        date: '2024-01-01',
        outputPath: '/test/output/posts/old.html'
      },
      {
        title: 'New Post',
        date: new Date().toISOString().split('T')[0],
        outputPath: '/test/output/posts/new.html'
      }
    ];
    
    const mockPages = [
      {
        title: 'About',
        outputPath: '/test/output/pages/about.html',
        navOrder: 1
      },
      {
        title: 'Contact',
        outputPath: '/test/output/pages/contact.html',
        navOrder: 2
      }
    ];

    it('should build navigation structure with sorted pages', () => {
      const navigation = generator.buildNavigation(mockPages, mockPosts);
      
      expect(navigation.pages).toHaveLength(2);
      expect(navigation.pages[0].title).toBe('About');
      expect(navigation.pages[1].title).toBe('Contact');
    });

    it('should sort posts by date (newest first)', () => {
      const navigation = generator.buildNavigation(mockPages, mockPosts);
      
      expect(navigation.recentPosts[0].title).toBe('New Post');
      expect(navigation.recentPosts[1].title).toBe('Old Post');
    });

    it('should mark new posts (less than 7 days old)', () => {
      const navigation = generator.buildNavigation(mockPages, mockPosts);
      
      expect(navigation.recentPosts[0].isNew).toBe(true);
      expect(navigation.recentPosts[1].isNew).toBe(false);
    });

    it('should add previous/next navigation to posts', () => {
      const navigation = generator.buildNavigation(mockPages, mockPosts);
      const sortedPosts = navigation.allPosts;
      
      // First post (newest) should have prev but no next
      expect(sortedPosts[0].nextPost).toBeNull();
      expect(sortedPosts[0].prevPost).toBeDefined();
      expect(sortedPosts[0].prevPost.title).toBe('Old Post');
      
      // Last post (oldest) should have next but no prev
      expect(sortedPosts[1].prevPost).toBeNull();
      expect(sortedPosts[1].nextPost).toBeDefined();
      expect(sortedPosts[1].nextPost.title).toBe('New Post');
    });

    it('should limit recent posts to 5', () => {
      const manyPosts = Array(10).fill(null).map((_, i) => ({
        title: `Post ${i}`,
        date: '2024-01-01',
        outputPath: `/test/output/posts/post${i}.html`
      }));
      
      const navigation = generator.buildNavigation([], manyPosts);
      expect(navigation.recentPosts).toHaveLength(5);
    });
  });

  describe('generateHomePage', () => {
    it('should generate home page with correct data', async () => {
      const mockNavigation = {
        pages: [],
        recentPosts: [],
        allPosts: []
      };
      
      fs.readFile.mockResolvedValue('<%= page.title %>');
      
      await generator.generateHomePage([], [], mockNavigation);
      
      expect(fs.writeFile).toHaveBeenCalledWith(
        '/test/output/index.html',
        expect.stringContaining('Welcome to Test Site')
      );
    });

    it('should skip if home template does not exist', async () => {
      fs.pathExists.mockResolvedValueOnce(false);
      
      await generator.generateHomePage([], [], {});
      
      expect(fs.writeFile).not.toHaveBeenCalled();
    });

    it('should include random visitor count', async () => {
      fs.readFile.mockResolvedValue('<%= page.visitorCount %>');
      
      await generator.generateHomePage([], [], {});
      
      const call = fs.writeFile.mock.calls[0];
      const html = call[1];
      const match = html.match(/(\d+)/);
      const visitorCount = parseInt(match[1]);
      
      expect(visitorCount).toBeGreaterThanOrEqual(10000);
      expect(visitorCount).toBeLessThan(110000);
    });
  });

  describe('generateSitemap', () => {
    const mockPosts = [
      { title: 'Post 1', date: '2024-01-02', outputPath: '/test/output/posts/p1.html' },
      { title: 'Post 2', date: '2024-01-01', outputPath: '/test/output/posts/p2.html' }
    ];
    
    const mockPages = [
      { title: 'About', outputPath: '/test/output/pages/about.html' }
    ];

    it('should generate sitemap with all pages and posts', async () => {
      fs.pathExists.mockResolvedValue(false); // Use basic sitemap
      
      await generator.generateSitemap(mockPosts, mockPages);
      
      const call = fs.writeFile.mock.calls[0];
      expect(call[0]).toBe('/test/output/sitemap.html');
      
      const html = call[1];
      expect(html).toContain('Site Map');
      expect(html).toContain('About');
      expect(html).toContain('Post 1');
      expect(html).toContain('Post 2');
    });

    it('should sort posts by date in sitemap', async () => {
      fs.pathExists.mockResolvedValue(false);
      
      await generator.generateSitemap(mockPosts, mockPages);
      
      const html = fs.writeFile.mock.calls[0][1];
      const post1Index = html.indexOf('Post 1');
      const post2Index = html.indexOf('Post 2');
      
      // Post 1 (newer) should appear before Post 2
      expect(post1Index).toBeLessThan(post2Index);
    });

    it('should use custom template if available', async () => {
      fs.pathExists.mockResolvedValue(true);
      fs.readFile.mockResolvedValue('<%= title %>');
      
      generator.navigation = { pages: [], recentPosts: [] };
      await generator.generateSitemap(mockPosts, mockPages);
      
      expect(fs.writeFile).toHaveBeenCalledWith(
        '/test/output/sitemap.html',
        expect.stringContaining('Sitemap - Test Site')
      );
    });
  });
});