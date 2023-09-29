import { blogPosts } from "./data.js";

const postsContainer = document.getElementById('posts-container')

//pratyushkr9420
document.addEventListener("click", function(e){
    if(e.target.dataset.like){
        handelLikeClick(e.target.dataset.like)
    }
    else if(e.target.dataset.replyInput){
        handelCommentClick(e.target.dataset.replyInput)
    }
    else if(e.target.dataset.reply){
        handelReplyClick(e.target.dataset.reply)
    }

})

function handelReplyClick(postId){// this is what toogles the comment icon when clicked 
    document.getElementById(`replies-${postId}`).classList.toggle('hidden');
}

function handelCommentClick(postId){ // handeling what happens when comment is created and posted 
    const targetCommentObj = blogPosts.filter(function(post){
        return post.id == postId
    })[0]
    
    const commmentArea = document.getElementById(`comment-section-${postId}`)

    if(commmentArea.value){
        targetCommentObj.replies.unshift({
            name: `@User`,
            userPic: `B1.jpeg`,
            commentText: commmentArea.value
        })
        renderBlogPostsData()
        commmentArea.value = ''
    }


}

function handelLikeClick(postId){
    const targetLikeObj = blogPosts.filter(function(post){
        return post.id == postId
    })[0]

    if(targetLikeObj.isLiked){
        targetLikeObj.likes--
    }
    else{
        targetLikeObj.likes++
    }
    targetLikeObj.isLiked = !targetLikeObj.isLiked
    renderBlogPostsData()

}

function getBlogPostsData(){
    let posts = ''

    blogPosts.forEach(function(post){

        let likeIconClass = ''

        if(post.isLiked){
            likeIconClass = 'liked'
        }
        

        let commentsHtml  = ''

        if(post.replies.length > 0){
            post.replies.forEach(function(reply){
                commentsHtml += `<div id="comments" class="reply-container">
                <img src=${reply.userPic} id="reply-pic">
                <p>${reply.name}</p>
                <p>${reply.commentText}</p>
                </div>`
            })
        }

        let postTags = '' 

        post.tags.forEach(function(tag){
            postTags += `<span>${tag}</span>`

        });

        posts += `<div id="post-item">
        <img src="${post.image}" id="post-image">
        <h3>${post.name}</h3>
        <h4>${post.date}</h4>
        <p>${post.post}</p>
        ${postTags}
        <div id="icons-container">
        <i class="fa-solid fa-heart ${likeIconClass}" id="icons" data-like="${post.id}"></i>${post.likes}
        <i class="fa-solid fa-comment" id="icons" data-reply="${post.id}"></i>
        ${post.replies.length}
        </div>
        </div>
       
        <div id="new-container" class="new-container">
        <div class="hide" id="replies-${post.id}">
            <div>
                <img src="B1.jpeg" class="profile-pic">
            </div>
            <textarea placeholder="Comment" id="comment-section-${post.id}"></textarea>
            <button id="comment-btn" data-reply-input=${post.id}>Comment</button>
            ${commentsHtml}
        </div>
        </div>`

    });

    return posts
}

function renderBlogPostsData(blogPosts){
    postsContainer.innerHTML = getBlogPostsData(blogPosts)
}
renderBlogPostsData(blogPosts)