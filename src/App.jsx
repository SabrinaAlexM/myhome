import { useState, useCallback, useMemo } from "react";

(() => {
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap";
  document.head.appendChild(l);
})();

(() => {
  if (document.getElementById("mz-css")) return;
  const s = document.createElement("style");
  s.id = "mz-css";
  s.textContent = `
  .mz*,.mz *::before,.mz *::after{box-sizing:border-box;margin:0;padding:0;}
  .mz{--bg:#FFF9FC;--surface:#FFFFFF;--border:#FFE8F0;--pk:#FF4F81;--pk-l:#FFF0F5;--pk-d:#CC2060;--gd:#FFB800;--gd-l:#FFF8E0;--gd-d:#CC9200;--mt:#00D4AA;--mt-l:#E0FAF5;--mt-d:#009E7E;--ok:#06C167;--ok-l:#E3FAF0;--danger:#FF3366;--danger-l:#FFE8EE;--ink:#2A1020;--ink-m:#6A3050;--ink-l:#C090A8;--sh:0 2px 14px rgba(255,79,129,.08);--sh-lg:0 8px 40px rgba(255,79,129,.20);font-family:"DM Sans",sans-serif;color:var(--ink);background:var(--bg);-webkit-font-smoothing:antialiased;max-width:480px;margin:0 auto;min-height:100%;display:flex;flex-direction:column;}
  .page{flex:1;overflow-y:auto;padding:20px 16px 96px;}
  .nav{position:sticky;bottom:0;background:rgba(255,249,252,.97);backdrop-filter:blur(20px);border-top:1.5px solid var(--border);display:flex;padding:10px 4px 16px;z-index:100;gap:4px;}
  .nb{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;background:none;border:none;cursor:pointer;padding:6px 4px;color:var(--ink-l);font-family:"DM Sans",sans-serif;border-radius:12px;transition:all .15s;}
  .nb.on{color:var(--pk);background:var(--pk-l);box-shadow:var(--sh);}
  .ni{font-size:22px;line-height:1;}.nl{font-size:10px;font-weight:600;letter-spacing:.3px;}
  .ph{margin-bottom:22px;}.ph-t{font-family:"Poppins",sans-serif;font-size:28px;font-weight:800;color:var(--ink);letter-spacing:-.3px;}.ph-s{font-size:13px;color:var(--ink-l);margin-top:3px;}
  .logo{border-radius:14px;background:linear-gradient(135deg,#CC2060,#FF4F81,#FF8FAA);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(255,79,129,.35);flex-shrink:0;}
  .card{background:var(--surface);border-radius:20px;border:1.5px solid var(--border);box-shadow:var(--sh);margin-bottom:12px;overflow:hidden;}
  .card.pc{border-color:rgba(255,79,129,.2);background:linear-gradient(135deg,#fff 55%,var(--pk-l));}
  .card.gc{border-color:rgba(255,184,0,.2);background:linear-gradient(135deg,#fff 55%,var(--gd-l));}
  .hero{border-radius:20px;padding:18px;display:flex;align-items:center;gap:14px;cursor:pointer;position:relative;overflow:hidden;transition:transform .13s;}
  .hero:hover{transform:scale(1.02);}
  .hero-pk{background:linear-gradient(135deg,var(--pk-d),var(--pk));}.hero-gd{background:linear-gradient(135deg,var(--gd-d),var(--gd));}
  .hero-ic{font-size:40px;}.hero-ti{font-family:"Poppins",sans-serif;font-size:20px;font-weight:800;color:#fff;}.hero-su{font-size:12px;color:rgba(255,255,255,.8);margin-top:2px;}
  .hero-badge{position:absolute;top:12px;right:14px;background:rgba(255,255,255,.25);color:#fff;font-size:10px;font-weight:700;padding:3px 9px;border-radius:20px;}
  .item{display:flex;align-items:center;gap:12px;padding:14px 16px;}.item+.item{border-top:1.5px solid var(--border);}
  .ii{width:44px;height:44px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}
  .ii.pk{background:var(--pk-l);}.ii.gd{background:var(--gd-l);}
  .ib{flex:1;min-width:0;}.in{font-size:14px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:"Poppins",sans-serif;}.im{font-size:11.5px;color:var(--ink-l);margin-top:2px;}
  .pill{font-size:10px;font-weight:700;padding:3px 9px;border-radius:20px;letter-spacing:.3px;text-transform:uppercase;white-space:nowrap;}
  .p-ok{background:var(--ok-l);color:#028A46;}.p-w{background:var(--gd-l);color:var(--gd-d);}.p-d{background:var(--danger-l);color:#CC1144;}.p-g{background:var(--border);color:var(--ink-m);}
  .prog{height:4px;background:var(--border);border-radius:3px;margin-top:8px;overflow:hidden;}.pf{height:100%;border-radius:3px;transition:width .3s;}
  .dstrip{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap;}
  .dchip{display:flex;align-items:center;gap:4px;background:var(--bg);border-radius:10px;padding:4px 8px;border:1.5px solid var(--border);}.dchip.p1{background:var(--pk-l);border-color:var(--pk);}
  .dnum{width:16px;height:16px;border-radius:50%;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;color:#fff;}
  .dtxt{font-size:11px;font-weight:600;color:var(--ink-m);}.dchip.p1 .dtxt{color:var(--ink);}
  .btn{display:flex;align-items:center;justify-content:center;gap:6px;border:none;cursor:pointer;font-family:"DM Sans",sans-serif;font-weight:600;transition:all .15s;border-radius:14px;}
  .btn-fw{width:100%;padding:14px;font-size:15px;}
  .btn-pk{background:var(--pk);color:#fff;}.btn-pk:hover{background:var(--pk-d);}
  .btn-gd{background:var(--gd);color:#fff;}.btn-gd:hover{background:var(--gd-d);}
  .btn-dk{background:var(--ink);color:#fff;}.btn-dk:hover{background:var(--ink-m);}
  .btn-gh{padding:10px 14px;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;color:var(--ink-m);font-size:13px;font-weight:600;cursor:pointer;font-family:"DM Sans",sans-serif;display:flex;align-items:center;gap:6px;transition:background .13s;}.btn-gh:hover{background:var(--border);}
  .btn-dng{padding:10px 14px;background:var(--danger-l);border:none;border-radius:12px;color:var(--danger);font-size:13px;font-weight:600;cursor:pointer;font-family:"DM Sans",sans-serif;}
  .btn-sm{padding:9px 13px;border-radius:10px;font-size:13px;}
  .icob{width:36px;height:36px;border-radius:50%;background:var(--bg);border:1.5px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:15px;transition:background .13s;}.icob:hover{background:var(--border);}
  .chka{width:32px;height:32px;border-radius:50%;border:2px solid var(--border);background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all .15s;flex-shrink:0;}.chka:hover{border-color:var(--mt);background:var(--mt-l);}
  .fab{display:flex;justify-content:flex-end;padding:12px 0 0;}
  .fabb{width:54px;height:54px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:26px;box-shadow:var(--sh-lg);transition:transform .13s;color:#fff;}.fabb:hover{transform:scale(1.08);}
  .overlay{position:fixed;inset:0;background:rgba(42,16,32,.48);backdrop-filter:blur(6px);z-index:300;display:flex;align-items:flex-end;justify-content:center;}
  .sheet{width:100%;max-width:480px;background:var(--bg);border-radius:24px 24px 0 0;max-height:94dvh;overflow-y:auto;animation:sup .28s cubic-bezier(.32,.72,0,1);}
  .shdl{width:40px;height:4px;background:var(--border);border-radius:2px;margin:13px auto 0;}
  .shhd{display:flex;align-items:center;justify-content:space-between;padding:16px 20px 12px;border-bottom:1.5px solid var(--border);}
  .shti{font-family:"Poppins",sans-serif;font-size:19px;font-weight:700;color:var(--ink);}
  .shbd{padding:20px;}
  @keyframes sup{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
  .steps{display:flex;align-items:center;margin-bottom:22px;}
  .sdot{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:2px solid var(--border);color:var(--ink-l);background:var(--surface);transition:all .2s;flex-shrink:0;}
  .sdot.dn{background:var(--mt);border-color:var(--mt);color:#fff;}.sdot.ac{background:var(--pk);border-color:var(--pk);color:#fff;}
  .sln{flex:1;height:2px;background:var(--border);}.sln.dn{background:var(--mt);}
  .fg{display:flex;flex-direction:column;gap:6px;margin-bottom:15px;}
  .fl{font-size:11px;font-weight:700;color:var(--ink-m);letter-spacing:.5px;text-transform:uppercase;}
  .fi,.fsl{width:100%;padding:12px 14px;border:2px solid var(--border);border-radius:12px;background:var(--surface);font-family:"DM Sans",sans-serif;font-size:14px;color:var(--ink);outline:none;transition:border-color .15s;-webkit-appearance:none;}
  .fi:focus,.fsl:focus{border-color:var(--pk);}
  .fi-2{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  .egrid{display:grid;grid-template-columns:repeat(6,1fr);gap:7px;}
  .eopt{height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer;background:var(--surface);border:2px solid var(--border);transition:all .13s;}.eopt.s{border-color:var(--pk);background:var(--pk-l);transform:scale(1.1);}
  .rgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;}
  .ropt{background:var(--surface);border:2px solid var(--border);border-radius:14px;padding:14px 10px;display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;transition:all .13s;}.ropt.s{border-color:var(--pk);background:var(--pk-l);}
  .ropt-i{font-size:28px;}.ropt-n{font-size:12px;font-weight:600;text-align:center;color:var(--ink-m);}
  .tchk{display:flex;align-items:center;gap:10px;padding:11px 0;border-bottom:1.5px solid var(--border);cursor:pointer;}.tchk:last-child{border:none;}
  .cb{width:24px;height:24px;border-radius:8px;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:13px;transition:all .13s;flex-shrink:0;}.cb.on{background:var(--pk);border-color:var(--pk);color:#fff;}
  .ob{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 24px;text-align:center;min-height:100dvh;}
  .ob-ic{margin-bottom:16px;animation:bounce 2s infinite;}
  .ob-ti{font-family:"Poppins",sans-serif;font-size:34px;font-weight:800;color:var(--ink);margin-bottom:8px;}
  .ob-su{font-size:15px;color:var(--ink-m);line-height:1.6;margin-bottom:28px;}
  @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  .div{height:1.5px;background:var(--border);margin:16px 0;}
  .row{display:flex;gap:8px;align-items:center;}
  .ir{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1.5px solid var(--border);}.ir:last-child{border:none;}
  .il{font-size:13px;color:var(--ink-l);}.iv{font-size:13px;font-weight:600;color:var(--ink);}
  .emp{text-align:center;padding:36px 16px;color:var(--ink-l);}.emp-i{font-size:40px;display:block;margin-bottom:10px;}
  .sec{font-size:10.5px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:var(--ink-l);margin-bottom:10px;padding-left:2px;}
  .tip{background:var(--gd-l);border:1.5px solid #FFD888;border-radius:12px;padding:12px 14px;font-size:13px;color:var(--ink-m);line-height:1.5;}
  .warn-b{background:var(--danger-l);border:1.5px solid #FFB8C8;border-radius:10px;padding:10px 12px;font-size:12px;color:var(--danger);margin-top:6px;}
  .home-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;}
  .slot-card{background:var(--surface);border-radius:14px;padding:14px;margin-bottom:4px;border:2px solid var(--border);position:relative;}.slot-card.fx{border-color:var(--pk);}
  .slot-head{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
  .snum{width:24px;height:24px;border-radius:50%;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;color:#fff;flex-shrink:0;}
  .slot-del{position:absolute;top:10px;right:10px;width:24px;height:24px;border-radius:50%;background:var(--border);border:none;cursor:pointer;font-size:11px;display:flex;align-items:center;justify-content:center;color:var(--ink-l);transition:all .13s;}.slot-del:hover{background:var(--danger-l);color:var(--danger);}
  .gap-banner{background:linear-gradient(135deg,var(--gd-l),#FFFAF0);border:2px dashed var(--gd);border-radius:12px;padding:12px 14px;margin:8px 0;display:flex;align-items:center;gap:10px;}
  .gap-txt{flex:1;font-size:12px;color:var(--ink-m);line-height:1.4;}
  .gap-btn{background:var(--gd);color:#fff;border:none;border-radius:10px;padding:7px 12px;font-size:12px;font-weight:700;cursor:pointer;font-family:"DM Sans",sans-serif;white-space:nowrap;}.gap-btn:hover{background:var(--gd-d);}
  .add-slot-btn{width:100%;padding:12px;border:2px dashed var(--pk);border-radius:12px;background:var(--pk-l);color:var(--pk);font-family:"DM Sans",sans-serif;font-size:14px;font-weight:700;cursor:pointer;margin-top:8px;}.add-slot-btn:hover{background:#FAD8E8;}
  .set-row{display:flex;align-items:center;gap:12px;padding:13px 16px;border-bottom:1.5px solid var(--border);cursor:pointer;transition:background .13s;}.set-row:last-child{border:none;}.set-row:hover{background:var(--pk-l);}
  .set-ico{font-size:20px;width:36px;text-align:center;flex-shrink:0;}
  .set-lbl{font-size:14px;font-weight:600;color:var(--ink);}.set-sub{font-size:11.5px;color:var(--ink-l);margin-top:2px;}
  .imp-block{background:var(--surface);border-radius:14px;padding:16px;border:1.5px solid var(--border);margin-bottom:12px;}
  .imp-ti{font-family:"Poppins",sans-serif;font-weight:700;font-size:14px;color:var(--ink);margin-bottom:8px;}
  .imp-tx{font-size:13px;color:var(--ink-m);line-height:1.7;}
  .badge-mt{background:var(--mt-l);color:var(--mt-d);font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;letter-spacing:.3px;display:inline-block;margin-left:6px;}
  `;
  document.head.appendChild(s);
})();

