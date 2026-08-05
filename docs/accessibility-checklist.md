# Accessibility Checklist

- [ ] Keyboard navigation: tab order logical and visible focus
- [ ] Semantic HTML and ARIA where needed
- [ ] Focus trap in modals and drawers
- [ ] Color contrast >= 4.5:1 for normal text
- [ ] Images have meaningful `alt` or are marked `aria-hidden`
- [ ] Form inputs have associated labels
- [ ] Error states announced to screen readers
- [ ] Skip-to-content link present
- [ ] Avoid using color as the only means of conveying information
- [ ] Run automated checks: axe-core, Lighthouse

Testing commands:

```bash
# run storybook
npm run storybook

# use axe or pa11y against Storybook iframe URLs
npx pa11y http://localhost:6006/iframe.html?id=ui-button--primary
```
