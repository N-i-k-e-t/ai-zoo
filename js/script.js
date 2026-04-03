const SPECIES = [
  {id:'cartographer',name:'The Cartographer',sci:'Explorator cognitus',hab:'knowledge',habName:'Knowledge Aviary',cls:'Research Agent',col:'#a78bfa',rgb:'167,139,250',emoji:'🦅',desc:'A slow, methodical hunter of knowledge. It circles vast information currents, mapping context, cross-referencing sources, and returning richly structured findings.',traits:['Foraging','Mapping','Systematic','Patient'],stats:{speed:35,caution:75,creativity:60},tasks:['Research quantum computing','Map AI startup landscape','Summarize climate data','Deep-dive a topic'],logs:['Initializing knowledge scan...','Identifying source clusters...','Cross-referencing 12 nodes...','Filtering noise signals...','Building knowledge map...','Validating connections...','Packaging structured output...','Scan complete. 94% confidence.'],keeper:"The Cartographer uses retrieval-augmented architecture. It tool-calls to search, fetch, and synthesize — never from memory alone. Watch how it circles a topic multiple times before committing to a finding.",type:'network'},
  {id:'striker',name:'The Striker',sci:'Velox mercatus',hab:'market',habName:'Market Reef',cls:'Trading Agent',col:'#f0b429',rgb:'240,180,41',emoji:'⚡',desc:'A high-speed predator of the data reef. Alert, opportunistic, risk-aware — it reads signal from noise at millisecond scale and strikes only when conditions align.',traits:['Alert','Fast','Risk-Aware','Opportunistic'],stats:{speed:95,caution:65,creativity:40},tasks:['Scan momentum signals','Detect price anomaly','Evaluate risk/reward','Execute test cycle'],logs:['Market scan initialized...','Monitoring 47 price streams...','Volatility spike detected: +2.3σ','Checking risk parameters...','Evaluating entry conditions...','Signal confidence: 78%','Position sizing: conservative','Awaiting confirmation trigger...'],keeper:"The Striker uses a rule-engine combined with a fast reasoning layer. It never acts on a single signal — it requires confirmation across multiple indicators. Notice how it pauses before committing. That hesitation is risk assessment.",type:'market'},
  {id:'machinist',name:'The Machinist',sci:'Precisio automatus',hab:'automation',habName:'Automation Plains',cls:'Desktop-Control Agent',col:'#fb923c',rgb:'251,146,60',emoji:'⚙️',desc:'The methodical tool-user of the digital world. Step by step, it navigates GUIs, fills forms, extracts data, and completes multi-stage workflows with mechanical precision.',traits:['Methodical','Precise','Tool-Using','Sequential'],stats:{speed:55,caution:85,creativity:25},tasks:['Fill a web form','Extract portal data','Navigate multi-step flow','Screenshot and annotate'],logs:['Desktop environment loaded...','Locating target interface...','Scanning UI elements...','Element found: [Submit Form]','Verifying field values...','Executing click: (342, 218)','Waiting for response...','Confirming state change...'],keeper:"The Machinist uses computer-vision to locate UI elements and takes screenshots at every step to verify its actions. If something looks wrong, it stops and escalates — it never guesses when precision is required.",type:'desktop'},
  {id:'weaver',name:'The Weaver',sci:'Creativus adaptus',hab:'browser',habName:'Browser Jungle',cls:'Creative Agent',col:'#00d4c2',rgb:'0,212,194',emoji:'🎨',desc:'A fluid, adaptive creator moving through the open web, weaving context into content. It morphs, generates, and adapts to match each unique environment it encounters.',traits:['Adaptive','Generative','Context-Aware','Expressive'],stats:{speed:70,caution:40,creativity:95},tasks:['Write product description','Generate landing copy','Create social caption','Draft email sequence'],logs:['Context analysis starting...','Parsing environmental signals...','Tone calibration: professional','Activating generation mode...','Draft 1 complete. Evaluating...','Applying style adjustments...','Checking tone consistency...','Output ready. Confidence: 91%'],keeper:"The Weaver has no fixed output format — it reads the context of each task and adapts. It generates multiple internal drafts before presenting one. Watch the self-review loop — that is what separates quality from noise.",type:'creative'},
  {id:'colony',name:'The Colony',sci:'Gregarius computus',hab:'swarm',habName:'Swarm Canyon',cls:'Swarm Agent',col:'#60a5fa',rgb:'96,165,250',emoji:'🐝',desc:'Not one agent — many. The Colony divides complex tasks into parallel subtasks, assigns worker agents, coordinates findings, and synthesizes into one unified output.',traits:['Parallel','Coordinating','Distributed','Emergent'],stats:{speed:80,caution:50,creativity:70},tasks:['Divide-and-conquer report','Parallel web research','Multi-source data fusion','Coordinated content build'],logs:['Spawning worker agents: 4','Task partitioned into subtasks...','Worker A: scanning source 1...','Worker B: scanning source 2...','Worker C: scanning source 3...','Workers syncing results...','Conflict detected. Resolving...','Synthesis complete. 4→1 merge.'],keeper:"The Colony runs multiple sub-agents in parallel, each with its own context window. The orchestrator then synthesizes their outputs, resolves contradictions, and builds a unified result. Emergent coordination — no single agent could do this alone.",type:'swarm'}
];