const today = () => new Date().toISOString().split("T")[0];
const daysAgo = n => { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().split("T")[0]; };
const addDays = (ds, n) => { const d = new Date(ds); d.setDate(d.getDate() + n); return d.toISOString().split("T")[0]; };
const diffDays = (a, b) => Math.round((new Date(a) - new Date(b)) / 86400000);
const fmtS = ds => new Date(ds).toLocaleDateString("de-CH", { day: "numeric", month: "short" });
const fmtL = ds => new Date(ds).toLocaleDateString("de-CH", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
const fmtAgo = n => n === 0 ? "heute" : n === 1 ? "gestern" : `vor ${n} Tagen`;
const load = (k, fb) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

const ROOMS = [
  { name: "Badezimmer", emoji: "🛁", tasks: [{ name: "WC reinigen", emoji: "🚽", interval: 7 },{ name: "Waschbecken putzen", emoji: "🪥", interval: 7 },{ name: "Dusche / Bad putzen", emoji: "🚿", interval: 7 },{ name: "Handtücher wechseln", emoji: "🛁", interval: 7 },{ name: "Spiegel putzen", emoji: "🪞", interval: 14 },{ name: "Boden wischen", emoji: "💧", interval: 7 }]},
  { name: "Küche", emoji: "🍳", tasks: [{ name: "Herd reinigen", emoji: "🍳", interval: 7 },{ name: "Arbeitsfläche wischen", emoji: "🧽", interval: 3 },{ name: "Kühlschrank putzen", emoji: "🧊", interval: 30 },{ name: "Abfall leeren", emoji: "🗑️", interval: 3 },{ name: "Mikrowelle reinigen", emoji: "📦", interval: 14 }]},
  { name: "Wohnzimmer", emoji: "🛋️", tasks: [{ name: "Staubwischen", emoji: "✨", interval: 7 },{ name: "Staubsaugen", emoji: "🧹", interval: 7 },{ name: "Kissen lüften", emoji: "💨", interval: 14 },{ name: "Fenster putzen", emoji: "🪟", interval: 30 }]},
  { name: "Schlafzimmer", emoji: "🛏️", tasks: [{ name: "Bettwäsche wechseln", emoji: "🛏️", interval: 14 },{ name: "Staubsaugen", emoji: "🧹", interval: 7 },{ name: "Staubwischen", emoji: "✨", interval: 14 },{ name: "Fenster putzen", emoji: "🪟", interval: 30 }]},
  { name: "Ganze Wohnung", emoji: "🏠", tasks: [{ name: "Staubsaugen", emoji: "🧹", interval: 7 },{ name: "Böden wischen", emoji: "💧", interval: 7 },{ name: "Fenster putzen", emoji: "🪟", interval: 30 }]},
  { name: "Eingang", emoji: "🚪", tasks: [{ name: "Boden kehren", emoji: "🧹", interval: 7 },{ name: "Schuhe wegräumen", emoji: "👟", interval: 7 }]},
  { name: "Balkon", emoji: "🌿", tasks: [{ name: "Kehren", emoji: "🌿", interval: 14 },{ name: "Pflanzen giessen", emoji: "🌱", interval: 2 }]},
];
const ME_EMOJIS = ["✂️","💅","🦶","💆","🧘","🐾","💊","🏃","👁️","🦷","🩺","🌿","🧖","💈","🫧","🎯","🧴","💉"];
const TASK_EMOJIS = ["🧹","🛁","🚿","🛏️","🪟","🍳","🪴","🧺","🗑️","🧴","🪥","🧽","💧","✨","🪞","🚽","🧊","💨"];
const mkSlots = () => [{ date: null, fixed: false }, { date: null, fixed: false }, { date: null, fixed: false }];

const DEF_TASKS = [
  { id: 1, name: "Staubsaugen", emoji: "🧹", room: "Ganze Wohnung", lastDone: daysAgo(5), interval: 7 },
  { id: 2, name: "Bad putzen", emoji: "🛁", room: "Badezimmer", lastDone: daysAgo(8), interval: 7 },
  { id: 3, name: "Handtücher wechseln", emoji: "🚿", room: "Badezimmer", lastDone: daysAgo(5), interval: 7 },
  { id: 4, name: "Bettwäsche wechseln", emoji: "🛏️", room: "Schlafzimmer", lastDone: daysAgo(10), interval: 14 },
  { id: 5, name: "Fenster putzen", emoji: "🪟", room: "Ganze Wohnung", lastDone: daysAgo(22), interval: 30 },
  { id: 6, name: "Küche wischen", emoji: "🍳", room: "Küche", lastDone: daysAgo(3), interval: 5 },
];
const DEF_APPTS = [
  { id: 1, name: "Coiffeur", emoji: "✂️", note: "", lastDone: daysAgo(35), minDays: 35, maxDays: 42, slots: mkSlots() },
  { id: 2, name: "Maniküre", emoji: "💅", note: "", lastDone: daysAgo(18), minDays: 21, maxDays: 28, slots: mkSlots() },
  { id: 3, name: "Pediküre", emoji: "🦶", note: "", lastDone: daysAgo(70), minDays: 77, maxDays: 91, slots: mkSlots() },
  { id: 4, name: "Akupunktur", emoji: "🧘", note: "", lastDone: daysAgo(15), minDays: 14, maxDays: 21, slots: mkSlots() },
  { id: 5, name: "Gesichtsbehandlung", emoji: "🧖", note: "", lastDone: daysAgo(28), minDays: 28, maxDays: 35, slots: mkSlots() },
];

const PUBLISHER = "Sabrina Meier";
const YEAR = new Date().getFullYear();

function migrateAppt(a) {
  if (a.slots) return a;
  const { fixedDates, ...rest } = a;
  return { ...rest, slots: (fixedDates || [null, null, null]).map(d => ({ date: d, fixed: !!d })) };
}
function calcSlots(lastDone, minDays, maxDays, slots) {
  const mid = Math.round((minDays + maxDays) / 2);
  const result = []; let base = lastDone;
  for (const slot of slots) {
    const earliest = addDays(base, minDays), latest = addDays(base, maxDays), ideal = addDays(base, mid);
    if (slot.fixed && slot.date) {
      result.push({ date: slot.date, fixed: true, earliest, latest, ideal, inRange: slot.date >= earliest && slot.date <= latest });
      base = slot.date;
    } else {
      result.push({ date: ideal, fixed: false, earliest, latest, ideal, inRange: true }); base = ideal;
    }
  }
  return result;
}
function countFits(prev, next, minDays, maxDays) {
  const mid = Math.round((minDays + maxDays) / 2), gap = diffDays(next, prev);
  return gap <= maxDays ? 0 : Math.max(1, Math.floor(gap / mid) - 1);
}
function taskUrg(lastDone, interval) {
  const tod = today(), due = addDays(lastDone, interval), d = diffDays(due, tod);
  const pct = Math.min(Math.round((diffDays(tod, lastDone) / interval) * 100), 100);
  if (d < 0) return { label: `${Math.abs(d)}d überfällig`, cls: "p-d", pct: 100, bar: "var(--danger)" };
  if (d === 0) return { label: "Heute fällig", cls: "p-ok", pct: 100, bar: "var(--mt)" };
  if (d <= 3) return { label: `in ${d}d`, cls: "p-w", pct, bar: "var(--gd)" };
  return { label: `in ${d}d`, cls: "p-g", pct, bar: "var(--border)" };
}
function urgFromDate(ds) {
  const d = diffDays(ds, today());
  if (d < 0) return { label: `${Math.abs(d)}d überfällig`, cls: "p-d" };
  if (d === 0) return { label: "Heute! 🎉", cls: "p-ok" };
  if (d <= 5) return { label: `in ${d}d`, cls: "p-w" };
  return { label: `in ${d}d`, cls: "p-g" };
}

const AppLogo = ({ size = 42 }) => (
  <div className="logo" style={{ width: size, height: size, fontSize: size * 0.50, borderRadius: size * 0.33 }}>🏡</div>
);

function Sheet({ title, onClose, children }) {
  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="sheet">
        <div className="shdl" />
        <div className="shhd"><span className="shti">{title}</span><button className="icob" onClick={onClose}>✕</button></div>
        <div className="shbd">{children}</div>
      </div>
    </div>
  );
}
function Steps({ step, total }) {
  const els = [];
  for (let i = 0; i < total; i++) {
    if (i > 0) els.push(<div key={`l${i}`} className={`sln${i <= step ? " dn" : ""}`} />);
    els.push(<div key={`d${i}`} className={`sdot${i < step ? " dn" : i === step ? " ac" : ""}`}>{i < step ? "✓" : i + 1}</div>);
  }
  return <div className="steps">{els}</div>;
}
function EmojiPicker({ emojis, value, onChange }) {
  return <div className="egrid">{emojis.map(e => <div key={e} className={`eopt${value === e ? " s" : ""}`} onClick={() => onChange(e)}>{e}</div>)}</div>;
}

