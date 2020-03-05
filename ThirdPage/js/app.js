'use strict';

class PostsContent {
  constructor(item, content) {
    this.item = item;
    this.content = content;
    this.dataFromServer = [];
    this.dataFromGitHub = [];
  }

  loadDataFromServer() {
    return loadCurrentPost().then(res => this.dataFromServer = res)
  }

  loadDataFromGitHub() {
    return loadContent(this.content).then(res => this.dataFromGitHub = res)
  }
}

// get current post

class CurrentPostsRender extends PostsContent {
  render() {
    let data = this.dataFromServer.map((el) => el.detailedPost);
    const id = localStorage.getItem('access-token');
    let contentCurrentPosts = document.querySelector(this.item);
    const error = `<div class="empty-timeline">
                    <h1>News feed is empty</h1>
                  </div>`;
    if (data.length === 0) {
      contentCurrentPosts = contentCurrentPosts.insertAdjacentHTML('afterbegin', error)
    };

    const layout = data[id].map((post) =>
    `<h2 class="content__heading">${post.postTitle}</h2>
     <div class="post__heading">
      <img class="post__avatar" src=${post.avatar} alt="avatar"/>
      <div>
        <h4 class="post__author">${post.author}</h4>
        <div class="post__info">
          <p class="info-item">${post.postDate}</p>
          <p class="info-item">&#183;</p>
          <p class="info-item">${post.postRead}</p>
          <p class="info-item">&#183;</p>
          <div class="comments-sign"></div>
          <p>${post.commentCount}</p>
          <div class="stars">
            <img src=${post.star1} alt="star"/>
            <img src=${post.star2} alt="star"/>
            <img src=${post.star3} alt="star"/>
            <img src=${post.star4} alt="star"/>
            <img src=${post.star5} alt="star"/>
          </div>
        </div>
      </div>
    </div>
    ${post.media ? post.media : ''}
    ${post.video ? `<video class="post__video" controls="controls" poster="${post.poster}">
    <source src="${post.video}" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
      Элемент video не поддерживается вашим браузером.
    <a href="${post.additionalLink}">Скачайте видео</a>.
    </video>` : ''}
    ${post.image ? `<img class="post__image" src="${post.image}" alt="image"/>` : ''}
    <div class="post__audio--position">
      <audio class="post__audio" src=${post.audio} controls="controls"/></audio>
    </div>
    <p class="post__text">${post.text}</p>
    ${post.note ? `<p class="post__text--note">${post.note}</p>` : ''}
    <div class="post__mark">
      <div class="post__like"></div>
      <p class="post__likes-amount">${post.likesCount} Likes</p>
      <div class="post__links">
        <a class="post__link" href="#"><img src="./img/socialIcon1.svg" alt="icon"></a>
        <a class="post__link" href="#"><img src="./img/socialIcon3.svg" alt="icon"></a>
        <a class="post__link" href="#"><img src="./img/socialIcon2.svg" alt="icon"></a>
      </div>
    </div>`
    );

    layout.forEach((item) => {
      contentCurrentPosts.insertAdjacentHTML('afterbegin', item);
    });
  }
};

const newPosts = new CurrentPostsRender('.post');

newPosts.loadDataFromServer().then(() => newPosts.render());

// get comments

class CommentRender extends PostsContent{
  render() {
    const contentComments = document.querySelector(this.item);
    const layout = this.dataFromGitHub.map((comment) =>
    `<section class="post__comment">
      <img class="avatar" src=${comment.commentAvatar} alt="avatar"/>
      <div class="comment__content">
        <div class="comment__header">
          <h4 class="post__author">${comment.commentAuthor}</h4>
          <div class="stars">
            <img src=${comment.commentStar1} alt="star"/>
            <img src=${comment.commentStar2} alt="star"/>
            <img src=${comment.commentStar3} alt="star"/>
            <img src=${comment.commentStar4} alt="star"/>
            <img src=${comment.commentStar5} alt="star"/>
          </div>
          <div class="post__post-time">
            <img class="post-time__icon" src="./img/timeIcon.svg" alt="time"/>
            <p class="post-time__time">${comment.commentTime}</p>
          </div>
        </div>
        <p>${comment.commentText}</p>
        ${comment.btn ? `<button class="post__toggle">${comment.btnText}</button>` : ''}
      </div>
    </section>`
    );

    layout.forEach((item) => {
      contentComments.insertAdjacentHTML('beforeend', item);
    });
  }
}

const newComments = new CommentRender('.post__review', 'comments');

newComments.loadDataFromGitHub().then(() => newComments.render());

// get latest posts

class LatestPostsRender extends PostsContent{
  render() {
    const contentLatestPosts = document.querySelector(this.item);
    const layout = this.dataFromGitHub.map((el) =>
    `<section class="aside__post">
      <img src=${el.image} alt="post"/>
      <div class="aside__post-info">
        <h5 class="aside__post-title">${el.title}</h5>
        <div class="aside__info">
          <p class="aside__info-item">${el.postDate}</p>
          <p class="aside__info-item">&#183;</p>
          <p class="aside__info-item">${el.postRead}</p>
          <p class="aside__info-item">&#183;</p>
          <div class="aside__comments-sign"></div>
          <p>${el.commentCount}</p>
        </div>
      </div>
    </section>`
    );

    layout.forEach((item) => {
      contentLatestPosts.insertAdjacentHTML('beforeend', item);
    });
  }
}

const newLatestPosts = new LatestPostsRender('.aside__posts', 'latestPosts');

newLatestPosts.loadDataFromGitHub().then(() => newLatestPosts.render());

// get aside tags

class AsideTagsRender extends PostsContent{
  render() {
    const contentAsideTags = document.querySelector(this.item);
    const layout = this.dataFromGitHub.map((el) => `<button class="aside__tag">${el.tag}</button>`);
    layout.forEach((item) => {
      contentAsideTags.insertAdjacentHTML('beforeend', item);
    });
  }
}

const newAsideTags = new AsideTagsRender('.aside__list-tags', 'asideTags');

newAsideTags.loadDataFromGitHub().then(() => newAsideTags.render());

