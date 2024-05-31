
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "POST_PROFILE") {
        fetch('http://127.0.0.1:8080/addProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request.data)
        }).then(response => response.json())
          .then(data => sendResponse(data))
          .catch(error => sendResponse({ error: error.message }));

        return true; 
    }
});