function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [sample, setSample] = useState(true);
  if (step === 0) return (
    <div className="ob mz">
      <div className="ob-ic"><AppLogo size={80} /></div>
      <div className="ob-ti">Mein Zuhause</div>
      <div className="ob-su">Deine App für Haushalt & Me Time.<br />Einfach. Persönlich. Mit Freude.</div>
      <div style={{ width: "100%", maxWidth: 320, marginBottom: 24 }}>
        <div className="fg">
          <label className="fl" style={{ textAlign: "left" }}>Wie heisst du?</label>
          <input className="fi" placeholder="Dein Vorname" value={name} onChange={e => setName(e.target.value)}
            style={{ fontSize: 20, textAlign: "center", fontWeight: 700 }}
            onKeyDown={e => e.key === "Enter" && name.trim() && setStep(1)} />
        </div>
      </div>
      <button className="btn btn-fw btn-pk" style={{ maxWidth: 320, opacity: name.trim() ? 1 : .45 }} onClick={() => name.trim() && setStep(1)}>Weiter →</button>
    </div>
  );
  return (
    <div className="ob mz">
      <div style={{ fontSize: 48, marginBottom: 12 }}>✨</div>
      <div className="ob-ti">Hallo, {name}!</div>
      <div className="ob-su">Zwei Bereiche – alles im Blick:</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24, width: "100%", maxWidth: 320 }}>
        <div className="hero hero-pk" style={{ flexDirection: "column", alignItems: "flex-start", padding: 16 }}><div style={{ fontSize: 30, marginBottom: 6 }}>🏠</div><div className="hero-ti" style={{ fontSize: 15 }}>Haushalt</div></div>
        <div className="hero hero-gd" style={{ flexDirection: "column", alignItems: "flex-start", padding: 16 }}><div style={{ fontSize: 30, marginBottom: 6 }}>🌸</div><div className="hero-ti" style={{ fontSize: 15 }}>Me Time</div></div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, background: "#fff", padding: 14, borderRadius: 14, border: "1.5px solid var(--border)", width: "100%", maxWidth: 320, cursor: "pointer" }} onClick={() => setSample(!sample)}>
        <div style={{ width: 26, height: 26, borderRadius: 8, border: "2px solid var(--pk)", background: sample ? "var(--pk)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, transition: "all .15s" }}>{sample ? "✓" : ""}</div>
        <div style={{ fontSize: 14, color: "var(--ink-m)", fontWeight: 500 }}>Mit Beispieldaten starten</div>
      </div>
      <button className="btn btn-fw btn-dk" style={{ maxWidth: 320 }} onClick={() => onDone(name.trim(), sample)}>Los geht's 🚀</button>
    </div>
  );
}