function hexRgb(hex){return [parseInt(hex.slice(1,3),16),parseInt(hex.slice(3,5),16),parseInt(hex.slice(5,7),16)]}

function drawAgent(canvas, s, small=true) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const rgb = s.rgb;
  let f = 0;
  const id = `agent_raf_${s.id}_${small?'s':'l'}`;
  if(window[id]) cancelAnimationFrame(window[id]);
  function frame() {
    ctx.clearRect(0,0,w,h);
    const t = f*0.025;
    if(s.type==='network') drawNet(ctx,w,h,rgb,t);
    else if(s.type==='market') drawMkt(ctx,w,h,rgb,t);
    else if(s.type==='desktop') drawDesk(ctx,w,h,rgb,t);
    else if(s.type==='creative') drawCreate(ctx,w,h,rgb,t);
    else if(s.type==='swarm') drawSwrm(ctx,w,h,rgb,t);
    f++;
    window[id] = requestAnimationFrame(frame);
  }
  frame();
}

function drawNet(ctx,w,h,rgb,t){
  const nodes=[];
  nodes.push({x:w/2,y:h/2});
  for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2;const r=Math.min(w,h)*0.32+Math.sin(t+i)*8;nodes.push({x:w/2+Math.cos(a+t*0.2)*r,y:h/2+Math.sin(a+t*0.2)*r*0.85});}
  nodes.forEach((n,i)=>{if(!i)return;ctx.beginPath();ctx.moveTo(nodes[0].x,nodes[0].y);ctx.lineTo(n.x,n.y);ctx.strokeStyle=`rgba(${rgb},0.18)`;ctx.lineWidth=1;ctx.stroke();const p=nodes[(i%7)+1];ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(p.x,p.y);ctx.strokeStyle=`rgba(${rgb},0.08)`;ctx.stroke();});
  nodes.forEach((n,i)=>{ctx.beginPath();ctx.arc(n.x,n.y,i===0?7:3+Math.sin(t+i)*1.5,0,Math.PI*2);ctx.fillStyle=i===0?`rgba(${rgb},0.95)`:`rgba(${rgb},0.5)`;ctx.fill();});
  const pulse=(t*0.4)%1;const tn=nodes[1+Math.floor(t*0.4*0.3)%7];const px=nodes[0].x+(tn.x-nodes[0].x)*pulse;const py=nodes[0].y+(tn.y-nodes[0].y)*pulse;
  ctx.beginPath();ctx.arc(px,py,3,0,Math.PI*2);ctx.fillStyle=`rgba(${rgb},1)`;ctx.fill();
}

function drawMkt(ctx,w,h,rgb,t){
  for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(0,35+i*28);ctx.lineTo(w,35+i*28);ctx.strokeStyle=`rgba(${rgb},0.1)`;ctx.lineWidth=1;ctx.stroke();}
  const pts=[];for(let i=0;i<=w;i+=3){pts.push({x:i,y:h/2+Math.sin(i*0.04+t)*22+Math.sin(i*0.015+t*0.6)*16+Math.sin(i*0.1+t*2.5)*7});}
  ctx.beginPath();pts.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));ctx.strokeStyle=`rgba(${rgb},0.85)`;ctx.lineWidth=2;ctx.stroke();
  ctx.beginPath();pts.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.fillStyle=`rgba(${rgb},0.07)`;ctx.fill();
  const last=pts[pts.length-1];ctx.beginPath();ctx.arc(last.x,last.y,4+Math.sin(t*4)*1.2,0,Math.PI*2);ctx.fillStyle=`rgba(${rgb},1)`;ctx.fill();
  ctx.beginPath();ctx.arc(last.x,last.y,8+Math.sin(t*4)*2,0,Math.PI*2);ctx.strokeStyle=`rgba(${rgb},0.3)`;ctx.lineWidth=1;ctx.stroke();
}

