// -------------------------| DOM |-------------------------
let wHeight = window.innerHeight;
let wWidth = window.innerWidth;
let navbar = document.querySelector('nav');
let navbarLogo = document.querySelector('.nav-logo');
let headerLogo = document.querySelector('.header-logo');
let seactionTesti = document.querySelector('section#testi');
let seactionProduk = document.querySelector('section#produk');
let seactionGaleri = document.querySelector('section#galeri');
let messageImg = document.querySelectorAll('.testimoni-wraper img');
let slider = document.querySelector('.slider-wraper');
let btnSlider = document.querySelectorAll('.slider-wraper .btn');
let tooltip = document.querySelector('section.produk .tooltip');
let instafeed = document.querySelectorAll('.galeri-feed');
let temporaryImg = document.querySelector('.temporary-img');

// --------------------
// Section Loading
// --------------------
window.addEventListener('load',function(){
    setTimeout(() => {
        document.querySelector('section.loading').style.display = 'none';
    }, 500);
    setTimeout(() => {
        document.querySelector('.logo-wraper .five-start').classList.add('rise');
        document.querySelector('.logo-wraper .start-seller').classList.add('rise');
        document.body.style.overflow = 'auto';
    }, 500);
})

// -------------------------
// Set All Section's Heigth
// -------------------------
document.querySelectorAll('section').forEach((e)=>{
    e.style.minHeight = wHeight+'px';
});

// -----------------------
// Smooth Scroll
// -----------------------
document.querySelectorAll('a.link-scroll').forEach(trigger => {
    trigger.onclick = function(e) {
        e.preventDefault();
        let hash = this.getAttribute('href');
        let target = document.querySelector(hash);
        let headerOffset = 0;
        let elementPosition = target.offsetTop;
        let offsetPosition = elementPosition - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            // behavior: "smooth"
        });
    };
});

function landingFocus(){
    
    // ------------------------
    // Nav Shadow, Nav logo
    // ------------------------
    (window.scrollY >= 10) ? navbar.classList.add('shadowOn') : navbar.classList.remove('shadowOn');
    (window.scrollY >= 10) ? navbarLogo.classList.add('rise') : navbarLogo.classList.remove('rise');
    
    // -----------------------
    // Set aHref's Focus Mode
    // -----------------------
    (window.scrollY <= seactionTesti.offsetTop-210) ? document.querySelector('a#hrefHome').classList.add('focus') : document.querySelector('a#hrefHome').classList.remove('focus');
    (window.scrollY >= seactionTesti.offsetTop-200 && window.scrollY <= seactionProduk.offsetTop-210) ? document.querySelector('a#hrefTesti').classList.add('focus')  : document.querySelector('a#hrefTesti').classList.remove('focus') ;
    (window.scrollY >= seactionProduk.offsetTop-200 && window.scrollY <= seactionGaleri.offsetTop-210) ? document.querySelector('a#hrefProduk').classList.add('focus') : document.querySelector('a#hrefProduk').classList.remove('focus');
    (window.scrollY >= seactionGaleri.offsetTop-200) ? document.querySelector('a#hrefGaleri').classList.add('focus') : document.querySelector('a#hrefGaleri').classList.remove('focus');

    // --------------------------------------
    // Landing Effect message image at testi 
    // --------------------------------------
    (window.scrollY >= seactionTesti.offsetTop-400) ? messageImg.forEach((e,i) => {
        setTimeout(() => {
            e.classList.add('rise') 
        }, 200*i);
    }) : '';

    // -------------------------------
    // Landing Effect slider at testi 
    // -------------------------------
    (window.scrollY >= seactionTesti.offsetTop-400) ? slider.classList.add('rise') : '' ;
    
    // -------------------------------
    // Landing Effect card at produk 
    // -------------------------------
    if(document.querySelectorAll('.card')){
        if(window.scrollY >= 10) {
            document.querySelectorAll('.card').forEach((e,i)=>{
                setTimeout(() => {
                    e.classList.add('rise');
                }, 200*i);
            }); 
            temporaryImg2();
        }
    }

    // --------------------------------
    // Landing Effect instagram's feed
    // --------------------------------
    (window.scrollY >= seactionGaleri.offsetTop-400) ? instafeed.forEach(e => e.classList.add('rise')) : '' ;

}
landingFocus();

