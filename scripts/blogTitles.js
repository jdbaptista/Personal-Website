

async function fetchBlogTitles() {
    const postTitleContainer = document.querySelector(".aside-content");
    if (postTitleContainer == null) {
        console.log("no aside content");
        return;
    }

    try {
        const postInfoResponse = await fetch("/posts/post_info.json");
        if (!postInfoResponse.ok) {
            throw new Error(`Response status: ${postInfoResponse.status}`);
        }

        const postInfo = await postInfoResponse.json();
        if (postInfo.posts.length == 0) {
            postTitleContainer.innerHTML = "No current blog posts.";
        }

        for (const post of postInfo.posts) {
            const postContainerDiv = document.createElement("div");
            postContainerDiv.classList.add("aside-title-container");
            const postDiv = document.createElement("a");
            postDiv.classList.add("aside-title");
            postDiv.href = `/pages/post.html?p=${post.filename}`
            postDiv.innerHTML = post.title;
            postTitleContainer.appendChild(postContainerDiv);
            postContainerDiv.appendChild(postDiv);
        }
    } catch (error) {
        console.log(error);
    }
}


document.addEventListener('DOMContentLoaded', fetchBlogTitles());