function AddHaushalt({ onSave }) {
  const [step, setStep] = useState(0);
  const [room, setRoom] = useState(null);
  const [sel, setSel] = useState({});
  const [showCust, setShowCust] = useState(false);
  const [cust, setCust] = useState({ name: "", emoji: "🧹", interval: "7" });
  const preset = room ? ROOMS.find(r => r.name === room) : null;
  function toggle(i) { const t = preset.tasks[i]; setSel(s => ({ ...s, [i]: s[i] ? undefined : { ...t, interval: String(t.interval) } })); }
  function doSave() {
    const tasks = [];
    Object.values(sel).filter(Boolean).forEach((t, i) => tasks.push({ id: Date.now() + i + 1, name: t.name, emoji: t.emoji, room, lastDone: today(), interval: parseInt(t.interval) || 7 }));
    if (showCust && cust.name.trim()) tasks.push({ id: Date.now(), name: cust.name.trim(), emoji: cust.emoji, room: room || "Sonstiges", lastDone: today(), interval: parseInt(cust.interval) || 7 });
    if (tasks.length) onSave(tasks);
  }
  const hasSel = Object.values(sel).some(Boolean) || (showCust && cust.name.trim());
  if (step === 0) return <>
    <Steps step={0} total={2} />
    <div className="fg"><div className="fl">Welcher Raum?</div>
      <div className="rgrid">{ROOMS.map(r => <div key={r.name} className={`ropt${room === r.name ? " s" : ""}`} onClick={() => setRoom(r.name)}><span className="ropt-i">{r.emoji}</span><span className="ropt-n">{r.name}</span></div>)}</div>
    </div>
    <button className="btn btn-fw btn-pk" style={{ opacity: room ? 1 : .4 }} onClick={() => room && setStep(1)}>Weiter →</button>
  </>;
  return <>
    <Steps step={1} total={2} />
    <div style={{ fontFamily: "Poppins,sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 14 }}>{preset?.emoji} {room}</div>
    {preset?.tasks.map((t, i) => { const s = sel[i]; return (
      <div key={i} className="tchk" onClick={() => toggle(i)}>
        <div className={`cb${s ? " on" : ""}`}>{s ? "✓" : ""}</div>
        <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{t.emoji} {t.name}</div>
          {s && <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 5 }}>
            <span style={{ fontSize: 12, color: "var(--ink-l)" }}>Alle</span>
            <input className="fi" type="number" min="1" value={s.interval} style={{ width: 60, padding: "4px 8px", fontSize: 13 }} onClick={e => e.stopPropagation()} onChange={e => setSel(p => ({ ...p, [i]: { ...p[i], interval: e.target.value } }))} />
            <span style={{ fontSize: 12, color: "var(--ink-l)" }}>Tage</span>
          </div>}
        </div>
      </div>
    ); })}
    <div className="div" />
    {showCust ? <>
      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>✏️ Eigene Aufgabe</div>
      <div className="fg"><label className="fl">Symbol</label><EmojiPicker emojis={TASK_EMOJIS} value={cust.emoji} onChange={e => setCust(c => ({ ...c, emoji: e }))} /></div>
      <div className="fg"><label className="fl">Name</label><input className="fi" placeholder="Aufgabe" value={cust.name} onChange={e => setCust(c => ({ ...c, name: e.target.value }))} /></div>
      <div className="fg"><label className="fl">Intervall (Tage)</label><input className="fi" type="number" min="1" value={cust.interval} onChange={e => setCust(c => ({ ...c, interval: e.target.value }))} /></div>
    </> : <button className="btn-gh" style={{ width: "100%", justifyContent: "center", marginBottom: 12 }} onClick={() => setShowCust(true)}>＋ Eigene Aufgabe</button>}
    <div className="div" />
    <div className="row" style={{ gap: 10 }}><button className="btn-gh btn-sm" onClick={() => setStep(0)}>← Zurück</button><button className="btn btn-fw btn-pk" style={{ opacity: hasSel ? 1 : .4 }} onClick={hasSel ? doSave : undefined}>Hinzufügen ✓</button></div>
  </>;
}

function EditTaskForm({ item, onSave }) {
  const [f, setF] = useState({ name: item.name, emoji: item.emoji, room: item.room, lastDone: item.lastDone, interval: String(item.interval) });
  return <>
    <div className="fg"><label className="fl">Symbol</label><EmojiPicker emojis={TASK_EMOJIS} value={f.emoji} onChange={e => setF({ ...f, emoji: e })} /></div>
    <div className="fg"><label className="fl">Name</label><input className="fi" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></div>
    <div className="fg"><label className="fl">Raum</label><select className="fsl" value={f.room} onChange={e => setF({ ...f, room: e.target.value })}>{ROOMS.map(r => <option key={r.name}>{r.name}</option>)}</select></div>
    <div className="fi-2">
      <div className="fg"><label className="fl">Zuletzt</label><input className="fi" type="date" value={f.lastDone} max={today()} onChange={e => setF({ ...f, lastDone: e.target.value })} /></div>
      <div className="fg"><label className="fl">Alle (Tage)</label><input className="fi" type="number" min="1" value={f.interval} onChange={e => setF({ ...f, interval: e.target.value })} /></div>
    </div>
    <button className="btn btn-fw btn-pk" onClick={() => f.name.trim() && onSave({ ...f, interval: parseInt(f.interval) || 7 })}>Speichern</button>
  </>;
}

