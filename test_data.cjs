const fs=require('fs'),vm=require('vm'),assert=require('assert');
const context={window:{}};vm.runInNewContext(fs.readFileSync(require('path').join(__dirname,'data.js'),'utf8'),context);
const d=context.window.STUDY;
assert.equal(d.topics.length,17,'expected 17 topic lessons');
assert(d.questions.length>=28,'question bank unexpectedly small');
assert(d.structures.length>=15,'structure drawing tasks unexpectedly small');
for(const field of ['topics','questions','structures']) assert(Array.isArray(d[field]));
const unique=a=>new Set(a.map(x=>x.id)).size===a.length;
assert(unique(d.topics)&&unique(d.questions)&&unique(d.structures),'duplicate IDs');
const topicIds=new Set(d.topics.map(x=>x.id));
for(const t of d.topics){assert(t.title&&t.order&&t.steps.length>=2);for(const s of t.steps)assert(s.tr&&s.en);}
for(const q of d.questions){assert(topicIds.has(q.topic),`unknown topic in ${q.id}`);assert(q.tr&&q.en&&q.ref,'missing question/source metadata');if(q.type==='choice')assert(Number.isInteger(q.ans)&&q.opts[q.ans],'invalid choice key');if(q.type==='short')assert(q.model&&q.modelEn,'missing bilingual model response');if(q.type==='match')assert(q.pairs.length&&q.options.length,'empty matching question');}
for(const s of d.structures)assert(s.name&&s.formula&&s.clues.length>=2&&s.source,'incomplete drawing task');
const ly=d.structures.find(x=>x.id==='lysergic');assert.equal(ly.formula,'C₁₆H₁₆N₂O₂');
for(const f of ['.pdf','.ppt','.pptx','.zip','.jpg','.jpeg','.png'])assert(!fs.readdirSync(__dirname).some(x=>x.toLowerCase().endsWith(f)),`source material bundled: ${f}`);
const html=fs.readFileSync(require('path').join(__dirname,'index.html'),'utf8');assert(!/https?:\/\//.test(html),'unexpected external dependency in HTML');
console.log(`PASS: ${d.topics.length} topic lessons, ${d.questions.length} questions, ${d.structures.length} drawing tasks; no source attachments bundled.`);
