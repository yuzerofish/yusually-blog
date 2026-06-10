#!/bin/bash
# =============================================================================
# Video Publishing Pipeline
# 视频 → 博客发布脚本
# =============================================================================
#
# 模式1: 手动发视频到多平台后，用这个脚本发博客
#   ./video-publish.sh --urls "bilibili=https://b23.tv/xxx,douyin=https://..." \
#     --title "标题" --desc "描述"
#
# 模式2: 未来对接 MultiPost REST API 自动发布
#   ./video-publish.sh --file video.mp4 --title "标题" --auto-publish

set -euo pipefail
# Allow unbound variables for sourced config
set +u
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="$SCRIPT_DIR/.publish-config"

if [ -f "$CONFIG_FILE" ]; then
  source "$CONFIG_FILE"
fi

BLOG_TOKEN="${BLOG_TOKEN:-$BLOGCMS_API_TOKEN}"
set -u
BLOG_API="https://yusually.it.com/api"

show_help() {
  echo "用法:"
  echo "  ./video-publish.sh --title \"标题\" --desc \"描述\" [options]"
  echo ""
  echo "必填:"
  echo "  --title    <string>  视频/文章标题"
  echo "  --desc     <string>  视频描述"
  echo ""
  echo "选项:"
  echo "  --urls     <string>  平台链接，格式: bilibili=url,douyin=url,xhs=url"
  echo "  --file     <path>    视频文件路径（可选，用于记录）"
  echo "  --tags     <string>  标签，逗号分隔"
  echo "  --type     <string>  类型: text-to-video | ranking | snorkeling"
  echo "  --blog-token <token> 博客 API Token"
  echo "  --help              显示帮助"
  echo ""
  echo "示例:"
  echo "  # 手动发完视频后，用链接发博客"
  echo "  ./video-publish.sh \\"
  echo '    --urls "bilibili=https://b23.tv/xxx,douyin=https://douyin.com/video/yyy" \\'
  echo "    --title \"世界GDP排名2025\" --desc \"2025年可视化\" --tags GDP,经济"
  echo ""
  echo "  # 只发博客（无平台链接）"
  echo "  ./video-publish.sh --title \"新文章\" --desc \"正文\""
  exit 0
}

log_info()  { echo -e "\033[36m[INFO]\033[0m  $*"; }
log_ok()    { echo -e "\033[32m[OK]\033[0m    $*"; }
log_warn()  { echo -e "\033[33m[WARN]\033[0m  $*"; }
log_error() { echo -e "\033[31m[ERROR]\033[0m $*"; }

# Parse args
TITLE=""
DESC=""
URLS=""
VIDEO_FILE=""
TAGS=""
VIDEO_TYPE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --title)      TITLE="$2"; shift 2 ;;
    --desc)       DESC="$2"; shift 2 ;;
    --urls)       URLS="$2"; shift 2 ;;
    --file)       VIDEO_FILE="$2"; shift 2 ;;
    --tags)       TAGS="$2"; shift 2 ;;
    --type)       VIDEO_TYPE="$2"; shift 2 ;;
    --blog-token) BLOG_TOKEN="$2"; shift 2 ;;
    --help|-h)    show_help ;;
    *) log_error "未知参数: $1"; show_help ;;
  esac
done

# Validate
if [ -z "$TITLE" ]; then
  log_error "缺少 --title"
  show_help
fi
if [ -z "$BLOG_TOKEN" ]; then
  log_error "缺少 Blog Token。请在 $CONFIG_FILE 中设置 BLOG_TOKEN"
  exit 1
fi

# Build markdown content
PLATFORM_TABLE=""
if [ -n "$URLS" ]; then
  PLATFORM_TABLE="\n\n### 观看链接\n\n| 平台 | 链接 |\n|------|------|\n"
  IFS=',' read -ra ENTRIES <<< "$URLS"
  for entry in "${ENTRIES[@]}"; do
    platform="${entry%%=*}"
    url="${entry#*=}"
    case "$platform" in
      bilibili|b站) PLATFORM_TABLE+="| B站 | [观看]($url) |\n";;
      douyin|抖音)  PLATFORM_TABLE+="| 抖音 | [观看]($url) |\n";;
      xhs|小红书)    PLATFORM_TABLE+="| 小红书 | [观看]($url) |\n";;
      youtube)      PLATFORM_TABLE+="| YouTube | [观看]($url) |\n";;
      twitter|x)    PLATFORM_TABLE+="| Twitter/X | [观看]($url) |\n";;
      *)            PLATFORM_TABLE+="| $platform | [观看]($url) |\n";;
    esac
  done
fi

TAGS_LINE=""
if [ -n "$TAGS" ]; then
  TAGS_LINE="\n\n**标签**: ${TAGS}"
fi

TYPE_LINE=""
if [ -n "$VIDEO_TYPE" ]; then
  TYPE_LINE="\n\n*视频类型: ${VIDEO_TYPE}*"
fi

MARKDOWN="${DESC}${PLATFORM_TABLE}${TAGS_LINE}${TYPE_LINE}"

log_info "📝 正在发布到博客: $TITLE"

# Call blog API
python3 -c "
import json
payload = {
    'title': '$TITLE',
    'contentMarkdown': '''$MARKDOWN''',
    'status': 'published',
    'locale': 'zh'
}
with open('/tmp/blog-post.json', 'w') as f:
    json.dump(payload, f, ensure_ascii=False)
"

RESPONSE=$(curl -s --max-time 120 "$BLOG_API/posts" \
  -H "Authorization: Bearer $BLOG_TOKEN" \
  -H "Content-Type: application/json" \
  -d @/tmp/blog-post.json 2>&1)

if echo "$RESPONSE" | grep -q '"url"'; then
  BLOG_URL=$(echo "$RESPONSE" | python3 -c "import json,sys; print(json.load(sys.stdin).get('data',{}).get('url',''))" 2>/dev/null)
  log_ok "✅ 博客发布成功!"
  log_ok "🔗 $BLOG_URL"
else
  log_error "❌ 发布失败"
  echo "$RESPONSE" | head -5
  exit 1
fi
