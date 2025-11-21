#!/usr/bin/env bash
set -Euo pipefail
trap 'status=$?; printf "[WARN] Command failed (status=%s): %s\n" "$status" "$BASH_COMMAND" >&2' ERR

ROOT="/var/www/mono"
MAX_DEPTH=3
OUTPUT=""
STRICT=0
JSON_OUTPUT=0
SCORE=0
ISSUES=()

usage() {
  cat << 'USAGE_EOF'
Usage: seo_scan.sh [--root PATH] [--max-depth N] [--output FILE] [--json] [--strict] [-h|--help]
Options:
  --root PATH       Root directory to scan (default: /var/www/mono)  
  --max-depth N     Max search depth for find (default: 3)
  --output FILE     Write combined output to FILE (also prints to stdout)
  --json            Output results in JSON format
  --strict          Exit with non-zero code if SEO score < 70
  -h, --help        Show this help and exit

Examples:
  ./seo_scan.sh                                    # Basic scan
  ./seo_scan.sh --json --output reports/seo.json  # JSON output to file
  ./seo_scan.sh --strict --root /path/to/site     # Strict mode with custom path
USAGE_EOF
}

log_json() {
  local level="$1" message="$2"
  if [[ $JSON_OUTPUT -eq 0 ]]; then
    printf "[%s] %s\n" "$level" "$message"
  fi
}

add_issue() {
  local severity="$1" message="$2"
  ISSUES+=("{\"severity\": \"$severity\", \"message\": \"$message\"}")
}

check_html_files() {
  local html_files missing_meta missing_alt jsonld_errors=0
  
  # Find HTML files
  html_files=$(find "$ROOT" -maxdepth "$MAX_DEPTH" -name "*.html" -o -name "*.tsx" -o -name "*.jsx" 2>/dev/null || true)
  
  if [[ -z "$html_files" ]]; then
    log_json "info" "No HTML/TSX/JSX files found to analyze"
    return
  fi
  
  # Check meta descriptions
  missing_meta=$(echo "$html_files" | xargs grep -L "meta.*description" 2>/dev/null | wc -l || echo 0)
  if [[ $missing_meta -gt 0 ]]; then
    add_issue "warning" "$missing_meta HTML files missing meta descriptions"
    ((SCORE -= 5))
  else
    ((SCORE += 10))
  fi
  
  # Check image alt text (simplified)
  missing_alt=$(echo "$html_files" | xargs grep -c "<img[^>]*src[^>]*>" 2>/dev/null | \
    awk -F: '{sum+=$2} END {print sum+0}' || echo 0)
  alt_present=$(echo "$html_files" | xargs grep -c "<img[^>]*alt=" 2>/dev/null | \
    awk -F: '{sum+=$2} END {print sum+0}' || echo 0)
  
  if [[ $missing_alt -gt 0 && $alt_present -lt $missing_alt ]]; then
    add_issue "warning" "Some images may be missing alt text"
    ((SCORE -= 3))
  fi
  
  # Validate JSON-LD (basic syntax check)
  if echo "$html_files" | xargs grep -l "application/ld+json" >/dev/null 2>&1; then
    # Extract and validate JSON-LD blocks
    local jsonld_blocks
    jsonld_blocks=$(echo "$html_files" | xargs grep -A 50 "application/ld+json" 2>/dev/null | \
      sed -n '/<script/,/<\/script>/p' | grep -v "script" || true)
    
    if [[ -n "$jsonld_blocks" ]]; then
      # Simple JSON validation using python if available
      if command -v python3 >/dev/null 2>&1; then
        echo "$jsonld_blocks" | python3 -c "
import json, sys
try:
    for line in sys.stdin:
        if line.strip() and line.strip() not in ['', '<script', '</script>']:
            json.loads(line.strip())
except json.JSONDecodeError:
    sys.exit(1)
" 2>/dev/null || jsonld_errors=$((jsonld_errors + 1))
      fi
      
      if [[ $jsonld_errors -gt 0 ]]; then
        add_issue "error" "Invalid JSON-LD syntax detected"
        ((SCORE -= 10))
      else
        ((SCORE += 15))
        log_json "info" "Valid JSON-LD structured data found"
      fi
    fi
  fi
}

