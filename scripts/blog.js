
async function fetchPosts() {
    const postContainer = document.querySelector("#post-container");
    if (postContainer == null) {
        console.log("no post container");
        return;
    }

    try {
        const postInfoResponse = await fetch("/posts/post_info.json");
        if (!postInfoResponse.ok) {
            throw new Error(`Response status: ${postInfoResponse.status}`);
        }

        const postInfo = await postInfoResponse.json();
        for (const post of postInfo.posts) {
            const postDiv = document.createElement("a");
            postDiv.classList.add("post");
            postDiv.href = `/pages/post.html?p=${post.filename}`
            const postTitleContainer = document.createElement("div");
            postTitleContainer.classList.add("post-title-container");
            const postTitleDiv = document.createElement("div");
            postTitleDiv.classList.add("post-title");
            postTitleDiv.innerText = `${post.title}`;
            const postDescDiv = document.createElement("div");
            postDescDiv.classList.add("post-desc");
            postDescDiv.innerText = `${post.description}`
            const postDateDiv = document.createElement("div");
            postDateDiv.classList.add("post-date");
            postDateDiv.innerText = `${post.creation_month}/${post.creation_day}/${post.creation_year}`;
            postTitleContainer.appendChild(postTitleDiv)
            postDiv.appendChild(postTitleContainer);
            postDiv.appendChild(postDescDiv);
            postDiv.appendChild(postDateDiv);
            postContainer.appendChild(postDiv);
        }
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', fetchPosts());