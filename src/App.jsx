import { useState, useCallback, useMemo } from "react";

// ── Fonts ─────────────────────────────────────────────────────────────────────
(() => {
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Righteous&display=swap";
  document.head.appendChild(l);
})();

// ── CSS ───────────────────────────────────────────────────────────────────────
(() => {
  if (document.getElementById("mz-css")) return;
  const s = document.createElement("style");
  s.id = "mz-css";
  s.textContent = `
  .mz*,.mz *::before,.mz *::after{box-sizing:border-box;margin:0;padding:0;}
  .mz{
    --bg:#F7F5FF;
    --surface:#FFFFFF;
    --border:#E8E5F5;
    --house:#00B09B;--house-l:#E3F9F6;--house-d:#007A6B;
    --me:#E91E8C;--me-l:#FDE4F2;--me-d:#AD0066;
    --ok:#06C167;--ok-l:#E3FAF0;
    --warn:#FF8C00;--warn-l:#FFF0DC;
    --danger:#FF3366;--danger-l:#FFE8EE;
    --ink:#1A1A2E;--ink-m:#4A4A6A;--ink-l:#9090B0;
    --sh:0 2px 14px rgba(30,20,80,.08);
    --sh-lg:0 8px 40px rgba(30,20,80,.16);
    font-family:'Nunito',sans-serif;
    color:var(--ink);background:var(--bg);
    -webkit-font-smoothing:antialiased;
    max-width:480px;margin:0 auto;min-height:100%;
    display:flex;flex-direction:column;
  }
  .page{flex:1;overflow-y:auto;padding:20px 16px 96px;}

  /* Nav */
  .nav{position:sticky;bottom:0;background:rgba(247,245,255,.97);backdrop-filter:blur(20px);border-top:1.5px solid var(--border);display:flex;padding:10px 4px 16px;z-index:100;gap:4px;}
  .nb{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;background:none;border:none;cursor:pointer;padding:6px 4px;color:var(--ink-l);font-family:'Nunito',sans-serif;border-radius:12px;transition:all .15s;}
  .nb.on{color:var(--ink);background:var(--surface);box-shadow:var(--sh);}
  .ni{font-size:22px;line-height:1;}
  .nl{font-size:10px;font-weight:800;letter-spacing:.3px;text-transform:uppercase;}

  /* Page header */
  .ph{margin-bottom:22px;}
  .ph-t{font-family:'Righteous',sans-serif;font-size:30px;color:var(--ink);letter-spacing:-.3px;}
  .ph-s{font-size:13px;color:var(--ink-l);margin-top:3px;}

  /* Cards */
  .card{background:var(--surface);border-radius:20px;border:1.5px solid var(--border);box-shadow:var(--sh);margin-bottom:12px;overflow:hidden;}
  .card.hc{border-color:rgba(0,176,155,.25);background:linear-gradient(135deg,#fff 55%,var(--house-l));}
  .card.mc{border-color:rgba(233,30,140,.2);background:linear-gradient(135deg,#fff 55%,var(--me-l));}

  /* Hero cards */
  .hero{border-radius:20px;padding:18px 20px;display:flex;align-items:center;gap:14px;cursor:pointer;position:relative;overflow:hidden;transition:transform .13s;}
  .hero:hover{transform:scale(1.02);}
  .hero-h{background:linear-gradient(135deg,var(--house-d),var(--house));}
  .hero-m{background:linear-gradient(135deg,var(--me-d),var(--me));}
  .hero-ic{font-size:42px;}
  .hero-ti{font-family:'Righteous',sans-serif;font-size:21px;color:#fff;}
  .hero-su{font-size:13px;color:rgba(255,255,255,.8);margin-top:2px;}
  .hero-bg{position:absolute;top:12px;right:14px;background:rgba(255,255,255,.22);color:#fff;font-size:11px;font-weight:800;padding:4px 10px;border-radius:20px;}

  /* Items */
  .item{display:flex;align-items:center;gap:12px;padding:14px 16px;}
  .item+.item{border-top:1.5px solid var(--border);}
  .ii{width:44px;height:44px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}
  .ii.h{background:var(--house-l);}
  .ii.m{background:var(--me-l);}
  .ib{flex:1;min-width:0;}
  .in{font-size:15px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .im{font-size:12px;color:var(--ink-l);margin-top:2px;}

  /* Pills */
  .pill{font-size:10px;font-weight:800;padding:3px 10px;border-radius:20px;letter-spacing:.4px;text-transform:uppercase;white-space:nowrap;}
  .p-ok{background:var(--ok-l);color:#028A46;}
  .p-w{background:var(--warn-l);color:#C06000;}
  .p-d{background:var(--danger-l);color:#CC1144;}
  .p-g{background:var(--border);color:var(--ink-m);}

  /* Progress bar */
  .prog{height:4px;background:var(--border);border-radius:3px;margin-top:8px;overflow:hidden;}
  .pf{height:100%;border-radius:3px;transition:width .3s;}

  /* Date chips */
  .dstrip{display:flex;gap:7px;margin-top:8px;flex-wrap:wrap;}
  .dchip{display:flex;align-items:center;gap:4px;background:var(--bg);border-radius:10px;padding:4px 9px;border:1.5px solid var(--border);}
  .dchip.p1{background:var(--me-l);border-color:var(--me);}
  .dchip.p1h{background:var(--house-l);border-color:var(--house);}
  .dnum{width:16px;height:16px;border-radius:50%;font-size:9px;font-weight:800;display:flex;align-items:center;justify-content:center;color:#fff;}
  .dtxt{font-size:11px;font-weight:600;color:var(--ink-m);}
  .dchip.p1 .dtxt,.dchip.p1h .dtxt{color:var(--ink);}

  /* Buttons */
  .btn{display:flex;align-items:center;justify-content:center;gap:6px;border:none;cursor:pointer;font-family:'Nunito',sans-serif;font-weight:700;letter-spacing:.2px;transition:all .15s;border-radius:14px;}
  .btn-fw{width:100%;padding:14px;font-size:15px;}
  .btn-h{background:var(--house);color:#fff;}
  .btn-h:hover{background:var(--house-d);}
  .btn-m{background:var(--me);color:#fff;}
  .btn-m:hover{background:var(--me-d);}
  .btn-dk{background:var(--ink);color:#fff;}
  .btn-dk:hover{background:var(--ink-m);}
  .btn-gh{padding:10px 16px;background:var(--bg);border:1.5px solid var(--border);border-radius:12px;color:var(--ink-m);font-size:14px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;display:flex;align-items:center;gap:6px;transition:background .13s;}
  .btn-gh:hover{background:var(--border);}
  .btn-dng{padding:10px 16px;background:var(--danger-l);border:none;border-radius:12px;color:var(--danger);font-size:13px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;}
  .btn-sm{padding:9px 14px;border-radius:10px;font-size:13px;}
  .icob{width:36px;height:36px;border-radius:50%;background:var(--bg);border:1.5px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;transition:background .13s;}
  .icob:hover{background:var(--border);}
  .chka{width:32px;height:32px;border-radius:50%;border:2px solid var(--border);background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all .15s;flex-shrink:0;}
  .chka:hover{border-color:var(--ok);background:var(--ok-l);}

  /* Fab */
  .fab{display:flex;justify-content:flex-end;padding:12px 0 0;}
  .fabb{width:54px;height:54px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:26px;box-shadow:var(--sh-lg);transition:transform .13s;color:#fff;}
  .fabb:hover{transform:scale(1.08);}

  /* Sheet */
  .overlay{position:fixed;inset:0;background:rgba(26,26,46,.5);backdrop-filter:blur(6px);z-index:300;display:flex;align-items:flex-end;justify-content:center;}
  .sheet{width:100%;max-width:480px;background:var(--bg);border-radius:24px 24px 0 0;max-height:94dvh;overflow-y:auto;animation:sup .28s cubic-bezier(.32,.72,0,1);}
  .shdl{width:40px;height:4px;background:var(--border);border-radius:2px;margin:14px auto 0;}
  .shhd{display:flex;align-items:center;justify-content:space-between;padding:16px 20px 12px;border-bottom:1.5px solid var(--border);}
  .shti{font-family:'Righteous',sans-serif;font-size:20px;color:var(--ink);}
  .shbd{padding:20px;}
  @keyframes sup{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}

  /* Steps */
  .steps{display:flex;align-items:center;margin-bottom:24px;}
  .sdot{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;border:2px solid var(--border);color:var(--ink-l);background:var(--surface);transition:all .2s;flex-shrink:0;}
  .sdot.dn{background:var(--ok);border-color:var(--ok);color:#fff;}
  .sdot.ac{background:var(--ink);border-color:var(--ink);color:#fff;}
  .sln{flex:1;height:2px;background:var(--border);}
  .sln.dn{background:var(--ok);}

  /* Form */
  .fg{display:flex;flex-direction:column;gap:6px;margin-bottom:16px;}
  .fl{font-size:11.5px;font-weight:800;color:var(--ink-m);letter-spacing:.4px;text-transform:uppercase;}
  .fi,.fsl{width:100%;padding:12px 14px;border:2px solid var(--border);border-radius:12px;background:var(--surface);font-family:'Nunito',sans-serif;font-size:15px;color:var(--ink);outline:none;transition:border-color .15s;-webkit-appearance:none;}
  .fi:focus,.fsl:focus{border-color:var(--ink);}
  .fi-2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}

  /* Emoji grid */
  .egrid{display:grid;grid-template-columns:repeat(6,1fr);gap:7px;}
  .eopt{height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer;background:var(--surface);border:2px solid var(--border);transition:all .13s;}
  .eopt.s{border-color:var(--ink);background:var(--bg);transform:scale(1.1);}

  /* Room grid */
  .rgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;}
  .ropt{background:var(--surface);border:2px solid var(--border);border-radius:14px;padding:14px 10px;display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;transition:all .13s;}
  .ropt.s{border-color:var(--house);background:var(--house-l);}
  .ropt-i{font-size:28px;}
  .ropt-n{font-size:12px;font-weight:700;text-align:center;color:var(--ink-m);}

  /* Task checklist */
  .tchk{display:flex;align-items:center;gap:10px;padding:11px 0;border-bottom:1.5px solid var(--border);cursor:pointer;}
  .tchk:last-child{border:none;}
  .cb{width:24px;height:24px;border-radius:8px;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:13px;transition:all .13s;flex-shrink:0;}
  .cb.on{background:var(--house);border-color:var(--house);color:#fff;}

  /* Onboarding */
  .ob{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 24px;text-align:center;min-height:100dvh;}
  .ob-ic{font-size:72px;margin-bottom:16px;animation:bounce 2s infinite;}
  .ob-ti{font-family:'Righteous',sans-serif;font-size:36px;color:var(--ink);margin-bottom:8px;}
  .ob-su{font-size:16px;color:var(--ink-m);line-height:1.6;margin-bottom:28px;}
  @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

  /* Misc */
  .div{height:1.5px;background:var(--border);margin:16px 0;}
  .row{display:flex;gap:8px;align-items:center;}
  .ir{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1.5px solid var(--border);}
  .ir:last-child{border:none;}
  .il{font-size:13px;color:var(--ink-l);}
  .iv{font-size:13px;font-weight:700;color:var(--ink);}
  .emp{text-align:center;padding:36px 16px;color:var(--ink-l);}
  .emp-i{font-size:40px;display:block;margin-bottom:10px;}
  .sec{font-size:11px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;color:var(--ink-l);margin-bottom:10px;padding-left:2px;}
  .tip{background:var(--warn-l);border:1.5px solid #FFD888;border-radius:12px;padding:12px 14px;font-size:13px;color:var(--ink-m);line-height:1.5;}
  .warn-b{background:var(--danger-l);border:1.5px solid #FFB8C8;border-radius:10px;padding:10px 12px;font-size:12px;color:var(--danger);margin-top:6px;}
  .slot-card{background:var(--surface);border-radius:14px;padding:14px;margin-bottom:10px;border:2px solid var(--border);}
  .slot-card.p{border-color:var(--me);}
  .slot-head{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
  .snum{width:24px;height:24px;border-radius:50%;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;color:#fff;flex-shrink:0;}
  .home-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;}
  .stat-card{background:var(--surface);border-radius:16px;border:1.5px solid var(--border);padding:14px;text-align:center;box-shadow:var(--sh);}
  .stat-n{font-family:'Righteous',sans-serif;font-size:32px;}
  .stat-l{font-size:11px;color:var(--ink-l);margin-top:2px;}
`;
  document.head.appendChild(s);
})();