calculate_seo_score() {
  SCORE=50  # Base score
  
  # Check for essential SEO files
  [[ -f "$ROOT/robots.txt" || -f "$ROOT/public/robots.txt" || -f "$ROOT/apps/web/public/robots.txt" ]] && {
    ((SCORE += 10))
    log_json "info" "robots.txt found"
  } || {
    add_issue "warning" "robots.txt not found"
    ((SCORE -= 5))
  }
  
  # Check for sitemap
  if find "$ROOT" -name "sitemap*.xml" -o -name "sitemap*.txt" | head -1 | grep -q .; then
    ((SCORE += 15))
    log_json "info" "Sitemap found"
  else
    add_issue "warning" "No sitemap found"
    ((SCORE -= 10))
  fi
  
  # Check for structured data
  local jsonld_count
  jsonld_count=$(grep -r "application/ld+json" "$ROOT" 2>/dev/null | wc -l || echo 0)
  if [[ $jsonld_count -gt 0 ]]; then
    ((SCORE += 10))
    log_json "info" "Structured data (JSON-LD) found: $jsonld_count instances"
  fi
  
  # Check for Open Graph / Twitter meta
  local og_count
  og_count=$(grep -r "og:\|twitter:" "$ROOT" --include="*.html" --include="*.tsx" --include="*.jsx" 2>/dev/null | wc -l || echo 0)
  if [[ $og_count -gt 0 ]]; then
    ((SCORE += 10))
    log_json "info" "Social media meta tags found: $og_count"
  else
    add_issue "info" "Consider adding Open Graph/Twitter meta tags"
  fi
  
  # Ensure score is within bounds
  [[ $SCORE -lt 0 ]] && SCORE=0
  [[ $SCORE -gt 100 ]] && SCORE=100
}