window.addEventListener('scroll',function(e){
    
    landingFocus();

    // ------------------------
    // Rise On Contac's Button
    // ------------------------
    (window.scrollY >= 10) ? document.querySelector('.kontak button').classList.add('rise') : document.querySelector('.kontak button').classList.remove('rise') || document.querySelector('.kontak button').classList.remove('focus');

    // -----------------------
    // Removing Class of rise 
    // -----------------------
    (window.scrollY >= 10) ? document.querySelector('nav ul') : document.querySelector('nav ul').classList.remove('down');
    (window.scrollY >= 10) ? document.querySelector('.bg-kontak') : document.querySelector('.bg-kontak').classList.remove('rise');
    (window.scrollY >= 10) ? document.querySelectorAll('.kontak a') : document.querySelectorAll('.kontak a').forEach(e => e.classList.remove('rise'));
})

// -----------------------
// Button Slider 
// -----------------------
let i = 1;
btnSlider.forEach(e => e.addEventListener('click',function(){
    if(e.classList.contains('laquo')){
        (i == 1) ? i = 11 : '';
        i--;
        document.querySelector('.slider-wraper img').setAttribute('src','img/testi'+i+'.jpeg');
        document.querySelector('.slider-wraper img').classList.add('rise');
        setTimeout(() => {
            document.querySelector('.slider-wraper img').classList.remove('rise');
        }, 300);
    }
    if(e.classList.contains('raquo')){
        (i == 10) ? i = 0 : '';
        i++;
        document.querySelector('.slider-wraper img').setAttribute('src','img/testi'+i+'.jpeg');
        document.querySelector('.slider-wraper img').classList.add('rise');
        setTimeout(() => {
            document.querySelector('.slider-wraper img').classList.remove('rise');
        }, 300);
    }
}))

// ---------------------------
// temporary image 1
// ---------------------------
let j = 1
let imgTesti = '';
let imgVarian = '';
for(j=1;j<=10;j++){
    imgTesti += `<img src="img/testi${j}.jpeg" width="100%" height="100%">`
}
temporaryImg.innerHTML = imgTesti;

// ---------------------------
// Create Card
// ---------------------------
function getProduk(){
    return fetch('produk.json')
    .then(e => e.json())
    .then(e => e);
}
function updateCards(produk){
    let xx = produk.produk;
    let cards = '';
    
    xx.forEach(c => {
        cards += `<div class="card">
            <div class="bground"></div>
            <img src="img/${c.poster}/${c.poster}.png" width="100%">
            <div class="btn-detail" data-nama="${c.nama}">DETAIL</div>
            </div>`;
        
            c.varian.forEach(e=>{
                imgVarian += `<img src="img/${c.poster}/${e}.png" width="100%" height="100%">`;
            })
    })

    document.querySelector('.produk-card').innerHTML = cards;
    document.querySelectorAll('.produk-card .card img').forEach((e,i) => {
        if(i > 0 && i < 3){
            e.setAttribute('width','66%');
        }
    });
    
}
async function fillCard(){
    let produk = await getProduk();  
    updateCards(produk);
}
fillCard();

// ---------------------------
// temporary image 2
// ---------------------------
function temporaryImg2(){
    temporaryImg.innerHTML = imgTesti+imgVarian;
}

// ---------------------------
// Update Detail Box
// ---------------------------
function updateDetail(nmProduk,produk){
    let xx = produk.produk;
    let detail = '';

    xx.forEach(c => {
        if(c.nama == nmProduk){
            detail = `<div class="hero-img">
                <div class="img-wraper">
                    <img src="img/${c.poster}/${c.varian[0]}.png" width="100%" class="hero">
                </div>
            </div>
            <div class="hero-deskripsi">
                <div>
                    <h1>${c.nama}</h1>
                    <h2><span>Rp</span>${c.harga}</h2>
                    <h3>PILIH VARIAN :</h3>
                    <div class="varian-box">
                        ${c.varian.map(e => `<button data-url="img/${c.poster}/${e}.png" class="btn-varian">${e}</button>`).join('')}
                    </div>
                    <h4>DESKRIPSI :</h4>
                    <h5>${c.deskripsi}</h5>
                    </div>
                <div>
                    <a href="" target="_blank" class="btn-pesan"><i class="fas fa-shopping-basket btn-pesan"></i> pesan</a>
                </div>
            </div>`;

            document.querySelector('.link-wraper').innerHTML = `
            <a href="${c.shopee}" class="btn-link" id="Shopee">
                <img src="img/shopee.png" width="100%" alt="">
            </a>
            <a href="${c.tokopedia}" class="btn-link" id="Tokopedia">
                <img src="img/tokopedia.png" width="100%" alt="">
            </a>
            <a href="${c.wa}" class="btn-link" id="Whatsapp">
                <img src="img/wa.png" width="100%" alt="">
            </a>`;
        }
    })
    document.querySelector('.detail-box').innerHTML = detail;
    document
    .querySelector('a.btn-pesan').addEventListener('click',function(e){
        e.preventDefault();
        document.querySelector('.beli-wraper').classList.add('rise');
    })

    // -------------------------
    // link to shopee or tokped
    // -------------------------
    document
    .querySelectorAll('a.btn-link')
    .forEach(trigger => {
        trigger.onclick = function(e) {
            e.preventDefault();
            let href = this.getAttribute('href');
            let where = this.getAttribute('id');
            if(href == 'notfound'){
                document.querySelector('.info-wraper').classList.add('rise');
                document.querySelector('.info-wraper .where span').innerHTML = where;
            }else{
                window.open(href, '_blank');
            }
        };
    });
}       
async function updateDetailBox(nmProduk){
    let produk = await getProduk();
    updateDetail(nmProduk,produk);
}

