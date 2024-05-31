document.getElementById('grab-title').addEventListener('click', () => {
    const links = document.getElementById('profLink').value.split(',').map(link => link.trim()).filter(link => link);
    links.forEach((url)=>{
      chrome.tabs.create({ url: url });
    });
  
})