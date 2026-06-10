#!/bin/bash
# =============================================================================
# Video Production & Publishing Pipeline
# 视频生产 → MultiPost 多平台发布 → 博客发布 一站式脚本
# =============================================================================
# Usage:
#   ./video-publish.sh --file /path/to/video.mp4 --title "标题" [options]
#
# Options:
#   --file       <path>    视频文件路径 (必填)
#   --title      <string>  视频标题 (必填)
#   --desc       <string>  视频描述/文案
#   --tags       <string>  标签，逗号分隔 (如: "旅行,浮潜,巴西")
#   --cover      <path>    视频封面图路径
#   --type       <string>  视频类型: text-to-video | ranking | snorkeling (默认 auto)
#   --platforms  <string>  发布平台，逗号分隔 (默认: bilibili,douyin,xiaohongshu)
#   --blog       <flag>    同时发布到个人博客 (默认开启)
#   --mp-token   <string>  MultiPost API Token
#   --blog-token <string>  博客 API Token
#   --dry-run    <flag>    只打印要执行的步骤，不实际执行
#   --help       <flag>    显示帮助
#
# Examples:
#   ./video-publish.sh --file ~/remotion-output/output.mp4 --title "世界GDP排名2025" \
#     --desc "2025年世界各国GDP排名可视化" --tags "GDP,经济,排名" --type ranking
#
#   ./video-publish.sh --file ~/ai-video-output/video.mp4 --title "巴西浮潜攻略" \
#     --desc "巴西Bonito透明河流浮潜体验" --platforms bilibili,douyin

set -euo pipefail

# =============================================================================
# Configuration
# =============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# Default output directories for different video types
TEXT_TO_VIDEO_DIR="$HOME/ai-video-output"
RANKING_VIDEO_DIR="$HOME/remotion-output"
HYPERFRAMES_DIR="$HOME/hyperframes-output"

# MultiPost API
MP_API_BASE="https://api.multipost.app/v1"

# Blog API
BLOG_API_BASE="https://yusually.it.com/api"

# Config file for tokens
CONFIG_FILE="$SCRIPT_DIR/.publish-config"

# Load config if exists
if [ -f "$CONFIG_FILE" ]; then
  source "$CONFIG_FILE"
fi

# =============================================================================
# Functions
# =============================================================================

log_info()  { echo -e "\033[36m[INFO]\033[0m  $*"; }
log_ok()    { echo -e "\033[32m[OK]\033[0m    $*"; }
log_warn()  { echo -e "\033[33m[WARN]\033[0m  $*"; }
log_error() { echo -e "\033[31m[ERROR]\033[0m $*"; }

show_help() {
  sed -n '/^# Usage:/,/^  --help/p' "$0" | head -n -1
  exit 0
}

# Detect video type based on file path or explicit flag
detect_video_type() {
  local file="$1"
  local type_hint="$2"

  case "$type_hint" in
    text-to-video|ttv) echo "text-to-video"; return;;
    ranking|data)      echo "ranking"; return;;
    snorkeling)        echo "snorkeling"; return;;
    auto|*) ;;
  esac

  case "$file" in
    *"$TEXT_TO_VIDEO_DIR"*)   echo "text-to-video";;
    *"$RANKING_VIDEO_DIR"*)    echo "ranking";;
    *"remotion-output"*)       echo "ranking";;
    *"hyperframes-output"*)    echo "text-to-video";;
    *)                         echo "unknown";;
  esac
}

# Convert tag to B站 format (comma-separated)
format_tags_bilibili() {
  IFS=',' read -ra TAGS <<< "$1"
  for tag in "${TAGS[@]}"; do
    echo "\"$(echo "$tag" | xargs)\""
  done | paste -sd, -
}

# =============================================================================
# Step 1: Validate & Parse Input
# =============================================================================

MP_TOKEN="${MP_TOKEN:-$MP_API_TOKEN}"
BLOG_TOKEN="${BLOG_TOKEN:-$BLOGCMS_API_TOKEN}"
VIDEO_FILE=""
VIDEO_TITLE=""
VIDEO_DESC=""
VIDEO_TAGS=""
VIDEO_COVER=""
VIDEO_TYPE="auto"
PLATFORMS="bilibili,douyin,xiaohongshu"
PUBLISH_BLOG=true
DRY_RUN=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --file)      VIDEO_FILE="$2"; shift 2 ;;
    --title)     VIDEO_TITLE="$2"; shift 2 ;;
    --desc)      VIDEO_DESC="$2"; shift 2 ;;
    --tags)      VIDEO_TAGS="$2"; shift 2 ;;
    --cover)     VIDEO_COVER="$2"; shift 2 ;;
    --type)      VIDEO_TYPE="$2"; shift 2 ;;
    --platforms) PLATFORMS="$2"; shift 2 ;;
    --no-blog)   PUBLISH_BLOG=false; shift ;;
    --mp-token)  MP_TOKEN="$2"; shift 2 ;;
    --blog-token) BLOG_TOKEN="$2"; shift 2 ;;
    --dry-run)   DRY_RUN=true; shift ;;
    --help|-h)   show_help ;;
    *)           log_error "未知参数: $1"; show_help ;;
  esac