// ── Utils ─────────────────────────────────────────────────────────────────────
const today = () => new Date().toISOString().split("T")[0];
const daysAgo = n => { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().split("T")[0]; };
const addDays = (ds, n) => { const d = new Date(ds); d.setDate(d.getDate() + n); return d.toISOString().split("T")[0]; };
const diffDays = (a, b) => Math.round((new Date(a) - new Date(b)) / 86400000);
const fmtS = ds => new Date(ds).toLocaleDateString("de-CH", { day: "numeric", month: "short" });
const fmtL = ds => new Date(ds).toLocaleDateString("de-CH", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
const fmtAgo = n => n === 0 ? "heute" : n === 1 ? "gestern" : `vor ${n} Tagen`;
const load = (k, fb) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

// ── Constants ─────────────────────────────────────────────────────────────────
const ROOMS = [
  { name: "Badezimmer", emoji: "🛁", tasks: [
    { name: "WC reinigen", emoji: "🚽", interval: 7 },
    { name: "Waschbecken putzen", emoji: "🪥", interval: 7 },
    { name: "Dusche / Bad putzen", emoji: "🚿", interval: 7 },
    { name: "Handtücher wechseln", emoji: "🛁", interval: 7 },
    { name: "Spiegel putzen", emoji: "🪞", interval: 14 },
    { name: "Boden wischen", emoji: "💧", interval: 7 },
  ]},
  { name: "Küche", emoji: "🍳", tasks: [
    { name: "Herd reinigen", emoji: "🍳", interval: 7 },
    { name: "Arbeitsfläche wischen", emoji: "🧽", interval: 3 },
    { name: "Kühlschrank putzen", emoji: "🧊", interval: 30 },
    { name: "Abfall leeren", emoji: "🗑️", interval: 3 },
    { name: "Mikrowelle reinigen", emoji: "📦", interval: 14 },
  ]},
  { name: "Wohnzimmer", emoji: "🛋️", tasks: [
    { name: "Staubwischen", emoji: "✨", interval: 7 },
    { name: "Staubsaugen", emoji: "🧹", interval: 7 },
    { name: "Kissen lüften", emoji: "💨", interval: 14 },
    { name: "Fenster putzen", emoji: "🪟", interval: 30 },
  ]},
  { name: "Schlafzimmer", emoji: "🛏️", tasks: [
    { name: "Bettwäsche wechseln", emoji: "🛏️", interval: 14 },
    { name: "Staubsaugen", emoji: "🧹", interval: 7 },
    { name: "Staubwischen", emoji: "✨", interval: 14 },
    { name: "Fenster putzen", emoji: "🪟", interval: 30 },
  ]},
  { name: "Ganze Wohnung", emoji: "🏠", tasks: [
    { name: "Staubsaugen", emoji: "🧹", interval: 7 },
    { name: "Böden wischen", emoji: "💧", interval: 7 },
    { name: "Fenster putzen", emoji: "🪟", interval: 30 },
  ]},
  { name: "Eingang", emoji: "🚪", tasks: [
    { name: "Boden kehren", emoji: "🧹", interval: 7 },
    { name: "Schuhe wegräumen", emoji: "👟", interval: 7 },
  ]},
  { name: "Balkon", emoji: "🌿", tasks: [
    { name: "Kehren", emoji: "🌿", interval: 14 },
    { name: "Pflanzen giessen", emoji: "🌱", interval: 2 },
  ]},
];

const ME_EMOJIS = ["✂️","💅","🦶","💆","🧘","🐾","💊","🏃","👁️","🦷","🩺","🌿","🧖","💈","🫧","🎯","🧴","💉"];
const TASK_EMOJIS = ["🧹","🛁","🚿","🛏️","🪟","🍳","🪴","🧺","🗑️","🧴","🪥","🧽","💧","✨","🪞","🚽","🧊","💨"];

const DEF_TASKS = [
  { id: 1, name: "Staubsaugen", emoji: "🧹", room: "Ganze Wohnung", lastDone: daysAgo(5), interval: 7 },
  { id: 2, name: "Bad putzen", emoji: "🛁", room: "Badezimmer", lastDone: daysAgo(8), interval: 7 },
  { id: 3, name: "Handtücher wechseln", emoji: "🚿", room: "Badezimmer", lastDone: daysAgo(5), interval: 7 },
  { id: 4, name: "Bettwäsche wechseln", emoji: "🛏️", room: "Schlafzimmer", lastDone: daysAgo(10), interval: 14 },
  { id: 5, name: "Fenster putzen", emoji: "🪟", room: "Ganze Wohnung", lastDone: daysAgo(22), interval: 30 },
  { id: 6, name: "Küche wischen", emoji: "🍳", room: "Küche", lastDone: daysAgo(3), interval: 5 },
];
const DEF_APPTS = [
  { id: 1, name: "Coiffeur", emoji: "✂️", note: "", lastDone: daysAgo(35), minDays: 35, maxDays: 42, fixedDates: [null, null, null] },
  { id: 2, name: "Maniküre", emoji: "💅", note: "", lastDone: daysAgo(18), minDays: 21, maxDays: 28, fixedDates: [null, null, null] },
  { id: 3, name: "Pediküre", emoji: "🦶", note: "", lastDone: daysAgo(70), minDays: 77, maxDays: 91, fixedDates: [null, null, null] },
  { id: 4, name: "Akupunktur", emoji: "🧘", note: "", lastDone: daysAgo(15), minDays: 14, maxDays: 21, fixedDates: [null, null, null] },
  { id: 5, name: "Gesichtsbehandlung", emoji: "🧖", note: "", lastDone: daysAgo(28), minDays: 28, maxDays: 35, fixedDates: [null, null, null] },
];

// ── Business logic ────────────────────────────────────────────────────────────
function calcMeDates(lastDone, minDays, maxDays, fixedDates) {
  const mid = Math.round((minDays + maxDays) / 2);
  const slots = [];
  let base = lastDone;
  for (let i = 0; i < 3; i++) {
    const earliest = addDays(base, minDays);
    const latest = addDays(base, maxDays);
    const ideal = addDays(base, mid);
    if (fixedDates[i]) {
      const fd = fixedDates[i];
      slots.push({ date: fd, type: "fixed", earliest, latest, ideal, inRange: fd >= earliest && fd <= latest });
      base = fd;
    } else {
      slots.push({ date: ideal, type: "calc", earliest, latest, ideal, inRange: true });
      base = ideal;
    }
  }
  return slots;
}

function urgFromDate(ds) {
  const d = diffDays(ds, today());
  if (d < 0) return { label: `${Math.abs(d)}d überfällig`, cls: "p-d" };
  if (d === 0) return { label: "Heute! 🎉", cls: "p-ok" };
  if (d <= 5) return { label: `in ${d}d`, cls: "p-w" };
  return { label: `in ${d}d`, cls: "p-g" };
}

function taskUrg(lastDone, interval) {
  const tod = today();
  const due = addDays(lastDone, interval);
  const d = diffDays(due, tod);
  const elapsed = diffDays(tod, lastDone);
  const pct = Math.min(Math.round((elapsed / interval) * 100), 100);
  if (d < 0) return { label: `${Math.abs(d)}d überfällig`, cls: "p-d", pct: 100, bar: "var(--danger)" };
  if (d === 0) return { label: "Heute fällig", cls: "p-ok", pct: 100, bar: "var(--ok)" };
  if (d <= 3) return { label: `in ${d}d`, cls: "p-w", pct, bar: "var(--warn)" };
  return { label: `in ${d}d`, cls: "p-g", pct, bar: "var(--house-l)" };
}

// ── UI Atoms ──────────────────────────────────────────────────────────────────
function Sheet({ title, onClose, children }) {
  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="sheet">
        <div className="shdl" />
        <div className="shhd">
          <span className="shti">{title}</span>
          <button className="icob" onClick={onClose}>✕</button>
        </div>
        <div className="shbd">{children}</div>
      </div>
    </div>
  );
}

