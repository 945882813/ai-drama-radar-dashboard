fetch('data/ranking.json').then(r=>r.json()).then(data=>{
 const rows=data.items || data.overall || data.rankings?.overall || [];
 const tbody=document.querySelector('#ranking tbody');
 rows.slice(0,20).forEach((item,i)=>{
  const score=item.ai_drama_score_v2 || item.ai_drama_score || item.score || 0;
  const dims=item.dimensions || {};
  tbody.innerHTML += `<tr>
<td>${i+1}</td>
<td>${item.title||item.name||''}</td>
<td>${score}<br><small>Heat ${dims.heat||0} / Viral ${dims.virality||0} / Trend ${dims.trend||0}</small></td>
</tr>`;
 });
}).catch(()=>{});
