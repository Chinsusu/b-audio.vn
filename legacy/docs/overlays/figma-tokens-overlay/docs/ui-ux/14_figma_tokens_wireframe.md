# Figma Tokens & Wireframe Guide

## 1. File Tokens
- `design-tokens/tokens.json` chứa toàn bộ **Design Tokens** cho Figma (dùng plugin [Figma Tokens](https://docs.figmatokens.com/)).
- Import trực tiếp trong plugin để tạo **Color Styles, Text Styles, Effect Styles**.

## 2. Tokens Included
- **Color**
  - Dark Bg: #0D0D0D
  - Dark Grey: #1A1A1A
  - Gold Accent: #C8A15A
  - Neon Turquoise: #00E0B8
  - Text White: #F5F5F5
  - Text Grey: #CCCCCC
- **Font**
  - Heading: Orbitron/Oswald/Rajdhani
  - Body: Inter/Roboto/IBM Plex Sans
  - Microcopy: Inter Caps
- **Size**
  - H1 48px, H2 32px, Body 16px, Microcopy 12px
- **Effect**
  - GlowGold: Shadow #C8A15A66 blur 8px
  - GlowNeon: Shadow #00E0B866 blur 8px

## 3. Figma Setup
1. Mở Figma → Plugin → Figma Tokens → Import JSON.
2. Apply tokens cho Styles (Color, Text, Effect).
3. Tạo Page `Style Guide`: drag các rectangle/text → apply tokens → preview.

## 4. Wireframe Pages
- Page 1: Style Tokens
- Page 2: Components (Header, Footer, ProductCard, Filter, CTA, SpecsTable, ReviewCard)
- Page 3: Screens (Home, PLP, PDP, Custom)

## 5. Workflow
- Dev có thể export tokens JSON → sync sang code (Tailwind config, CSS variables).
- Designer có thể update tokens trong plugin → push lại repo.

