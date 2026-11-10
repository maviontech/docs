// MavionTech presentation design system — shared tokens & components (pptxgenjs)
const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

const ROOT = "D:/MavionTech_sales_MavionTech_Transformation";
const ASSETS = path.join(ROOT, "02_Working_Notes/design_build/assets");
fs.mkdirSync(ASSETS, { recursive: true });

// ---------- TOKENS ----------
const T = {
  // corporate core
  midnight: "0B1A30",   // Mavion Midnight — primary dark
  midnight2: "13284A",  // raised dark surface
  amber: "F5A623",      // Mavion Amber — signature accent (from logo)
  amberDeep: "A0680A",  // amber for text on light (AA large)
  // neutrals
  ink: "0F1B2D", slate700: "3A4A63", slate500: "5E6E86", slate300: "C5CEDB",
  line: "DCE3EC", mist: "EEF2F7", paper: "F6F8FB", white: "FFFFFF",
  onDarkMuted: "A9B6C9",
  // signal
  success: "12A150", warning: "D98E04", danger: "D64545", info: "2F6FEB",
};
const PRODUCTS = {
  agastya:     { name: "Agastya",        category: "Cloud School ERP",                   accent: "2563EB" },
  mavionlearn: { name: "MavionLearn",    category: "Enterprise LMS · Skills & Compliance", accent: "6D4AFF" },
  pragyannxt:  { name: "PragyanNxt",     category: "Assessment & Certification",         accent: "1C3F94" },
  protonnxt:   { name: "ProtonNxt",      category: "Enterprise ATS",                     accent: "0B8282" },
  salespulse:  { name: "SalesPulse CRM", category: "India-first Sales CRM",              accent: "D63B42" },
  vortex:      { name: "Vortex HRMS",    category: "Unified People Platform",            accent: "4F46E5" },
  heeliks:     { name: "HeeLIKS",        category: "Inventory, POS & Distribution",      accent: "0369A1" },
  vyaas:       { name: "Vyaas AI",       category: "Enterprise AI Assistant",            accent: "7C3AED" },
  corporate:   { name: "MavionTech",     category: "Enterprise Business Applications",   accent: "F5A623" },
};
const FONT = { head: "Calibri", body: "Calibri" };
// type scale (pt) for 13.333 x 7.5 in canvas
const TYPE = { display: 46, title: 30, h2: 20, h3: 16, body: 14, small: 12, caption: 11, kicker: 11, footer: 9, stat: 44 };
// grid (inches)
const G = { W: 13.333, H: 7.5, mx: 0.6, top: 0.5, gutter: 0.3, titleY: 0.78, contentY: 1.75, footerY: 7.02 };
G.cw = G.W - 2 * G.mx;

function mix(hex, withHex, t) { // t = share of withHex
  const a = parseInt(hex, 16), b = parseInt(withHex, 16);
  const ch = (x, s) => (x >> s) & 255;
  const m = s => Math.round(ch(a, s) * (1 - t) + ch(b, s) * t);
  return [16, 8, 0].map(s => m(s).toString(16).padStart(2, "0")).join("").toUpperCase();
}
const tint = (hex, t = 0.9) => mix(hex, "FFFFFF", t);

