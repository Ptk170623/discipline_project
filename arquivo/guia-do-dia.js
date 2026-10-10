/*
 * ARQUIVO: guia do dia (removido do app em 2026-10).
 *
 * O guia ficava no topo da tela inicial e montava o dia em blocos de horário (ao acordar, trajeto, almoço, estudo,
 * dormir): tarefas diárias por bloco, as partes de estudo escolhidas por prioridade (pickParts), as faltas a compensar
 * das tarefas "Necessária", as capacidades diárias e as revisões do dia. Cada passo tinha uma caixa para marcar.
 *
 * Este arquivo guarda o código exatamente como estava, para o caso de querer reimplementar o guia de outro jeito.
 * Ele depende de funções que continuam no app: dailyDates, isNeeded, needLedger, focusPart, workedOn, reviewPlan,
 * gcfg, planOn, srcLine, slotOf, pickParts e do estado (state.daily, state.cap, state.proj, state.guide).
 * Os campos "slot" das tarefas e das capacidades continuam salvos nos dados, mas o app não os usa mais.
 */

/* ===== CSS ===== */
/*
.guide{background:var(--surface);border:1px solid var(--line);border-radius:24px;padding:16px;gap:14px}
.gslot{display:grid;grid-template-columns:96px minmax(0,1fr);gap:6px 12px;align-items:start}
@media (max-width:560px){.gslot{grid-template-columns:1fr}}
.gtime{display:flex;flex-direction:column;gap:1px;padding-top:6px}
.gtime .num{font-size:13px;color:var(--accent);font-weight:600}
.gtime b{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}
.gsteps{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px;min-width:0}
.gstep{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:12px;background:var(--surface-2);min-width:0}
.gstep.done{background:var(--ok-soft)}
.gstep.done .gtext b{text-decoration:line-through;text-decoration-thickness:1px}
.gstep.rv .gtext b{text-decoration:none!important}
.gstep.info{background:transparent;border:1px dashed var(--line)}
.gchk{flex:none;width:24px;height:24px;border-radius:8px;border:2px solid var(--line);background:var(--surface);cursor:pointer;padding:0;display:inline-flex;align-items:center;justify-content:center}
.gchk.static{cursor:default;border-style:dashed}
.gstep.done .gchk{background:var(--ok);border-color:var(--ok)}
.gstep.done .gchk::after{content:"";width:6px;height:11px;border:solid var(--surface);border-width:0 2.5px 2.5px 0;transform:rotate(45deg) translate(-1px,-1px)}
.gtext{display:flex;flex-direction:column;min-width:0;flex:1}
.gtext b{font-size:14.5px;font-weight:600;overflow-wrap:anywhere}
.gtext small{font-size:12.5px;color:var(--muted);overflow-wrap:anywhere}
.gcfg{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}
*/

