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
        <h3>雷达概览</h3>
        <p>监测信号数量：${total}</p>
        <p>数据模型：${data.schema || 'legacy'}</p>
      </div>`;

    if (!rows.length) {
      cards.innerHTML = '<div class="panel">暂无排名数据。</div>';
      return;
    }

    cards.innerHTML = rows.slice(0,10).map((item,index)=>{
      const score=item.ai_drama_score_v2 ?? item.score_v2 ?? item.score ?? 0;
      const dims=item.dimensions || item.metrics || {};

      return `
      <article class="card">
        <h3>#${item.rank || index+1} ${item.title || item.name || '未命名项目'}</h3>
        <div class="score">${score}</div>
        <p>等级：${item.score_grade || 'C'}</p>
        <p>🔥 热度：${dims.heat ?? dims.platform_heat ?? item.heat_score ?? 0}</p>
        <p>🚀 传播力：${dims.virality ?? dims.social_spread ?? 0}</p>
        <p>📈 趋势：${dims.trend ?? dims.growth_trend ?? 0}</p>
        <p>⚠ 风险：${dims.risk ?? 0}</p>
      </article>`;
    }).join('');

  } catch(error) {
    summary.innerHTML = `<div class="panel">页面加载错误：${error.message}</div>`;
    console.error(error);
  }
}

loadDashboard();
