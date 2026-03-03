ipcMain.handle('test-repo', async (event, repoUrl) => {
  try {
    let cleanUrl;
    
    // 1. Если SSH: git@domain:path → https://domain/path
    if (repoUrl.startsWith('git@')) {
      // Берем всё ПОСЛЕ git@ и меняем : на /
      const afterGitAt = repoUrl.substring(4); // убираем "git@"
      cleanUrl = 'https://' + afterGitAt.replace(':', '/');
    } else {
      cleanUrl = repoUrl;
    }
    
    // 2. Гарантируем .git
    if (!cleanUrl.endsWith('.git')) {
      cleanUrl += '.git';
    }
    
    console.log('Оригинал:', repoUrl);
    console.log('Чистый URL:', cleanUrl);
    
    const testUrl = cleanUrl + '/info/refs';
    const response = await fetch(testUrl, { method: 'HEAD' });
    
    return { 
      success: response.ok, 
      status: response.status,
      cleanUrl: cleanUrl
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