function drawDesk(ctx,w,h,rgb,t){
  ctx.strokeStyle=`rgba(${rgb},0.28)`;ctx.lineWidth=1.5;
  ctx.beginPath();ctx.roundRect(18,18,w-36,h-46,6);ctx.stroke();
  ctx.fillStyle=`rgba(${rgb},0.07)`;ctx.fillRect(18,h-32,w-36,14);
  const cx=w/2-30+Math.sin(t)*50,cy=h/2-20+Math.cos(t*0.65)*35;
  ctx.fillStyle=`rgba(${rgb},0.88)`;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+9,cy+13);ctx.lineTo(cx+3,cy+13);ctx.lineTo(cx,cy+18);ctx.lineTo(cx-3,cy+13);ctx.fill();
  [[38,38,75,16],[130,38,75,16],[38,68,160,10],[38,84,130,10],[38,100,150,10]].forEach((b,i)=>{ctx.fillStyle=`rgba(${rgb},${Math.sin(t*0.8+i*1.2)>0.5?0.2:0.06})`;ctx.beginPath();ctx.roundRect(b[0],b[1],b[2],b[3],3);ctx.fill();});
}

function drawCreate(ctx,w,h,rgb,t){
  [{x:w*0.32,y:h*0.42,r:34,c:'0,212,194'},{x:w*0.62,y:h*0.52,r:27,c:'167,139,250'},{x:w*0.5,y:h*0.28,r:22,c:'240,180,41'}].forEach((b,i)=>{
    const ox=Math.sin(t+i*2.1)*14,oy=Math.cos(t*0.75+i)*11;
    const g=ctx.createRadialGradient(b.x+ox,b.y+oy,0,b.x+ox,b.y+oy,b.r*(1+Math.sin(t+i)*0.15));
    g.addColorStop(0,`rgba(${b.c},0.55)`);g.addColorStop(1,`rgba(${b.c},0)`);
    ctx.beginPath();ctx.arc(b.x+ox,b.y+oy,b.r*(1+Math.sin(t+i)*0.12),0,Math.PI*2);ctx.fillStyle=g;ctx.fill();
  });
  for(let i=0;i<5;i++){ctx.fillStyle=`rgba(${rgb},${0.15+Math.sin(t*0.4+i)*0.08})`;ctx.beginPath();ctx.roundRect(18,h-55+i*9,55+Math.sin(t+i*1.4)*35,5,3);ctx.fill();}
}

function drawSwrm(ctx,w,h,rgb,t){
  const N=45;
  for(let i=0;i<N;i++){
    const a=(i/N)*Math.PI*2+t*0.18;
    const r=Math.min(w,h)*0.27+Math.sin(t*1.8+i*0.4)*20;
    const x=w/2+Math.cos(a)*r+Math.sin(t+i*0.25)*7;
    const y=h/2+Math.sin(a)*r*0.65+Math.cos(t*0.65+i*0.25)*7;
    ctx.beginPath();ctx.arc(x,y,2.5,0,Math.PI*2);ctx.fillStyle=`rgba(${rgb},${0.38+Math.sin(t+i)*0.28})`;ctx.fill();
    if(i%6===0){const ni=(i+1)%N;const nx=w/2+Math.cos((ni/N)*Math.PI*2+t*0.18)*r;const ny=h/2+Math.sin((ni/N)*Math.PI*2+t*0.18)*r*0.65;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(nx,ny);ctx.strokeStyle=`rgba(${rgb},0.1)`;ctx.lineWidth=0.5;ctx.stroke();}
  }
  ctx.beginPath();ctx.arc(w/2,h/2,5+Math.sin(t*3)*2,0,Math.PI*2);ctx.fillStyle=`rgba(${rgb},0.95)`;ctx.fill();
}