function Steps({ step, total }) {
  const els = [];
  for (let i = 0; i < total; i++) {
    if (i > 0) els.push(<div key={`l${i}`} className={`sln${i <= step ? " dn" : ""}`} />);
    els.push(<div key={`s${i}`} className={`sdot${i < step ? " dn" : i === step ? " ac" : ""}`}>{i < step ? "✓" : i + 1}</div>);
  }
  return <div className="steps">{els}</div>;
}

function EmojiPicker({ emojis, value, onChange }) {
  return (
    <div className="egrid">
      {emojis.map(e => <div key={e} className={`eopt${value === e ? " s" : ""}`} onClick={() => onChange(e)}>{e}</div>)}
    </div>
  );
}

// ── ONBOARDING ────────────────────────────────────────────────────────────────
function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [sample, setSample] = useState(true);

  if (step === 0) return (
    <div className="ob mz">
      <div className="ob-ic">🏡</div>
      <div className="ob-ti">Mein Zuhause</div>
      <div className="ob-su">Deine App für Haushalt und persönliche Termine. Einfach. Übersichtlich. Mit Spass.</div>
      <div style={{ width: "100%", maxWidth: 320, marginBottom: 24 }}>
        <div className="fg">
          <label className="fl" style={{ textAlign: "left" }}>Wie heisst du?</label>
          <input className="fi" placeholder="Dein Name" value={name} onChange={e => setName(e.target.value)}
            style={{ fontSize: 20, textAlign: "center", fontWeight: 800 }}
            onKeyDown={e => e.key === "Enter" && name.trim() && setStep(1)} />
        </div>
      </div>
      <button className="btn btn-fw btn-dk" style={{ maxWidth: 320, opacity: name.trim() ? 1 : .5 }}
        onClick={() => name.trim() && setStep(1)}>Weiter →</button>
    </div>
  );

  return (
    <div className="ob mz">
      <div style={{ fontSize: 48, marginBottom: 12 }}>✨</div>
      <div className="ob-ti">Hallo, {name}!</div>
      <div className="ob-su">Zwei Bereiche – alles im Blick:</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24, width: "100%", maxWidth: 320 }}>
        <div className="hero hero-h" style={{ flexDirection: "column", alignItems: "flex-start", padding: 16 }}>
          <div style={{ fontSize: 32, marginBottom: 6 }}>🏠</div>
          <div className="hero-ti" style={{ fontSize: 16 }}>Haushalt</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.8)", marginTop: 2 }}>Putzen nach Raum</div>
        </div>
        <div className="hero hero-m" style={{ flexDirection: "column", alignItems: "flex-start", padding: 16 }}>
          <div style={{ fontSize: 32, marginBottom: 6 }}>🌸</div>
          <div className="hero-ti" style={{ fontSize: 16 }}>Me Time</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.8)", marginTop: 2 }}>Coiffeur & Co.</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, background: "#fff", padding: 14, borderRadius: 14, border: "2px solid var(--border)", width: "100%", maxWidth: 320, cursor: "pointer" }}
        onClick={() => setSample(!sample)}>
        <div style={{ width: 26, height: 26, borderRadius: 8, border: "2px solid var(--house)", background: sample ? "var(--house)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, transition: "all .15s" }}>{sample ? "✓" : ""}</div>
        <div style={{ fontSize: 14, color: "var(--ink-m)", fontWeight: 600 }}>Mit Beispieldaten starten</div>
      </div>
      <button className="btn btn-fw btn-dk" style={{ maxWidth: 320 }} onClick={() => onDone(name.trim(), sample)}>Los geht's 🚀</button>
    </div>
  );
}

