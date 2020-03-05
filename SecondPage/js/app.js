'use strict';

// get posts

class PostsRender {
  constructor(item) {
    this.item = item;
    this.data = [];
    this.search = '';
  }

  async loadData () {
    const res = await loadContent();
    return this.data = res;
  }

  searchByAuthor() {
    const searchField = document.querySelector('#searchByAuthor');
    searchField.addEventListener('input', (event) => {
      const emptyField = `<div class="empty-timeline">
                            <h1>No matches</h1>
                          </div>`;
      let filteredData = this.data;
      let contentPosts = document.querySelector('.post');
      this.search = event.target.value.slice(0);
      localStorage.setItem('author', event.target.value);

      filteredData = this.data.filter(el => (el.author.toLowerCase()
      .match(this.search.toLowerCase())));

      if (filteredData.length === 0) {
        contentPosts = contentPosts.innerHTML = emptyField;
      } else {
        document.querySelectorAll('.empty-timeline').forEach((proj) => {
          proj.parentElement.removeChild(proj);
        })
      }

      this.rerenderOperation();
      this.renderItems(filteredData);
    })
  }

  searchByTitle() {
    const searchField = document.querySelector('#searchByTitle');
    searchField.addEventListener('input', (event) => {
      const emptyField = `<div class="empty-timeline">
                            <h1>No matches</h1>
                          </div>`;
      let filteredData = this.data;
      let contentPosts = document.querySelector('.post');
      this.search = event.target.value.slice(0);
      localStorage.setItem('title', event.target.value);

      filteredData = this.data.filter(el => (el.postTitle.toLowerCase()
      .match(this.search.toLowerCase())));

      if (filteredData.length === 0) {
        contentPosts = contentPosts.innerHTML = emptyField;
      } else {
        document.querySelectorAll('.empty-timeline').forEach((proj) => {
          proj.parentElement.removeChild(proj);
        })
      };



      this.rerenderOperation();
      this.renderItems(filteredData);
    })
  }

  rerenderOperation() {
    document.querySelectorAll('.post__content').forEach((proj) => {
      proj.parentElement.removeChild(proj);
    })
  };

  editPost() {
    let contentPosts = document.querySelector(this.item);
    contentPosts.addEventListener('click', (event) => {
      if (event.target.matches('.post__btn-update') || event.target.matches('.post__btn-no-img-update')) {
        let findArticleById = this.data.find(el => el.id == event.target.value)
        let findPostContent = findArticleById.detailedPost.map(el => el.text)
        $(contentPosts).prepend(`
          <div class="post__update post__update${event.target.value}">
            <div class="post__update-message">
              <textarea class="post__update-content">${findPostContent}</textarea>
              <div>
                <button value="${event.target.value}" class="post__update-agree">Edit</button>
                <button class="post__update-disagree">Cancel</button>
              </div>
            </div>
          </div>
        `)

        $(contentPosts).on('click', (event) => {
          if (event.target.matches('.post__update-disagree')) {
            $('.post__update').remove();
          };
        })

        $(contentPosts).on('click', (event) => {
          if (event.target.matches('.post__update-agree')) {
            let postsUpdate = document.querySelector('.post__update-content').value
            const updatePost = async(id) => {
              await fetch(`http://localhost:3000/api/articles/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'charset': 'utf-8' },
                body: JSON.stringify({postsUpdate}),
              }).then(async(res) => await res.json())
            }

            updatePost(event.target.value)
              .then(() => {
                window.location.reload()
              })

            $('.post__update').remove();
          };
        })
      };
    })
  }

  renderItems(items) {
    const error = `<div class="empty-timeline">
                    <h1>News feed is empty</h1>
                  </div>`;
    let contentPosts = document.querySelector(this.item);
    let searchFieldByAuthor = document.getElementById('searchByAuthor');
    let searchFieldByTitle = document.getElementById('searchByTitle');
    searchFieldByAuthor.value = localStorage.getItem('author');
    searchFieldByTitle.value = localStorage.getItem('title');

    if (items.length < 1) {
      contentPosts = contentPosts.insertAdjacentHTML('beforeend', error)
    };

    const layout = items.map((post) =>
      `<div class="post__content post__content${post.id}">
        ${post.media ? post.media : ''}
        ${post.video ? `<video class="post__video" controls="controls" poster="${post.poster}">
        <source src="${post.video}" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
          Элемент video не поддерживается вашим браузером.
        <a href="${post.additionalLink}">Скачайте видео</a>.
        </video>` : ''}
        ${post.image ? `<img class="post__image" src="${post.image}" alt="image"/>` : ''}
        <section class="post__description">
          <div class="post__heading">
            <img class="post__avatar" src="${post.avatar}" alt="avatar">
            <div>
              <h4 class="post__author">${post.author.length > 30 ? post.author.slice(0, 30) + '...' : post.author}</h4>
              <div class="post__info">
                <p class="info-item">${post.postDate}</p>
                <p class="info-item">&#183;</p>
                <p class="info-item">${post.postRead}</p>
                <p class="info-item">&#183;</p>
                <div class="comments-sign"></div>
                <p>${post.commentCount}</p>
                <div class="stars">
                  <img src="${post.star2}" alt="star">
                  <img src="${post.star3}" alt="star">
                  <img src="${post.star4}" alt="star">
                  <img src="${post.star5}" alt="star">
                </div>
              </div>
            </div>
          </div>
          <h3 class="post__title">${post.postTitle}</h3>
          ${post.postAudio
            ? `<audio class="${post.postAudio ? "post__audio" : null}" src="${post.postAudio}" controls="controls"></audio>`
            : ''}
          <p class="post__text">${post.postText.length > 100 ? post.postText.slice(0, 100) + '...' : post.postText}</p>
          <div class="post__selector post__selector--${post.selector}"></div>
        </section>
        <button class="${post.media || post.video || post.image ? 'post__btn' : 'post__btn-no-img'}" value=${post.id}>Read more</button>
        <button id="delete" class="${post.media || post.video || post.image ? 'post__btn-delete' : 'post__btn-no-img-delete'}" value=${post.id}>Delete post</button>
        <button id="update" class="${post.media || post.video || post.image ? 'post__btn-update' : 'post__btn-no-img-update'}" value=${post.id}>Edit post</button>
      </div>`
    );

    layout.forEach((item) => {
      contentPosts.insertAdjacentHTML('beforeend', item);
    });
  }

  render() {
    this.searchByAuthor();
    this.searchByTitle();
    this.editPost()
    this.renderItems(this.data);
  }
};

const newPosts = new PostsRender('.post');

newPosts.loadData().then(() => newPosts.render());

//go to post

const postBtn = document.querySelector('.post');
postBtn.addEventListener('click', (event) => {
  if (event.target.matches('.post__btn') || event.target.matches('.post__btn-no-img')) {
    localStorage.setItem('access-token', event.target.value);
    window.location.href = '../ThirdPage/index3.html';
  };
})

