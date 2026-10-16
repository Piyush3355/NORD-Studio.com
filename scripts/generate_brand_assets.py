import os
import subprocess

OUT_DIR = "/home/piyush3355/Documents/NORD-Studio.com-main/brand-assets"
PUB_DIR = "/home/piyush3355/Documents/NORD-Studio.com-main/public/brand"
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(PUB_DIR, exist_ok=True)

# 1. Avatar SVG (1024x1024)
def get_cube_svg(size=600, show_filter=True):
    w = size
    h = size
    cx = w / 2
    cy = h / 2
    r = w * 0.48
    ri = r * 0.88

    top_face = f"{cx},{cy - r * 0.92} {cx + ri * 0.86},{cy - ri * 0.44} {cx},{cy} {cx - ri * 0.86},{cy - ri * 0.44}"
    left_face = f"{cx - ri * 0.86},{cy - ri * 0.44} {cx},{cy} {cx},{cy + r * 0.92} {cx - ri * 0.86},{cy + ri * 0.44}"
    right_face = f"{cx + ri * 0.86},{cy - ri * 0.44} {cx},{cy} {cx},{cy + r * 0.92} {cx + ri * 0.86},{cy + ri * 0.44}"

    sw = size * 0.075
    n_path = (
        f"M {cx - ri * 0.55} {cy + ri * 0.18} L {cx - ri * 0.55} {cy + ri * 0.84} "
        f"M {cx + ri * 0.55} {cy - ri * 0.18} L {cx + ri * 0.55} {cy + ri * 0.62} "
        f"M {cx - ri * 0.55} {cy + ri * 0.18} L {cx + ri * 0.55} {cy + ri * 0.62}"
    )

    filter_def = """
      <defs>
        <filter id="ng" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="ambglow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.18" />
          <stop offset="100%" stop-color="#F59E0B" stop-opacity="0" />
        </radialGradient>
      </defs>
    """ if show_filter else ""

    svg = f"""{filter_def}
      <!-- Ambient backing glow -->
      <circle cx="{cx}" cy="{cy}" r="{r * 1.15}" fill="url(#ambglow)" />

      <!-- Cube planes -->
      <polygon points="{top_face}" fill="#F59E0B" fill-opacity="0.97" />
      <polygon points="{left_face}" fill="#D97706" fill-opacity="0.93" />
      <polygon points="{right_face}" fill="#B45309" fill-opacity="0.88" />

      <!-- Clean architectural outlines -->
      <polygon points="{top_face}" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="{size * 0.015}" stroke-linejoin="round" />
      <polygon points="{left_face}" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="{size * 0.015}" stroke-linejoin="round" />
      <polygon points="{right_face}" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="{size * 0.015}" stroke-linejoin="round" />

      <!-- Vertical center spine -->
      <line x1="{cx}" y1="{cy - r * 0.9}" x2="{cx}" y2="{cy + r * 0.9}" stroke="rgba(255,255,255,0.3)" stroke-width="{size * 0.014}" stroke-linecap="round" />

      <!-- Signature Architectural 'N' mark -->
      <path d="{n_path}" stroke="#FFFFFF" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" filter="url(#ng)" />
    """
    return svg

# Save standalone vector SVG icon
svg_icon = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600" fill="none">
{get_cube_svg(600)}
</svg>"""
with open(f"{OUT_DIR}/nord-logo-icon.svg", "w") as f:
    f.write(svg_icon)

# Save dark avatar SVG
svg_avatar = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024" fill="none">
  <rect width="1024" height="1024" fill="#0A0A0A" />
  <g transform="translate(212, 212)">
    {get_cube_svg(600)}
  </g>
</svg>"""
with open(f"{OUT_DIR}/nord-avatar.svg", "w") as f:
    f.write(svg_avatar)

print("SVGs written successfully")