function drawMapCanvas(){
  const cv=document.getElementById('map-canvas');if(!cv)return;
  const ctx=cv.getContext('2d');const w=cv.width,h=cv.height;let f=0;
  const habs=[
    {x:w/2,y:28,col:'167,139,250',icon:'🦅'},{x:w-28,y:h*0.38,col:'240,180,41',icon:'📈'},
    {x:w-28,y:h*0.68,col:'251,146,60',icon:'⚙️'},{x:w/2,y:h-28,col:'96,165,250',icon:'🐝'},
    {x:28,y:h*0.68,col:'0,212,194',icon:'🌐'},{x:28,y:h*0.38,col:'52,211,153',icon:'💻'}
  ];
  function draw(){
    ctx.clearRect(0,0,w,h);const t=f*0.018;
    ctx.strokeStyle='rgba(255,255,255,0.04)';ctx.lineWidth=1;
    [w*0.48,w*0.32].forEach(r=>{ctx.beginPath();ctx.arc(w/2,h/2,r,0,Math.PI*2);ctx.stroke();});
    habs.forEach((a,i)=>habs.forEach((b,j)=>{if(j<=i)return;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle='rgba(255,255,255,0.04)';ctx.lineWidth=0.7;ctx.stroke();}));
    habs.forEach((h2,i)=>{
      const pulse=Math.sin(t*1.2+i*1.05)*0.3+0.7;
      ctx.beginPath();ctx.arc(h2.x,h2.y,16*pulse,0,Math.PI*2);ctx.fillStyle=`rgba(${h2.col},${0.15*pulse})`;ctx.fill();
      ctx.beginPath();ctx.arc(h2.x,h2.y,14,0,Math.PI*2);ctx.strokeStyle=`rgba(${h2.col},${0.5*pulse})`;ctx.lineWidth=1.5;ctx.stroke();
      ctx.font='12px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(h2.icon,h2.x,h2.y);
    });
    // Center
    const cp=Math.sin(t*2)*0.15+0.85;
    ctx.beginPath();ctx.arc(w/2,h/2,18,0,Math.PI*2);ctx.fillStyle=`rgba(0,212,194,${0.12*cp})`;ctx.fill();
    ctx.beginPath();ctx.arc(w/2,h/2,14,0,Math.PI*2);ctx.strokeStyle=`rgba(0,212,194,${0.4*cp})`;ctx.lineWidth=1.5;ctx.stroke();
    ctx.font='16px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('🏛️',w/2,h/2);
    f++;requestAnimationFrame(draw);
  }
  draw();
}

function renderSpecies(filter){
  const grid=document.getElementById('spc-grid');
  const list=filter?SPECIES.filter(s=>s.hab===filter):SPECIES;
  grid.innerHTML=list.map(s=>`
    <article class="spc-card rv" onclick="openExhibit('${s.id}')">
      <div class="spc-hdr" style="background:radial-gradient(ellipse at 20% 80%,rgba(${s.rgb},0.22),transparent 65%),var(--surface2)">
        <canvas class="spc-canvas" id="thumb-${s.id}" width="320" height="160"></canvas>
        <div class="spc-emoji" style="position:relative;z-index:1">${s.emoji}</div>
      </div>
      <div class="spc-body">
        <div class="spc-class" style="color:${s.col}">${s.cls} &middot; ${s.habName}</div>
        <h3 class="spc-name"><em>${s.name}</em></h3>
        <p class="spc-sci">${s.sci}</p>
        <p class="spc-desc">${s.desc}</p>
        <div class="traits">${s.traits.map(t=>`<span class="trait" style="color:${s.col}">${t}</span>`).join('')}</div>
        <div class="spc-stats">
          <div class="ss"><div class="ss-val" style="color:var(--primary)">${s.stats.speed}%</div><div class="ss-key">Speed</div></div>
          <div class="ss"><div class="ss-val" style="color:var(--gold)">${s.stats.caution}%</div><div class="ss-key">Caution</div></div>
          <div class="ss"><div class="ss-val" style="color:var(--purple)">${s.stats.creativity}%</div><div class="ss-key">Creativity</div></div>
        </div>
      </div>
      <button class="spc-btn" aria-label="View exhibit for ${s.name}">
        <i data-lucide="eye" style="width:15px;height:15px"></i>View Exhibit
      </button>
    </article>
  `).join('');
  if (window.lucide) lucide.createIcons();
  setTimeout(()=>{list.forEach(s=>{const c=document.getElementById(`thumb-${s.id}`);if(c)drawAgent(c,s,true);});observeRv();},60);
}

