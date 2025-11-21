Cloudflare edge header setup (b-audio.vn + api.b-audio.vn)

Goal: remove unsupported Permissions-Policy values Cloudflare injects and set a sanitized header.

Dashboard steps (recommended)
- Rules → Transform Rules → HTTP Response Header Modification → Create rule

For b-audio.vn
- Rule A (Remove)
  - When: Hostname equals b-audio.vn
  - Then: Remove header → Permissions-Policy
- Rule B (Set)
  - When: Hostname equals b-audio.vn
  - Then: Set static header → Permissions-Policy
  - Value: geolocation=(), camera=(), microphone=(), fullscreen=(self), autoplay=(self)
  - Behavior: Always override

For api.b-audio.vn
- Rule C (Remove)
  - When: Hostname equals api.b-audio.vn
  - Then: Remove header → Permissions-Policy
- Rule D (Set)
  - When: Hostname equals api.b-audio.vn
  - Then: Set static header → Permissions-Policy
  - Value: geolocation=(), camera=(), microphone=(), fullscreen=(self), autoplay=(self)
  - Behavior: Always override

Order: Make sure the Remove rule is evaluated before the Set rule.

Purge + verify
- Caching → Configuration → Purge Everything
- Verify:
  - curl -s -I https://b-audio.vn | rg -i '^permissions-policy'
  - curl -s -I https://api.b-audio.vn | rg -i '^permissions-policy'
  - Expect exactly one header with the sanitized value.

Optional: Cloudflare API (template)
- You can manage the rules programmatically via Rulesets API. Replace placeholders: CF_API_TOKEN, ACCOUNT_ID, ZONE_ID.

```bash
# Get rulesets
curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
  https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets | jq .

# Create a http_response_headers_transform ruleset or update existing one.
# See API docs: https://developers.cloudflare.com/rules/transform/managed-transforms/api/
```

Disable Browser Insights (to silence beacon.min.js blocked by CSP)
- Analytics & Logs → Web Analytics → Browser Insights → Turn off (or disable for paths /admin* via a Rule) on both zones.

