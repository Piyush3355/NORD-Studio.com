import subprocess
import os
import shutil

OUT_DIR = "/home/piyush3355/Documents/NORD-Studio.com-main/brand-assets"
PUB_DIR = "/home/piyush3355/Documents/NORD-Studio.com-main/public/brand"
SCRATCH_DIR = "/tmp/nord_brand_render"
os.makedirs(SCRATCH_DIR, exist_ok=True)

# Generate HTML templates for Chrome headless screenshots

# Template 1: Solid Dark Square Avatar (1024x1024)
html_avatar_dark = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1024px;
    height: 1024px;
    background: #0A0A0A;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
</style>
</head>
<body>
  <div style="width: 580px; height: 580px;">
    <!-- Embedded SVG -->
    __SVG_CONTENT__
  </div>
</body>
</html>
"""

# Template 2: Rounded Squircle Avatar (1024x1024) on transparent
html_avatar_squircle = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1024px;
    height: 1024px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .card {
    width: 960px;
    height: 960px;
    background: #0A0A0A;
    border-radius: 220px;
    border: 2px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8), 0 0 80px rgba(245, 158, 11, 0.08);
  }
</style>
</head>
<body>
  <div class="card">
    <div style="width: 540px; height: 540px;">
      __SVG_CONTENT__
    </div>
  </div>
</body>
</html>
"""

# Template 3: Transparent Icon (1024x1024)
html_icon_transparent = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1024px;
    height: 1024px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
</style>
</head>
<body>
  <div style="width: 760px; height: 760px;">
    __SVG_CONTENT__
  </div>
</body>
</html>
"""

# Template 4: Full Horizontal Logo Dark (2400x720)
html_full_dark = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=JetBrains+Mono:wght@600&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 2400px;
    height: 720px;
    background: #0A0A0A;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 90px;
  }
  .icon {
    width: 380px;
    height: 380px;
  }
  .text-group {
    display: flex;
    align-items: baseline;
    gap: 20px;
  }
  .nord {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 280px;
    color: #FFFFFF;
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .studio {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
    font-size: 80px;
    color: #F59E0B;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    line-height: 1;
    margin-left: 10px;
  }
</style>
</head>
<body>
  <div class="brand">
    <div class="icon">
      __SVG_CONTENT__
    </div>
    <div class="text-group">
      <span class="nord">NORD</span>
      <span class="studio">STUDIO</span>
    </div>
  </div>
</body>
</html>
"""

# Template 5: Full Horizontal Logo Transparent (2400x720)
html_full_transparent = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=JetBrains+Mono:wght@600&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 2400px;
    height: 720px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 90px;
  }
  .icon {
    width: 380px;
    height: 380px;
  }
  .text-group {
    display: flex;
    align-items: baseline;
    gap: 20px;
  }
  .nord {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 280px;
    color: #FFFFFF;
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .studio {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
    font-size: 80px;
    color: #F59E0B;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    line-height: 1;
    margin-left: 10px;
  }
</style>
</head>
<body>
  <div class="brand">
    <div class="icon">
      __SVG_CONTENT__
    </div>
    <div class="text-group">
      <span class="nord">NORD</span>
      <span class="studio">STUDIO</span>
    </div>
  </div>
</body>
</html>
"""

def generate_svg_inner():
    w = 600
    h = 600
    cx = 300
    cy = 300
    r = w * 0.48
    ri = r * 0.88

    top_face = f"{cx},{cy - r * 0.92} {cx + ri * 0.86},{cy - ri * 0.44} {cx},{cy} {cx - ri * 0.86},{cy - ri * 0.44}"
    left_face = f"{cx - ri * 0.86},{cy - ri * 0.44} {cx},{cy} {cx},{cy + r * 0.92} {cx - ri * 0.86},{cy + ri * 0.44}"
    right_face = f"{cx + ri * 0.86},{cy - ri * 0.44} {cx},{cy} {cx},{cy + r * 0.92} {cx + ri * 0.86},{cy + ri * 0.44}"

    sw = w * 0.075
    n_path = (
        f"M {cx - ri * 0.55} {cy + ri * 0.18} L {cx - ri * 0.55} {cy + ri * 0.84} "
        f"M {cx + ri * 0.55} {cy - ri * 0.18} L {cx + ri * 0.55} {cy + ri * 0.62} "
        f"M {cx - ri * 0.55} {cy + ri * 0.18} L {cx + ri * 0.55} {cy + ri * 0.62}"
    )

    return f"""<svg width="100%" height="100%" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="ng" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="ambglow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.22" />
          <stop offset="100%" stop-color="#F59E0B" stop-opacity="0" />
        </radialGradient>
      </defs>

      <circle cx="{cx}" cy="{cy}" r="{r * 1.18}" fill="url(#ambglow)" />

      <!-- Faces -->
      <polygon points="{top_face}" fill="#F59E0B" fill-opacity="0.97" />
      <polygon points="{left_face}" fill="#D97706" fill-opacity="0.93" />
      <polygon points="{right_face}" fill="#B45309" fill-opacity="0.88" />

      <!-- Edge lines -->
      <polygon points="{top_face}" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="8" stroke-linejoin="round" />
      <polygon points="{left_face}" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="8" stroke-linejoin="round" />
      <polygon points="{right_face}" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="8" stroke-linejoin="round" />

      <!-- Center spine -->
      <line x1="{cx}" y1="{cy - r * 0.9}" x2="{cx}" y2="{cy + r * 0.9}" stroke="rgba(255,255,255,0.3)" stroke-width="7" stroke-linecap="round" />

      <!-- Architectural N -->
      <path d="{n_path}" stroke="#FFFFFF" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" filter="url(#ng)" />
    </svg>"""

svg_code = generate_svg_inner()

targets = [
    ("nord-avatar.html", html_avatar_dark.replace("__SVG_CONTENT__", svg_code), "nord-avatar-1024.png", 1024, 1024),
    ("nord-avatar-squircle.html", html_avatar_squircle.replace("__SVG_CONTENT__", svg_code), "nord-avatar-squircle-1024.png", 1024, 1024),
    ("nord-icon-transparent.html", html_icon_transparent.replace("__SVG_CONTENT__", svg_code), "nord-icon-transparent-1024.png", 1024, 1024),
    ("nord-logo-full-dark.html", html_full_dark.replace("__SVG_CONTENT__", svg_code), "nord-logo-full-dark-2400.png", 2400, 720),
    ("nord-logo-full-transparent.html", html_full_transparent.replace("__SVG_CONTENT__", svg_code), "nord-logo-full-transparent-2400.png", 2400, 720),
]

for html_name, content, png_name, w, h in targets:
    html_path = os.path.join(SCRATCH_DIR, html_name)
    with open(html_path, "w") as f:
        f.write(content)
    
    png_out = os.path.join(OUT_DIR, png_name)
    print(f"Rendering {png_name} ({w}x{h})...")
    cmd = [
        "google-chrome",
        "--headless",
        "--disable-gpu",
        "--hide-scrollbars",
        f"--window-size={w},{h}",
        f"--screenshot={png_out}",
        f"file://{html_path}"
    ]
    subprocess.run(cmd, check=True)
    
    # Also copy to public/brand
    shutil.copy(png_out, os.path.join(PUB_DIR, png_name))

print("All PNG assets rendered and synced to brand-assets and public/brand!")
