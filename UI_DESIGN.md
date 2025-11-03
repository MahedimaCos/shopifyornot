# Next.js Website Design System Documentation

## Overview

Next.js employs a modern, minimalist design language that emphasizes clarity, performance, and developer experience. Their design system reflects the framework's core values of simplicity, speed, and scalability.

---

## Brand Identity

### Core Design Principles

-   **Minimalism**: Clean, uncluttered interfaces with generous whitespace
-   **Performance-First**: Lightweight design elements that load quickly
-   **Developer-Centric**: Technical yet approachable aesthetic
-   **Accessibility**: High contrast ratios and clear typography
-   **Responsive**: Fluid layouts that work across all devices

---

## Color System

### Primary Colors

-   **Black**: `#000000` - Primary text and strong emphasis
-   **White**: `#FFFFFF` - Background and negative space
-   **Blue**: `#0070F3` - Primary accent, links, CTAs
-   **Gray Scale**:
    -   `#111111` - Near black for softer text
    -   `#333333` - Secondary text
    -   `#666666` - Tertiary text
    -   `#999999` - Disabled states
    -   `#EEEEEE` - Subtle borders
    -   `#FAFAFA` - Light backgrounds

### Semantic Colors

-   **Success**: `#0CAD00` - Success states and confirmations
-   **Warning**: `#F5A623` - Warning messages
-   **Error**: `#E00` - Error states and alerts
-   **Info**: `#0070F3` - Informational messages

### Dark Mode

-   **Background**: `#000000` to `#111111`
-   **Surface**: `#1A1A1A`
-   **Border**: `#333333`
-   **Text Primary**: `#FFFFFF`
-   **Text Secondary**: `#888888`

---

## Typography

### Font Families

-   **Primary Font**: Inter (sans-serif)
    -   Fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
-   **Monospace**: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace
    -   Used for code blocks and technical content

### Type Scale

-   **Display**: 80px / 1.1 line-height / -0.05em letter-spacing
-   **H1**: 48px / 1.2 line-height / -0.03em letter-spacing
-   **H2**: 36px / 1.25 line-height / -0.02em letter-spacing
-   **H3**: 28px / 1.3 line-height / -0.01em letter-spacing
-   **H4**: 24px / 1.35 line-height / normal letter-spacing
-   **Body Large**: 18px / 1.65 line-height / normal letter-spacing
-   **Body**: 16px / 1.7 line-height / normal letter-spacing
-   **Small**: 14px / 1.5 line-height / normal letter-spacing
-   **Caption**: 12px / 1.4 line-height / normal letter-spacing

### Font Weights

-   **Light**: 300 - Subtle emphasis
-   **Regular**: 400 - Body text
-   **Medium**: 500 - UI elements
-   **Semibold**: 600 - Subheadings
-   **Bold**: 700 - Headings
-   **Black**: 900 - Display text

---

## Layout System

### Grid System

-   **Container Max Width**: 1200px
-   **Breakpoints**:
    -   Mobile: 0-640px
    -   Tablet: 641-1024px
    -   Desktop: 1025px+
-   **Grid Columns**: 12-column system
-   **Gutter**: 24px (mobile), 32px (desktop)

### Spacing Scale

Based on 8px baseline grid:

-   `4px` - xs
-   `8px` - sm
-   `16px` - md
-   `24px` - lg
-   `32px` - xl
-   `48px` - 2xl
-   `64px` - 3xl
-   `96px` - 4xl
-   `128px` - 5xl

### Section Spacing

-   **Hero Sections**: 128px padding (desktop), 64px (mobile)
-   **Content Sections**: 80px padding (desktop), 48px (mobile)
-   **Component Spacing**: 32px between major components
-   **Card Padding**: 24px internal padding

---

## Components

### Buttons

**Primary Button**

-   Background: `#0070F3`
-   Text: `#FFFFFF`
-   Border-radius: `8px`
-   Padding: `12px 24px`
-   Font-weight: `600`
-   Hover: Darken 10%, slight scale transform

**Secondary Button**

-   Background: `transparent`
-   Border: `1px solid #EEEEEE`
-   Text: `#000000`
-   Hover: Background `#FAFAFA`

**Ghost Button**

-   Background: `transparent`
-   Text: `#666666`
-   Hover: Text `#000000`

### Cards

-   Background: `#FFFFFF`
-   Border: `1px solid #EEEEEE`
-   Border-radius: `12px`
-   Padding: `24px`
-   Shadow: `0 4px 6px rgba(0, 0, 0, 0.07)`
-   Hover: Transform translateY(-2px), enhanced shadow

### Navigation

-   **Header Height**: 64px
-   **Logo**: Left-aligned
-   **Navigation Links**: Center or right-aligned
-   **Link Spacing**: 32px between items
-   **Mobile Menu**: Hamburger icon, full-screen overlay