done

# Validate required params
if [ -z "$VIDEO_FILE" ] || [ -z "$VIDEO_TITLE" ]; then
  log_error "缺少必要参数: --file 和 --title"
  show_help
fi

if [ ! -f "$VIDEO_FILE" ]; then
  log_error "视频文件不存在: $VIDEO_FILE"
  exit 1
fi

if [ "$PUBLISH_BLOG" = true ] && [ -z "$BLOG_TOKEN" ]; then
  log_warn "未设置 BLOG_TOKEN，博客发布将跳过"
  PUBLISH_BLOG=false
fi

# Detect video type
VIDEO_TYPE=$(detect_video_type "$VIDEO_FILE" "$VIDEO_TYPE")
FILE_SIZE=$(stat -f%z "$VIDEO_FILE" 2>/dev/null || stat -c%s "$VIDEO_FILE" 2>/dev/null)
FILE_NAME=$(basename "$VIDEO_FILE")

# =============================================================================
# Pipeline Header
# =============================================================================

clear
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║           🎬  Video Publishing Pipeline                     ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
log_info "视频文件:  $VIDEO_FILE ($(echo "scale=1; $FILE_SIZE/1048576" | bc)MB)"
log_info "视频标题:  $VIDEO_TITLE"
log_info "视频类型:  $VIDEO_TYPE"
log_info "目标平台:  $PLATFORMS"
log_info "发布博客:  $PUBLISH_BLOG"
echo ""

if [ "$DRY_RUN" = true ]; then
  log_warn "🟡 DRY RUN 模式 — 仅预览，不会实际执行"
  echo ""
fi

# =============================================================================
# Step 2: Publish to MultiPost Platform
# =============================================================================

publish_to_platform() {
  local platform="$1"
  local upload_type

  case "$platform" in
    bilibili|b站)      upload_type="bilibili"; platform_label="B站";;
    douyin|抖音)       upload_type="douyin"; platform_label="抖音";;
    xiaohongshu|小红书) upload_type="xiaohongshu"; platform_label="小红书";;
    kuaishou|快手)     upload_type="kuaishou"; platform_label="快手";;
    twitter|x)         upload_type="twitter"; platform_label="Twitter/X";;
    youtube)           upload_type="youtube"; platform_label="YouTube";;
    *)                 log_warn "不支持的平台: $platform"; return 1;;
  esac

  echo ""
  log_info "📤 正在上传到 $platform_label ..."

  if [ "$DRY_RUN" = true ]; then
    log_info "  curl -X POST $MP_API_BASE/publish"
    log_info "    -H \"Authorization: Bearer \$MP_TOKEN\""
    log_info "    -F \"platform=$upload_type\""
    log_info "    -F \"video=@$VIDEO_FILE\""
    log_info "    -F \"title=$VIDEO_TITLE\""
    log_info "    -F \"content=$VIDEO_DESC\""
    log_info "    -F \"tags=$VIDEO_TAGS\""
    [ -n "$VIDEO_COVER" ] && log_info "    -F \"cover=@$VIDEO_COVER\""
    return 0
  fi

  if [ -z "$MP_TOKEN" ]; then
    log_warn "跳过 $platform_label — 未设置 MultiPost Token"
    return 1
  fi

  # Build curl command
  local curl_cmd=(
    curl -s --max-time 300
    -X POST "$MP_API_BASE/publish"
    -H "Authorization: Bearer $MP_TOKEN"
    -F "platform=$upload_type"
    -F "video=@$VIDEO_FILE"
    -F "title=$VIDEO_TITLE"
  )

  [ -n "$VIDEO_DESC" ]  && curl_cmd+=(-F "content=$VIDEO_DESC")
  [ -n "$VIDEO_TAGS" ]  && curl_cmd+=(-F "tags=$VIDEO_TAGS")
  [ -n "$VIDEO_COVER" ] && curl_cmd+=(-F "cover=@$VIDEO_COVER")

  local response
  response=$("${curl_cmd[@]}" 2>&1) || true

  if echo "$response" | grep -q '"id"\|"success"\|"ok"'; then
    log_ok "✅ $platform_label 发布成功！"
    echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
    return 0
  else
    log_error "❌ $platform_label 发布失败"
    echo "$response"
    return 1
  fi
}

