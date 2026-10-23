"""
Robi zrzuty strony klienta do portfolio (public/PORTFOLIO/STRONY).

  python screenshot_website.py STALLOFT https://stalloft.pl/
  python screenshot_website.py STALLOFT https://stalloft.pl/ --only-thumbs

Pliki:
  <NAZWA>_FULL.png            – cała strona, 1920 px szer. (podstrona projektu)
  <NAZWA>_THUMBNAIL.png       – góra strony 16:9 (kafel na telefonie i tablecie)
  <NAZWA>_THUMBNAIL_WIDE.png  – góra strony ~2:1, dokładnie w proporcjach szerokiego kafla w mozaice na komputerze
  <NAZWA>_THUMBNAIL_mobile.webp

Po zrzutach uruchom:  python optimize_portfolio.py
"""
import argparse
import time
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

OUT = Path(__file__).parent / "public" / "PORTFOLIO" / "STRONY"
HIDE_BANNERS = """[id*="cookie" i],[class*="cookie" i],[id*="gdpr" i],[class*="gdpr" i],
#cmplz-cookiebanner-container,#moove_gdpr_cookie_info_bar{display:none!important}"""

# Szeroki kafel = 2 kolumny + odstęp, wysokość 1 kolumny (ok. 742x367 px) -> 1440x713
THUMBS = {"THUMBNAIL": (1440, 810), "THUMBNAIL_WIDE": (1440, 713)}


def open_page(browser, url, width, height, scale=1.0):
    page = browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=scale)
    page.goto(url, wait_until="networkidle", timeout=90000)
    page.add_style_tag(content=HIDE_BANNERS)
    return page


def full_page(browser, url, out):
    page = open_page(browser, url, 1920, 1080)
    # Przewijamy powoli, żeby odpaliły się animacje pojawiania sekcji
    y, height = 0, page.evaluate("document.body.scrollHeight")
    while y < height:
        y += 400
        page.evaluate(f"window.scrollTo(0, {y})")
        time.sleep(0.25)
        height = page.evaluate("document.body.scrollHeight")
    time.sleep(3)
    page.evaluate("window.scrollTo(0, 0)")
    time.sleep(1.5)
    page.screenshot(path=out, full_page=True)
    page.close()


def hero(browser, url, out, width, height):
    page = open_page(browser, url, width, height, scale=1.5)
    time.sleep(4)
    page.screenshot(path=out)
    page.close()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("name", help="Nazwa pliku, np. STALLOFT")
    parser.add_argument("url")
    parser.add_argument("--only-thumbs", action="store_true", help="Pomiń zrzut całej strony")
    args = parser.parse_args()
    name = args.name.upper()

    with sync_playwright() as p:
        browser = p.chromium.launch()
        if not args.only_thumbs:
            full_page(browser, args.url, OUT / f"{name}_FULL.png")
        for suffix, (w, h) in THUMBS.items():
            hero(browser, args.url, OUT / f"{name}_{suffix}.png", w, h)
        browser.close()

    thumb = Image.open(OUT / f"{name}_THUMBNAIL.png").convert("RGB")
    thumb.resize((600, round(thumb.height * 600 / thumb.width)), Image.LANCZOS) \
        .save(OUT / f"{name}_THUMBNAIL_mobile.webp", "WEBP", quality=70)
    print(f"Gotowe: {name}. Teraz: python optimize_portfolio.py")


if __name__ == "__main__":
    main()
