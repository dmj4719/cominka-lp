from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


W, H = 1080, 1080
BG = "#FFFFFF"
CHARCOAL = "#333333"
CORAL = "#FF5722"
GRAY = "#666666"
LIGHT_GRAY = "#F0F0F0"
PEACH = (255, 244, 238)
WHITE = "#FFFFFF"

OUT = Path(__file__).with_name("japanese-seo-ad-banner-1080.png")
FONT_BOLD_PATH = "/System/Library/Fonts/ヒラギノ角ゴシック W9.ttc"
FONT_REGULAR_PATH = "/System/Library/Fonts/ヒラギノ角ゴシック W5.ttc"
FONT_INDEX = 0
SCALE = 3


def font(size: int, bold: bool = True) -> ImageFont.FreeTypeFont:
    path = FONT_BOLD_PATH if bold else FONT_REGULAR_PATH
    return ImageFont.truetype(path, size=size * SCALE, index=FONT_INDEX)


def s(value: int | float) -> int:
    return round(value * SCALE)


def draw_centered(
    draw: ImageDraw.ImageDraw,
    text: str,
    xy: tuple[int, int],
    size: int,
    fill: str,
    bold: bool = True,
) -> None:
    f = font(size)
    bbox = draw.textbbox((0, 0), text, font=f)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    x = s(xy[0]) - tw / 2 - bbox[0]
    y = s(xy[1]) - th / 2 - bbox[1]
    draw.text((x, y), text, font=f, fill=fill)


def draw_mixed_centered(
    draw: ImageDraw.ImageDraw,
    parts: list[tuple[str, int, str, bool]],
    center: tuple[int, int],
) -> None:
    metrics = []
    total_w = 0
    max_h = 0
    for text, size, fill, bold in parts:
        f = font(size, bold=bold)
        bbox = draw.textbbox((0, 0), text, font=f)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        metrics.append((text, fill, f, bbox, tw, th))
        total_w += tw
        max_h = max(max_h, th)

    x = s(center[0]) - total_w / 2
    for text, fill, f, bbox, tw, th in metrics:
        y = s(center[1]) - max_h / 2 + (max_h - th) / 2 - bbox[1]
        draw.text((x - bbox[0], y), text, font=f, fill=fill)
        x += tw


def draw_background(image: Image.Image) -> None:
    pixels = image.load()
    max_y = s(170)
    for y in range(max_y):
        alpha = (1 - y / max_y) * 0.42
        for x in range(W * SCALE):
            edge_bias = max(0, 1 - abs(x - W * SCALE / 2) / (W * SCALE / 2))
            edge_alpha = alpha * (0.55 + 0.45 * (1 - edge_bias))
            r = round(255 * (1 - edge_alpha) + PEACH[0] * edge_alpha)
            g = round(255 * (1 - edge_alpha) + PEACH[1] * edge_alpha)
            b = round(255 * (1 - edge_alpha) + PEACH[2] * edge_alpha)
            pixels[x, y] = (r, g, b)


def draw_speech_bubble(draw: ImageDraw.ImageDraw) -> None:
    w, h = 760, 58
    x0 = s(540 - w / 2)
    y0 = s(80 - h / 2)
    x1 = s(540 + w / 2)
    y1 = s(80 + h / 2)
    draw.rounded_rectangle((x0, y0, x1, y1), radius=s(24), fill=LIGHT_GRAY)
    tail = [(s(512), y1 - 1), (s(540), s(126)), (s(568), y1 - 1)]
    draw.polygon(tail, fill=LIGHT_GRAY)
    draw_centered(draw, "「まだSEO外注に高い費用払ってませんか？」", (540, 80), 28, CORAL)


def main() -> None:
    image = Image.new("RGB", (W * SCALE, H * SCALE), BG)
    draw_background(image)
    draw = ImageDraw.Draw(image)

    draw_speech_bubble(draw)

    draw_centered(draw, "「地域＋業種」の", (540, 200), 60, CHARCOAL)
    draw_centered(draw, "検索1位", (540, 320), 120, CORAL)
    draw_centered(draw, "AIが最速で獲得", (540, 450), 52, CHARCOAL)

    draw_mixed_centered(
        draw,
        [
            ("たったの", 34, CHARCOAL, True),
            ("月3万円", 56, CORAL, True),
            ("で集客拡大", 34, CHARCOAL, True),
        ],
        (540, 580),
    )
    draw_centered(draw, "継続率98.4% ・ 導入実績400社 ・ 初心者OK", (540, 670), 20, GRAY)

    button_w, button_h = 380, 65
    button_x = s(540 - button_w / 2)
    button_y = s(780 - button_h / 2)
    draw.rounded_rectangle(
        (button_x, button_y, button_x + s(button_w), button_y + s(button_h)),
        radius=s(32),
        fill=CORAL,
    )
    draw_centered(draw, "詳しく見てみる", (540, 780), 34, WHITE)

    image = image.resize((W, H), Image.Resampling.LANCZOS)
    image.save(OUT, optimize=True)
    print(OUT)


if __name__ == "__main__":
    main()