// ── ADD HAUSHALT WIZARD ───────────────────────────────────────────────────────
function AddHaushalt({ existing, onSave }) {
  const [step, setStep] = useState(0);
  const [room, setRoom] = useState(null);
  const [sel, setSel] = useState({});
  const [showCust, setShowCust] = useState(false);
  const [cust, setCust] = useState({ name: "", emoji: "🧹", interval: "7" });
  const preset = room ? ROOMS.find(r => r.name === room) : null;

  function toggle(i) {
    const t = preset.tasks[i];
    setSel(s => ({ ...s, [i]: s[i] ? undefined : { ...t, interval: String(t.interval) } }));
  }

  function doSave() {
    const tasks = [];
    Object.values(sel).filter(Boolean).forEach((t, i) => {
      tasks.push({ id: Date.now() + i + 1, name: t.name, emoji: t.emoji, room, lastDone: today(), interval: parseInt(t.interval) || 7 });
    });
    if (showCust && cust.name.trim()) {
      tasks.push({ id: Date.now(), name: cust.name.trim(), emoji: cust.emoji, room: room || "Sonstiges", lastDone: today(), interval: parseInt(cust.interval) || 7 });
    }
    if (tasks.length) onSave(tasks);
  }

  const hasSel = Object.values(sel).some(Boolean) || (showCust && cust.name.trim());

  if (step === 0) return <>
    <Steps step={0} total={2} />
    <div className="fg"><div className="fl">Welcher Raum?</div>
      <div className="rgrid">
        {ROOMS.map(r => (
          <div key={r.name} className={`ropt${room === r.name ? " s" : ""}`} onClick={() => setRoom(r.name)}>
            <span className="ropt-i">{r.emoji}</span>
            <span className="ropt-n">{r.name}</span>
          </div>
        ))}
      </div>
    </div>
    <button className="btn btn-fw btn-h" style={{ opacity: room ? 1 : .45 }} onClick={() => room && setStep(1)}>Weiter →</button>
  </>;

  return <>
    <Steps step={1} total={2} />
    <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 14 }}>{preset?.emoji} {room}</div>
    <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "var(--ink-l)", marginBottom: 10 }}>Wähle aus oder füge eigene hinzu:</div>
    {preset?.tasks.map((t, i) => {
      const s = sel[i];
      return (
        <div key={i} className="tchk" onClick={() => toggle(i)}>
          <div className={`cb${s ? " on" : ""}`}>{s ? "✓" : ""}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{t.emoji} {t.name}</div>
            {s && <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 5 }}>
              <span style={{ fontSize: 12, color: "var(--ink-l)" }}>Alle</span>
              <input className="fi" type="number" min="1" value={s.interval}
                style={{ width: 62, padding: "4px 8px", fontSize: 13 }}
                onClick={e => e.stopPropagation()}
                onChange={e => setSel(prev => ({ ...prev, [i]: { ...prev[i], interval: e.target.value } }))} />
              <span style={{ fontSize: 12, color: "var(--ink-l)" }}>Tage</span>
            </div>}
          </div>
        </div>
      );
    })}
    <div className="div" />
    {showCust ? <>
      <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>✏️ Eigene Aufgabe</div>
      <div className="fg"><label className="fl">Symbol</label><EmojiPicker emojis={TASK_EMOJIS} value={cust.emoji} onChange={e => setCust(c => ({ ...c, emoji: e }))} /></div>
      <div className="fg"><label className="fl">Name</label><input className="fi" placeholder="Aufgabe" value={cust.name} onChange={e => setCust(c => ({ ...c, name: e.target.value }))} /></div>
      <div className="fg"><label className="fl">Intervall (Tage)</label><input className="fi" type="number" min="1" value={cust.interval} onChange={e => setCust(c => ({ ...c, interval: e.target.value }))} /></div>
    </> : (
      <button className="btn-gh" style={{ width: "100%", justifyContent: "center", marginBottom: 12 }} onClick={() => setShowCust(true)}>＋ Eigene Aufgabe hinzufügen</button>
    )}
    <div className="div" />
    <div className="row" style={{ gap: 10 }}>
      <button className="btn-gh btn-sm" onClick={() => setStep(0)}>← Zurück</button>
      <button className="btn btn-fw btn-h" style={{ opacity: hasSel ? 1 : .45 }} onClick={hasSel ? doSave : undefined}>Hinzufügen ✓</button>
    </div>
  </>;
}