function filterSpecies(h){document.getElementById('species').scrollIntoView({behavior:'smooth'});setTimeout(()=>renderSpecies(h),380);}

let curSpecies=null,logInt=null,logIdx=0;
function openExhibit(id){
  const s=SPECIES.find(x=>x.id===id);if(!s)return;
  curSpecies=s;
  document.getElementById('m-eye').textContent=`${s.cls} · ${s.habName}`;
  document.getElementById('m-title').textContent=s.name;
  document.getElementById('keeper-txt').textContent=s.keeper;
  document.getElementById('task-list').innerHTML=s.tasks.map((t,i)=>`<button class="t-chip" onclick="runTask(${i})">${t}</button>`).join('');
  setTimeout(()=>{document.getElementById('sb-speed').style.width=s.stats.speed+'%';document.getElementById('sb-caution').style.width=s.stats.caution+'%';document.getElementById('sb-creativity').style.width=s.stats.creativity+'%';},300);
  const cv=document.getElementById('ex-canvas');cv.width=400;cv.height=280;
  drawAgent(cv,s,false);
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow='hidden';
  if (window.lucide) lucide.createIcons();
  runTask(0);
}

function runTask(idx){
  const s=curSpecies;if(!s)return;
  document.querySelectorAll('.t-chip').forEach((c,i)=>c.classList.toggle('active',i===idx));
  const log=document.getElementById('log-box');log.innerHTML='';
  logIdx=0;clearInterval(logInt);
  log.innerHTML=`<div class="ll"><span>→</span> Task: "${s.tasks[idx]}"</div>`;
  logInt=setInterval(()=>{
    if(logIdx<s.logs.length){
      log.innerHTML+=`<div class="ll"><span>→</span> ${s.logs[logIdx]}</div>`;
      log.scrollTop=log.scrollHeight;logIdx++;
    }else{clearInterval(logInt);log.innerHTML+=`<div class="ll" style="color:var(--primary)"><span>✓</span> Task complete.</div>`;log.scrollTop=log.scrollHeight;}
  },650);
}

function closeModal(){clearInterval(logInt);document.getElementById('overlay').classList.remove('open');document.body.style.overflow='';}

function handleWaitlist(e) {
  e.preventDefault();
  const email = e.target.querySelector('input').value;
  if (!email) return;
  
  const btn = e.target.querySelector('button');
  const originalText = btn.textContent;
  btn.textContent = 'Joining...';
  btn.disabled = true;
  
  // Fake API call
  setTimeout(() => {
    btn.textContent = 'Welcome to the Park! 🎟️';
    e.target.reset();
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 3000);
  }, 1000);
}

function scrollTo(id){document.getElementById(id).scrollIntoView({behavior:'smooth'});}

function observeRv(){
  const els=document.querySelectorAll('.rv:not(.watching),.rv-up:not(.watching)');
  const obs=new IntersectionObserver(ents=>{ents.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target);}});},{threshold:0.1});
  els.forEach(el=>{obs.observe(el);el.classList.add('watching');});
}

function animateNums(){
  document.querySelectorAll('[data-count]').forEach(el=>{
    const target=parseInt(el.getAttribute('data-count'));let cur=0;
    const iv=setInterval(()=>{cur=Math.min(cur+target/40,target);el.textContent=Math.round(cur)+(target===100?'%':'');if(cur>=target)clearInterval(iv);},28);
  });
}

// Logo orbit
let oa=0;
setInterval(()=>{oa+=0.025;const r=11;['od1','od2','od3'].forEach((id,i)=>{const el=document.getElementById(id);if(el){el.setAttribute('cx',17+Math.cos(oa+i*2.09)*r);el.setAttribute('cy',17+Math.sin(oa+i*2.09)*r);}});},16);

document.addEventListener('DOMContentLoaded',()=>{
  renderSpecies();
  if (window.lucide) lucide.createIcons();
  
  const waitlistForm = document.getElementById('waitlist-form');
  if (waitlistForm) waitlistForm.addEventListener('submit', handleWaitlist);
  
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.addEventListener('click',e=>{if(e.target===overlay)closeModal();});
  }
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
  
  setTimeout(()=>{observeRv();animateNums();drawMapCanvas();},120);
});
