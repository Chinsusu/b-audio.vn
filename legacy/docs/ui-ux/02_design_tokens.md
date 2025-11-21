# Design Tokens (Tailwind)

```ts
// tailwind.config.ts (gợi ý mở rộng)
theme: {
  extend: {
    colors: {
      ivory: '#F8F5EF',
      beige: '#EAE2D6',
      gold: '#C8A15A',
      espresso: '#4B3A2B',
      cloud: '#D8D8D8'
    },
    borderRadius: { '2xl': '1rem' },
    boxShadow: { 'soft': '0 8px 24px rgba(0,0,0,0.08)' }
  }
}
```

- Font: **system-ui** hoặc Inter. Heading 32/24/20; body 16; small 14.
- Spacing scale 4/8/12/16/24/32 px.
- Icon: lucide-react. Radius lớn (2xl) cho card/button.