window.addEventListener('click',function(e){
    // ---------------------------
    //      Burger Click
    // ---------------------------
    if(e.target.classList.contains('burger-btn')){
        (!document.querySelector('nav').classList.contains('shadowOn')) ? document.querySelector('nav').classList.toggle('shadowOn') : document.querySelector('nav').classList.add('shadowOn');
        document.querySelectorAll('nav .burger-span img').forEach(e => e.classList.toggle('active'));
        document.querySelector('nav ul').classList.toggle('down');
    }

    // ---------------------------
    //      Contac Click
    // ---------------------------
    else if(e.target.classList.contains('btn-kontak')){
        document.body.style.overflow = 'hidden';
        document.querySelectorAll('.kontak a').forEach((e,i) => {
            setTimeout(() => {
                e.classList.toggle('rise');
            }, 100*i);
        });
        document.querySelector('.bg-kontak').classList.toggle('rise');
        document.querySelector('.kontak button').classList.toggle('focus');
    }

    // ---------------------------
    //      Button Detail
    // ---------------------------
    else if(e.target.classList.contains('btn-detail')){
        updateDetailBox(e.target.dataset.nama);
        document.body.style.overflow = 'hidden';
        document.querySelector('.detail-box-wraper').classList.add('rise');
        document.querySelector('.detail-box').classList.add('rise');
    }

    // ---------------------------
    //      Button Varian
    // ---------------------------
    else if(e.target.classList.contains('btn-varian')){
        document.querySelector('.img-wraper img.hero').setAttribute('src',e.target.dataset.url);
        document.querySelector('.img-wraper img.hero').classList.add('fade');
        setTimeout(() => {
            document.querySelector('.img-wraper img.hero').classList.remove('fade');
        }, 300);
        document.querySelectorAll('.btn-varian').forEach(e =>{
            if(e.classList.contains('focus')){
                e.classList.remove('focus');
            }
        })
        e.target.classList.add('focus');
    }
    else{
        if(document.querySelector('nav ul').classList.contains('down')){
            document.querySelector('nav ul').classList.remove('down');
            document.querySelectorAll('nav .burger-span img').forEach(e => e.classList.remove('active'));
        }
        if(document.querySelector('.bg-kontak').classList.contains('rise')){
            document.body.style.overflow = 'auto';
            document.querySelector('.bg-kontak').classList.remove('rise');
            document.querySelector('.kontak button').classList.remove('focus');
            document.querySelectorAll('.kontak a').forEach((e,i) => {
                setTimeout(() => {
                    e.classList.remove('rise');
                }, 100*i)
            });
        }
        if(e.target.classList.contains('detail-box-wraper')){
            document.body.style.overflow = 'auto';
            document.querySelector('.detail-box-wraper').classList.remove('rise');
            document.querySelector('.detail-box').classList.remove('rise');
        }
        if(e.target.classList.contains('btn-close')){
            e.target.parentElement.parentElement.parentElement.classList.remove('rise');
        }
    }
})




// var lastScroll = 0;
// let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value
// if (currentScroll > 0 && lastScroll <= currentScroll){
//     lastScroll = currentScroll;
//     document.querySelector('nav').classList.add('up')
//     document.querySelector('nav').classList.remove('shadowOn')
// }else{
//     lastScroll = currentScroll;
//     document.querySelector('nav').classList.remove('up')
//     document.querySelector('nav').classList.add('shadowOn')
// }