/* ===== Funções ===== */
/* ---------- guia do dia ---------- */
var SLOTS=[['wake','Ao acordar','07:00'],['day','Durante o dia',''],['am','Trajeto de ida','07:45'],['lunch','Almoço','12:30'],['pm','Trajeto de volta','18:15'],['pre','Antes de estudar','19:10'],['study','Estudo','20:15'],['bed','Antes de dormir','22:00']];
function slotOf(d){
  if(d.slot&&SLOTS.some(function(s){return s[0]===d.slot;}))return d.slot;
  var n=norm(d.name);
  if(/acordar|cama|dente|orar|oracao/.test(n))return 'wake';
  if(/listening|speaking|almoc/.test(n))return 'lunch';
  if(/exerc|treino|scapular|calistenia|caminhada/.test(n))return 'pre';
  if(/dormir|sono/.test(n))return 'bed';
  return 'day';
}
function gcfg(){var g=state.guide||{};return {t:g.t||{},wk:g.wk>0?g.wk:2,we:g.we>0?g.we:4,rv:g.rv>0?g.rv:2,rw:g.rw>0?g.rw:6};}
/* revisões de hoje: limite por dia (úteis/fim de semana); as novas (D+1) vêm primeiro e o resto espera na fila */
function reviewPlan(t){
  t=t||today();var c=gcfg(),we=parse(t).getDay()%6===0,lim=we?c.rw:c.rv;
  var done=state.log.filter(function(e){return e.t==='review'&&e.d===t;}).length;
  var q=state.reviews.filter(function(r){return r.due&&r.due<=t&&findPart(r.part);}).sort(function(a,b){var na=a.stage===0?0:1,nb=b.stage===0?0:1;return na!==nb?na-nb:(a.due<b.due?-1:a.due>b.due?1:0);});
  var room=Math.max(0,lim-done);
  return {lim:lim,done:done,show:q.slice(0,room),wait:q.slice(room)};
}
function slotTime(s){var c=gcfg();return (c.t&&c.t[s[0]])||s[2];}
function srcLine(p){var l=String(p&&p.note||'').split('\n').map(function(x){return x.trim();}).filter(function(x){return /^(source|fonte)\s*:/i.test(x);})[0];return l?l.replace(/^(source|fonte)\s*:\s*/i,'').slice(0,110):'';}
function workedOn(p,t){return workOf(p.id).some(function(e){return e.d===t;})||p.done===t;}
function focusPart(it,t){
  var w=it.parts.find(function(p){return workedOn(p,t);});
  if(w)return w;
  return it.parts.filter(function(p){return !p.done&&(!p.start||p.start<=t);}).sort(function(a,b){return (a.due||'9999')<(b.due||'9999')?-1:1;})[0]||null;
}
function pickParts(n,t,we){
  var rk={profundo:0,solido:1,conceitual:2},c=[];
  /* itens de 1 sessão por semana só entram no fim de semana, antes dos demais e na ordem da lista (projetos antes de capacidades) */
  ['cap','proj'].forEach(function(k){state[k].forEach(function(it,i){
    if(it.status==='espera'||it.daily||(it.spw===1&&!we))return;
    var p=focusPart(it,t);if(!p)return;
    c.push({k:k,it:it,p:p,today:workedOn(p,t),wk:!!(we&&it.spw===1),ix:(k==='proj'?0:1000)+i,late:(p.due||'9999')<=t,rank:rk[it.depth]!=null?rk[it.depth]:1});
  });});
  c.sort(function(a,b){
    if(a.today!==b.today)return a.today?-1:1;
    if(a.wk!==b.wk)return a.wk?-1:1;
    if(a.wk&&a.ix!==b.ix)return a.ix-b.ix;
    if(a.late!==b.late)return a.late?-1:1;
    if(a.late&&a.p.due!==b.p.due)return a.p.due<b.p.due?-1:1;
    if(a.rank!==b.rank)return a.rank-b.rank;
    return (a.p.due||'9999')<(b.p.due||'9999')?-1:1;
  });
  return c.slice(0,n);
}
function guide(){
  var t=today(),dow=parse(t).getDay(),we=dow===0||dow===6,by={};
  function put(s,x){(by[s]=by[s]||[]).push(x);}
  var late=[];
  state.daily.forEach(function(d){
    var sl=slotOf(d),x={type:'daily',d:d,done:!!dailyDates(d.id)[t]},cx=[];
    if(isWeekly(d)){var wdd=weekDone(d,t);if(wdd&&wdd!==t)return;x.weekly=true;}
    if(isNeeded(d)&&!isWeekly(d))needLedger(d).debts.forEach(function(day){var pl=d.comp&&d.comp[day];if(pl&&pl>t)return;cx.push({type:'comp',d:d,day:day,plan:pl||'',done:false});});
    if(sl==='study'){late.push(x);cx.forEach(function(c){late.push(c);});}else{put(sl,x);cx.forEach(function(c){put(sl,c);});}
  });
  ['cap','proj'].forEach(function(k){state[k].forEach(function(it){
    if(!it.daily||it.status==='espera')return;
    var sl=SLOTS.some(function(z){return z[0]===it.slot;})?it.slot:'study',dp=focusPart(it,t),x;
    if(!dp)return;
    x={type:'study',k:k,it:it,p:dp,done:workedOn(dp,t)};
    if(sl==='study')late.push(x);else put(sl,x);
  });});
  var picks=pickParts(we?gcfg().we:gcfg().wk,t,we);
  if(!we&&picks.length)put('am',{type:'info',title:'Pré-leitura da parte da noite',hint:picks[0].p.name+(srcLine(picks[0].p)?' · '+srcLine(picks[0].p):'')});
  var rp=reviewPlan(t);
  put(we?'study':'pm',{type:'reviews',n:rp.show.length,wait:rp.wait.length,lim:rp.lim,did:rp.done,md:mdPending().length,done:!rp.show.length});
  var st=picks.map(function(c){return {type:'study',k:c.k,it:c.it,p:c.p,done:workedOn(c.p,t)};});
  var todo=[];
  if(we)by.study=(by.study||[]).concat(st,todo,late);else{st.concat(todo,late).forEach(function(x){put('study',x);});}
  return SLOTS.filter(function(s){return !(we&&(s[0]==='am'||s[0]==='pm'))&&by[s[0]]&&by[s[0]].length;}).map(function(s){return {key:s[0],label:s[1],time:slotTime(s),steps:by[s[0]]};});
}
function trim90(x){x=String(x||'').replace(/\s+/g,' ').trim();return x.length>92?x.slice(0,90)+'…':x;}
function stepHtml(x){
  var t=today();
  if(x.type==='daily'){
    var d=x.d,pl=planOn(d,t).split('\n')[0],hint=pl?'Hoje: '+pl:trim90(String(d.text||'').split('\n')[0]);if(x.weekly)hint='Semanal'+(x.done?'':', uma vez até domingo')+(hint?' · '+hint:'');
    return '<li class="gstep'+(x.done?' done':'')+'"><button type="button" class="gchk" role="checkbox" aria-checked="'+x.done+'" aria-label="Marcar '+esc(d.name)+'" data-act="guide-daily" data-id="'+d.id+'"></button><span class="gtext"><b>'+esc(d.name)+hidPill(d)+'</b>'+(hint?'<small>'+esc(hint)+'</small>':'')+'</span><button class="btn ghost sm" data-act="nav" data-to="daily:'+d.id+'">Abrir</button></li>';
  }
  if(x.type==='comp')
    return '<li class="gstep"><button type="button" class="gchk" role="checkbox" aria-checked="false" aria-label="Compensar '+esc(x.d.name)+'" data-act="guide-comp" data-id="'+x.d.id+'"></button><span class="gtext"><b>Compensar: '+esc(x.d.name)+hidPill(x.d)+'</b><small>faltou em '+esc(fmtDow(x.day))+(x.plan?' · marcada para '+esc(fmtDow(x.plan)):'')+'</small></span><button class="btn ghost sm" data-act="nav" data-to="daily:'+x.d.id+'">Data</button></li>';
  if(x.type==='study'){
    var sl=srcLine(x.p),rp=x.p.reps?workOf(x.p.id).length+'/'+x.p.reps+' vezes':'';
    return '<li class="gstep'+(x.done?' done':'')+'"><button type="button" class="gchk" role="checkbox" aria-checked="'+x.done+'" aria-label="Registrar sessão em '+esc(x.p.name)+'" data-act="guide-study" data-k="'+x.k+'" data-item="'+x.it.id+'" data-id="'+x.p.id+'"></button><span class="gtext"><b>'+esc(x.p.name)+'</b><small>'+esc(x.it.name)+(rp?' · '+rp:'')+(sl?' · '+esc(sl):'')+'</small></span><span class="row" style="flex-wrap:nowrap"><button class="btn ghost sm" data-act="guide-prompt" data-k="'+x.k+'" data-item="'+x.it.id+'" data-id="'+x.p.id+'">Prompt</button><button class="btn ghost sm" data-act="part-open" data-k="'+x.k+'" data-item="'+x.it.id+'" data-id="'+x.p.id+'">Abrir</button></span></li>';
  }
  if(x.type==='reviews')
    return '<li class="gstep rv'+(x.done?' done':'')+'"><span class="gchk static'+(x.done?' on':'')+'" aria-hidden="true"></span><span class="gtext"><b>Revisões espaçadas</b><small>'+(x.n?x.n+' '+plural(x.n,'revisão','revisões')+' para hoje':(x.did?'Limite de hoje feito ('+x.did+' de '+x.lim+')':'Nenhuma para hoje'))+(x.wait?' · '+x.wait+' na fila para os próximos dias':'')+(x.md?' · '+x.md+' '+plural(x.md,'nota em markdown pendente','notas em markdown pendentes'):'')+'</small></span>'+(x.n||x.md?'<button class="btn ghost sm" data-act="guide-reviews">Ver</button>':'')+'</li>';
  return '<li class="gstep info"><span class="gchk static" aria-hidden="true"></span><span class="gtext"><b>'+esc(x.title)+'</b><small>'+esc(x.hint)+'</small></span></li>';
}
function guideSection(){
  if(!canE())return '';
  var G=guide(),total=0,done=0;
  G.forEach(function(g){g.steps.forEach(function(x){if(x.type!=='info'){total++;if(x.done)done++;}});});
  var pct=total?Math.round(done/total*100):0;
  return '<section class="sec guide" aria-label="Guia do dia"><div class="sec-head"><h2 class="disp">Guia do dia</h2><span class="row"><span class="aside num">'+done+' de '+total+' passos</span><button class="btn sm" data-act="guide-config">Ajustar</button></span></div>'+
   '<div class="bar-track" role="img" aria-label="'+pct+'% dos passos do dia"><div class="bar-fill'+(pct===100?' ok':'')+'" style="width:'+pct+'%"></div></div>'+
   (pct===100&&total?'<div class="rev-empty" style="background:var(--ok-soft);color:var(--ok)">Dia completo. Descanse.</div>':'')+
   G.map(function(g){return '<div class="gslot"><div class="gtime">'+(g.time?'<span class="num">'+esc(g.time)+'</span>':'')+'<b>'+esc(g.label)+'</b></div><ul class="gsteps">'+g.steps.map(stepHtml).join('')+'</ul></div>';}).join('')+
   '<details class="fold"><summary>Dia difícil?</summary><p class="muted" style="font-size:14px;margin-top:8px">Faça o mínimo: 1 sessão de estudo e 10 minutos de exercício (2 exercícios do dia). O dia conta e a sequência continua. Um dia ruim não derruba a meta; o que derruba é falhar dois dias seguidos.</p></details></section>';
}
function guideModal(){
  var c=gcfg();
  return '<form data-form="guide" style="display:flex;flex-direction:column;gap:16px"><div class="sheet-head"><h2 class="disp">Ajustar o guia</h2>'+closeBtn()+'</div>'+
   '<p class="muted" style="font-size:14px">Horários de cada bloco do dia e quantas sessões de estudo entram no guia. Cada tarefa diária escolhe o seu bloco em Editar (ou o app deduz pelo nome).</p>'+
   '<div class="gcfg">'+SLOTS.filter(function(s){return s[2];}).map(function(s){return '<div class="field"><label for="g-t-'+s[0]+'">'+esc(s[1])+'</label><input type="time" id="g-t-'+s[0]+'" name="t-'+s[0]+'" value="'+esc((c.t&&c.t[s[0]])||s[2])+'"></div>';}).join('')+'</div>'+
   '<div class="row" style="align-items:flex-start"><div class="field" style="flex:1 1 150px"><label for="g-wk">Sessões em dias úteis</label><input type="number" id="g-wk" name="wk" min="1" max="8" step="1" value="'+c.wk+'"></div>'+
   '<div class="field" style="flex:1 1 150px"><label for="g-we">Sessões no fim de semana</label><input type="number" id="g-we" name="we" min="1" max="12" step="1" value="'+c.we+'"></div></div>'+
   '<div class="row" style="align-items:flex-start"><div class="field" style="flex:1 1 150px"><label for="g-rv">Revisões em dias úteis</label><input type="number" id="g-rv" name="rv" min="1" max="30" step="1" value="'+c.rv+'"></div>'+
   '<div class="field" style="flex:1 1 150px"><label for="g-rw">Revisões no fim de semana</label><input type="number" id="g-rw" name="rw" min="1" max="30" step="1" value="'+c.rw+'"></div></div><span class="hint" style="font-size:12.5px;color:var(--muted)">O que passar do limite espera na fila e sobe nos dias seguintes. As revisões novas (a primeira de cada parte) têm prioridade.</span>'+
   (function(){var q=srOf(null);return '<div class="row" style="align-items:flex-start"><div class="field" style="flex:1 1 110px"><label for="g-sr0">1ª revisão (dias após concluir)</label><input type="number" id="g-sr0" name="sr0" min="1" max="365" step="1" value="'+q[0]+'"></div><div class="field" style="flex:1 1 110px"><label for="g-sr1">2ª (dias após a 1ª)</label><input type="number" id="g-sr1" name="sr1" min="1" max="365" step="1" value="'+q[1]+'"></div><div class="field" style="flex:1 1 110px"><label for="g-sr2">3ª (dias após a 2ª)</label><input type="number" id="g-sr2" name="sr2" min="1" max="365" step="1" value="'+q[2]+'"></div></div><span class="hint" style="font-size:12.5px;color:var(--muted)">Padrão de todas as capacidades: 1, 7 e 30. Cada capacidade pode ter o seu em Editar. Uma revisão que precisa voltar sempre volta amanhã.</span>';})()+
   '<div class="row"><button class="btn primary" type="submit">Salvar</button><button class="btn" type="button" data-act="modal-close">Cancelar</button></div></form>';
}
function slotSelect(cur){
  return '<div class="field"><label for="d-slot">Quando no dia</label><select id="d-slot" name="slot"><option value="">Automático, pelo nome</option>'+SLOTS.map(function(s){return '<option value="'+s[0]+'"'+(cur===s[0]?' selected':'')+'>'+esc(s[1])+'</option>';}).join('')+'</select></div>';
}

