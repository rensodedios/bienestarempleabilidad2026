const roles = {
  admin: { name: 'Administrador', heading: 'Resumen institucional', scope: () => true },
  coord: { name: 'Coordinador', heading: 'Mi programa de estudios', scope: student => student.program === 'APS-TI' },
  teacher: { name: 'Docente consejero', heading: 'Mi grupo de consejería', scope: student => student.program === 'APS-TI' && student.cycle === 4 },
};

const students = [
  { id: 'DEMO-001', name: 'Lucía Torres Vega', program: 'APS-TI', cycle: 4, attendance: 62, risk: 'Alto', action: 'Entrevista de seguimiento', date: '23/11/2026' },
  { id: 'DEMO-002', name: 'Mateo Ruiz León', program: 'APS-TI', cycle: 4, attendance: 80, risk: 'Medio', action: 'Orientación académica', date: '21/11/2026' },
  { id: 'DEMO-003', name: 'Valeria Soto Ríos', program: 'APS-TI', cycle: 6, attendance: 96, risk: 'Bajo', action: 'Seguimiento preventivo', date: '20/11/2026' },
  { id: 'DEMO-004', name: 'Diego Ramos Cruz', program: 'Contabilidad', cycle: 2, attendance: 92, risk: 'Bajo', action: 'Orientación académica', date: '19/11/2026' },
  { id: 'DEMO-005', name: 'Camila Paredes Mora', program: 'Enfermería Técnica', cycle: 4, attendance: 71, risk: 'Alto', action: 'Entrevista de seguimiento', date: '18/11/2026' },
  { id: 'DEMO-006', name: 'Nicolás Flores Gil', program: 'Producción Agropecuaria', cycle: 6, attendance: 83, risk: 'Medio', action: 'Seguimiento de asistencia', date: '17/11/2026' },
];

const titles = { panel: 'Panel de control', estudiantes: 'Estudiantes', alertas: 'Alertas', reportes: 'Reportes', ficha: 'Perfil del estudiante' };
const riskStyle = { Alto: 'danger', Medio: 'warning', Bajo: 'success' };
const find = id => document.getElementById(id);
const badge = risk => `<span class="badge badge-${riskStyle[risk]}">${risk}</span>`;
const profile = student => `<a class="student-link" href="#ficha/${student.id}">${student.name}</a>`;
let currentRole;

function table(records) {
  const rows = records.map(student => `<tr><td>${student.id}</td><td>${profile(student)}</td><td>${student.program}</td><td>${student.cycle}</td><td>${student.attendance}%</td><td>${badge(student.risk)}</td></tr>`).join('');
  return `<div class="table-wrap"><table><thead><tr><th>Código</th><th>Estudiante</th><th>Programa</th><th>Ciclo</th><th>Asistencia</th><th>Riesgo</th></tr></thead><tbody>${rows || '<tr><td colspan="6" class="empty">No se encontraron estudiantes.</td></tr>'}</tbody></table></div>`;
}

function counts(records) {
  return ['Bajo', 'Medio', 'Alto'].map(risk => ({ risk, count: records.filter(student => student.risk === risk).length }));
}

function panel(records) {
  const metrics = counts(records);
  const programs = [...new Set(records.map(student => student.program))];
  const bars = programs.map(program => {
    const count = records.filter(student => student.program === program).length;
    return `<div class="program-bar-row"><div class="program-bar-label"><strong>${program}</strong><span>${count}</span></div><div class="program-track"><i style="width:${100 * count / records.length}%"></i></div></div>`;
  }).join('');
  return `<div class="dashboard-heading"><div><span class="eyebrow">VISTA GENERAL · 2026</span><h2>${currentRole.heading}</h2><p>Seguimiento de estudiantes en el periodo 2026-II.</p></div><a class="btn btn-primary" href="#alertas">Ver alertas</a></div>
  <div class="dashboard-kpis">${[{risk:'Estudiantes',count:records.length}, ...metrics].map(item => `<article class="dashboard-kpi"><span>${item.risk === 'Estudiantes' ? item.risk : 'Riesgo ' + item.risk.toLowerCase()}</span><b>${item.count}</b></article>`).join('')}</div>
  <div class="demo-dashboard-grid">
    <section class="panel"><div class="panel-head"><div><h3>Estudiantes por programa</h3><p>Distribución de los registros visibles</p></div></div><div class="program-bars">${bars}</div></section>
    <section class="panel"><div class="panel-head"><div><h3>Niveles de riesgo</h3><p>Estudiantes por nivel de seguimiento</p></div></div><ul class="demo-risk-list">${metrics.map(item => `<li>${badge(item.risk)}<strong>${item.count}</strong></li>`).join('')}</ul></section>
  </div>
  <section class="panel demo-chart"><div class="panel-head"><div><h3>Alertas prioritarias</h3><p>Estudiantes con nivel de riesgo alto</p></div><a href="#alertas">Ver alertas →</a></div>${table(records.filter(student => student.risk === 'Alto'))}</section>`;
}

