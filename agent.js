// PlantPlace assistant (mock). Intentionally stateless and a bit clumsy. See INTERVIEWER-GUIDE.md
const PERSONAS = [
  { id: 'mossy', name: 'Mossy', emoji: '🌿', line: "Here's what I found for you 🌿" },
  { id: 'prof', name: 'Prof. Fern', emoji: '🎓', line: 'Based on your query, the following listings may be relevant:' },
  { id: 'sprout', name: 'Sprout', emoji: '🌱', line: 'Ooh, fun one!! Check these out!!' },
];
const EXAMPLES = ['Easy plants for a low light apartment', 'A gift for my mom under $30', 'Pet safe plants for my cat', 'Herbs I can grow on a sunny windowsill', 'Something big for a bright corner', 'Pots and soil for repotting'];
const agentSet = () => Object.assign({ persona: 'mossy', creativity: 50, auto: false }, JSON.parse(localStorage.getItem('pp_agent') || '{}'));
const saveAgentSet = s => localStorage.setItem('pp_agent', JSON.stringify(s));
const persona = () => PERSONAS.find(p => p.id === agentSet().persona) || PERSONAS[0];
const credits = () => { const c = localStorage.getItem('pp_credits'); return c == null ? 10 : +c; };
const setCredits = n => localStorage.setItem('pp_credits', n);
const chatHist = () => JSON.parse(localStorage.getItem('pp_hist') || '[]');
function pushHist(t) { const h = chatHist(); h.unshift(t); localStorage.setItem('pp_hist', JSON.stringify(h.slice(0, 6))); }

// "understanding": keyword matching on the latest message only (no memory, ignores room/location/budget words it doesn't know)
function interpret(text) {
  const t = text.toLowerCase(); let r = PRODUCTS.slice(), used = false;
  const keep = fn => { r = r.filter(fn); used = true; };
  if (/\bpets?\b|cat|dog|puppy|kitten/.test(t)) keep(p => p.pet);
  const m = t.match(/(?:under|below|less than|max)\s*\$?(\d+)/); if (m) keep(p => p.price <= +m[1]);
  if (/low light|dark|shade|no sun|north/.test(t)) keep(p => p.light.includes('Low'));
  else if (/bright|sunny|sunlight|full sun|south/.test(t)) keep(p => /Bright|Full sun/.test(p.light));
  if (/easy|beginner|hard to kill|forget|busy|low maintenance/.test(t)) keep(p => ['Biweekly', 'Monthly'].includes(p.water) || p.light.includes('Low'));
  if (/seed|herb|basil/.test(t)) keep(p => p.cat === 'Seeds' || p.cat === 'Outdoor');
  if (/\bpots?\b|planter/.test(t)) keep(p => p.cat === 'Pots' || p.cat === 'Soil');
  if (/succulent|cact/.test(t)) keep(p => /Succulent|Cact/i.test(p.name));
  if (/\bsoil|repot/.test(t)) keep(p => p.cat === 'Soil' || p.cat === 'Pots');
  if (/\btools?\b|trowel/.test(t)) keep(p => p.cat === 'Tools');
  if (/big|large|tall|statement/.test(t)) keep(p => ['Large', 'Medium'].includes(p.size));
  if (/\bplants?\b/.test(t)) keep(p => ['Houseplants', 'Seeds', 'Outdoor'].includes(p.cat));
  if (/gift|present/.test(t)) { if (!m) keep(p => p.price <= 30); keep(p => ['Houseplants', 'Pots'].includes(p.cat)); }
  const words = t.split(/\W+/).filter(w => w.length > 3);
  const named = PRODUCTS.filter(p => words.some(w => (p.name + ' ' + p.latin).toLowerCase().includes(w)));
  if (!used && named.length) { r = named; used = true; }
  if (!used) return { kind: 'vague', all: [] };
  r.sort((a, b) => b.rating - a.rating);
  return { kind: r.length ? 'ok' : 'none', all: r };
}