function Haushalt({ tasks, setTasks }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [detail, setDetail] = useState(null);
  const [doneM, setDoneM] = useState(null);
  const tod = today();
  function addBulk(t) { setTasks([...tasks, ...t]); setShowAdd(false); }
  function markDone(id, date) { setTasks(tasks.map(t => t.id === id ? { ...t, lastDone: date } : t)); setDoneM(null); setDetail(null); }
  function del(id) { setTasks(tasks.filter(t => t.id !== id)); setDetail(null); }
  const sorted = [...tasks].sort((a, b) => diffDays(addDays(a.lastDone, a.interval), tod) - diffDays(addDays(b.lastDone, b.interval), tod));
  const grouped = {};
  sorted.forEach(t => { if (!grouped[t.room]) grouped[t.room] = []; grouped[t.room].push(t); });
  return <>
    <div className="ph"><div className="ph-t">🏠 Haushalt</div><div className="ph-s">Alles im Griff, Schritt für Schritt</div></div>
    {tasks.length === 0 && <div className="emp"><span className="emp-i">🏠</span>Noch keine Aufgaben.<br />Tippe auf ＋ und leg los!</div>}
    {Object.entries(grouped).map(([room, rt]) => {
      const ri = ROOMS.find(r => r.name === room);
      return <div key={room} style={{ marginBottom: 18 }}>
        <div className="sec">{ri?.emoji || "🏠"} {room}</div>
        <div className="card pc">
          {rt.map(t => { const u = taskUrg(t.lastDone, t.interval); return (
            <div className="item" key={t.id} style={{ cursor: "pointer" }} onClick={() => setDetail(t)}>
              <div className="ii pk">{t.emoji}</div>
              <div className="ib">
                <div className="in">{t.name}</div>
                <div className="im">alle {t.interval}d · {fmtAgo(diffDays(tod, t.lastDone))}</div>
                <div className="prog"><div className="pf" style={{ width: `${u.pct}%`, background: u.bar }} /></div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                  <span style={{ fontSize: 10, color: "var(--ink-l)" }}>Zuletzt: {fmtS(t.lastDone)}</span>
                  <span style={{ fontSize: 10, color: "var(--ink-l)" }}>Fällig: {fmtS(addDays(t.lastDone, t.interval))}</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 7 }}>
                <span className={`pill ${u.cls}`}>{u.label}</span>
                <button className="chka" onClick={e => { e.stopPropagation(); markDone(t.id, tod); }}>✓</button>
              </div>
            </div>
          ); })}
        </div>
      </div>;
    })}
    <div className="fab"><button className="fabb" style={{ background: "var(--pk)" }} onClick={() => setShowAdd(true)}>＋</button></div>
    {showAdd && <Sheet title="Aufgabe hinzufügen" onClose={() => setShowAdd(false)}><AddHaushalt onSave={addBulk} /></Sheet>}
    {detail && !editItem && <Sheet title={`${detail.emoji} ${detail.name}`} onClose={() => setDetail(null)}>
      {(() => { const u = taskUrg(detail.lastDone, detail.interval); return <>
        <div className="ir"><span className="il">Raum</span><span className="iv">{detail.room}</span></div>
        <div className="ir"><span className="il">Intervall</span><span className="iv">Alle {detail.interval} Tage</span></div>
        <div className="ir"><span className="il">Zuletzt erledigt</span><span className="iv">{fmtL(detail.lastDone)}</span></div>
        <div className="ir"><span className="il">Nächste Fälligkeit</span><span className="iv">{fmtL(addDays(detail.lastDone, detail.interval))}</span></div>
        <div className="ir"><span className="il">Status</span><span className={`pill ${u.cls}`}>{u.label}</span></div>
        <div className="div" />
        <button className="btn btn-fw btn-pk" style={{ marginBottom: 10 }} onClick={() => markDone(detail.id, tod)}>✓ Heute erledigt</button>
        <button className="btn-gh" style={{ width: "100%", justifyContent: "center", marginBottom: 10 }} onClick={() => setDoneM({ item: detail, date: tod })}>📅 Anderes Datum wählen</button>
        <div className="div" />
        <div className="row" style={{ gap: 8 }}><button className="btn-gh" style={{ flex: 1 }} onClick={() => { setEditItem(detail); setDetail(null); }}>✏️ Bearbeiten</button><button className="btn-dng" onClick={() => del(detail.id)}>🗑️</button></div>
      </>; })()}
    </Sheet>}
    {editItem && <Sheet title="Aufgabe bearbeiten" onClose={() => setEditItem(null)}><EditTaskForm item={editItem} onSave={f => { setTasks(tasks.map(t => t.id === editItem.id ? { ...t, ...f } : t)); setEditItem(null); }} /></Sheet>}
    {doneM && <Sheet title="Datum wählen" onClose={() => setDoneM(null)}>
      <div className="fg"><label className="fl">Wann erledigt?</label><input className="fi" type="date" value={doneM.date} max={tod} onChange={e => setDoneM({ ...doneM, date: e.target.value })} /></div>
      <button className="btn btn-fw btn-pk" onClick={() => markDone(doneM.item.id, doneM.date)}>Bestätigen</button>
    </Sheet>}
  </>;
}

function AddMeTime({ initial, onSave }) {
  const [step, setStep] = useState(0);
  const [f, setF] = useState({
    name: initial?.name || "", emoji: initial?.emoji || "✂️", note: initial?.note || "",
    lastDone: initial?.lastDone || today(),
    minDays: String(initial?.minDays || 21), maxDays: String(initial?.maxDays || 28),
    slots: initial?.slots ? [...initial.slots] : mkSlots(),
  });
  const min = parseInt(f.minDays) || 21, max = parseInt(f.maxDays) || 28;
  const mid = Math.round((min + max) / 2);
  const computed = calcSlots(f.lastDone, min, max, f.slots);
  function setSlotDate(i, val) { const s = [...f.slots]; s[i] = { date: val || null, fixed: !!val }; setF({ ...f, slots: s }); }
  function clearSlot(i) { const s = [...f.slots]; s[i] = { date: null, fixed: false }; setF({ ...f, slots: s }); }
  function removeSlot(i) { if (f.slots.length <= 1) return; setF({ ...f, slots: f.slots.filter((_, x) => x !== i) }); }
  function addSlot() { setF({ ...f, slots: [...f.slots, { date: null, fixed: false }] }); }
  function insertBetween(after, count) {
    const s = [...f.slots];
    s.splice(after + 1, 0, ...Array.from({ length: count }, () => ({ date: null, fixed: false })));
    setF({ ...f, slots: s });
  }
  function doSave() {
    if (!f.name.trim()) return;
    onSave({ id: initial?.id || Date.now(), name: f.name.trim(), emoji: f.emoji, note: f.note.trim(), lastDone: f.lastDone, minDays: min, maxDays: max, slots: f.slots });
  }
  return <>
    <Steps step={step} total={3} />
    {step === 0 && <>
      <div style={{ textAlign: "center", fontSize: 52, marginBottom: 12 }}>{f.emoji}</div>
      <div className="fg"><label className="fl">Aktivität</label><input className="fi" placeholder="z. B. Maniküre, Coiffeur…" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} onKeyDown={e => e.key === "Enter" && f.name.trim() && setStep(1)} autoFocus /></div>
      <div className="fg"><label className="fl">Notiz / Ort (optional)</label><input className="fi" placeholder="z. B. Salon Müller" value={f.note} onChange={e => setF({ ...f, note: e.target.value })} /></div>
      <div className="fg"><label className="fl">Symbol</label><EmojiPicker emojis={ME_EMOJIS} value={f.emoji} onChange={e => setF({ ...f, emoji: e })} /></div>
      <button className="btn btn-fw btn-gd" style={{ opacity: f.name.trim() ? 1 : .4 }} onClick={() => f.name.trim() && setStep(1)}>Weiter →</button>
    </>}
    {step === 1 && <>
      <div style={{ textAlign: "center", marginBottom: 20 }}><div style={{ fontSize: 40 }}>{f.emoji}</div><div style={{ fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: 20, marginTop: 4 }}>{f.name}</div></div>
      <div className="fg"><label className="fl">Wie oft möchtest du gehen?</label>
        <div style={{ background: "var(--surface)", borderRadius: 16, padding: 18, border: "2px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div className="fl" style={{ marginBottom: 6 }}>Mindestens</div>
              <input className="fi" type="number" min="1" value={f.minDays} onChange={e => setF({ ...f, minDays: e.target.value })} style={{ textAlign: "center", fontSize: 26, fontWeight: 800, padding: "8px" }} />
              <div style={{ fontSize: 12, color: "var(--ink-l)", marginTop: 4 }}>Tage</div>
            </div>
            <div style={{ fontSize: 20, color: "var(--ink-l)", fontWeight: 700 }}>—</div>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div className="fl" style={{ marginBottom: 6 }}>Höchstens</div>
              <input className="fi" type="number" min="1" value={f.maxDays} onChange={e => setF({ ...f, maxDays: e.target.value })} style={{ textAlign: "center", fontSize: 26, fontWeight: 800, padding: "8px" }} />
              <div style={{ fontSize: 12, color: "var(--ink-l)", marginTop: 4 }}>Tage</div>
            </div>
          </div>
          <div style={{ textAlign: "center", fontSize: 13, color: "var(--pk)", fontWeight: 700, marginTop: 10 }}>Alle {f.minDays}–{f.maxDays} Tage · Ideal: {mid}d</div>
        </div>
      </div>
      <div className="fg"><label className="fl">Zuletzt dort gewesen?</label>
        <input className="fi" type="date" value={f.lastDone} max={today()} onChange={e => setF({ ...f, lastDone: e.target.value })} />
        <div style={{ fontSize: 12, color: "var(--ink-l)", marginTop: 2 }}>{fmtAgo(diffDays(today(), f.lastDone))}</div>
      </div>
      <div className="row" style={{ gap: 10 }}><button className="btn-gh btn-sm" onClick={() => setStep(0)}>← Zurück</button><button className="btn btn-fw btn-gd" onClick={() => setStep(2)}>Weiter →</button></div>
    </>}
    {step === 2 && <>
      <div className="tip">💡 Fixe Termine eintragen (z. B. vor Ferien). Grosse Lücken werden erkannt — Zwischentermine auf Knopfdruck einfügen.</div>
      <div style={{ height: 14 }} />
      {f.slots.map((slot, i) => {
        const c = computed[i];
        let gapBanner = null;
        if (i > 0 && computed[i - 1]) {
          const fits = countFits(computed[i - 1].date, c.date, min, max);
          if (fits > 0) gapBanner = <div className="gap-banner">
            <span style={{ fontSize: 20 }}>💡</span>
            <div className="gap-txt"><strong>Lücke: {diffDays(c.date, computed[i - 1].date)} Tage!</strong><br />{fits === 1 ? "Noch 1 Termin passt rein." : `Noch ${fits} Termine passen rein.`}</div>
            <button className="gap-btn" onClick={() => insertBetween(i - 1, fits)}>＋ Einfügen</button>
          </div>;
        }
        return <div key={i}>{gapBanner}
          <div className={`slot-card${slot.fixed ? " fx" : ""}`}>
            {f.slots.length > 1 && <button className="slot-del" onClick={() => removeSlot(i)}>✕</button>}
            <div className="slot-head">
              <div className="snum" style={{ background: i === 0 ? "var(--pk)" : slot.fixed ? "var(--gd-d)" : "var(--border)", color: i === 0 || slot.fixed ? "#fff" : "var(--ink-m)" }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: slot.fixed ? "var(--gd-d)" : "var(--ink-m)" }}>{slot.fixed ? "📌 Fixer Termin" : "📐 Automatisch"}</div>
                <div style={{ fontSize: 11, color: "var(--ink-l)" }}>Empfohlen: {fmtS(c.earliest)} – {fmtS(c.latest)}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: !c.inRange ? "var(--danger)" : i === 0 ? "var(--pk)" : "var(--ink-m)" }}>{fmtS(c.date)}</div>
            </div>
            {!c.inRange && <div className="warn-b">⚠️ Ausserhalb des Intervalls! Empfohlen: {fmtS(c.earliest)} – {fmtS(c.latest)}</div>}
            <input className="fi" type="date" value={slot.date || c.ideal} onChange={e => setSlotDate(i, e.target.value)} style={{ fontSize: 13, padding: "8px 12px", marginTop: 8 }} />
            {slot.fixed && <button onClick={() => clearSlot(i)} style={{ background: "none", border: "none", fontSize: 12, color: "var(--ink-l)", cursor: "pointer", marginTop: 6, display: "block" }}>✕ Zurück auf automatisch</button>}
          </div>
        </div>;
      })}
      <button className="add-slot-btn" onClick={addSlot}>＋ Weiteren Termin hinzufügen</button>
      <div style={{ height: 16 }} />
      <div className="row" style={{ gap: 10 }}><button className="btn-gh btn-sm" onClick={() => setStep(1)}>← Zurück</button><button className="btn btn-fw btn-pk" onClick={doSave}>Speichern ✓</button></div>
    </>}
  </>;
}

