'use strict';

// load function

const loadContent = async() => {
  const url = `http://localhost:3000/api/articles`;
  const response = await fetch(url);
  const content = await response.json();
  return content;
};

