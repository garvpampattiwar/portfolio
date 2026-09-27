/**
 * GARV ABHAY PAMPATTIWAR - GARV-CLI INTERACTIVE TERMINAL
 * Gives tech recruiters and engineers an engaging direct line to Garv's portfolio data
 */

(function () {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  if (!terminalInput || !terminalOutput) return;

  const COMMANDS = {
    help: `Available commands:
  • <span class="accent-text">whoami</span>    : Overview of Garv's background
  • <span class="accent-text">skills</span>    : Tech stack & engineering proficiencies
  • <span class="accent-text">projects</span>  : Featured systems (Nyayasathi, ML Fraud, AI Interview)
  • <span class="accent-text">exp</span>       : Professional internships (VedaLeo, Code-A-Nova, etc.)
  • <span class="accent-text">edu</span>       : Academic degree & scores
  • <span class="accent-text">cert</span>      : NPTEL IIT Kharagpur certification
  • <span class="accent-text">contact</span>   : Direct email, phone, and profile links
  • <span class="accent-text">theme</span>     : Toggle between dark and light themes
  • <span class="accent-text">clear</span>     : Clear terminal history`,

    whoami: `<span class="accent-text">Garv Abhay Pampattiwar</span>
Computer Science Engineering Student @ Rajiv Gandhi College of Engg (CGPA: 7.14)
Location: Ballarshah, Maharashtra, India
Focus: Python, Full-Stack LMS Architecture, Machine Learning, RAG/LLM Systems, Cloud`,

    skills: `<strong>Core Engineering Stack:</strong>
• <strong>Languages:</strong> Python
• <strong>Web Dev:</strong> HTML5, CSS3, Next.js, FastAPI
• <strong>AI & ML:</strong> Machine Learning Fundamentals, RAG, Groq LLM API, Llama 3 / Gemma 2
• <strong>Databases & Cloud:</strong> PostgreSQL (Supabase), DBMS
• <strong>Core CS:</strong> Problem Solving, OOP, Data Structures, Compiler Design
• <strong>Tools:</strong> Git, GitHub, VS Code, Linux`,

    projects: `<strong>Featured Engineering Highlights:</strong>
1. <strong>Nyayasathi</strong> - AI-Powered Legal Rights & Citizens Assistant Chatbot (LLM, RAG, FastAPI)
2. <strong>Credit Card Fraud Detection</strong> - Machine learning anomaly detector for high-precision fraud identification
3. <strong>AI-Based Interview Analyzer</strong> - Automated candidate performance evaluation & feedback generator
<em>Type 'jump projects' or scroll down to explore live specs!</em>`,

    exp: `<strong>Work Experience:</strong>
1. <strong>Full-Stack LMS Developer Intern @ VedaLeo</strong> (Remote, May–Jul 2026)
   - Architected 3-tier portal (Students, Teachers, Admins) on Next.js, FastAPI & Supabase
   - Integrated Llama 3 / Gemma 2 via Groq API; real-time classroom & interactive whiteboard
2. <strong>Machine Learning Intern @ Code-A-Nova</strong> (Aug–Nov 2026)
3. <strong>Python & ML Intern @ Anishree Technologies LLP</strong>
4. <strong>Designing Tool Intern @ Cluematrix Technologies Pvt. Ltd.</strong>`,

    edu: `<strong>Academic Profile:</strong>
• <strong>B.Tech in CSE</strong>: Rajiv Gandhi College of Engg, Research & Tech (CGPA: 7.14, In Progress)
• <strong>HSC (12th)</strong>: Jai Hind College, Chandrapur (57.17%)
• <strong>SSC (10th)</strong>: Dilasagram Convent High School (83%)`,

    cert: `<strong>Certifications:</strong>
• <strong>Compiler Design</strong> — NPTEL (IIT Kharagpur)
  12-Week Intensive Course | Score: 53%`,

    contact: `<strong>Get in Touch:</strong>
• Email: <a href="mailto:garvpampattiwar@gmail.com" class="accent-text">garvpampattiwar@gmail.com</a>
• Phone: <a href="tel:+918830184843" class="accent-text">+91 88301 84843</a>
• LinkedIn: <a href="https://linkedin.com/in/garv-pampattiwar819643299" target="_blank" rel="noopener" class="accent-text">linkedin.com/in/garv-pampattiwar819643299</a>
• GitHub: <a href="https://github.com/garvpampattiwar" target="_blank" rel="noopener" class="accent-text">github.com/garvpampattiwar</a>`
  };

  // Command history navigation with arrow keys
  const history = [];
  let historyIndex = -1;

  function appendToOutput(cmd, resultHtml) {
    const entry = document.createElement('div');
    entry.className = 'terminal-entry';
    entry.innerHTML = `
      <div class="terminal-line">
        <span class="term-prompt">visitor@garv:~$</span>
        <span class="term-cmd">${escapeHtml(cmd)}</span>
      </div>
      <div class="term-result">${resultHtml}</div>
    `;
    terminalOutput.appendChild(entry);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function handleCommand(rawCmd) {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    history.push(trimmed);
    historyIndex = history.length;

    const lower = trimmed.toLowerCase();

    if (lower === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    if (lower === 'theme') {
      const toggleBtn = document.getElementById('theme-toggle');
      if (toggleBtn) toggleBtn.click();
      appendToOutput(trimmed, `Theme toggled to <strong>${document.documentElement.getAttribute('data-theme') || 'dark'}</strong>.`);
      return;
    }

    if (lower.startsWith('jump ') || lower.startsWith('goto ') || lower.startsWith('cd ')) {
      const target = lower.split(' ')[1];
      const validTargets = ['about', 'skills', 'experience', 'projects', 'education', 'contact'];
      if (validTargets.includes(target)) {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          appendToOutput(trimmed, `Navigating to section: <strong>#${target}</strong>...`);
          return;
        }
      }
    }

    if (COMMANDS[lower]) {
      appendToOutput(trimmed, COMMANDS[lower]);
    } else {
      appendToOutput(trimmed, `Command not recognized: <code>${escapeHtml(trimmed)}</code>. Type <span class="accent-text">help</span> to view all commands.`);
    }
  }

  // Handle Input submission
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = terminalInput.value;
      terminalInput.value = '';
      handleCommand(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        terminalInput.value = '';
      }
    }
  });

  // Handle Quick Command Chips
  document.addEventListener('click', (e) => {
    const chip = e.target.closest('.term-chip');
    if (chip) {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        terminalInput.value = '';
        handleCommand(cmd);
      }
    }
  });
})();
