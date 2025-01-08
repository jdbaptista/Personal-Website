function getURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

async function loadPost(postName) {
    const mainContent = document.querySelector(".main-content");
    if (mainContent == null) {
        console.log("no main content");
        return;
    }

    try {
        const postResponse = await fetch(`/posts/${postName}.html`);
        if (!postResponse.ok) {
            mainContent.innerHTML = "Could not load post.";
        }
        postText = await postResponse.text();
        mainContent.innerHTML = postText;
    } catch (error) {
        console.log(error);
    }

    hljs.highlightAll();
}

document.addEventListener('DOMContentLoaded', loadPost(getURLParameter('p')));