function roster(records) {
  find('view').innerHTML = `<section class="panel"><div class="panel-head"><h2>Listado de estudiantes</h2></div><div class="filter-bar"><label>Buscar estudiante <input class="demo-search" id="search" type="search" placeholder="Nombre o código"></label><label>Nivel de riesgo <select id="risk"><option value="">Todos</option><option>Alto</option><option>Medio</option><option>Bajo</option></select></label></div><div id="results"></div></section>`;
  const update = () => {
    const query = find('search').value.trim().toLowerCase();
    const risk = find('risk').value;
    find('results').innerHTML = table(records.filter(student => (!risk || student.risk === risk) && `${student.name} ${student.id}`.toLowerCase().includes(query)));
  };
  find('search').addEventListener('input', update);
  find('risk').addEventListener('change', update);
  update();
}

function report(records) {
  const totals = counts(records);
  return `<section class="panel demo-report"><div class="panel-head"><div><h2>Reporte de seguimiento estudiantil</h2><p>IESTP Señor de Chocán · Periodo 2026-II</p></div><div class="actions"><button id="print" class="btn btn-primary" type="button">Imprimir reporte</button></div></div><h3>Distribución por riesgo</h3><dl><dt>Total de estudiantes</dt><dd>${records.length}</dd>${totals.map(item => `<dt>Riesgo ${item.risk.toLowerCase()}</dt><dd>${item.count}</dd>`).join('')}</dl><h3>Detalle de estudiantes</h3>${table(records)}</section>`;
}

function render() {
  if (!currentRole) return;
  const [route, id] = location.hash.slice(1).split('/');
  const page = Object.hasOwn(titles, route) ? route : 'panel';
  const records = students.filter(currentRole.scope);
  find('title').textContent = titles[page];
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.toggle('active', link.hash === '#' + page);
  });

  if (page === 'estudiantes') {
    roster(records);
  } else if (page === 'alertas') {
    const alerts = records.filter(student => student.risk !== 'Bajo');
    find('view').innerHTML = `<section class="panel"><div class="panel-head"><div><h2>Alertas de seguimiento</h2><p>Estudiantes en prioridad alta o en observación.</p></div></div>${table(alerts)}</section>`;
  } else if (page === 'reportes') {
    find('view').innerHTML = report(records);
    find('print').addEventListener('click', () => window.print());
  } else if (page === 'ficha') {
    const student = records.find(record => record.id === id);
    find('view').innerHTML = student
      ? `<section class="panel demo-report demo-detail"><div class="panel-head"><div><h2>${student.name}</h2><p>${student.id} · ${student.program} · Ciclo ${student.cycle}</p></div>${badge(student.risk)}</div><dl><dt>Asistencia</dt><dd>${student.attendance}%</dd><dt>Periodo</dt><dd>2026-II</dd></dl><h3>Última atención registrada</h3><p>${student.action} · ${student.date}</p><a class="btn btn-secondary" href="#estudiantes">Volver a estudiantes</a></section>`
      : '<section class="panel"><p>El perfil no está disponible para este rol.</p><a href="#estudiantes">Volver a estudiantes</a></section>';
  } else {
    find('view').innerHTML = panel(records);
  }
  find('sidebar').classList.remove('open');
  find('menuBtn').setAttribute('aria-expanded', 'false');
  window.scrollTo(0, 0);
}

find('entry').addEventListener('submit', event => {
  event.preventDefault();
  currentRole = roles[find('role').value];
  find('role-name').textContent = currentRole.name;
  document.body.classList.remove('institutional-login');
  find('welcome').hidden = true;
  find('app').hidden = false;
  location.hash = 'panel';
  render();
});

find('exit').addEventListener('click', event => {
  event.preventDefault();
  currentRole = null;
  history.replaceState(null, '', location.pathname + location.search);
  find('app').hidden = true;
  find('welcome').hidden = false;
  document.body.classList.add('institutional-login');
  find('role').focus();
});

find('menuBtn').addEventListener('click', () => {
  const opened = find('sidebar').classList.toggle('open');
  find('menuBtn').setAttribute('aria-expanded', String(opened));
});
window.addEventListener('hashchange', render);
