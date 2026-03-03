const { ipcRenderer } = require('electron');

async function connectRepo() {
  const statusEl = document.getElementById('status');
  const repoUrl = document.getElementById('repoUrl').value.trim();
  
  if (!repoUrl) {
    statusEl.innerText = '❌ Введи URL!';
    return;
  }
  
  statusEl.innerText = '🔄 Проверяю...';
  
  try {
    const result = await ipcRenderer.invoke('test-repo', repoUrl);
    
    if (result.success) {
      statusEl.innerHTML = `✅ <b>${result.cleanUrl}</b> подключен!`;
      statusEl.style.background = '#d4edda';
    } else {
      statusEl.innerText = `❌ ${result.error}`;
    }
  } catch (error) {
    statusEl.innerText = `❌ ${error.message}`;
  }
}
