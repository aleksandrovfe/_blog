'use strict';

loadContentFromServer()
  .then(posts => {
    const form = document.querySelector('.form__content');
    const inputTitle = document.querySelector('#title');

    inputTitle.addEventListener('focusin', () => {
      inputTitle.style.background = 'transparent'
    });

    inputTitle.addEventListener('blur', (event) => {
      const postBtn = document.querySelector('.form__post');
      postBtn.disabled = true;

      const checkTitlelengthAndRegister = (value) => {
        if (value.length > 1 && value.length < 6) {
          return false;
        }

        if (value[0].toUpperCase() !== value[0]) {
          return false;
        }

        return true;
      };

      const checkLastElement = (value) => {
        if (/[!\?\:\-\.\\ ]/.test(value)) {
          return true;
        }

        return false;
      };

      const checkFirstSimbol = (value) => {
        if (value[0].toUpperCase() === value[0].toLowerCase()) {
          return false;
        }

        return true;
      };

      const validateTitle = (value) => {
        if (value.length === 0) {
          return inputTitle.style.background = 'white', postBtn.disabled = false;
        }

        if (typeof value !== 'string') {
          return 'incorect input data';
        }

        if (!checkTitlelengthAndRegister(value) || !checkFirstSimbol(value) || !checkLastElement(value)) {
          return inputTitle.style.background = 'lightsalmon';
        }

        return inputTitle.style.background = 'transparent', postBtn.disabled = false;
      };

      validateTitle(event.target.value);
    })

    form.addEventListener('submit', (event) => {
      const modal = document.querySelector('.form');
      const sex = document.getElementsByName('sex');
      const audio = document.getElementsByName('addAudio');
      const type = document.getElementsByName('postType');
      const media = document.getElementsByName('media');
      const modalSuccess = document.querySelector('.form__success');
      let avatar = '';
      let selector = '';
      let typeMedia = '';
      modal.style.display = "none";

      event.preventDefault();

      const modifyText = (text) => {
        let textArr = text.split('');
        let newText = textArr.map((el) => {
          if (el === '~') {
            el = '</br>'
          }
          return el
        })
        let resultText = newText.join('');

        return resultText
      }

      sex.forEach((el) => {
        if (el.checked) {
          avatar = el.value;
        }
      });

      const chooseAvatart = (value) => {
        if (value === 'male') {
          return './img/maleAva.jpg';
        }

        if (value === 'female') {
          return './img/femaleAva.jpg';
        }

        if (value === 'other') {
          return'./img/otherAvs.jpg';
        }
      }

      const isAudio = (audio) => {
        let result;
        audio.forEach((el) => {
          if (el.checked) {
            result = './audio/audio2.mp3';
          } else {
            result = '';
          }
        });

        return result
      };

      type.forEach((el) => {
        if (el.checked) {
          selector = el.value;
        }
      });

      media.forEach((el) => {
        if (el.checked) {
          typeMedia = el.value;
        }
      });

      const chooseMedia = (typeMedia) => {
        let result = '';
        if (typeMedia === 'video') {
          result = `<video class="post__video" controls="controls" poster="./img/bgvideo.png">
          <source src="./video/video.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
            Элемент video не поддерживается вашим браузером.
          <a href="https://www.pexels.com/ru-ru/video/3018533/">Скачайте видео</a>.
          </video>`
        }

        if (typeMedia === 'image') {
          result = `<img class="post__image" src="https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="image"/>`;
        }

        if (typeMedia === 'no') {
          result = '';
        }

        return result;
      };

      const dataObj = {
        id: posts.length,
        additionalLink: '',
        poster: '',
        media: chooseMedia(typeMedia),
        video: '',
        avatar: chooseAvatart(avatar),
        author: event.target.author.value,
        postDate: '11 oct, 2019',
        postRead: '7 min read',
        commentCount: 19,
        star1: './img/activeStar.svg',
        star2: './img/activeStar.svg',
        star3: './img/halfActiveStar.svg',
        star4: './img/notActiveStar.svg',
        star5: './img/notActiveStar.svg',
        postTitle: event.target.title.value,
        postAudio: isAudio(audio),
        postText: modifyText(event.target.text.value),
        selector: selector,
        image: '',
        detailedPost: [
          {
            postTitle: event.target.title.value,
            poster: '',
            additionalLink: '',
            video: '',
            image: '',
            media: chooseMedia(typeMedia),
            avatar: chooseAvatart(avatar),
            author: event.target.author.value,
            postDate: '02 oct, 2019',
            postRead: '12 min read',
            commentCount: 4,
            star1: './img/activeStar.svg',
            star2: './img/notActiveStar.svg',
            star3: './img/notActiveStar.svg',
            star4: './img/notActiveStar.svg',
            star5: './img/notActiveStar.svg',
            audio: isAudio(audio),
            text: modifyText(event.target.text.value),
            note: event.target.quote.value,
            likesCount: 75
          }
        ]
      }

      const addDataOnServer = async(dataObj) => {
        const response = await fetch('http://localhost:3000/api/articles', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataObj),
      });

        return response.json();
      };

      addDataOnServer(dataObj);

      modalSuccess.style.display = 'flex';

      setTimeout(() => {
        modalSuccess.style.display = 'none';
      }, 1500);
    })
  });

const modal = document.querySelector('.form');
const btnOpenModal = document.querySelector('.list-links__add-post');
const btnCloseModal = document.querySelector('.form__close');
const modalSuccess = document.querySelector('.form__success');


btnOpenModal.addEventListener('click', () => {
  modal.style.display = "flex";
});

btnCloseModal.addEventListener('click', () => {
  modal.style.display = "none";
});

modalSuccess.addEventListener('click', () => {
  modalSuccess.style.display = 'none';
})
