document.getElementById('grab-title').addEventListener('click', () => {
    const links = document.getElementById('profLink').value.split(',').map(link => link.trim()).filter(link => link);
    if(links.length>=3){
      links.forEach((url)=>{
        chrome.tabs.create({ url: url });
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { type: 'doScrape'})
        });
      });
    }else{
      alert("Atleast Give 3 Links")
    }
    
  
})
let likeCnt = document.getElementById('likeCnt');
let commentCnt = document.getElementById('cmmntCnt');
let like = 0;
let comment = 0;

likeCnt.addEventListener('input', () => {
  like = parseInt(likeCnt.value) || 0;
  updateButtonState();
});

commentCnt.addEventListener('input', () => {
  comment = parseInt(commentCnt.value) || 0;
  updateButtonState();
});

let doBtn = document.getElementById('doLC');

function updateButtonState() {
  if (like > 0 && comment > 0) {
    doBtn.disabled = false;
    doBtn.style.backgroundColor = "#fff";
    doBtn.innerText = "Generate";
  } else {
    doBtn.disabled = true;
    doBtn.innerText = "Disabled";
    doBtn.style.backgroundColor = "#aaa";
  }
}

doBtn.addEventListener('click', () => {
  let data = {
    like: like,
    comment: comment
  };
  chrome.runtime.sendMessage({ type: 'doLC', data: data });
});

updateButtonState();