function EditTaskForm({ item, rooms, onSave }) {
  const [f, setF] = useState({ name: item.name, emoji: item.emoji, room: item.room, lastDone: item.lastDone, interval: String(item.interval) });
  return <>
    <div className="fg"><label className="fl">Symbol</label><EmojiPicker emojis={TASK_EMOJIS} value={f.emoji} onChange={e => setF({ ...f, emoji: e })} /></div>
    <div className="fg"><label className="fl">Name</label><input className="fi" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></div>
    <div className="fg"><label className="fl">Raum</label>
      <select className="fsl" value={f.room} onChange={e => setF({ ...f, room: e.target.value })}>
        {ROOMS.map(r => <option key={r.name}>{r.name}</option>)}
      </select>
    </div>
    <div className="fi-2">
      <div className="fg"><label className="fl">Zuletzt erledigt</label><input className="fi" type="date" value={f.lastDone} max={today()} onChange={e => setF({ ...f, lastDone: e.target.value })} /></div>
      <div className="fg"><label className="fl">Intervall (d)</label><input className="fi" type="number" min="1" value={f.interval} onChange={e => setF({ ...f, interval: e.target.value })} /></div>
    </div>
    <button className="btn btn-fw btn-h" onClick={() => f.name.trim() && onSave({ ...f, interval: parseInt(f.interval) || 7 })}>Speichern</button>
  </>;
}

// ── HAUSHALT ──────────────────────────────────────────────────────────────────
function Haushalt({ tasks, setTasks }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [detail, setDetail] = useState(null);
  const [doneM, setDoneM] = useState(null);
  const tod = today();

  function addBulk(newTasks) { setTasks([...tasks, ...newTasks]); setShowAdd(false); }
  function markDone(id, date) { setTasks(tasks.map(t => t.id === id ? { ...t, lastDone: date } : t)); setDoneM(null); setDetail(null); }
  function del(id) { setTasks(tasks.filter(t => t.id !== id)); setDetail(null); }

  // Group by room sorted by urgency
  const sorted = [...tasks].sort((a, b) => diffDays(addDays(a.lastDone, a.interval), tod) - diffDays(addDays(b.lastDone, b.interval), tod));
  const grouped = {};
  sorted.forEach(t => { if (!grouped[t.room]) grouped[t.room] = []; grouped[t.room].push(t); });

  return <>
    <div className="ph"><div className="ph-t">🏠 Haushalt</div><div className="ph-s">Alles im Griff, Schritt für Schritt</div></div>

    {tasks.length === 0 && <div className="emp"><span className="emp-i">🏠</span>Noch keine Aufgaben.<br />Tippe auf ＋ und leg los!</div>}

    {Object.entries(grouped).map(([room, rtasks]) => {
      const ri = ROOMS.find(r => r.name === room);
      return (
        <div key={room} style={{ marginBottom: 18 }}>
          <div className="sec">{ri?.emoji || "🏠"} {room}</div>
          <div className="card hc">
            {rtasks.map(t => {
              const u = taskUrg(t.lastDone, t.interval);
              return (
                <div className="item" key={t.id} style={{ cursor: "pointer" }} onClick={() => setDetail(t)}>
                  <div className="ii h">{t.emoji}</div>
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
              );
            })}
          </div>
        </div>
      );
    })}

    <div className="fab"><button className="fabb" style={{ background: "var(--house)" }} onClick={() => setShowAdd(true)}>＋</button></div>

    {showAdd && <Sheet title="Aufgabe hinzufügen" onClose={() => setShowAdd(false)}>
      <AddHaushalt existing={tasks} onSave={addBulk} />
    </Sheet>}

    {detail && !editItem && <Sheet title={`${detail.emoji} ${detail.name}`} onClose={() => setDetail(null)}>
      {(() => {
        const u = taskUrg(detail.lastDone, detail.interval);
        return <>
          <div className="ir"><span className="il">Raum</span><span className="iv">{detail.room}</span></div>
          <div className="ir"><span className="il">Intervall</span><span className="iv">Alle {detail.interval} Tage</span></div>
          <div className="ir"><span className="il">Zuletzt</span><span className="iv">{fmtL(detail.lastDone)}</span></div>
          <div className="ir"><span className="il">Nächste Fälligkeit</span><span className="iv">{fmtL(addDays(detail.lastDone, detail.interval))}</span></div>
          <div className="ir"><span className="il">Status</span><span className={`pill ${u.cls}`}>{u.label}</span></div>
          <div className="div" />
          <button className="btn btn-fw btn-h" style={{ marginBottom: 10 }} onClick={() => markDone(detail.id, tod)}>✓ Heute erledigt</button>
          <button className="btn-gh" style={{ width: "100%", justifyContent: "center", marginBottom: 10 }} onClick={() => setDoneM({ item: detail, date: tod })}>📅 Anderes Datum wählen</button>
          <div className="div" />
          <div className="row" style={{ gap: 8 }}>
            <button className="btn-gh" style={{ flex: 1 }} onClick={() => { setEditItem(detail); setDetail(null); }}>✏️ Bearbeiten</button>
            <button className="btn-dng" onClick={() => del(detail.id)}>🗑️</button>
          </div>
        </>;
      })()}
    </Sheet>}

    {editItem && <Sheet title="Aufgabe bearbeiten" onClose={() => setEditItem(null)}>
      <EditTaskForm item={editItem} onSave={f => { setTasks(tasks.map(t => t.id === editItem.id ? { ...t, ...f } : t)); setEditItem(null); }} />
    </Sheet>}

    {doneM && <Sheet title="Datum wählen" onClose={() => setDoneM(null)}>
      <div className="fg"><label className="fl">Wann erledigt?</label><input className="fi" type="date" value={doneM.date} max={tod} onChange={e => setDoneM({ ...doneM, date: e.target.value })} /></div>
      <button className="btn btn-fw btn-h" onClick={() => markDone(doneM.item.id, doneM.date)}>Bestätigen</button>
    </Sheet>}
  </>;
}

