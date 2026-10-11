fetch('data/ranking.json')
.then(r=>r.json())
.then(data=>{
 const rows=data.rankings || data.items || data.overall || [];
 const summary=document.querySelector('#summary');
 const cards=document.querySelector('#cards');
 const avg=data.summary?.average_score || 0;
 summary.innerHTML=`<div class="panel"><h3>Radar Summary</h3><p>Total Signals: ${data.summary?.total || rows.length}</p><p>Average Score: ${avg}</p></div>`;
 rows.slice(0,10).forEach((item,i)=>{
  const score=item.score_v2 || item.ai_drama_score_v2 || item.score || 0;
  const dims=item.dimensions || {};
  const move=item.movement || item.change || {};
  cards.innerHTML += `
  <article class="card">
   <h3>#${item.rank || i+1} ${item.title || item.name || ''}</h3>
   <div class="score">${score}</div>
   <p>🔥 Heat ${dims.heat || 0}</p>
   <p>🚀 Virality ${dims.virality || 0}</p>
   <p>📈 Trend ${dims.trend || 0}</p>
   <p>⚠ Risk ${dims.risk || 0}</p>
   <p>${move.direction || ''} ${move.delta || move.change || ''}</p>
  </article>`;
 });
})
.catch(err=>console.log(err));
