# Tailwind Config Mapping từ Figma Tokens

## Cấu hình
- File: `apps/web/tailwind.config.ts`
- Map trực tiếp từ `design-tokens/tokens.json`:
  - Colors → theme.colors
  - Fonts → theme.fontFamily
  - Sizes → theme.fontSize (h1, h2, body, microcopy)
  - Effects → theme.boxShadow (glowGold, glowNeon)

## Sử dụng
- Heading H1: `className="font-heading text-h1 text-goldAccent"`
- Body: `className="font-body text-body text-textGrey"`
- Microcopy: `className="font-microcopy text-microcopy tracking-widest"`
- Button Gold: `bg-goldAccent shadow-glowGold hover:shadow-lg`
- Button Neon: `bg-neonTurquoise shadow-glowNeon hover:shadow-lg`

## Lợi ích
- Dev và Designer đồng bộ 100%: Figma Tokens ↔ Tailwind config.
- Khi update tokens, chỉ cần build lại config từ JSON.
