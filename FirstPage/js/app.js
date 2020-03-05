'use strict';

// get squares

loadContent('asideContent')
  .then(asideContent => {
    const layout = asideContent.map((square) =>
     `<div class="content__gradient-square content__gradient-square--${square.color}">
        <div class="gradient-border-radius-${square.color}"></div>
        <div class="icon${square.icon}"></div>
        <h3 class="icon__sign">${square.text}</h3>
      </div>`
    );

    const contentAsideElement = document.querySelector('.content__aside');
    layout.forEach((item) => {
      contentAsideElement.insertAdjacentHTML('beforeend', item);
    });
  });

// get video

loadContent('video')
  .then(video => {
    const layout = video.map((video) =>
    `<video class="video-background" controls="controls" poster="${video.poster}">
        <source src="${video.src}" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
        Элемент video не поддерживается вашим браузером.
        <a href="${video.additionalLink}">Скачайте видео</a>
      </video>`
    );

    const videoElement = document.querySelector('.content__video');
    layout.forEach((item) => {
      videoElement.insertAdjacentHTML('beforeend', item);
    });
  });

// get posts

loadContent('postsList')
  .then(postsList => {
    const layout = postsList.map((post) =>
    `<section class="post">
      <img class="post__image2" src="${post.postImage}" alt="image">
      <a href="#" class="post__title">${post.postTitle}</a>
      <p class="post__text">${post.postText}</p>
      <div class="post__info">
        <p class="info-item">${post.postDate}</p>
        <p class="info-item">${'&#183;'}</p>
        <p class="info-item">${post.postRead}</p>
        <p class="info-item">${'&#183;'}</p>
        <div class="comments-sign"></div>
        <p>${post.commentCount}</p>
      </div>
    </section>`
    );

    const postsListElement = document.querySelector('.content__posts-list');
    layout.forEach((item) => {
      postsListElement.insertAdjacentHTML('beforeend', item);
    });
  });

// slider and portfolio in the separate file

// slider and testimonials in the separate file