function MeTime({ appts, setAppts }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [detail, setDetail] = useState(null);
  const [doneM, setDoneM] = useState(null);
  const tod = today();
  const migrated = useMemo(() => appts.map(migrateAppt), [appts]);
  function markDone(id, date) {
    setAppts(migrated.map(a => {
      if (a.id !== id) return a;
      const slots = [...a.slots]; slots.shift(); slots.push({ date: null, fixed: false });
      return { ...a, lastDone: date, slots };
    }));
    setDoneM(null); setDetail(null);
  }
  function del(id) { setAppts(migrated.filter(a => a.id !== id)); setDetail(null); }
  const sorted = [...migrated].sort((a, b) => {
    const na = calcSlots(a.lastDone, a.minDays, a.maxDays, a.slots)[0]?.date || "9999";
    const nb = calcSlots(b.lastDone, b.minDays, b.maxDays, b.slots)[0]?.date || "9999";
    return diffDays(na, tod) - diffDays(nb, tod);
  });
  return <>
    <div className="ph"><div className="ph-t">🌸 Me Time</div><div className="ph-s">Deine persönlichen Termine & Pflege</div></div>
    {sorted.length === 0 && <div className="emp"><span className="emp-i">💆</span>Noch keine Termine.<br />Tippe auf ＋ und füge deinen ersten hinzu!</div>}
    {sorted.map(a => {
      const dates = calcSlots(a.lastDone, a.minDays, a.maxDays, a.slots);
      const next1 = dates[0]?.date;
      const u = next1 ? urgFromDate(next1) : { label: "–", cls: "p-g" };
      const hasWarn = dates.some(d => !d.inRange);
      return <div className="card gc" key={a.id} style={{ cursor: "pointer" }} onClick={() => setDetail(a)}>
        <div className="item">
          <div className="ii gd">{a.emoji}</div>
          <div className="ib">
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}><div className="in">{a.name}</div>{hasWarn && <span>⚠️</span>}</div>
            {a.note && <div className="im">📍 {a.note}</div>}
            <div className="dstrip">
              {dates.slice(0, 5).map((d, i) => (
                <div key={i} className={`dchip${i === 0 ? " p1" : ""}`}>
                  <div className="dnum" style={{ background: i === 0 ? "var(--pk)" : "var(--border)", color: i === 0 ? "#fff" : "var(--ink-l)" }}>{i + 1}</div>
                  <span className="dtxt">{fmtS(d.date)}{d.fixed ? "📌" : ""}</span>
                </div>
              ))}
              {dates.length > 5 && <div className="dchip"><span className="dtxt">+{dates.length - 5}</span></div>}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 7 }}>
            <span className={`pill ${u.cls}`}>{u.label}</span>
            <button className="chka" onClick={e => { e.stopPropagation(); markDone(a.id, tod); }}>✓</button>
          </div>
        </div>
      </div>;
    })}
    <div className="fab"><button className="fabb" style={{ background: "var(--gd)" }} onClick={() => { setEditItem(null); setShowAdd(true); }}>＋</button></div>
    {(showAdd || editItem) && <Sheet title={editItem ? "Termin bearbeiten" : "Neuer Termin"} onClose={() => { setShowAdd(false); setEditItem(null); }}>
      <AddMeTime initial={editItem} onSave={data => { setAppts(editItem ? migrated.map(a => a.id === data.id ? data : a) : [...migrated, data]); setShowAdd(false); setEditItem(null); }} />
    </Sheet>}
    {detail && !editItem && <Sheet title={`${detail.emoji} ${detail.name}`} onClose={() => setDetail(null)}>
      {(() => {
        const dates = calcSlots(detail.lastDone, detail.minDays, detail.maxDays, detail.slots);
        const u = dates[0]?.date ? urgFromDate(dates[0].date) : { label: "–", cls: "p-g" };
        return <>
          {detail.note && <div className="ir"><span className="il">📍 Ort / Notiz</span><span className="iv">{detail.note}</span></div>}
          <div className="ir"><span className="il">Status</span><span className={`pill ${u.cls}`}>{u.label}</span></div>
          <div className="ir"><span className="il">Intervall</span><span className="iv">Alle {detail.minDays}–{detail.maxDays} Tage</span></div>
          <div className="ir"><span className="il">Zuletzt</span><span className="iv">{fmtL(detail.lastDone)}</span></div>
          <div className="div" />
          <div style={{ fontFamily: "Poppins,sans-serif", fontWeight: 700, fontSize: 13, marginBottom: 10 }}>📅 Geplante Termine ({dates.length})</div>
          {dates.map((d, i) => (
            <div key={i} style={{ background: i === 0 ? "var(--pk-l)" : !d.inRange ? "var(--danger-l)" : "var(--surface)", borderRadius: 12, padding: "11px 14px", marginBottom: 7, border: `2px solid ${i === 0 ? "var(--pk)" : !d.inRange ? "var(--danger)" : "var(--border)"}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: i === 0 ? "var(--pk)" : "var(--border)", color: i === 0 ? "#fff" : "var(--ink-m)", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
                  <span style={{ fontSize: 14, fontWeight: i === 0 ? 700 : 500 }}>{fmtL(d.date)}</span>
                </div>
                {d.fixed && <span style={{ fontSize: 11, color: "var(--gd-d)", fontWeight: 700 }}>📌 Fix</span>}
              </div>
              {!d.inRange && <div style={{ fontSize: 11, color: "var(--danger)", marginTop: 5 }}>Empfohlen: {fmtS(d.earliest)} – {fmtS(d.latest)}</div>}
            </div>
          ))}
          <div className="div" />
          <button className="btn btn-fw btn-gd" style={{ marginBottom: 10 }} onClick={() => markDone(detail.id, tod)}>✓ Heute erledigt</button>
          <button className="btn-gh" style={{ width: "100%", justifyContent: "center", marginBottom: 10 }} onClick={() => setDoneM({ item: detail, date: tod })}>📅 Anderes Datum wählen</button>
          <div className="div" />
          <div className="row" style={{ gap: 8 }}><button className="btn-gh" style={{ flex: 1 }} onClick={() => { setEditItem(detail); setDetail(null); }}>✏️ Bearbeiten</button><button className="btn-dng" onClick={() => del(detail.id)}>🗑️</button></div>
        </>;
      })()}
    </Sheet>}
    {doneM && <Sheet title="Datum wählen" onClose={() => setDoneM(null)}>
      <div className="fg"><label className="fl">Wann war der Termin?</label><input className="fi" type="date" value={doneM.date} max={tod} onChange={e => setDoneM({ ...doneM, date: e.target.value })} /></div>
      <button className="btn btn-fw btn-gd" onClick={() => markDone(doneM.item.id, doneM.date)}>Bestätigen</button>
    </Sheet>}
  </>;
}

function Home({ name, tasks, appts, nav }) {
  const tod = today();
  const hr = new Date().getHours();
  const greet = hr < 12 ? "Guten Morgen" : hr < 17 ? "Hallo" : "Guten Abend";
  const migrated = useMemo(() => appts.map(migrateAppt), [appts]);
  const tUrgs = tasks.map(t => ({ ...t, u: taskUrg(t.lastDone, t.interval), due: addDays(t.lastDone, t.interval) }));
  const aUrgs = migrated.map(a => { const dates = calcSlots(a.lastDone, a.minDays, a.maxDays, a.slots); const next = dates[0]?.date || "9999"; return { ...a, nextDate: next, u: urgFromDate(next) }; });
  const hCnt = tUrgs.filter(t => t.u.cls !== "p-g").length;
  const mCnt = aUrgs.filter(a => a.u.cls !== "p-g").length;
  const urgent = [
    ...tUrgs.filter(t => t.u.cls !== "p-g").map(t => ({ ...t, kind: "h" })),
    ...aUrgs.filter(a => a.u.cls !== "p-g").map(a => ({ ...a, kind: "m", due: a.nextDate })),
  ].sort((a, b) => diffDays(a.due, tod) - diffDays(b.due, tod)).slice(0, 8);
  return <>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
      <AppLogo size={44} />
      <div>
        <div style={{ fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: 21, color: "var(--ink)", letterSpacing: "-.3px" }}>{greet}, {name} 👋</div>
        <div style={{ fontSize: 12, color: "var(--ink-l)", marginTop: 2 }}>{new Date().toLocaleDateString("de-CH", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
      </div>
    </div>
    <div className="home-grid">
      <div className="hero hero-pk" onClick={() => nav("haushalt")}>
        <div><div className="hero-ic">🏠</div><div className="hero-ti">Haushalt</div><div className="hero-su">{tasks.length} Aufgaben</div></div>
        {hCnt > 0 && <div className="hero-badge">{hCnt} fällig</div>}
      </div>
      <div className="hero hero-gd" onClick={() => nav("metime")}>
        <div><div className="hero-ic">🌸</div><div className="hero-ti">Me Time</div><div className="hero-su">{appts.length} Termine</div></div>
        {mCnt > 0 && <div className="hero-badge">{mCnt} fällig</div>}
      </div>
    </div>
    {urgent.length > 0 && <>
      <div className="sec">Anstehend & Überfällig</div>
      <div className="card">
        {urgent.map(item => (
          <div className="item" key={`${item.kind}${item.id}`} style={{ cursor: "pointer" }} onClick={() => nav(item.kind === "h" ? "haushalt" : "metime")}>
            <div className={`ii ${item.kind === "h" ? "pk" : "gd"}`}>{item.emoji}</div>
            <div className="ib"><div className="in">{item.name}</div><div className="im">{item.kind === "h" ? item.room : item.note || "Me Time"}</div></div>
            <span className={`pill ${item.u.cls}`}>{item.u.label}</span>
          </div>
        ))}
      </div>
    </>}
    {urgent.length === 0 && (tasks.length > 0 || appts.length > 0) && (
      <div className="card" style={{ padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>✨</div>
        <div style={{ fontFamily: "Poppins,sans-serif", fontWeight: 700, fontSize: 16 }}>Alles erledigt!</div>
        <div style={{ fontSize: 13, color: "var(--ink-l)", marginTop: 4 }}>Gönn dir was! 🌸</div>
      </div>
    )}
    {tasks.length === 0 && appts.length === 0 && (
      <div className="card" style={{ padding: 28, textAlign: "center" }}>
        <div style={{ fontSize: 36, marginBottom: 10 }}>🚀</div>
        <div style={{ fontFamily: "Poppins,sans-serif", fontWeight: 700, fontSize: 16 }}>Bereit loszulegen?</div>
        <div style={{ fontSize: 13, color: "var(--ink-l)", marginTop: 6, lineHeight: 1.6 }}>Tippe auf Haushalt oder Me Time.</div>
      </div>
    )}
  </>;
}

function Settings({ name, onSetName, onClear }) {
  const [nameV, setNameV] = useState(name);
  const [confirm, setConfirm] = useState(false);
  const [page, setPage] = useState(null);

  if (page === "impressum") return (
    <div className="mz" style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <button className="icob" onClick={() => setPage(null)}>←</button>
        <div style={{ fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: 22 }}>Impressum</div>
      </div>
      <div className="imp-block">
        <div className="imp-ti">🏢 Herausgeberin</div>
        <div className="imp-tx"><strong>{PUBLISHER}</strong><br />Schweiz<br /><br />Diese App ist eine private, nicht-kommerzielle Anwendung für die persönliche Haushalts- und Terminplanung.</div>
      </div>
      <div className="imp-block">
        <div className="imp-ti">📱 App-Informationen</div>
        <div className="imp-tx"><strong>Mein Zuhause</strong><br />Version 4.0<br />© {YEAR} {PUBLISHER}<br />Alle Rechte vorbehalten.</div>
      </div>
      <div className="imp-block">
        <div className="imp-ti">⚠️ Haftungsausschluss</div>
        <div className="imp-tx">Die App wird ohne jegliche Garantie bereitgestellt. Für Datenverlust durch technische Probleme, Browser-Updates oder Gerätewechsel wird keine Haftung übernommen. Die Nutzung erfolgt auf eigene Verantwortung.</div>
      </div>
      <div className="imp-block">
        <div className="imp-ti">🔗 Weitergabe</div>
        <div className="imp-tx">Diese App darf als Link frei weitergegeben werden. Eine kommerzielle Nutzung oder Weiterverbreitung des Quellcodes ohne ausdrückliche Genehmigung der Herausgeberin ist nicht gestattet.</div>
      </div>
    </div>
  );

  if (page === "datenschutz") return (
    <div className="mz" style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <button className="icob" onClick={() => setPage(null)}>←</button>
        <div style={{ fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: 22 }}>Datenschutz</div>
      </div>
      <div className="imp-block" style={{ borderColor: "var(--mt)", background: "var(--mt-l)" }}>
        <div className="imp-ti">✅ 100% Lokal <span className="badge-mt">Keine Server</span></div>
        <div className="imp-tx" style={{ marginTop: 6 }}>Alle Daten werden <strong>ausschliesslich auf deinem Gerät</strong> gespeichert. Es werden keine Daten übertragen, keine Cookies gesetzt, kein Tracking verwendet.</div>
      </div>
      <div className="imp-block">
        <div className="imp-ti">📦 Was gespeichert wird</div>
        <div className="imp-tx">
          • Dein Vorname<br />
          • Haushaltsaufgaben (Name, Raum, Datum, Intervall)<br />
          • Me-Time-Termine (Name, Notiz, Daten, Intervall)<br /><br />
          Diese Daten verlassen <strong>niemals</strong> dein Gerät.
        </div>
      </div>
      <div className="imp-block">
        <div className="imp-ti">👥 Weitergabe der App</div>
        <div className="imp-tx">Die App kann als Link geteilt werden. Jede Person hat <strong>eigene, separate Daten</strong> — es gibt keine gemeinsamen Konten oder geteilten Daten zwischen verschiedenen Nutzerinnen und Nutzern.</div>
      </div>
      <div className="imp-block">
        <div className="imp-ti">🗑️ Daten löschen</div>
        <div className="imp-tx">Alle Daten können jederzeit unter Einstellungen → «Alle Daten löschen» entfernt werden. Alternativ: Browser-Daten des Geräts löschen.</div>
      </div>
    </div>
  );

  if (page === "about") return (
    <div className="mz" style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <button className="icob" onClick={() => setPage(null)}>←</button>
        <div style={{ fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: 22 }}>Über die App</div>
      </div>
      <div style={{ textAlign: "center", padding: "20px 0 24px" }}>
        <AppLogo size={72} />
        <div style={{ fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: 24, marginTop: 16, color: "var(--ink)" }}>Mein Zuhause</div>
        <div style={{ fontSize: 13, color: "var(--ink-l)", marginTop: 4 }}>Version 4.0 · © {YEAR} {PUBLISHER}</div>
      </div>
      <div className="imp-block">
        <div className="imp-ti">💡 Funktionen im Überblick</div>
        <div className="imp-tx">
          🏠 <strong>Haushalt</strong> — Putzaufgaben nach Raum, Intervall, Fortschrittsbalken<br />
          🌸 <strong>Me Time</strong> — Persönliche Termine mit Min/Max-Intervall<br />
          📅 Fixe Termine & automatische Zwischentermine<br />
          💾 Alle Daten lokal — keine Anmeldung nötig
        </div>
      </div>
      <div className="imp-block">
        <div className="imp-ti">📲 App auf dem iPhone installieren</div>
        <div className="imp-tx">
          1. Öffne die App-URL in <strong>Safari</strong><br />
          2. Tippe auf das Teilen-Symbol <strong>⬆️</strong><br />
          3. Wähle <strong>«Zum Home-Bildschirm»</strong><br /><br />
          Die App verhält sich dann wie eine native App — ohne Browser-Leiste, mit eigenem Icon!
        </div>
      </div>
      <div className="imp-block">
        <div className="imp-ti">🔗 App teilen</div>
        <div className="imp-tx">Kopiere einfach die URL aus dem Browser und teile sie per iMessage, WhatsApp oder E-Mail. Jede Person startet mit dem eigenen Onboarding und hat ihre eigenen Daten.</div>
      </div>
    </div>
  );

  return <>
    <div className="ph"><div className="ph-t">⚙️ Einstellungen</div></div>
    <div className="sec">Mein Profil</div>
    <div className="card" style={{ padding: 16, marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,var(--pk-d),var(--pk))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#fff", fontFamily: "Poppins,sans-serif", fontWeight: 800, flexShrink: 0 }}>
          {name ? name[0].toUpperCase() : "?"}
        </div>
        <div style={{ fontFamily: "Poppins,sans-serif", fontWeight: 700, fontSize: 16 }}>{name || "–"}</div>
      </div>
      <div className="fg"><label className="fl">Name ändern</label><input className="fi" value={nameV} onChange={e => setNameV(e.target.value)} /></div>
      <button className="btn btn-pk btn-sm" onClick={() => nameV.trim() && onSetName(nameV.trim())} style={{ display: "flex", width: "100%", justifyContent: "center" }}>Speichern</button>
    </div>

    <div className="sec">App & Rechtliches</div>
    <div className="card" style={{ marginBottom: 16 }}>
      {[
        { ico: "📱", lbl: "Über die App", sub: "Funktionen, Installation & Teilen", action: () => setPage("about") },
        { ico: "🔒", lbl: "Datenschutz", sub: "Deine Daten bleiben auf deinem Gerät", action: () => setPage("datenschutz") },
        { ico: "📋", lbl: "Impressum", sub: `Herausgeberin: ${PUBLISHER}`, action: () => setPage("impressum") },
      ].map(r => (
        <div key={r.lbl} className="set-row" onClick={r.action}>
          <span className="set-ico">{r.ico}</span>
          <div style={{ flex: 1 }}><div className="set-lbl">{r.lbl}</div><div className="set-sub">{r.sub}</div></div>
          <span style={{ color: "var(--ink-l)", fontSize: 18 }}>›</span>
        </div>
      ))}
    </div>

    <div className="sec">Daten</div>
    <div className="card" style={{ padding: 16 }}>
      {!confirm
        ? <button className="btn-dng" style={{ width: "100%", textAlign: "center", padding: 13 }} onClick={() => setConfirm(true)}>🗑️ Alle Daten löschen</button>
        : <>
          <div style={{ fontSize: 14, color: "var(--danger)", fontWeight: 700, marginBottom: 12, textAlign: "center" }}>Wirklich alles unwiderruflich löschen?</div>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn-gh btn-sm" style={{ flex: 1, justifyContent: "center" }} onClick={() => setConfirm(false)}>Abbrechen</button>
            <button className="btn-dng btn-sm" onClick={onClear}>Ja, löschen</button>
          </div>
        </>}
    </div>

    <div style={{ textAlign: "center", marginTop: 24, color: "var(--ink-l)", fontSize: 11, lineHeight: 1.9 }}>
      Mein Zuhause · Version 4.0<br />© {YEAR} {PUBLISHER} · Schweiz
    </div>
  </>;
}

export default function App() {
  const [onboarded, setOnboarded] = useState(() => load("mz4_ob", false));
  const [name, setNameRaw] = useState(() => load("mz4_name", ""));
  const [tasks, setTasksRaw] = useState(() => load("mz4_tasks", []));
  const [appts, setApptsRaw] = useState(() => load("mz4_appts", []));
  const [tab, setTab] = useState("home");

  const setName = v => { setNameRaw(v); save("mz4_name", v); };
  const setTasks = useCallback(v => { setTasksRaw(v); save("mz4_tasks", v); }, []);
  const setAppts = useCallback(v => { setApptsRaw(v); save("mz4_appts", v); }, []);

  function finishOB(n, withSample) {
    setNameRaw(n); save("mz4_name", n);
    if (withSample) { setTasksRaw(DEF_TASKS); save("mz4_tasks", DEF_TASKS); setApptsRaw(DEF_APPTS); save("mz4_appts", DEF_APPTS); }
    save("mz4_ob", true); setOnboarded(true);
  }
  function clearAll() {
    setTasksRaw([]); save("mz4_tasks", []);
    setApptsRaw([]); save("mz4_appts", []);
    setNameRaw(""); save("mz4_name", "");
    save("mz4_ob", false); setOnboarded(false);
  }

  if (!onboarded) return <div className="mz"><Onboarding onDone={finishOB} /></div>;

  const NAV = [
    { k: "home", l: "Übersicht", ico: "🏡" },
    { k: "haushalt", l: "Haushalt", ico: "🏠" },
    { k: "metime", l: "Me Time", ico: "🌸" },
    { k: "settings", l: "Einstellungen", ico: "⚙️" },
  ];

  return (
    <div className="mz">
      <div className="page">
        {tab === "home" && <Home name={name} tasks={tasks} appts={appts} nav={setTab} />}
        {tab === "haushalt" && <Haushalt tasks={tasks} setTasks={setTasks} />}
        {tab === "metime" && <MeTime appts={appts} setAppts={setAppts} />}
        {tab === "settings" && <Settings name={name} onSetName={setName} onClear={clearAll} />}
      </div>
      <nav className="nav">
        {NAV.map(({ k, l, ico }) => (
          <button key={k} className={`nb${tab === k ? " on" : ""}`} onClick={() => setTab(k)}>
            <span className="ni">{ico}</span>
            <span className="nl">{l}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