echo ""
log_info "══════════ 步骤 1: 多平台发布 ══════════"

IFS=',' read -ra TARGET_PLATFORMS <<< "$PLATFORMS"
PUBLISH_RESULTS=""
PUBLISH_SUCCESS=false

for platform in "${TARGET_PLATFORMS[@]}"; do
  platform=$(echo "$platform" | xargs)  # trim
  if publish_to_platform "$platform"; then
    PUBLISH_SUCCESS=true
    PUBLISH_RESULTS="${PUBLISH_RESULTS}${platform},"
  fi
done

# =============================================================================
# Step 3: Publish to Blog (after successful upload)
# =============================================================================

if [ "$PUBLISH_BLOG" = true ] && [ "$PUBLISH_SUCCESS" = true ]; then
  echo ""
  log_info "══════════ 步骤 2: 发布到个人博客 ══════════"

  # Build blog post content
  VIDEO_FILE_SIZE=$(echo "scale=1; $FILE_SIZE/1048576" | bc)
  BLOG_CONTENT=$(cat << ENDCONTENT
## $VIDEO_TITLE

$VIDEO_DESC

---

### 已发布平台

| 平台 | 状态 |
|------|------|
$(for p in $(echo "$PUBLISH_RESULTS" | tr ',' ' '); do
  case "$p" in
    bilibili) echo "| B站 | ✅ 已发布 |";;
    douyin)   echo "| 抖音 | ✅ 已发布 |";;
    xiaohongshu) echo "| 小红书 | ✅ 已发布 |";;
    *)        echo "| $p | ✅ 已发布 |";;
  esac
done)

---

**视频类型**: ${VIDEO_TYPE}
**文件大小**: ${VIDEO_FILE_SIZE}MB
ENDCONTENT
)

  log_info "📝 正在发布到博客..."

  if [ "$DRY_RUN" = true ]; then
    log_info "  POST $BLOG_API_BASE/posts"
    log_info "  Title: $VIDEO_TITLE"
    log_info ""
    echo "$BLOG_CONTENT"
    return 0
  fi

  # Call blog API
  BLOG_PAYLOAD=$(python3 -c "
import json
markdown = '''$BLOG_CONTENT'''
payload = {
    'title': '$VIDEO_TITLE',
    'contentMarkdown': markdown,
    'status': 'published',
    'locale': 'zh',
    'tags': ['$(echo "$VIDEO_TAGS" | tr ',' ' ' | xargs | tr ' ' ',')'.split(',') if '$VIDEO_TAGS' else [],
  }
print(json.dumps(payload))
")

  BLOG_RESPONSE=$(curl -s --max-time 15 "$BLOG_API_BASE/posts" \
    -H "Authorization: Bearer $BLOG_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$BLOG_PAYLOAD" 2>&1) || true

  if echo "$BLOG_RESPONSE" | grep -q '"id"\|"url"'; then
    BLOG_URL=$(echo "$BLOG_RESPONSE" | python3 -c "import json,sys; print(json.load(sys.stdin).get('data',{}).get('url',''))" 2>/dev/null)
    log_ok "✅ 博客文章已发布: $BLOG_URL"
  else
    log_error "❌ 博客发布失败"
    echo "$BLOG_RESPONSE"
  fi

elif [ "$PUBLISH_BLOG" = true ] && [ "$PUBLISH_SUCCESS" != true ]; then
  log_warn "跳过博客发布 — 所有平台发布都失败了"
fi

# =============================================================================
# Summary
# =============================================================================

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    📋  Pipeline Summary                     ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
log_info "视频:    $VIDEO_TITLE"
log_info "类型:    $VIDEO_TYPE"
log_info "大小:    $(echo "scale=1; $FILE_SIZE/1048576" | bc)MB"

echo ""
log_info "发布结果:"
for p in "${TARGET_PLATFORMS[@]}"; do
  p=$(echo "$p" | xargs)
  if echo "$PUBLISH_RESULTS" | grep -q "$p"; then
    log_ok "  ✅ $p — 已发布"
  else
    log_warn "  ⬜ $p — 未发布"
  fi
done

if [ "$PUBLISH_BLOG" = true ] && [ -n "$BLOG_URL" ]; then
  log_ok "  ✅ 博客 — $BLOG_URL"
fi

echo ""
log_info "💡 提示: 运行 ./scripts/save-publish-config.sh 保存 Token 配置，避免每次输入"

exit 0
