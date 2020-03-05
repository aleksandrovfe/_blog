'use strict';

(function( $ ){

  $.fn.myPlugin = function() {

    this.on("click", event => {
      if (event.target.matches('.post__btn-no-img-delete') || event.target.matches('.post__btn-delete')) {
        this.prepend(`
          <div class="post__delete-notification">
            <div class="post__delete-notification-message">
              Are you sure you want to delete the post?
              <div>
                <button value="${event.target.value}" class="post__delete-notification-agree">Ok</button>
                <button class="post__delete-notification-disagree">Cancel</button>
              </div>
            </div>
          </div>`);
      };
    });

    this.on("click", event => {
      if (event.target.matches('.post__delete-notification-disagree') || event.target.matches('.post__delete-notification')) {
        $(".post__delete-notification").remove()
      }

      if (event.target.matches('.post__delete-notification-agree')) {
        $(".post__delete-notification").remove();

        const removePost = async(id) => {
          const response = await fetch(`http://localhost:3000/api/articles/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          return response.json();
        }

        removePost(event.target.value).then(() => {
          document.querySelector(`.post__content${event.target.value}`).remove();
        })

        this.prepend(`
        <div class="post__delete-notification">
          <div class="post__delete-notification-message-success">
            Post was deleted successfully
          </div>
        </div>`);

        setTimeout(() => {
          $(".post__delete-notification").remove()
        }, 1500);
      }
    });

    $("body").on('keyup', event => {
      if (event.keyCode === 27) {
        $(".post__delete-notification").remove()
      }
    })
  };
})( jQuery );

$('.post').myPlugin();

(function( $ ){

  $.fn.mySecondPlugin = function() {

    this.on("click", () => {
      this.prepend(`
        <div class="post__delete-notification">
          <div class="post__delete-notification-message">
            Are you sure you want to delete all posts?
            <div>
              <button class="post__delete-notification-agree">Ok</button>
              <button class="post__delete-notification-disagree">Cancel</button>
            </div>
          </div>
        </div>`);
    });

    this.on("click", event => {
      if (event.target.matches('.post__delete-notification-disagree') || event.target.matches('.post__delete-notification')) {
        $(".post__delete-notification").remove()
      }

      if (event.target.matches('.post__delete-notification-agree')) {
        $(".post__delete-notification").remove();

        const removeAllPosts = async() => {
          const response = await fetch(`http://localhost:3000/api/articles`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          return response.json();
        }

        removeAllPosts(event.target.value)
          .then(() => {
            document.querySelectorAll('.post__content').forEach((proj) => {
              proj.remove();
            })
            window.location.reload()
          })

        this.prepend(`
        <div class="post__delete-notification">
          <div class="post__delete-notification-message-success">
            Posts was deleted successfully
          </div>
        </div>`);

        setTimeout(() => {
          $(".post__delete-notification").remove()
        }, 1500);
      }
    });

    $("body").on('keyup', event => {
      if (event.keyCode === 27) {
        $(".post__delete-notification").remove()
      }
    })
  };
})( jQuery );

$('#deleteAllPosts').mySecondPlugin();
