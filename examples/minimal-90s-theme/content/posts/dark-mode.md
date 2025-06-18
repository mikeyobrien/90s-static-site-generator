---
title: Adding Dark Mode to a 90s Website
date: 2025-01-18
author: Jane Doe
tags: [web-design, accessibility, features]
---

# Adding Dark Mode to a 90s Website

You might have noticed the toggle button in the top-right corner of this page. Yes, this 90s-themed blog has dark mode support. Some might call this anachronistic, but I think it's a perfect blend of old and new.

## Why Dark Mode?

While dark mode might seem like a modern invention, the desire for easier reading has always existed. Many early computer systems defaulted to light text on dark backgrounds (think DOS or early Unix terminals). It wasn't until the Mac and Windows that light backgrounds became the norm.

## Implementation

The implementation is surprisingly simple:

1. CSS custom properties define colors for both themes
2. A small JavaScript function toggles a data attribute
3. A cookie remembers your preference

That's it. No complex state management, no framework needed. Just a few lines of vanilla JavaScript that would have worked fine in Netscape Navigator 4.

## Respecting User Choice

The key principle is respecting user choice. The site defaults to light mode (the 90s standard), but if you prefer dark mode, it remembers your preference. No automatic switching based on time of day or system settings - just a simple toggle that does what you tell it to.

## Progressive Enhancement

If JavaScript is disabled, you simply get the default light theme. The site remains perfectly usable. This is progressive enhancement at its finest - adding features for those who can use them without breaking the experience for those who can't.

## The Best of Both Worlds

This approach embodies what I love about web development: taking the best ideas from different eras and combining them thoughtfully. We can have the simplicity and reliability of 90s HTML while still providing modern conveniences where they add real value.

So go ahead, try the toggle. Your eyes will thank you during those late-night reading sessions.