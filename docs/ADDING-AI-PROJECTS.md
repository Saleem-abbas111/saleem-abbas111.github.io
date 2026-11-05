# Adding AI, Agents & Automation projects

All content for this section lives in one file: `src/data/aiProjects.json`.
You never need to edit the components. (Or use the `/admin` page: "AI, Agents & Automation".)

## Add screenshots (images)
1. Put the image files in `public/assets/uploads/ai-projects/restaurant-intelligence/`
   (one folder per project keeps things tidy). PNG or JPG, ideally under 1.5 MB each.
2. In `aiProjects.json`, add them to that project's `images` list:

```json
"images": [
  { "src": "/assets/uploads/ai-projects/restaurant-intelligence/dashboard.png", "caption": "Main dashboard" },
  { "src": "/assets/uploads/ai-projects/restaurant-intelligence/ai-chat.png", "caption": "AI Data Analyst chat" }
]
```
The first image becomes the large preview (or set `"cover"` to pick a different one).
The path always starts with `/assets/...` and does NOT include `public`.

## Add videos
Option A - an MP4 file: put it in the same folder (keep it under ~25 MB), then:
```json
"videos": [
  { "title": "Full walkthrough", "url": "/assets/uploads/ai-projects/restaurant-intelligence/walkthrough.mp4" }
]
```
Option B - a YouTube / Vimeo link (best for big videos, nothing to upload):
```json
"videos": [
  { "title": "AI analyst demo", "url": "https://youtu.be/XXXXXXXXXXX" }
]
```
Optional: `"poster": "/assets/uploads/.../thumb.png"` for a custom thumbnail.
Videos never autoplay.

## Links
- `liveDemo` and `github` are plain URLs in the same file. Leave a value as `""` and that button disappears.

## Add a new project
Copy the whole `{ ... }` block inside `items`, paste it after a comma, and change the text.
Set `"featured": true` only for the one you want in the large layout; others show as cards.
