async function loadDashboard(){
  const summary=document.querySelector('#summary');
  const cards=document.querySelector('#cards');

  try {
    const response = await fetch('data/ranking.json?v=' + Date.now());
    const data = await response.json();

    const rows = data.items || data.rankings || data.overall || [];
    const total = data.count ?? rows.length;

    summary.innerHTML = `
      <div class="panel">
        <h3>Radar Summary</h3>
        <p>Total Signals: ${total}</p>
        <p>Schema: ${data.schema || 'legacy'}</p>
      </div>`;

    if (!rows.length) {
      cards.innerHTML = '<div class="panel">No ranking data available.</div>';
      return;
    }

    cards.innerHTML = rows.slice(0,10).map((item,index)=>{
      const score=item.ai_drama_score_v2 ?? item.score_v2 ?? item.score ?? 0;
      const dims=item.dimensions || {};

      return `
      <article class="card">
        <h3>#${item.rank || index+1} ${item.title || item.name || 'Untitled'}</h3>
        <div class="score">${score}</div>
        <p>🔥 Heat ${dims.heat ?? item.heat_score ?? 0}</p>
        <p>🚀 Virality ${dims.virality ?? 0}</p>
        <p>📈 Trend ${dims.trend ?? 0}</p>
        <p>⚠ Risk ${dims.risk ?? 0}</p>
      </article>`;
    }).join('');

  } catch(error) {
    summary.innerHTML = `<div class="panel">Dashboard loading error: ${error.message}</div>`;
    console.error(error);
  }
}

loadDashboard();