// ---------- ASSETS ----------
async function svgToPng(svg, file, width) {
  const out = path.join(ASSETS, file);
  await sharp(Buffer.from(svg)).resize({ width }).png().toFile(out);
  return out;
}
async function icon(Comp, colorHex, file) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: "#" + colorHex, size: 256, strokeWidth: 1.75 }));
  return svgToPng(svg, file, 256);
}
// dark background: midnight + one soft accent glow + "orbit" arcs (motif from the logo's circuit ring)
async function darkBg(accent, file, variant = "cover") {
  const lum = (h => { const n = parseInt(h, 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; })(accent);
  if (lum < 0.3) accent = mix(accent, "FFFFFF", 0.35);
  const cx = variant === "cover" ? 1500 : 1650, cy = variant === "cover" ? 560 : 540;
  const rings = [260, 380, 500, 620, 740].map((r, i) =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#FFFFFF" stroke-opacity="${0.07 - i * 0.01}" stroke-width="1.5"/>`).join("");
  const nodes = [[cx - 380, cy], [cx + 120, cy - 487], [cx - 553, cy + 245], [cx + 330, cy + 600]].map(([x, y], i) =>
    `<circle cx="${x}" cy="${y}" r="${i === 0 ? 7 : 5}" fill="#${T.amber}" fill-opacity="${i === 0 ? 0.95 : 0.6}"/>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
    <defs><radialGradient id="g" cx="${cx / 1920}" cy="${cy / 1080}" r="0.55">
      <stop offset="0" stop-color="#${accent}" stop-opacity="0.38"/><stop offset="1" stop-color="#${accent}" stop-opacity="0"/></radialGradient></defs>
    <rect width="1920" height="1080" fill="#${T.midnight}"/><rect width="1920" height="1080" fill="url(#g)"/>${rings}${nodes}</svg>`;
  return svgToPng(svg, file, 1920);
}
// screenshot crop: top-anchored to target aspect, optional left crop (remove sidebar)
// fit = "fit" (opt-in, used by the HeeLIKS and Vyaas decks): zoom to the content bounding box instead of the full width
async function contentBox(src, left, top) {
  const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, Hh = info.height, at = (x, y) => (y * W + x) * 3;
  const bi = at(W - 6, Hh - 6), bg = [data[bi], data[bi + 1], data[bi + 2]];
  let r = left, b = top;
  for (let y = top; y < Hh; y += 2) { let n = 0, xr = -1;
    for (let x = left; x < W; x += 2) { const i = at(x, y); if (Math.abs(data[i] - bg[0]) + Math.abs(data[i + 1] - bg[1]) + Math.abs(data[i + 2] - bg[2]) > 90) { n++; xr = x; } }
    if (n > 3) { b = y; if (y > top + 120 && xr > r) r = xr; } }
  return { r, b, W, H: Hh };
}
async function shot(src, file, aspect, leftCropPx = 0, topCropPx = 0, fit = false) {
  const img = sharp(src); const m = await img.metadata();
  let w = m.width - leftCropPx; let h = Math.round(w / aspect);
  if (fit === "fit") {
    const cb = await contentBox(src, leftCropPx, topCropPx);
    const needW = Math.max(cb.r - leftCropPx + 40, Math.round((cb.b - topCropPx + 40) * aspect), 1100);
    w = Math.min(m.width - leftCropPx, needW); h = Math.round(w / aspect);
  }
  if (h > m.height - topCropPx) { h = m.height - topCropPx; w = Math.round(h * aspect); } // keep aspect: narrow instead of distorting
  const out = path.join(ASSETS, file.replace(/\.png$/i, ".jpg"));
  await sharp(src).extract({ left: leftCropPx, top: topCropPx, width: w, height: h }).resize({ width: w < 1200 ? w * 2 : Math.min(w, 1800), kernel: "lanczos3" }).sharpen(w < 1200 ? { sigma: 0.7 } : undefined).flatten({ background: "#ffffff" }).jpeg({ quality: 86, mozjpeg: true }).toFile(out);
  return out;
}

// ---------- COMPONENTS ----------
function kicker(slide, text, color, x, y, w = 8) {
  slide.addText(text.toUpperCase(), { x, y, w, h: 0.3, margin: 0, fontFace: FONT.body, fontSize: TYPE.kicker, bold: true,
    color, charSpacing: 3, isTextBox: true, objectName: "kicker" });
}
function title(slide, text, color, x = G.mx, y = G.titleY, w = 11.5, size = TYPE.title) {
  slide.addText(text, { x, y, w, h: 0.62, margin: 0, fontFace: FONT.head, fontSize: size, bold: true, color, valign: "top",
    isTextBox: true, objectName: "title" });
}
// browser-style screenshot frame — the signature screenshot treatment
function frame(slide, imgPath, x, y, w, h, opts = {}) {
  const chrome = 0.26, dark = !!opts.dark;
  slide.addShape("roundRect", { x, y, w, h, rectRadius: 0.08, fill: { color: T.white }, line: { color: dark ? "2A3B57" : T.line, width: 0.75 },
    shadow: { type: "outer", color: "0B1A30", opacity: dark ? 0.35 : 0.12, blur: 14, offset: 4, angle: 90 }, objectName: "frame" });
  slide.addShape("rect", { x: x + 0.02, y: y + 0.02, w: w - 0.04, h: chrome - 0.02, fill: { color: "F2F5F9" }, line: { type: "none" } });
  ["D63B42", "F5A623", "12A150"].forEach((c, i) =>
    slide.addShape("ellipse", { x: x + 0.14 + i * 0.15, y: y + 0.085, w: 0.09, h: 0.09, fill: { color: tint(c, 0.35) }, line: { type: "none" } }));
  if (opts.url) slide.addText(opts.url, { x: x + 0.7, y: y + 0.035, w: Math.min(3, w - 0.9), h: 0.19, margin: 0, fontSize: 9, color: T.slate500, isTextBox: true });
  slide.addImage({ path: imgPath, x: x + 0.04, y: y + chrome, w: w - 0.08, h: h - chrome - 0.04, objectName: "screenshot",
    altText: opts.alt || "Product screenshot" });
}
function iconChip(slide, iconPath, x, y, accent, size = 0.52) {
  slide.addShape("roundRect", { x, y, w: size, h: size, rectRadius: 0.12, fill: { color: tint(accent, 0.88) }, line: { type: "none" } });
  const p = size * 0.24; slide.addImage({ path: iconPath, x: x + p, y: y + p, w: size - 2 * p, h: size - 2 * p });
}
function caption(slide, text, x, y, w, color = T.slate500) {
  slide.addText(text, { x, y, w, h: 0.3, margin: 0, fontSize: TYPE.caption, color, isTextBox: true, objectName: "caption" });
}
function card(slide, x, y, w, h, fill = T.paper, line = T.line) {
  slide.addShape("roundRect", { x, y, w, h, rectRadius: 0.1, fill: { color: fill }, line: { color: line, width: 0.75 }, objectName: "card" });
}

// ---------- LAYOUTS (pptxgenjs "masters" = slide layouts) ----------
function defineLayouts(pres, product, bgCover, bgDivider) {
  const P = PRODUCTS[product];
  const logo = "D:/MavionTech_sales/branding/maviontech-logo.png";
  const footerText = `${P.name}  ·  ${P.category}`;
  const A = P.accent;
  const ph = (name, type, o, text) => ({ placeholder: { options: Object.assign({ name, type, margin: 0, align: "left", fontFace: FONT.head }, o), text } });
  const phTitle = (color) => [
    ph("kicker", "body", { x: G.mx, y: 0.5, w: 8, h: 0.3, fontSize: TYPE.kicker, bold: true, charSpacing: 3, color: color === T.white ? T.amber : A, valign: "top" }, "SECTION KICKER"),
    ph("title", "title", { x: G.mx, y: G.titleY, w: 11.5, h: 0.62, fontSize: TYPE.title, bold: true, color, valign: "top" }, "Outcome-led slide title in one line"),
  ];
  const footerLight = [
    { text: { text: footerText, options: { x: G.mx, y: G.footerY, w: 6, h: 0.25, margin: 0, fontSize: TYPE.footer, color: T.slate500, fontFace: FONT.body } } },
    { image: { path: logo, x: G.W - G.mx - 1.55, y: G.footerY + 0.02, w: 0.21, h: 0.21 } },
    { text: { text: "MavionTech", options: { x: G.W - G.mx - 1.3, y: G.footerY, w: 0.95, h: 0.25, margin: 0, fontSize: TYPE.footer, bold: true, color: T.ink, fontFace: FONT.body } } },
  ];
  pres.defineSlideMaster({
    title: "MT_COVER", background: { path: bgCover },
    objects: [
      { image: { path: logo, x: G.mx, y: 0.5, w: 0.42, h: 0.42 } },
      { text: { text: "MavionTech", options: { x: G.mx + 0.55, y: 0.5, w: 3, h: 0.24, margin: 0, fontSize: 13, bold: true, color: T.white } } },
      { text: { text: "Momentum with Vision", options: { x: G.mx + 0.55, y: 0.74, w: 3, h: 0.2, margin: 0, fontSize: 9.5, color: T.onDarkMuted } } },
      { text: { text: "A MavionTech product  ·  maviontech.com", options: { x: G.mx, y: G.footerY, w: 6, h: 0.25, margin: 0, fontSize: TYPE.footer, color: T.onDarkMuted } } },
      ph("title", "title", { x: G.mx, y: 2.3, w: 5.6, h: 0.95, fontSize: 56, bold: true, color: T.white, valign: "top" }, "Product name"),
      ph("body", "body", { x: G.mx, y: 3.75, w: 5.5, h: 1.05, fontSize: 26, color: T.white, valign: "top" }, "One-line promise"),
    ],
  });
  pres.defineSlideMaster({
    title: "MT_CLOSE", background: { path: bgCover },
    objects: [
      { image: { path: logo, x: G.mx, y: 0.5, w: 0.42, h: 0.42 } },
      { text: { text: "MavionTech", options: { x: G.mx + 0.55, y: 0.5, w: 3, h: 0.24, margin: 0, fontSize: 13, bold: true, color: T.white } } },
      { text: { text: "Momentum with Vision", options: { x: G.mx + 0.55, y: 0.74, w: 3, h: 0.2, margin: 0, fontSize: 9.5, color: T.onDarkMuted } } },
      { text: { text: "A MavionTech product  ·  maviontech.com", options: { x: G.mx, y: G.footerY, w: 6, h: 0.25, margin: 0, fontSize: TYPE.footer, color: T.onDarkMuted } } },
      ph("title", "title", { x: G.mx, y: 2.35, w: 6.6, h: 1.5, fontSize: 36, bold: true, color: T.white, valign: "top" }, "One clear ask"),
      ph("body", "body", { x: G.mx, y: 3.95, w: 6.2, h: 0.9, fontSize: 16, color: T.onDarkMuted, valign: "top" }, "What happens next"),
    ],
  });
  pres.defineSlideMaster({
    title: "MT_DIVIDER", background: { path: bgDivider },
    objects: [{ text: { text: footerText, options: { x: G.mx, y: G.footerY, w: 6, h: 0.25, margin: 0, fontSize: TYPE.footer, color: T.onDarkMuted } } },
      ph("title", "title", { x: G.mx, y: 3.05, w: 7.5, h: 1.0, fontSize: 40, bold: true, color: T.white, valign: "top" }, "Section title"),
      ph("body", "body", { x: G.mx, y: 4.15, w: 6.5, h: 0.9, fontSize: 16, color: T.onDarkMuted, valign: "top" }, "One sentence on what this section proves")],
    slideNumber: { x: G.W - G.mx - 0.4, y: G.footerY, w: 0.4, h: 0.25, fontSize: TYPE.footer, color: T.onDarkMuted, align: "right", margin: 0 },
  });
  pres.defineSlideMaster({
    title: "MT_CONTENT", background: { color: T.white }, objects: footerLight.concat(phTitle(T.ink)),
    slideNumber: { x: G.W - G.mx - 0.35, y: G.footerY, w: 0.35, h: 0.25, fontSize: TYPE.footer, color: T.slate500, align: "right", margin: 0 },
  });
  pres.defineSlideMaster({
    title: "MT_CONTENT_TINT", background: { color: T.paper }, objects: footerLight.concat(phTitle(T.ink)),
    slideNumber: { x: G.W - G.mx - 0.35, y: G.footerY, w: 0.35, h: 0.25, fontSize: TYPE.footer, color: T.slate500, align: "right", margin: 0 },
  });
  pres.defineSlideMaster({
    title: "MT_DARK", background: { color: T.midnight },
    objects: [
      { text: { text: footerText, options: { x: G.mx, y: G.footerY, w: 6, h: 0.25, margin: 0, fontSize: TYPE.footer, color: T.onDarkMuted } } },
      { image: { path: logo, x: G.W - G.mx - 1.55, y: G.footerY + 0.02, w: 0.21, h: 0.21 } },
      { text: { text: "MavionTech", options: { x: G.W - G.mx - 1.3, y: G.footerY, w: 0.95, h: 0.25, margin: 0, fontSize: TYPE.footer, bold: true, color: T.white } } },
    ].concat(phTitle(T.white)),
    slideNumber: { x: G.W - G.mx - 0.35, y: G.footerY, w: 0.35, h: 0.25, fontSize: TYPE.footer, color: T.onDarkMuted, align: "right", margin: 0 },
  });
}

module.exports = { T, PRODUCTS, FONT, TYPE, G, tint, mix, svgToPng, icon, darkBg, shot, kicker, title, frame, iconChip, caption, card, defineLayouts, ASSETS, ROOT };
