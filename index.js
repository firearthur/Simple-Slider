
const slider = document.querySelector('.slider');
const film = document.querySelector('.film');
const slideLeftBtn = document.querySelector('.slide-left');
const slideRightBtn = document.querySelector('.slide-right');
const width = 100;
const height = 50;

const imgs = [{src: '1', c:'red'},  {src: '2', c:'yellow'}, {src: '3', c:'green'}, {src: '4',c:'purple'},  {src: '5',c:'pink'}, {src: '6',c:'teal'}];

film.style.width = `${imgs.length * width}px`;


const prepend = (parentElement, elementToPrepend) => {
  if(parentElement.children.length) {
    const firstChild = parentElement.children[0];
    parentElement.insertBefore(elementToPrepend, firstChild);
  } else {
    parentElement.append(elementToPrepend);
  }
};

const addImg = (src, c, pre) => {
  const imgEle = document.createElement('div');
  imgEle.innerText = src;
  imgEle.style = `
    width: ${width}px;
    height: ${height}px;
    background: ${c};
    display: inline-block;
  `;
  if(pre){
    prepend(film, imgEle);
  } else {
    film.appendChild(imgEle);
  }
};


imgs.forEach((img)=>{
  addImg(img.src, img.c);
});

const slideLeft = () => {
  // sync data model
  const index = 0;
  const shiftedImg = imgs.shift();
  imgs.push(shiftedImg);
  
  // do the visual slide
  const childToRemove = film.children[index];
  childToRemove.classList.add('transition-e');
  childToRemove.style.width = '0px';
  
  const handler = (e)=>{
    childToRemove.classList.remove('transition-e');
    childToRemove.remove();
    addImg(imgs[imgs.length - 1].src, imgs[imgs.length - 1].c)
    
    document.removeEventListener('transitionend', handler);
  };

  document.addEventListener('transitionend', handler);


};



const slideRight = () => {
  // sync data model
  const index = imgs.length - 1;
  const popped = imgs.pop();
  imgs.unshift(popped);

  // do the visual slide
  const childToRemove = film.children[index];
  const childToEnlarge = film.children[0];
  childToEnlarge.classList.add('transition-e');
  childToEnlarge.style.width = `${width * 2}px`;
  
  const handler = (e)=>{
    childToEnlarge.classList.remove('transition-e');
    childToEnlarge.style.width = `${width}px`;
    childToRemove.remove();
    addImg(imgs[0].src, imgs[0].c, 'prepend');

    document.removeEventListener('transitionend', handler);
  };

  document.addEventListener('transitionend', handler);


};
slideLeftBtn.addEventListener('click', slideLeft);
slideRightBtn.addEventListener('click', slideRight);

