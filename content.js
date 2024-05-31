
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
            this.alert(response.data)
        });


    } catch (error) {
        console.error('An error occurred:', error);
    }
    }, 5000);
});
