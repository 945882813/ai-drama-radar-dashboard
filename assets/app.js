fetch('data/ranking.json').then(r=>r.json()).then(data=>{
 const rows=data.overall||data.rankings?.overall||[];
 const tbody=document.querySelector('#ranking tbody');
 rows.slice(0,20).forEach((item,i)=>{
  tbody.innerHTML += `<tr><td>${i+1}</td><td>${item.title||item.name||''}</td><td>${item.ai_drama_score||item.score||0}</td></tr>`;
 });
}).catch(()=>{});
