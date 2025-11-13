# Coding Standards (Mono: Next.js + Strapi)

Tài liệu này quy định chuẩn mã hoá, quy ước đặt tên và lint cho monorepo `apps/web` (Next.js + TS) và `apps/cms` (Strapi v4 + Node). Tập trung vào code style, không trùng với design system/UI.

Mục tiêu: code dễ đọc, dễ review, giảm bug, nhất quán giữa FE/BE, thuận tự động hoá (Prettier/ESLint) và CI.

---

## 1) Naming Conventions (Quy ước đặt tên)

### 1.1. Dự án & cấu trúc
- Thư mục: `kebab-case` (vd: `components`, `product-cards`, `search-filters`).
- File chung: `kebab-case` (vd: `media-url.ts`, `seo-scan.sh`).
- React component file: `PascalCase` (vd: `ProductCard.tsx`, `SearchFilters.tsx`).
- Hooks: prefix `use` và file `camelCase` hoặc `kebab-case` đều được, khuyến nghị `useXxx.ts` (vd: `useCart.ts`).
- Type/utility chia theo thư mục `types/`, `utils/`, `lib/` (tối ưu import nội bộ).
- Script CLI: `kebab-case` (vd: `seed-sample.js`).

Lưu ý tương thích hiện trạng: repo đang có một số file util dạng `camelCase` (vd: `mediaUrl.ts`). Với file mới: ưu tiên `kebab-case`; file cũ giữ nguyên cho đến khi refactor.

### 1.2. Next.js (apps/web)
- Route segment thư mục trong `app/`: `kebab-case` (vd: `app/products/[slug]`).
- Trang/layout: theo quy ước Next 14 (`page.tsx`, `layout.tsx`, `not-found.tsx`, `error.tsx`).
- Component React: `PascalCase` cho tên component và tên file, export dạng `named` nếu có thể. Ngoại lệ: component/trang Next trong `app/` cần `default export` theo framework.
- Hooks: `useXxx` (camelCase) và return giá trị/đối tượng có tên rõ nghĩa.
- Utilities/helpers: hàm `camelCase`, file `kebab-case` (khuyến nghị).

### 1.3. Strapi (apps/cms)
- Theo cấu trúc Strapi: `src/api/<content-type>/{controllers,services,routes}/...` dùng `kebab-case` cho tên file.
- Module CommonJS: `module.exports = {...}`; tránh trộn ESM.
- Content-type schema (JSON): khoá `singularName`, `pluralName` viết `kebab-case`/`snake_case` theo best practice Strapi; field dữ liệu camelCase trong code Node.
- Endpoint tự tạo: `kebab-case` cho path; tên handler `camelCase`.

### 1.4. Tên biến/hàm/class/type
- Biến/hàm (JS/TS): `camelCase` (vd: `totalCount`, `buildFilters`).
- Boolean: nên có tiền tố `is/has/should/can` (vd: `isActive`, `hasImages`).
- Hằng số runtime: `SCREAMING_SNAKE_CASE` (vd: `MAX_PAGE_SIZE`).
- Class & React component: `PascalCase`.
- TypeScript `type`/`interface`/`enum`: `PascalCase` (không dùng tiền tố `I`), generic `TThing`/`TData`.
- Env var: `SCREAMING_SNAKE_CASE`; biến client‑side phải prefix `NEXT_PUBLIC_` (vd: `NEXT_PUBLIC_API_BASE`).
- Slug/URL segment: `kebab-case` không dấu, ASCII.

---

## 2) Formatting Rules (Quy tắc định dạng)

Áp dụng Prettier cho toàn repo; không commit code chưa được format.

- Indent: 2 spaces, không dùng tabs.
- Dài dòng tối đa: 120 ký tự (tự động xuống dòng bằng Prettier khi cần).
- Dấu chấm phẩy: luôn dùng (`semi: true`).
- Dấu nháy: single quotes cho JS/TS, double quotes mặc định cho JSX (theo Prettier).
- Dấu phẩy cuối: thêm ở cấu trúc multi-line (`trailingComma: "all"`).
- Dấu ngoặc & khối lệnh: luôn dùng `curly` cho if/else/loops; mở ngoặc cùng dòng.
- Khoảng trắng: một space quanh toán tử, không space thừa trước dấu phẩy/ngoặc.
- EOF: luôn có newline, EOL = LF, encoding UTF‑8.
- Import:
  - Thứ tự: built‑in (node), external (npm), internal (alias hoặc relative), asset/style.
  - Nhóm import cách nhau 1 dòng; sort alpha trong nhóm (có thể dùng `eslint-plugin-import`).
  - Hạn chế import `* as` nếu không cần thiết; ưu tiên named import.
- React/JSX:
  - Component function thay vì class.
  - Props > 3 thuộc tính: xuống dòng từng prop.
  - Alt text bắt buộc với `next/image` hoặc `<img>`.
  - Tránh inline function nặng bên trong JSX map nếu có thể (tách ra hoặc `useCallback`).
