"""
Generuje lekkie wersje mediów portfolio (public/PORTFOLIO), z których korzysta strona.
Oryginały zostają nietknięte. Pliki już aktualne są pomijane, więc skrypt można
uruchamiać po każdym dodaniu projektu:  python optimize_portfolio.py

Obrazy (png/jpg):
  <nazwa>.webp        – podgląd na podstronie projektu (max 2000 px szer., zrzuty stron 1920 px)
  <nazwa>_thumb.webp  – kafelek w siatce (krótszy bok 900 px, bo kafelek jest kwadratem object-cover)
Wideo (mp4):
  <nazwa>_web.mp4     – odtwarzacz na podstronie projektu (max 1280 px, H.264 CRF 26, faststart)
  <nazwa>_thumb.mp4   – zapętlony kafelek w siatce (krótszy bok 640 px, bez dźwięku)
  <nazwa>_poster.webp – pierwsza klatka, widoczna zanim wideo się wczyta
"""
import subprocess
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).parent
PORTFOLIO = ROOT / "public" / "PORTFOLIO"
FFMPEG = ROOT / "node_modules" / "ffmpeg-static" / ("ffmpeg.exe" if sys.platform == "win32" else "ffmpeg")
GENERATED = ("_mobile", "_thumb", "_web", "_poster")

Image.MAX_IMAGE_PIXELS = None


def is_fresh(src: Path, out: Path) -> bool:
    return out.exists() and out.stat().st_mtime >= src.stat().st_mtime


def resize_to(im: Image.Image, width: int | None = None, short_side: int | None = None) -> Image.Image:
    w, h = im.size
    scale = 1.0
    if width:
        scale = min(1.0, width / w)
    if short_side:
        scale = min(1.0, short_side / min(w, h))
    if scale < 1.0:
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
    return im


def save_webp(im: Image.Image, out: Path, quality: int) -> None:
    has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
    im = im.convert("RGBA" if has_alpha else "RGB")
    im.save(out, "WEBP", quality=quality, method=6)


def process_image(src: Path) -> None:
    full, thumb = src.with_suffix(".webp"), src.with_name(src.stem + "_thumb.webp")
    if is_fresh(src, full) and is_fresh(src, thumb):
        return
    im = Image.open(src)
    max_w = 1920 if src.parent.name == "STRONY" else 2000
    save_webp(resize_to(im, width=max_w), full, quality=80)
    save_webp(resize_to(im, short_side=900), thumb, quality=75)
    report(src, full, thumb)


def ffmpeg(*args: str) -> None:
    subprocess.run([str(FFMPEG), "-y", "-loglevel", "error", *args], check=True)


def process_video(src: Path) -> None:
    web = src.with_name(src.stem + "_web.mp4")
    thumb = src.with_name(src.stem + "_thumb.mp4")
    poster = src.with_name(src.stem + "_poster.webp")
    if all(is_fresh(src, o) for o in (web, thumb, poster)):
        return
    ffmpeg("-i", str(src), "-vf", "scale='min(1280,iw)':-2", "-c:v", "libx264", "-preset", "slow",
           "-crf", "26", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", str(web))
    ffmpeg("-i", str(src), "-vf", "scale='if(lt(iw,ih),min(640,iw),-2)':'if(lt(iw,ih),-2,min(640,ih))'",
           "-c:v", "libx264", "-preset", "slow", "-crf", "30", "-pix_fmt", "yuv420p", "-an",
           "-movflags", "+faststart", str(thumb))
    frame = src.with_name(src.stem + "_poster.png")
    ffmpeg("-i", str(thumb), "-frames:v", "1", str(frame))
    save_webp(Image.open(frame), poster, quality=75)
    frame.unlink()
    report(src, web, thumb, poster)


def report(src: Path, *outs: Path) -> None:
    mb = lambda p: p.stat().st_size / 1048576
    parts = ", ".join(f"{o.name} {mb(o):.2f} MB" for o in outs)
    print(f"{src.relative_to(PORTFOLIO)} ({mb(src):.1f} MB) -> {parts}")


def main() -> None:
    for src in sorted(PORTFOLIO.rglob("*")):
        if not src.is_file() or any(src.stem.endswith(s) for s in GENERATED):
            continue
        ext = src.suffix.lower()
        if ext in (".png", ".jpg", ".jpeg"):
            process_image(src)
        elif ext == ".mp4":
            process_video(src)


if __name__ == "__main__":
    main()
