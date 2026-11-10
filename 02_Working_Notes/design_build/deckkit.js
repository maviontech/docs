// Shared slide patterns for MavionTech product decks (same visual grammar as the approved Agastya deck).
// All titles/kickers/cover text fill layout placeholders (no overlays) — required for clean PowerPoint rendering.
const M = require("./mt");
const L = require("react-icons/lu");
const { T, TYPE, G, tint, kicker, frame, iconChip, caption, card } = M;

async function makeKit(pres, productKey, prefix, iconNames) {
  const P = M.PRODUCTS[productKey], A = P.accent;
  const ic = {}, icW = {};
  for (const [k, n] of Object.entries(iconNames)) {
    if (!L[n]) throw new Error("missing icon " + n);
    ic[k] = await M.icon(L[n], A, `${prefix}_${k}.png`); icW[k] = await M.icon(L[n], "FFFFFF", `${prefix}w_${k}.png`);
  }
  const checkAmber = await M.icon(L.LuCheck, T.amber, "ic_check_amber.png");
  const checkA = await M.icon(L.LuCheck, A, `${prefix}_chk.png`);
  const inner = (w, h) => (w - 0.08) / (h - 0.26 - 0.04);
  // img = { src, crop:[left,top] } ; returns cropped asset for a frame of w x h
  const S = async (img, w, h) => M.shot(img.src, `${prefix}_${require("path").basename(img.src).replace(/\.\w+$/, "")}_${Math.round(w * 100)}x${Math.round(h * 100)}.png`, inner(w, h), ...(img.crop || [0, 0]));

  let section = "";
  const K = {
    A, P, ic, icW, checkAmber, checkA, S,
    sec(t) { section = t; pres.addSection({ title: t }); },
    add(m = "MT_CONTENT") { return pres.addSlide({ masterName: m, sectionTitle: section }); },
    head(sl, k, t) { sl.addText(k.toUpperCase(), { placeholder: "kicker" }); sl.addText(t, { placeholder: "title" }); },
    txt(sl, text, x, y, w, h, o = {}) { return sl.addText(text, Object.assign({ x, y, w, h, margin: 0, fontSize: TYPE.body, color: T.slate700, valign: "top", isTextBox: true }, o)); },
    feat(sl, icon, h, b, x, y, w, size = 0.5) {
      iconChip(sl, icon, x, y, A, size);
      K.txt(sl, h, x + size + 0.2, y - 0.03, w - size - 0.2, 0.3, { fontSize: 14, bold: true, color: T.ink });
      K.txt(sl, b, x + size + 0.2, y + 0.28, w - size - 0.2, 0.62, { fontSize: 12 });
    },
    badge(sl, n, x, y) {
      sl.addShape("ellipse", { x, y, w: 0.34, h: 0.34, fill: { color: T.amber }, line: { color: T.white, width: 1.5 } });
      K.txt(sl, String(n), x, y, 0.34, 0.34, { fontSize: 11, bold: true, color: T.midnight, align: "center", valign: "middle" });
    },
    calloutRow(sl, items) { items.forEach((t, i) => { const x = G.mx + i * (G.cw / items.length);
      K.badge(sl, i + 1, x, 6.38); K.txt(sl, t, x + 0.45, 6.3, G.cw / items.length - 0.6, 0.5, { fontSize: 11.5, valign: "middle" }); }); },
    cover(sl, { kick = "Enterprise sales overview", name, category, promise, support, chips = [], hero, sub, mark, heroUrl }) {
      kicker(sl, kick, T.amber, G.mx, 1.95);
      let nx = G.mx;
      if (mark) { sl.addImage({ path: mark, x: G.mx, y: 1.28, w: 0.52, h: 0.52 }); }
      sl.addText(name, { placeholder: "title" });
      K.txt(sl, category.toUpperCase(), G.mx, 3.22, 5.5, 0.3, { fontSize: 12, bold: true, charSpacing: 4, color: tint(A === "1C3F94" ? "6F8FE0" : A, 0.45) });
      sl.addText(promise, { placeholder: "body" });
      K.txt(sl, support, G.mx, 4.9, 5.3, 0.95, { color: T.onDarkMuted });
      let x = G.mx;
      chips.forEach(t => { const w = 0.3 + t.length * 0.085;
        sl.addShape("roundRect", { x, y: 6.1, w, h: 0.38, rectRadius: 0.19, fill: { color: T.midnight2 }, line: { color: "2E4468", width: 0.75 } });
        K.txt(sl, t, x, 6.1, w, 0.38, { fontSize: 11, color: T.white, align: "center", valign: "middle" }); x += w + 0.13; });
      return [hero, sub];
    },
    async coverShots(sl, hero, sub, url) {
      frame(sl, await S(hero, 6.1, 3.85), 6.65, 1.25, 6.1, 3.85, { dark: true, url, alt: hero.alt || "Product screen" });
      if (sub) frame(sl, await S(sub, 3.7, 2.45), 6.45, 4.2, 3.7, 2.45, { dark: true, alt: sub.alt || "Product screen" });
    },
    iconCards(sl, items, cols, y0 = 1.8, ch = 2.15, gap = 0.3, white = false) {
      const rows = Math.ceil(items.length / cols), w = (G.cw - (cols - 1) * gap) / cols;
      items.forEach(([icn, h, b], i) => { const x = G.mx + (i % cols) * (w + gap), y = y0 + Math.floor(i / cols) * (ch + gap);
        card(sl, x, y, w, ch, white ? T.white : T.paper); iconChip(sl, ic[icn], x + 0.28, y + 0.28, A, 0.52);
        if (cols <= 2) { K.txt(sl, h, x + 1.05, y + 0.3, w - 1.3, 0.35, { fontSize: TYPE.h3, bold: true, color: T.ink }); K.txt(sl, b, x + 1.05, y + 0.72, w - 1.3, ch - 0.9); }
        else { K.txt(sl, h, x + 0.28, y + 0.95, w - 0.56, 0.32, { fontSize: 14.5, bold: true, color: T.ink }); K.txt(sl, b, x + 0.28, y + 1.3, w - 0.56, ch - 1.4, { fontSize: 12 }); } });
    },
    async heroFeature(sl, img, feats, cap, mirror = false, url) {
      const fw = img.fw || 7.55, fh = img.fh || 4.55, fx = mirror ? G.W - G.mx - fw : G.mx;
      frame(sl, await S(img, fw, fh), fx, 1.75, fw, fh, { url, alt: cap });
      caption(sl, cap, fx, 1.75 + fh + 0.1, fw);
      const cx = mirror ? G.mx : fx + fw + 0.4, cw = G.cw - fw - 0.4;
      const step = Math.min(1.15, (4.6) / feats.length);
      feats.forEach(([icn, h, b], i) => K.feat(sl, ic[icn], h, b, cx, 1.85 + i * step, cw));
      return { cx, cw };
    },
    async mainStack(sl, main, top, bottom, callouts, urls = []) {
      frame(sl, await S(main, 7.2, 4.45), G.mx, 1.75, 7.2, 4.45, { url: urls[0], alt: callouts[0] });
      frame(sl, await S(top, 4.63, 2.12), 8.1, 1.75, 4.63, 2.12, { url: urls[1], alt: callouts[1] });
      frame(sl, await S(bottom, 4.63, 2.12), 8.1, 4.08, 4.63, 2.12, { url: urls[2], alt: callouts[2] });
      [[G.mx + 6.72, 2.15], [12.3, 2.15], [12.3, 4.48]].forEach(([x, y], i) => K.badge(sl, i + 1, x, y));
      K.calloutRow(sl, callouts);
    },
    async twoShots(sl, a, b, feats, h = 3.3) {
      const w = (G.cw - 0.3) / 2;
      frame(sl, await S(a, w, h), G.mx, 1.75, w, h, { alt: a.cap, url: a.url });
      frame(sl, await S(b, w, h), G.mx + w + 0.3, 1.75, w, h, { alt: b.cap, url: b.url });
      caption(sl, a.cap, G.mx, 1.75 + h + 0.07, w); caption(sl, b.cap, G.mx + w + 0.3, 1.75 + h + 0.07, w);
      if (feats) { const fw = G.cw / feats.length; feats.forEach(([icn, hh, bb], i) => K.feat(sl, ic[icn], hh, bb, G.mx + i * fw, 5.65, fw - 0.25, 0.45)); }
    },
    async cols(sl, items, fh) {
      const n = items.length, w = (G.cw - (n - 1) * 0.3) / n;
      for (let i = 0; i < n; i++) { const it = items[i], x = G.mx + i * (w + 0.3);
        frame(sl, await S(it, w, fh), x, 1.75, w, fh, { alt: it.h });
        K.txt(sl, it.h, x, 1.75 + fh + 0.2, w, 0.32, { fontSize: 15, bold: true, color: T.ink });
        K.txt(sl, it.b, x, 1.75 + fh + 0.55, w, 6.75 - (1.75 + fh + 0.55), { fontSize: 12 }); }
    },
    flow(sl, steps, y, hi = -1, h = 0.55) {
      const n = steps.length, w = (G.cw - (n - 1) * 0.25) / n;
      steps.forEach((t, i) => { const x = G.mx + i * (w + 0.25);
        sl.addShape("roundRect", { x, y, w, h, rectRadius: 0.1, fill: { color: i === hi ? A : tint(A, 0.9) }, line: { type: "none" } });
        K.txt(sl, `${i + 1}  ${t}`, x + 0.15, y, w - 0.3, h, { fontSize: 12.5, bold: true, color: i === hi ? T.white : T.ink, valign: "middle" });
        if (i < n - 1) sl.addShape("line", { x: x + w + 0.02, y: y + h / 2, w: 0.21, h: 0, line: { color: T.slate300, width: 1.25, endArrowType: "triangle" } }); });
    },
    line(sl, x1, y1, x2, y2, o = {}) { // safe connector: never negative extents
      const flipH = x2 < x1, flipV = y2 < y1;
      sl.addShape("line", { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1), flipH, flipV,
        line: Object.assign({ color: T.slate300, width: 1.25, endArrowType: "triangle" }, o) });
    },
    note(sl, text, y = 5.75, h = 0.62) {
      sl.addShape("roundRect", { x: G.mx, y, w: G.cw, h, rectRadius: 0.1, fill: { color: tint(A, 0.9) }, line: { type: "none" } });
      K.txt(sl, text, G.mx + 0.25, y, G.cw - 0.5, h, { fontSize: 12.5, color: T.ink, valign: "middle" });
    },
    darkCards(sl, items, cols, y0 = 1.85, ch = 2.0, tagText) {
      const w = (G.cw - (cols - 1) * 0.3) / cols;
      items.forEach(([icn, h, b], i) => { const x = G.mx + (i % cols) * (w + 0.3), y = y0 + Math.floor(i / cols) * (ch + 0.3);
        sl.addShape("roundRect", { x, y, w, h: ch, rectRadius: 0.1, fill: { color: T.midnight2 }, line: { color: "22365A", width: 0.75 } });
        sl.addShape("roundRect", { x: x + 0.3, y: y + 0.3, w: 0.52, h: 0.52, rectRadius: 0.12, fill: { color: tagText ? "22365A" : A }, line: { type: "none" } });
        sl.addImage({ path: icW[icn], x: x + 0.43, y: y + 0.43, w: 0.26, h: 0.26 });
        if (tagText) K.txt(sl, tagText, x + w - 1.3, y + 0.42, 1.0, 0.28, { fontSize: 9, bold: true, charSpacing: 2, color: T.amber, align: "right" });
        K.txt(sl, h, x + 0.3, y + 0.98, w - 0.6, 0.32, { fontSize: 15, bold: true, color: T.white });
        K.txt(sl, b, x + 0.3, y + 1.32, w - 0.6, ch - 1.4, { fontSize: 12, color: T.onDarkMuted }); });
    },
    compare(sl, leftLabel, rightLabel, rows, diffs) {
      K.txt(sl, leftLabel.toUpperCase(), 2.05, 1.72, 2.6, 0.25, { fontSize: 10, bold: true, charSpacing: 2, color: T.onDarkMuted });
      K.txt(sl, rightLabel.toUpperCase(), 4.85, 1.72, 3.4, 0.25, { fontSize: 10, bold: true, charSpacing: 2, color: T.amber });
      const rh = Math.min(0.86, 4.4 / rows.length);
      rows.forEach(([d, a, b], i) => { const y = 2.08 + i * rh;
        sl.addShape("line", { x: G.mx, y: y - 0.06, w: 7.55, h: 0, line: { color: "22365A", width: 0.75 } });
        K.txt(sl, d, G.mx, y, 1.4, rh - 0.12, { fontSize: 13, bold: true, color: T.white, valign: "middle" });
        K.txt(sl, a, 2.05, y, 2.6, rh - 0.12, { fontSize: 12, color: T.onDarkMuted, valign: "middle" });
        sl.addImage({ path: checkAmber, x: 4.85, y: y + (rh - 0.12) / 2 - 0.11, w: 0.22, h: 0.22 });
        K.txt(sl, b, 5.2, y, 2.95, rh - 0.12, { fontSize: 12, color: T.white, valign: "middle" }); });
      diffs.forEach(([icn, h, b], i) => { const x = 8.75, y = 1.72 + i * 1.22, w = 3.98, hh = 1.06;
        sl.addShape("roundRect", { x, y, w, h: hh, rectRadius: 0.1, fill: { color: T.midnight2 }, line: { color: "22365A", width: 0.75 } });
        sl.addShape("roundRect", { x: x + 0.2, y: y + 0.22, w: 0.5, h: 0.5, rectRadius: 0.12, fill: { color: A }, line: { type: "none" } });
        sl.addImage({ path: icW[icn], x: x + 0.32, y: y + 0.34, w: 0.26, h: 0.26 });
        K.txt(sl, h, x + 0.88, y + 0.14, w - 1.05, 0.32, { fontSize: 13, bold: true, color: T.white });
        K.txt(sl, b, x + 0.88, y + 0.45, w - 1.05, 0.52, { fontSize: 11, color: T.onDarkMuted }); });
    },
    close(sl, { title, body, subtitle, second = "Plan a pilot" }) {
      kicker(sl, "Let's get started", T.amber, G.mx, 1.95);
      sl.addText(title, { placeholder: "title" }); sl.addText(body, { placeholder: "body" });
      [["Book a demo", T.amber, T.midnight], [second, T.midnight2, T.white]].forEach(([t, f, c], i) => {
        sl.addShape("roundRect", { x: G.mx + i * 2.05, y: 5.1, w: 1.85, h: 0.5, rectRadius: 0.25, fill: { color: f }, line: { color: i ? "2E4468" : f, width: 0.75 } });
        K.txt(sl, t, G.mx + i * 2.05, 5.1, 1.85, 0.5, { fontSize: 13, bold: true, color: c, align: "center", valign: "middle" }); });
      sl.addShape("roundRect", { x: 7.6, y: 1.9, w: 5.13, h: 3.7, rectRadius: 0.12, fill: { color: T.midnight2 }, line: { color: "2E4468", width: 0.75 } });
      sl.addImage({ path: "D:/MavionTech_sales/branding/maviontech-logo.png", x: 7.95, y: 2.2, w: 0.6, h: 0.6 });
      sl.addText([{ text: "MavionTech Pvt. Ltd.", options: { bold: true, fontSize: 16, color: T.white, breakLine: true } }, { text: subtitle, options: { fontSize: 11, color: T.onDarkMuted } }],
        { x: 8.7, y: 2.2, w: 3.8, h: 0.6, margin: 0, valign: "middle", isTextBox: true });
      sl.addText([{ text: "communications@maviontech.com", options: { breakLine: true } }, { text: "+91 91580 08002", options: { breakLine: true } },
        { text: "www.maviontech.com", options: { breakLine: true } }, { text: "505 Zen Business Center, Bhumkar Chowk, Wakad, Pune, Maharashtra 411057", options: {} }],
        { x: 7.95, y: 3.1, w: 4.5, h: 2.2, margin: 0, fontSize: 13, color: T.white, valign: "top", paraSpaceAfter: 6, isTextBox: true });
    },
  };
  return K;
}
module.exports = { makeKit };