### Code Blocks

-   Background: `#FAFAFA` (light mode), `#1A1A1A` (dark mode)
-   Border: `1px solid #EEEEEE`
-   Border-radius: `8px`
-   Padding: `16px`
-   Font-family: Monospace
-   Font-size: `14px`
-   Syntax highlighting with semantic colors

---

## Interactive States

### Hover States

-   Links: Color transition to `#0051A2`
-   Buttons: Background color shift, subtle scale transform
-   Cards: Elevation change with shadow enhancement

### Focus States

-   Outline: `2px solid #0070F3`
-   Outline-offset: `2px`
-   Border-radius: Inherits from element

### Active States

-   Scale: `0.98`
-   Opacity: `0.9`

### Disabled States

-   Opacity: `0.5`
-   Cursor: `not-allowed`
-   Remove hover effects

---

## Animation & Transitions

### Timing Functions

-   **Default**: `cubic-bezier(0.4, 0, 0.2, 1)`
-   **Ease-in**: `cubic-bezier(0.4, 0, 1, 1)`
-   **Ease-out**: `cubic-bezier(0, 0, 0.2, 1)`
-   **Spring**: `cubic-bezier(0.34, 1.56, 0.64, 1)`

### Durations

-   **Instant**: 100ms - Micro-interactions
-   **Fast**: 200ms - Button hovers, small transitions
-   **Normal**: 300ms - Most animations
-   **Slow**: 500ms - Page transitions, complex animations

### Common Animations

-   **Fade In**: Opacity 0 to 1
-   **Slide Up**: TranslateY(20px) to translateY(0)
-   **Scale**: Scale(0.95) to scale(1)
-   **Loading Spinner**: Continuous rotation

---

## Icons & Graphics

### Icon System

-   **Size**: 16px, 20px, 24px standard sizes
-   **Stroke Width**: 1.5px or 2px
-   **Style**: Outlined, minimalist
-   **Color**: Inherit from text color

### Logo Guidelines

-   **Minimum Size**: 100px width
-   **Clear Space**: 0.5x logo height on all sides
-   **Color Variations**: Black on light, white on dark

### Illustrations

-   **Style**: Geometric, abstract
-   **Color Palette**: Limited to brand colors
-   **Usage**: Hero sections, empty states, feature highlights

---

## Responsive Design

### Mobile-First Approach

-   Base styles for mobile
-   Progressive enhancement for larger screens
-   Touch-friendly tap targets (minimum 44px)

### Breakpoint Strategy

```css
/* Mobile First */
@media (min-width: 640px) {
    /* Tablet */
}
@media (min-width: 1024px) {
    /* Desktop */
}
@media (min-width: 1280px) {
    /* Large Desktop */
}
```

### Flexible Components

-   Fluid typography using clamp()
-   Flexible grids with CSS Grid and Flexbox
-   Responsive images with proper aspect ratios

---

## Accessibility

### WCAG Compliance

-   **Contrast Ratios**: Minimum 4.5:1 for normal text, 3:1 for large text
-   **Focus Indicators**: Visible and high contrast
-   **Keyboard Navigation**: Full support
-   **Screen Reader**: Semantic HTML and ARIA labels

### Best Practices

-   Semantic HTML structure
-   Alt text for all images
-   Proper heading hierarchy
-   Form labels and error messages
-   Skip navigation links

---

## Performance Considerations

### Optimization Strategies

-   **Font Loading**: Font-display: optional for web fonts
-   **Image Optimization**: Next.js Image component with lazy loading
-   **CSS**: Minimal, component-scoped styles
-   **JavaScript**: Code splitting and lazy loading

### Loading States

-   Skeleton screens for content
-   Progress indicators for actions
-   Optimistic UI updates
-   Graceful degradation

---

## Implementation Notes

### CSS Architecture

-   **Methodology**: CSS Modules or CSS-in-JS (styled-jsx)
-   **Naming Convention**: BEM-inspired for classes
-   **Organization**: Component-based file structure

### Design Tokens

```javascript
// Example design tokens structure
const tokens = {
    colors: {
        primary: "#0070F3",
        text: {
            primary: "#000000",
            secondary: "#666666",
        },
    },
    spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
    },
    typography: {
        fontFamily: "Inter, sans-serif",
        fontSize: {
            body: "16px",
            h1: "48px",
        },
    },
};
```

---

## Conclusion

The Next.js design system emphasizes performance, accessibility, and developer experience through a minimalist aesthetic. The system's flexibility allows for consistent implementation across different contexts while maintaining the brand's technical yet approachable identity. This design language effectively communicates Next.js's position as a modern, professional framework for building web applications.