output_results() {
  calculate_seo_score
  check_html_files
  
  if [[ $JSON_OUTPUT -eq 1 ]]; then
    # JSON output
    cat << JSON_EOF
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "scan_root": "$ROOT",
  "max_depth": $MAX_DEPTH,
  "seo_score": $SCORE,
  "grade": "$(
    if [[ $SCORE -ge 90 ]]; then echo "A"
    elif [[ $SCORE -ge 80 ]]; then echo "B" 
    elif [[ $SCORE -ge 70 ]]; then echo "C"
    elif [[ $SCORE -ge 60 ]]; then echo "D"
    else echo "F"
    fi
  )",
  "issues": [$(IFS=,; echo "${ISSUES[*]}")],
  "recommendations": [
    $(if [[ $SCORE -lt 70 ]]; then echo '"Improve SEO fundamentals (robots.txt, sitemap, meta descriptions)"'; fi)
    $(if [[ ${#ISSUES[@]} -gt 0 ]]; then echo ',"Address identified issues for better SEO performance"'; fi)
  ]
}
JSON_EOF
  else
    # Text output
    printf "\n=== SEO SCAN RESULTS ===\n"
    printf "Root: %s\n" "$ROOT"
    printf "Score: %d/100 (Grade: " "$SCORE"
    if [[ $SCORE -ge 90 ]]; then printf "A)\n"
    elif [[ $SCORE -ge 80 ]]; then printf "B)\n"
    elif [[ $SCORE -ge 70 ]]; then printf "C)\n" 
    elif [[ $SCORE -ge 60 ]]; then printf "D)\n"
    else printf "F)\n"
    fi
    
    if [[ ${#ISSUES[@]} -gt 0 ]]; then
      printf "\nIssues Found:\n"
      for issue in "${ISSUES[@]}"; do
        printf "  • %s\n" "$(echo "$issue" | sed 's/.*"message": "\([^"]*\)".*/\1/')"
      done
    fi
    
    printf "\nRecommendations:\n"
    if [[ $SCORE -lt 70 ]]; then
      printf "  • Focus on SEO fundamentals: ensure robots.txt, sitemap, and meta descriptions are present\n"
    fi
    if [[ ${#ISSUES[@]} -gt 0 ]]; then
      printf "  • Address the issues listed above for improved SEO performance\n"
    fi
    if [[ $SCORE -ge 80 ]]; then
      printf "  • Great job! Consider advanced optimizations like schema markup and performance tuning\n"
    fi
  fi
}

# Parse arguments
while (($#)); do
  case "$1" in
    --root)
      [[ $# -ge 2 ]] || { printf "Missing value for --root\n" >&2; exit 2; }
      ROOT="$2"; shift 2;;
    --max-depth)
      [[ $# -ge 2 ]] || { printf "Missing value for --max-depth\n" >&2; exit 2; }
      MAX_DEPTH="$2"; shift 2;;
    --output)
      [[ $# -ge 2 ]] || { printf "Missing value for --output\n" >&2; exit 2; }
      OUTPUT="$2"; shift 2;;
    --json)
      JSON_OUTPUT=1; shift;;
    --strict)
      STRICT=1; shift;;
    -h|--help)
      usage; exit 0;;
    *)
      printf "Unknown option: %s\n" "$1" >&2; usage; exit 2;;
  esac
done

# Redirect output if needed
if [[ -n "$OUTPUT" ]]; then
  if [[ "$OUTPUT" == */* ]]; then OUTDIR="${OUTPUT%/*}"; else OUTDIR="."; fi
  mkdir -p "$OUTDIR"
  if [[ $JSON_OUTPUT -eq 1 ]]; then
    # For JSON, write directly to file without tee
    exec > "$OUTPUT"
  else
    exec > >(tee -a "$OUTPUT") 2>&1
    log_json "info" "Logging to $OUTPUT"
  fi
fi

# Original scan output (only if not JSON mode)
if [[ $JSON_OUTPUT -eq 0 ]]; then
  printf "\n=== inventory (top-level of %s) ===\n" "$ROOT"
  ls -la "$ROOT" 2>/dev/null | head -20 || true

  printf "\n=== find framework & seo-related files (depth<=%s) ===\n" "$MAX_DEPTH"
  find "$ROOT" -maxdepth "$MAX_DEPTH" -type f \( \
    -name "package.json" -o -name "next.config.*" -o -name "nuxt.config.*" -o \
    -name "composer.json" -o -name "Gemfile" -o -name "go.mod" -o \
    -name "requirements.txt" -o -name "pyproject.toml" -o -name "manage.py" -o \
    -name "pom.xml" -o -name "build.gradle*" -o -name "README*" -o \
    -name "robots.txt" -o -name "sitemap*" -o -name "Caddyfile" -o -name "nginx.conf" \
  \) -ls 2>/dev/null | sed -n "1,200p" || true

  printf "\n=== grep for SEO signals (limited) ===\n"
  pattern='sitemap|robots\.txt|canonical|application/ld\+json|og:|twitter:'
  grep -R -n -E --color=never --binary-files=without-match \
    --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=dist \
    --exclude-dir=build --exclude-dir=.next --exclude-dir=.nuxt \
    --exclude="*.min.*" --exclude="*.map" \
    -e "$pattern" \
    -- "$ROOT" 2>/dev/null | sed -n "1,50p" || true
fi

# Enhanced results
output_results

# Handle strict mode
if [[ $STRICT -eq 1 && $SCORE -lt 70 ]]; then
  if [[ $JSON_OUTPUT -eq 0 ]]; then
    printf "\n[FAIL] SEO score %d is below threshold (70)\n" "$SCORE" >&2
  fi
  exit 1
fi
