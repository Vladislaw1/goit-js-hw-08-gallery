import galleryImg from './galelery-items/gallery-items.js'

const galleryListEl = document.querySelector('.js-gallery');
const galleryItemEl = document.querySelector('.js-lightbox');
const galleryPreview = document.querySelector('.gallery')
const boxContentEl = document.querySelector('.lightbox__content');
const activeTurget = document.querySelector('.lightbox__image')
const galleryRef = document.querySelector('.gallery__image')
const imageEl = document.querySelector('.gallery__image')
const closeBtnEl= document.querySelector('[data-action=close-lightbox]')


function addPictures({ preview, description,original}) {
    return `
       <li class = 'gallery__item'>
            <a class = 'gallery__link' href = "${original}">
                <img class = 'gallery__image' src ='${preview}'  alt = '${description}' data-source = "${original}" width=320>
            </a>
        </li>
    `
}
const createGallery = galleryImg.map(addPictures).join(' ');
galleryPreview.insertAdjacentHTML('afterbegin', createGallery);


galleryListEl.addEventListener('click', onOpenModalImg);
galleryItemEl.addEventListener('click', onCliseModalImg);
window.addEventListener('keydown', closeESC);

function onOpenModalImg(e) {
    e.preventDefault();
    const targetClass = e.target.classList.contains('gallery__image');
    
    if (!targetClass) {
        return;
    }

    galleryItemEl.classList.add('is-open');
    const huinya = e.target;
    const dich = huinya.dataset.source;
    activeTurget.src = dich;
    activeTurget.alt = huinya.alt;

}

function onCliseModalImg(e) {
    if(galleryItemEl.classList.contains('is-open')){
        galleryItemEl.classList.remove('is-open')
        activeTurget.src = '';
        activeTurget.alt = '';
    }
}

function closeESC(e) {
    if (e.code === 'Escape') {
        galleryItemEl.classList.remove('is-open')
        activeTurget.src = '';
        activeTurget.alt = '';
    }
}