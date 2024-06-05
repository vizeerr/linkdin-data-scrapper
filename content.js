

        window.addEventListener('load', function () {
            setTimeout(() => {
            try {
                const nameElement = document.querySelector('#profile-content .scaffold-layout__main .artdeco-card .ph5 h1');
                const locationElement = document.querySelector('#profile-content .scaffold-layout__main .artdeco-card .ph5 div.mt2.relative div.mt2 span.text-body-small');
                const bioElement = document.querySelector('#profile-content .scaffold-layout__main .artdeco-card .ph5 div.mt2.relative div div.text-body-medium');
                const aboutElement = document.querySelector('#profile-content .scaffold-layout__main div.pv3 div.display-flex div div span');
                const followElement = document.querySelector('#profile-content .scaffold-layout__main .artdeco-card .ph5 ul li span.t-bold');
                const connectionElement = document.querySelector('#profile-content .scaffold-layout__main .artdeco-card .ph5 ul .link-without-visited-state span.t-bold');
        
                const name = nameElement ? nameElement.innerText : 'Name not found';
                const location = locationElement ? locationElement.innerText : 'Location not found';
                const bio = bioElement ? bioElement.innerText : 'Bio not found';
                const about = aboutElement ? aboutElement.innerText : 'About not found';
                const followerCount = followElement ? parseInt(followElement.innerText.replace(/\D/g, '')) : 'Follow info not found';
                const connectionCount = connectionElement ? parseInt(connectionElement.innerText.replace(/\D/g, '')) : 'Connection info not found';
        
                const profileData = {
                    name,
                    url: window.location.href,
                    location,
                    about,
                    bio,
                    followerCount,
                    connectionCount
                };
        
                chrome.runtime.sendMessage({ type: "POST_PROFILE", data: profileData }, response => {
                    console.log('Response from server:', response.data);
                    // this.alert(response.data)
                });
        
        
            } catch (error) {
                console.error('An error occurred:', error);
            }
            }, 5000);
        });

window.addEventListener('load', function () {
    chrome.runtime.onMessage.addListener((request) => {
      if (request.type === 'doLC') {
        let data = request.data;
        console.log('Received data:', request.data);
        updateActions(data.like, data.comment);
      }
    });
  });
  
  function updateActions(likeCount, commentCount) {
    
    let likeButton = document.querySelectorAll('button[aria-label="React Like"]');
    let commentButton = document.querySelectorAll('button[aria-label="Comment"]');
  
    if (likeCount > likeButton.length || commentCount > commentButton.length) {
      
      const lastLikeElement = likeButton[likeButton.length - 1] || commentButton[commentButton.length - 1];
      lastLikeElement.scrollIntoView({ behavior: 'auto', block: 'start' });
  
      setTimeout(() => {
        updateActions(likeCount, commentCount);
      }, 1000);
    } else {
      likePosts(likeCount);
      commentPosts(commentCount);
    }
  }
  

  async function likePosts(likeCount) {
    let likeButton = document.querySelectorAll('button[aria-label="React Like"]');
    let likedCount = 0;
  
    for (let ele of likeButton) {
      if (likedCount < likeCount) {
        ele.click();
        console.log("Post liked!", ele);
        likedCount++;
        await sleep(1000);
      }else{
        alert("All Likes Done");
        break;
      }
    }
  }
  


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function commentPosts(commentCount) {
    let cnt = 0;
  
    let mainc = document.querySelectorAll('.scaffold-finite-scroll__content .feed-shared-update-v2');
    for (let post of mainc) {
      if (cnt < commentCount) {
        let btn = post.querySelector('button[aria-label="Comment"]');
        if (btn) {
          btn.click();
  
          await sleep(2000);
  
          let main = post.querySelector('.comments-comment-box .comments-comment-box__form-container .comments-comment-box__form');
          if (main) {
            let commentForm = main.querySelector('.editor-content .ql-editor > p');
            if (commentForm) {
              commentForm.innerHTML = "Nice.";
              await sleep(1000);
              let commentEditor = main.querySelector('.comments-comment-box__submit-button');
              if (commentEditor) {
                commentEditor.click();
                console.log("done form", cnt);
                cnt++;
              }
            }
          }
        }
      }else{
        alert("All Comments Done")
        break;
      }
    }
  }