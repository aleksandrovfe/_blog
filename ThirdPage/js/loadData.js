'use strict';

// load function

const loadContent = async(data) => {
  const url = `https://raw.githubusercontent.com/aleksandrovfe/api/development/data/${data}.json`;
  const response = await fetch(url);
  const content = await response.json();
  return content;
};

const loadCurrentPost = async() => {
  const url = `http://localhost:3000/api/articles`;
  const response = await fetch(url);
  const content = await response.json();
  return content;
};
