import galleryImg from './galelery-items/gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    windowModal: document.querySelector('.js-lightbox'),
    blockContentModalWindow: document.querySelector('.lightbox__content'),
    originalImgModal: document.querySelector('.lightbox__image'),
    closeBtnModalWindow: document.querySelector('[ data-action="close-lightbox"]'),
    overlayModalWindow: document.querySelector('.lightbox__overlay'),
}

refs.gallery.addEventListener('click', onOpenModalClick);

let currentImgIndexOriginal = null;
//Создание контента блока галереи
function contentGalleryList({preview,description,original},index) {
    return `
    <li class = 'gallery__item'>
    <a class = 'gallery__link' href = ${original}>
    <img class = 'gallery__image' src='${preview}' alt='${description}' data-source='${original}' data-index= '${index}' >
        </a>
        </li>
        `
    }
const arrContentGalleryList = galleryImg.map(contentGalleryList).join(' ');
refs.gallery.insertAdjacentHTML('afterbegin', arrContentGalleryList);

//Открытие модального окна
function onOpenModalClick(e) {
    window.addEventListener('keydown', onCloseModalClickKey);
    refs.closeBtnModalWindow.addEventListener('click', onCloseModalClick);
    refs.overlayModalWindow.addEventListener('click', onCloseModalClickOverlay);
    e.preventDefault();
    console.log(e.target);
    const targetEl = e.target.classList.contains('gallery__image');
    if (!targetEl) {
        return;
    }
    refs.windowModal.classList.add('is-open');
    const activeItem = e.target;
    const activeImg = activeItem.dataset.source;

    refs.originalImgModal.src = activeImg;
    refs.originalImgModal.alt = activeItem.alt;

    currentImgIndexOriginal = +activeItem.dataset.index;

    window.addEventListener('keydown', onCloseModalClickKey);
    refs.closeBtnModalWindow.addEventListener('click', onCloseModalClick);
    refs.overlayModalWindow.addEventListener('click', onCloseModalClickOverlay);
}

//Закрытие модального окна на крестик
function onCloseModalClick() {
    refs.windowModal.classList.remove('is-open');
    refs.originalImgModal.src = '';
    refs.originalImgModal.alt = '';

    refs.closeBtnModalWindow.removeEventListener('click', onCloseModalClick);
    refs.overlayModalWindow.removeEventListener('click', onCloseModalClickOverlay);
    window.removeEventListener('keydown', onCloseModalClickKey);
}
//Закрытие модального окна по клику в Overlay
function onCloseModalClickOverlay(e) {
    onCloseModalClick();
}
//Закрытие модального окна по клику Escape и скрол по клику ArrowLeft and ArrowRight
function onCloseModalClickKey(e) {
    if (e.code === 'Escape') {
        onCloseModalClick();
    }
    if (e.code === 'ArrowRight') {
        (currentImgIndexOriginal + 1 >  galleryImg.length - 1) ? currentImgIndexOriginal = 0 : currentImgIndexOriginal += 1;

        refs.originalImgModal.src = galleryImg[currentImgIndexOriginal].original;
    }
    if (e.code === 'ArrowLeft') {

        (currentImgIndexOriginal === 0) ? currentImgIndexOriginal = galleryImg.length - 1 : currentImgIndexOriginal -= 1;
        
        refs.originalImgModal.src = galleryImg[currentImgIndexOriginal].original; 
    }
}