// ── ADD ME TIME WIZARD ────────────────────────────────────────────────────────
function AddMeTime({ initial, onSave }) {
  const isEdit = !!initial;
  const [step, setStep] = useState(0);
  const [f, setF] = useState({
    name: initial?.name || "", emoji: initial?.emoji || "✂️", note: initial?.note || "",
    lastDone: initial?.lastDone || today(),
    minDays: String(initial?.minDays || 21), maxDays: String(initial?.maxDays || 28),
    fixedDates: initial?.fixedDates ? [...initial.fixedDates] : [null, null, null],
  });

  const min = parseInt(f.minDays) || 21;
  const max = parseInt(f.maxDays) || 28;
  const preview = calcMeDates(f.lastDone, min, max, f.fixedDates);

  function setFD(i, val) { const fd = [...f.fixedDates]; fd[i] = val || null; setF({ ...f, fixedDates: fd }); }

  function doSave() {
    if (!f.name.trim()) return;
    onSave({ id: initial?.id || Date.now(), name: f.name.trim(), emoji: f.emoji, note: f.note.trim(), lastDone: f.lastDone, minDays: min, maxDays: max, fixedDates: f.fixedDates });
  }

  return <>
    <Steps step={step} total={3} />

    {step === 0 && <>
      <div style={{ textAlign: "center", fontSize: 52, marginBottom: 12 }}>{f.emoji}</div>
      <div className="fg">
        <label className="fl">Wie heisst die Aktivität?</label>
        <input className="fi" placeholder="z. B. Maniküre, Coiffeur, Tierarzt…" value={f.name}
          onChange={e => setF({ ...f, name: e.target.value })}
          onKeyDown={e => e.key === "Enter" && f.name.trim() && setStep(1)} autoFocus />
      </div>
      <div className="fg">
        <label className="fl">Notiz / Ort (optional)</label>
        <input className="fi" placeholder="z. B. Salon Müller, Hauptstrasse 5" value={f.note} onChange={e => setF({ ...f, note: e.target.value })} />
      </div>
      <div className="fg"><label className="fl">Symbol</label><EmojiPicker emojis={ME_EMOJIS} value={f.emoji} onChange={e => setF({ ...f, emoji: e })} /></div>
      <button className="btn btn-fw btn-m" style={{ opacity: f.name.trim() ? 1 : .45 }} onClick={() => f.name.trim() && setStep(1)}>Weiter →</button>
    </>}

    {step === 1 && <>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 40 }}>{f.emoji}</div>
        <div style={{ fontFamily: "Righteous,sans-serif", fontSize: 22, marginTop: 4 }}>{f.name}</div>
      </div>
      <div className="fg">
        <label className="fl">Wie oft möchtest du gehen?</label>
        <div style={{ background: "var(--surface)", borderRadius: 16, padding: 18, border: "2px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div className="fl" style={{ marginBottom: 6 }}>Mindestens</div>
              <input className="fi" type="number" min="1" value={f.minDays}
                onChange={e => setF({ ...f, minDays: e.target.value })}
                style={{ textAlign: "center", fontSize: 28, fontWeight: 900, padding: "8px" }} />
              <div style={{ fontSize: 12, color: "var(--ink-l)", marginTop: 4 }}>Tage</div>
            </div>
            <div style={{ fontSize: 22, color: "var(--ink-l)", fontWeight: 700, marginTop: -8 }}>—</div>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div className="fl" style={{ marginBottom: 6 }}>Höchstens</div>
              <input className="fi" type="number" min="1" value={f.maxDays}
                onChange={e => setF({ ...f, maxDays: e.target.value })}
                style={{ textAlign: "center", fontSize: 28, fontWeight: 900, padding: "8px" }} />
              <div style={{ fontSize: 12, color: "var(--ink-l)", marginTop: 4 }}>Tage</div>
            </div>
          </div>
          <div style={{ textAlign: "center", fontSize: 13, color: "var(--me)", fontWeight: 700, marginTop: 10 }}>Alle {f.minDays}–{f.maxDays} Tage</div>
        </div>
      </div>
      <div className="fg">
        <label className="fl">Wann warst du zuletzt dort?</label>
        <input className="fi" type="date" value={f.lastDone} max={today()} onChange={e => setF({ ...f, lastDone: e.target.value })} />
        <div style={{ fontSize: 12, color: "var(--ink-l)", marginTop: 2 }}>{fmtAgo(diffDays(today(), f.lastDone))}</div>
      </div>
      <div className="row" style={{ gap: 10 }}>
        <button className="btn-gh btn-sm" onClick={() => setStep(0)}>← Zurück</button>
        <button className="btn btn-fw btn-m" onClick={() => setStep(2)}>Weiter →</button>
      </div>
    </>}

    {step === 2 && <>
      <div className="tip">💡 Hast du schon fixe Termine, z. B. vor den Ferien? Trag sie ein – der Rest wird automatisch berechnet.</div>
      <div style={{ height: 14 }} />
      {preview.map((slot, i) => {
        const daysTo = diffDays(slot.date, today());
        const isFirst = i === 0;
        return (
          <div key={i} className={`slot-card${isFirst ? " p" : ""}`}>
            <div className="slot-head">
              <div className="snum" style={{ background: isFirst ? "var(--me)" : "var(--border)", color: isFirst ? "#fff" : "var(--ink-m)" }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 800 }}>{slot.type === "fixed" ? "📌 Fixer Termin" : "📐 Vorschlag"}</div>
                <div style={{ fontSize: 11, color: "var(--ink-l)" }}>{fmtS(slot.earliest)} – {fmtS(slot.latest)}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: !slot.inRange ? "var(--danger)" : isFirst ? "var(--me)" : "var(--ink-l)" }}>{fmtS(slot.date)}</div>
            </div>
            {!slot.inRange && <div className="warn-b">⚠️ Dieser Termin liegt ausserhalb deines Intervalls! Empfohlen: {fmtS(slot.earliest)} – {fmtS(slot.latest)}</div>}
            <input className="fi" type="date"
              value={f.fixedDates[i] || slot.ideal}
              onChange={e => setFD(i, e.target.value)}
              style={{ fontSize: 13, padding: "8px 12px", marginTop: 8 }} />
            {f.fixedDates[i] && (
              <button onClick={() => setFD(i, null)}
                style={{ background: "none", border: "none", fontSize: 12, color: "var(--ink-l)", cursor: "pointer", marginTop: 5, display: "block" }}>
                ✕ Fix-Datum entfernen (auto berechnen)
              </button>
            )}
          </div>
        );
      })}
      <div style={{ height: 8 }} />
      <div className="row" style={{ gap: 10 }}>
        <button className="btn-gh btn-sm" onClick={() => setStep(1)}>← Zurück</button>
        <button className="btn btn-fw btn-m" onClick={doSave}>Speichern ✓</button>
      </div>
    </>}
  </>;
}