/* ===== Ações (switch de cliques) ===== */
    case 'guide-config':openModal({kind:'guide'});break;
    case 'guide-daily':{var gd=dailyById(d.id),tg=today();if(!gd)break;if(dailyDates(gd.id)[tg])state.log=state.log.filter(function(e){return !(e.t==='daily'&&e.item===gd.id&&e.d===tg);});else state.log.push({id:uid(),d:tg,t:'daily',k:'daily',item:gd.id,part:null,iname:gd.name,pname:gd.name,area:areaOf(gd)});commit();break;}
    case 'guide-comp':{var gc=dailyById(d.id),tc=today();if(!gc)break;var nc=state.log.filter(function(e){return e.t==='daily'&&e.item===gc.id&&e.d===tc;}).length;for(var ci=0;ci<(nc===0?2:1);ci++)state.log.push({id:uid(),d:tc,t:'daily',k:'daily',item:gc.id,part:null,iname:gc.name,pname:gc.name,area:areaOf(gc)});commit('Compensação registrada');break;}
    case 'guide-study':{var gi=findItem(d.k,d.item),gp=gi&&gi.parts.find(function(x){return x.id===d.id;}),gt=today();if(!gp)break;if(workOf(gp.id).some(function(e){return e.d===gt;}))state.log=state.log.filter(function(e){return !(e.t==='work'&&e.part===gp.id&&e.d===gt);});else addLog('work',d.k,gi,gp);commit();break;}
    case 'guide-prompt':{var pi2=findItem(d.k,d.item),pp2=pi2&&pi2.parts.find(function(x){return x.id===d.id;});if(pp2)copyText(promptStudy(pi2,pp2),'Prompt da sessão de estudo');break;}
    case 'guide-reviews':{var rv0=document.querySelector('.rev');if(rv0)rv0.scrollIntoView({behavior:'smooth',block:'start'});break;}

/* ===== Salvar o formulário do guia ===== */
  if(k0==='guide'){
    ev.preventDefault();var gf=new FormData(f0),gt2={};
    SLOTS.forEach(function(sl){if(sl[2]){var v=String(gf.get('t-'+sl[0])||'');if(/^\d\d:\d\d$/.test(v)&&v!==sl[2])gt2[sl[0]]=v;}});
    state.guide={t:gt2,wk:Math.max(1,Math.round(+gf.get('wk')||2)),we:Math.max(1,Math.round(+gf.get('we')||4)),rv:Math.max(1,Math.round(+gf.get('rv')||2)),rw:Math.max(1,Math.round(+gf.get('rw')||6))};
    var sq=srClean([gf.get('sr0'),gf.get('sr1'),gf.get('sr2')]);if(sq&&sq.join()!==SR_DEF.join())state.sr=sq;else delete state.sr;
    ui.modal=null;commit('Guia ajustado');return;
  }