- Template string: dùng backticks cho chuỗi cần nội suy; không nối chuỗi bằng `+`.
- JSON/YAML: tuân thủ chuẩn (double quotes cho JSON), không comment trong JSON.

Đề xuất cấu hình Prettier (tham khảo):

```jsonc
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 120,
  "trailingComma": "all",
  "tabWidth": 2,
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

EditorConfig (tùy chọn, nếu dùng):

```ini
# .editorconfig
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

---

## 3) Linting Rules (Luật lint & bad smell)

Mục tiêu: bắt lỗi sớm, thống nhất kiểu code, cảnh báo mùi code (bad smell). Sử dụng ESLint cho cả `apps/web` và `apps/cms` với cấu hình riêng phù hợp môi trường.

### 3.1. Web (Next.js + TypeScript)
Khuyến nghị `.eslintrc.js` tham khảo:

```js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'unused-imports', 'react-refresh'],
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    // Kiểu & import
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-imports': 'error',
    'unused-imports/no-unused-imports': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],

    // Chất lượng
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    'no-var': 'error',
    'prefer-const': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],

    // Promise & async
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-floating-promises': 'error',

    // Next/React
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
}
```

Gợi ý bổ sung:
- Bật `strict` trong TS cho code mới; export API (public) nên có kiểu trả về rõ ràng.
- Tránh `any`, nếu cần: comment TODO với lý do và kế hoạch thay thế.
- Không dùng `default export` cho component chia sẻ, trừ trường hợp Next.js yêu cầu.

Bad smell thường gặp (web):
- Component quá lớn (> 200 dòng) hoặc làm quá nhiều việc → tách nhỏ.
- Lặp lại logic format/parse → đưa vào `utils/` và test nhẹ nếu có thể.
- Gọi API ở client khi có thể SSG/ISR → tận dụng `fetch` với `next: { revalidate }`.

### 3.2. CMS (Strapi v4, Node)
Khuyến nghị `.eslintrc.cjs` tham khảo:

```js
module.exports = {
  root: true,
  env: { node: true, es2022: true },
  extends: ['eslint:recommended', 'plugin:promise/recommended'],
  plugins: ['promise', 'security'],
  parserOptions: { ecmaVersion: 2022 },
  rules: {
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    'no-var': 'error',
    'prefer-const': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'promise/catch-or-return': 'error',
    'promise/always-return': 'off',
    'security/detect-object-injection': 'off',
    'security/detect-non-literal-fs-filename': 'warn',
  },
}
```

Gợi ý bổ sung & bảo mật:
- Module CommonJS theo chuẩn Strapi; không trộn ESM.
- Validate input ở controller/service (vd: URL hợp lệ, MIME type, kích thước file cho upload). Không tin tưởng dữ liệu client.
- Timeout & giới hạn (size/bytes) khi fetch tải file từ internet; dọn dẹp file tạm dù thành công hay thất bại.
- Không log thông tin nhạy cảm; dùng `ctx.badRequest`, `ctx.forbidden`, `ctx.internalServerError` hợp lệ.
- Dùng policy/permission phù hợp (vd: endpoint quản trị phải có `admin::isAuthenticatedAdmin`).

Bad smell thường gặp (cms):
- Bắt ngoại lệ không đầy đủ (nuốt lỗi) → luôn log error server‑side và trả mã lỗi phù hợp.
- Truy xuất DB vòng lặp N+1 → dùng populate/select hợp lý.
- Logic nghiệp vụ trộn lẫn trong controller → tách vào service.

---

## 4) Quy ước bổ trợ

- Comment: dùng JSDoc/TSDoc cho hàm export và module công khai; comment ngắn gọn, tập trung vào “tại sao”.
- TODO/FIXME: `// TODO(username): ...`, `// FIXME: ...` kèm ngữ cảnh.
- Log: phía web chỉ `warn|error`; phía server có thể `info` trong script/batch, hạn chế trong request path.
- Git: tránh commit thừa file build (`.next`, `build`), khoá package lock theo công cụ hiện tại.

---

## 5) Công cụ & tự động hoá (khuyến nghị)

- Prettier bắt buộc trước commit (pre-commit hook với `lint-staged` nếu muốn).
- ESLint chạy trong CI (đẩy cảnh báo thành lỗi với PR quan trọng).
- `prettier-plugin-tailwindcss` để sắp xếp class Tailwind nhất quán.
- Thêm script NPM:

```jsonc
// package.json (mỗi app)
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

## 6) Ngoại lệ & áp dụng

- Ưu tiên nhất quán với code hiện tại của repo; khi xung đột, giữ nguyên khu vực cũ, áp dụng tiêu chuẩn mới cho code mới hoặc khi refactor.
- Chuẩn này là về code style, không quy định màu sắc, spacing UI hay component tokens (đó là phần của design system).