// ── ME TIME ───────────────────────────────────────────────────────────────────
function MeTime({ appts, setAppts }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [detail, setDetail] = useState(null);
  const [doneM, setDoneM] = useState(null);
  const tod = today();

  function saveAppt(data) {
    setAppts(editItem ? appts.map(a => a.id === data.id ? data : a) : [...appts, data]);
    setShowAdd(false); setEditItem(null);
  }
  function markDone(id, date) {
    setAppts(appts.map(a => {
      if (a.id !== id) return a;
      const fd = [...a.fixedDates]; fd.shift(); fd.push(null);
      return { ...a, lastDone: date, fixedDates: fd };
    }));
    setDoneM(null); setDetail(null);
  }
  function del(id) { setAppts(appts.filter(a => a.id !== id)); setDetail(null); }

  const sorted = [...appts].sort((a, b) => {
    const na = calcMeDates(a.lastDone, a.minDays, a.maxDays, a.fixedDates)[0].date;
    const nb = calcMeDates(b.lastDone, b.minDays, b.maxDays, b.fixedDates)[0].date;
    return diffDays(na, tod) - diffDays(nb, tod);
  });

  return <>
    <div className="ph"><div className="ph-t">🌸 Me Time</div><div className="ph-s">Deine persönlichen Termine & Pflege</div></div>

    {sorted.length === 0 && <div className="emp"><span className="emp-i">💆</span>Noch keine Termine.<br />Tippe auf ＋ und füge deinen ersten hinzu!</div>}

    {sorted.map(a => {
      const dates = calcMeDates(a.lastDone, a.minDays, a.maxDays, a.fixedDates);
      const u = urgFromDate(dates[0].date);
      const warn = dates.some(d => !d.inRange);
      return (
        <div className="card mc" key={a.id} style={{ cursor: "pointer" }} onClick={() => setDetail(a)}>
          <div className="item">
            <div className="ii m">{a.emoji}</div>
            <div className="ib">
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div className="in">{a.name}</div>
                {warn && <span title="Ein Termin liegt ausserhalb deines Intervalls">⚠️</span>}
              </div>
              {a.note && <div className="im">📍 {a.note}</div>}
              <div className="dstrip">
                {dates.map((d, i) => (
                  <div key={i} className={`dchip${i === 0 ? " p1" : ""}`}>
                    <div className="dnum" style={{ background: i === 0 ? "var(--me)" : "var(--border)", color: i === 0 ? "#fff" : "var(--ink-l)" }}>{i + 1}</div>
                    <span className="dtxt">{fmtS(d.date)}{d.type === "fixed" ? " 📌" : ""}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 7 }}>
              <span className={`pill ${u.cls}`}>{u.label}</span>
              <button className="chka" onClick={e => { e.stopPropagation(); markDone(a.id, tod); }}>✓</button>
            </div>
          </div>
        </div>
      );
    })}

    <div className="fab"><button className="fabb" style={{ background: "var(--me)" }} onClick={() => { setEditItem(null); setShowAdd(true); }}>＋</button></div>

    {(showAdd || editItem) && <Sheet title={editItem ? "Termin bearbeiten" : "Neuer Termin"} onClose={() => { setShowAdd(false); setEditItem(null); }}>
      <AddMeTime initial={editItem} onSave={saveAppt} />
    </Sheet>}

    {detail && !editItem && <Sheet title={`${detail.emoji} ${detail.name}`} onClose={() => setDetail(null)}>
      {(() => {
        const dates = calcMeDates(detail.lastDone, detail.minDays, detail.maxDays, detail.fixedDates);
        const u = urgFromDate(dates[0].date);
        return <>
          {detail.note && <div className="ir"><span className="il">📍 Ort / Notiz</span><span className="iv">{detail.note}</span></div>}
          <div className="ir"><span className="il">Status</span><span className={`pill ${u.cls}`}>{u.label}</span></div>
          <div className="ir"><span className="il">Intervall</span><span className="iv">Alle {detail.minDays}–{detail.maxDays} Tage</span></div>
          <div className="ir"><span className="il">Zuletzt</span><span className="iv">{fmtL(detail.lastDone)}</span></div>
          <div className="div" />
          <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 10 }}>📅 Nächste 3 Termine</div>
          {dates.map((d, i) => (
            <div key={i} style={{ background: i === 0 ? "var(--me-l)" : "var(--surface)", borderRadius: 12, padding: "12px 14px", marginBottom: 8, border: `2px solid ${i === 0 ? "var(--me)" : "var(--border)"}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: i === 0 ? "var(--me)" : "var(--border)", color: i === 0 ? "#fff" : "var(--ink-m)", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
                  <span style={{ fontSize: 14, fontWeight: i === 0 ? 800 : 500 }}>{fmtL(d.date)}</span>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  {d.type === "fixed" && <span style={{ fontSize: 11, color: "var(--warn)" }}>📌</span>}
                  {!d.inRange && <span style={{ fontSize: 11, color: "var(--danger)" }}>⚠️</span>}
                </div>
              </div>
              {!d.inRange && <div style={{ fontSize: 11, color: "var(--danger)", marginTop: 5 }}>Empfohlen: {fmtS(d.earliest)} – {fmtS(d.latest)}</div>}
            </div>
          ))}
          <div className="div" />
          <button className="btn btn-fw btn-m" style={{ marginBottom: 10 }} onClick={() => markDone(detail.id, tod)}>✓ Heute erledigt</button>
          <button className="btn-gh" style={{ width: "100%", justifyContent: "center", marginBottom: 10 }} onClick={() => setDoneM({ item: detail, date: tod })}>📅 Anderes Datum wählen</button>
          <div className="div" />
          <div className="row" style={{ gap: 8 }}>
            <button className="btn-gh" style={{ flex: 1 }} onClick={() => { setEditItem(detail); setDetail(null); }}>✏️ Bearbeiten</button>
            <button className="btn-dng" onClick={() => del(detail.id)}>🗑️</button>
          </div>
        </>;
      })()}
    </Sheet>}

    {doneM && <Sheet title="Datum wählen" onClose={() => setDoneM(null)}>
      <div className="fg"><label className="fl">Wann war der Termin?</label><input className="fi" type="date" value={doneM.date} max={tod} onChange={e => setDoneM({ ...doneM, date: e.target.value })} /></div>
      <button className="btn btn-fw btn-m" onClick={() => markDone(doneM.item.id, doneM.date)}>Bestätigen</button>
    </Sheet>}
  </>;
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function Home({ name, tasks, appts, nav }) {
  const tod = today();
  const hr = new Date().getHours();
  const greet = hr < 12 ? "Guten Morgen" : hr < 17 ? "Hallo" : "Guten Abend";

  const tUrgs = tasks.map(t => ({ ...t, u: taskUrg(t.lastDone, t.interval) }));
  const aUrgs = appts.map(a => {
    const dates = calcMeDates(a.lastDone, a.minDays, a.maxDays, a.fixedDates);
    return { ...a, nextDate: dates[0].date, u: urgFromDate(dates[0].date) };
  });

  const hBad = tUrgs.filter(t => t.u.cls === "p-d" || t.u.cls === "p-ok").length;
  const hWarn = tUrgs.filter(t => t.u.cls === "p-w").length;
  const mBad = aUrgs.filter(a => a.u.cls === "p-d" || a.u.cls === "p-ok").length;
  const mWarn = aUrgs.filter(a => a.u.cls === "p-w").length;

  const urgent = [
    ...tUrgs.filter(t => t.u.cls !== "p-g").map(t => ({ ...t, kind: "h", due: addDays(t.lastDone, t.interval) })),
    ...aUrgs.filter(a => a.u.cls !== "p-g").map(a => ({ ...a, kind: "m", due: a.nextDate })),
  ].sort((a, b) => diffDays(a.due, tod) - diffDays(b.due, tod)).slice(0, 7);

  return <>
    <div className="ph">
      <div className="ph-t">{greet}, {name} 👋</div>
      <div className="ph-s">{new Date().toLocaleDateString("de-CH", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
    </div>

    <div className="home-grid">
      <div className="hero hero-h" onClick={() => nav("haushalt")}>
        <div>
          <div className="hero-ic">🏠</div>
          <div className="hero-ti">Haushalt</div>
          <div className="hero-su">{tasks.length} Aufgaben</div>
        </div>
        {(hBad + hWarn) > 0 && <div className="hero-bg">{hBad + hWarn} fällig</div>}
      </div>
      <div className="hero hero-m" onClick={() => nav("metime")}>
        <div>
          <div className="hero-ic">🌸</div>
          <div className="hero-ti">Me Time</div>
          <div className="hero-su">{appts.length} Termine</div>
        </div>
        {(mBad + mWarn) > 0 && <div className="hero-bg">{mBad + mWarn} fällig</div>}
      </div>
    </div>

    {urgent.length > 0 && <>
      <div className="sec">Anstehend & Überfällig</div>
      <div className="card">
        {urgent.map(item => (
          <div className="item" key={`${item.kind}${item.id}`} style={{ cursor: "pointer" }} onClick={() => nav(item.kind === "h" ? "haushalt" : "metime")}>
            <div className={`ii ${item.kind}`}>{item.emoji}</div>
            <div className="ib">
              <div className="in">{item.name}</div>
              <div className="im">{item.kind === "h" ? item.room : item.note || "Me Time"}</div>
            </div>
            <span className={`pill ${item.u.cls}`}>{item.u.label}</span>
          </div>
        ))}
      </div>
    </>}

    {urgent.length === 0 && tasks.length > 0 && (
      <div className="card" style={{ padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>✨</div>
        <div style={{ fontWeight: 800, fontSize: 16 }}>Alles erledigt!</div>
        <div style={{ fontSize: 13, color: "var(--ink-l)", marginTop: 4 }}>Keine dringenden Aufgaben. Gönn dir was! 🌸</div>
      </div>
    )}

    {tasks.length === 0 && appts.length === 0 && (
      <div className="card" style={{ padding: 28, textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>🚀</div>
        <div style={{ fontWeight: 800, fontSize: 16 }}>Bereit loszulegen?</div>
        <div style={{ fontSize: 13, color: "var(--ink-l)", marginTop: 6, lineHeight: 1.6 }}>Tippe auf Haushalt oder Me Time und füge deine ersten Einträge hinzu.</div>
      </div>
    )}
  </>;
}

// ── SETTINGS ──────────────────────────────────────────────────────────────────
function Settings({ name, onSetName, onClear }) {
  const [nameV, setNameV] = useState(name);
  const [confirm, setConfirm] = useState(false);
  return <>
    <div className="ph"><div className="ph-t">⚙️ Einstellungen</div></div>
    <div className="card" style={{ padding: 18 }}>
      <div className="sec" style={{ marginBottom: 12 }}>Mein Profil</div>
      <div className="fg"><label className="fl">Dein Name</label><input className="fi" value={nameV} onChange={e => setNameV(e.target.value)} /></div>
      <button className="btn btn-dk btn-sm" onClick={() => nameV.trim() && onSetName(nameV.trim())}>Speichern</button>
    </div>
    <div className="card" style={{ padding: 18, marginTop: 4 }}>
      <div className="sec" style={{ marginBottom: 12 }}>Daten</div>
      {!confirm
        ? <button className="btn-dng" style={{ width: "100%", textAlign: "center" }} onClick={() => setConfirm(true)}>🗑️ Alle Daten löschen</button>
        : <>
          <div style={{ fontSize: 14, color: "var(--danger)", fontWeight: 700, marginBottom: 12 }}>Wirklich alles löschen?</div>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn-gh btn-sm" onClick={() => setConfirm(false)}>Abbrechen</button>
            <button className="btn-dng btn-sm" onClick={onClear}>Ja, alles löschen</button>
          </div>
        </>}
    </div>
    <div style={{ textAlign: "center", marginTop: 28, color: "var(--ink-l)", fontSize: 12 }}>Mein Zuhause · v3.0</div>
  </>;
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [onboarded, setOnboarded] = useState(() => load("mz3_ob", false));
  const [name, setNameRaw] = useState(() => load("mz3_name", ""));
  const [tasks, setTasksRaw] = useState(() => load("mz3_tasks", []));
  const [appts, setApptsRaw] = useState(() => load("mz3_appts", []));
  const [tab, setTab] = useState("home");

  const setName = v => { setNameRaw(v); save("mz3_name", v); };
  const setTasks = useCallback(v => { setTasksRaw(v); save("mz3_tasks", v); }, []);
  const setAppts = useCallback(v => { setApptsRaw(v); save("mz3_appts", v); }, []);

  function finishOB(n, withSample) {
    setNameRaw(n); save("mz3_name", n);
    if (withSample) { setTasksRaw(DEF_TASKS); save("mz3_tasks", DEF_TASKS); setApptsRaw(DEF_APPTS); save("mz3_appts", DEF_APPTS); }
    save("mz3_ob", true); setOnboarded(true);
  }
  function clearAll() {
    setTasksRaw([]); save("mz3_tasks", []);
    setApptsRaw([]); save("mz3_appts", []);
    setNameRaw(""); save("mz3_name", "");
    save("mz3_ob", false); setOnboarded(false);
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
