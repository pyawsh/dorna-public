$(document).ready(function() {
    // slider 

  var swiper1 = new Swiper(".productsSwiper", {
        loop: true,
        slidesPerView: 2.5,
        spaceBetween: 30,
        breakpoints: {
            0: {
                slidesPerView: 2.5,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 2.8,
                spaceBetween: 20
            }
        }
  });
  var swiper4 = new Swiper(".blogSwiper", {
        loop: true,
        slidesPerView: 2.2,
        spaceBetween: 30,
        breakpoints: {
            0: {
                slidesPerView: 2.2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 2.2,
                spaceBetween: 20
            }
        }
  });
	
  var swiper4 = new Swiper(".categorySwiper", {
        loop: true,
        slidesPerView: 5.2,
        spaceBetween: 30,
        breakpoints: {
            0: {
                slidesPerView: 5.2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 5.2,
                spaceBetween: 20
            }
        }
  });
	
  var swiper2 = new Swiper(".productsCategorySwiper", {
      loop: true,
      spaceBetween: 15,
      slidesPerView: "auto",
  });

  var swiper3 = new Swiper(".gallerySwiper", {
      loop: true,
      slidesPerView: "auto",
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
      },
  });
	
	
})
