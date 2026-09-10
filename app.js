// app.js — 渲染与交互逻辑
const state = {lang:'zh'};

const resume = {
  zh: {
    name: 'Alive QF',
    role: '前端 / 全栈 开发者',
    location: '某城市 · 中国',
    email: 'you@example.com',
    summary: '热衷于构建用户友好的 Web 应用，喜欢开源与持续学习。擅长 JavaScript、React、Node.js。',
    experience: [
      {company:'公司 A',role:'前端工程师',period:'2022 - 至今',desc:'负责核心产品的前端开发与性能优化。'},
      {company:'公司 B',role:'全栈开发',period:'2020 - 2022',desc:'从事系统设计与后端服务搭建。'}
    ],
    projects: [
      {title:'交互式简历',desc:'一个单页交互式简历示例，支持中英切换与导出。',link:'#'},
      {title:'开源工具',desc:'自动化脚手架与开发者工具集合。',link:'#'}
    ],
    skills: ['JavaScript','TypeScript','React','Node.js','HTML','CSS','Git','CI/CD'],
    education: [{school:'示例大学',major:'计算机科学',period:'2016 - 2020'}],
    social: [{name:'GitHub',url:'https://github.com/alive-qf'},{name:'LinkedIn',url:'#'}]
  },
  en: {
    name: 'Alive QF',
    role: 'Frontend / Full-stack Developer',
    location: 'City · Country',
    email: 'you@example.com',
    summary: 'Building delightful web apps. Focused on JavaScript, React and Node.js.',
    experience: [
      {company:'Company A',role:'Frontend Engineer',period:'2022 - Present',desc:'Working on core product frontend and performance.'},
      {company:'Company B',role:'Full-stack Developer',period:'2020 - 2022',desc:'System design and backend services.'}
    ],
    projects:[
      {title:'Interactive Resume',desc:'Single-page interactive resume with language toggle and export.',link:'#'}
    ],
    skills:['JavaScript','TypeScript','React','Node.js','HTML','CSS','Git','CI/CD'],
    education:[{school:'Example University',major:'CS',period:'2016 - 2020'}],
    social:[{name:'GitHub',url:'https://github.com/alive-qf'}]
  }
}

function byId(id){return document.getElementById(id)}

function render(){
  const data = resume[state.lang];
  byId('name').textContent = data.name;
  byId('role').textContent = data.role;
  byId('location').textContent = data.location;
  const emailEl = byId('email'); emailEl.textContent = data.email; emailEl.href = 'mailto:'+data.email;
  byId('summary').textContent = data.summary;
  // Experience
  const exp = byId('experience-list'); exp.innerHTML = '';
  data.experience.forEach(e=>{
    const div = document.createElement('div'); div.className='item';
    div.innerHTML = `<strong>${e.role} · ${e.company}</strong><div class="muted">${e.period}</div><p>${e.desc}</p>`;
    exp.appendChild(div);
  });
  // Projects
  const projects = byId('projects-list'); projects.innerHTML='';
  data.projects.forEach(p=>{
    const d=document.createElement('div'); d.className='project';
    d.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p><p><a href="${p.link}" target="_blank">查看</a></p>`;
    projects.appendChild(d);
  });
  // Skills
  const skills = byId('skills-list'); skills.innerHTML='';
  data.skills.forEach(s=>{const c=document.createElement('div');c.className='chip';c.textContent=s;skills.appendChild(c)});
  // Education
  const ed = byId('education-list'); ed.innerHTML='';
  data.education.forEach(e=>{const d=document.createElement('div');d.innerHTML=`<strong>${e.school}</strong><div class="muted">${e.period} · ${e.major}</div>`;ed.appendChild(d)});
  // Social
  const social = byId('social'); social.innerHTML='';
  data.social.forEach(s=>{const a=document.createElement('a');a.href=s.url;a.textContent=s.name;a.target='_blank';a.style.marginRight='10px';social.appendChild(a)});
  byId('footer-year').textContent = new Date().getFullYear();
}

// Interactions
window.addEventListener('DOMContentLoaded',()=>{
  render();
  // theme
  const themeBtn = byId('toggle-theme');
  themeBtn.addEventListener('click',()=>{
    const cur = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', cur==='dark' ? '':'dark');
  });
  // language
  const langBtn = byId('toggle-lang');
  langBtn.addEventListener('click',()=>{
    state.lang = state.lang === 'zh' ? 'en':'zh';
    langBtn.textContent = state.lang === 'zh' ? 'English':'中文';
    render();
  });
  // download
  byId('download').addEventListener('click',()=>window.print());
  // skill filter
  byId('skill-filter').addEventListener('input',(e)=>{
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.chip').forEach(ch=>{
      ch.style.display = ch.textContent.toLowerCase().includes(q)?'inline-flex':'none';
    })
  });
  // smooth nav
  document.querySelectorAll('.site-nav a').forEach(a=>{
    a.addEventListener('click',(ev)=>{ev.preventDefault();const id=a.getAttribute('href').slice(1);document.getElementById(id).scrollIntoView({behavior:'smooth'})})
  })
});
