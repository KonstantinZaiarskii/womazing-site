$(function () {


   // Preloder
   $(document).ready(function () {
      $('#preloader-active').delay(2250).fadeOut('slow');
      $('body').delay(2250).css({
         'overflow': 'visible'
      });
   });

   //header

   let header = $('.header');
   let hederHeight = header.height(); // вычисляем высоту шапки

   $(window).scroll(function () {
      if ($(this).scrollTop() > 1) {
         header.addClass('header_fixed');
         $('body').css({
            'paddingTop': hederHeight + 'px' // делаем отступ у body, равный высоте шапки
         });
      } else {
         header.removeClass('header_fixed');
         $('body').css({
            'paddingTop': 0 // удаляю отступ у body, равный высоте шапки
         })
      }
   });



   //scroll-btn
   $("a.btn").click(function () {
      var elementClick = $(this).attr("href")
      var destination = $(elementClick).offset().top;
      jQuery("html:not(:animated),body:not(:animated)").animate({
         scrollTop: destination
      }, 800);
      return false;
   });

   $(".arrow").click(function () {
      var elementClick = $(this).attr("href")
      var destination = $(elementClick).offset().top;
      jQuery("html:not(:animated),body:not(:animated)").animate({
         scrollTop: destination
      }, 800);
      return false;
   });

   /* TABS */

   $('.nav-tabs__item').on('click', function () {
      let currTab = $(this).parent().index();

      $('.nav-tabs__item').removeClass('card-active');
      $(this).addClass('card-active');

      $('.tab-content').removeClass('active');
      $('.tab-content').eq(currTab).addClass('active');
   })


   // HAMBURGER
   $('.call__burger').on('click', function () {
      $('.menu-burger, .menu__close').css("display", "block");
      $('.menu-burger').toggleClass('.call__number');

   });

   $('.menu__close').on('click', function () {
      $('.menu-burger, .menu__close').css("display", "none");
   });

   // modal-form

   $('.call__modal').on('click', function () {
      $('.wrapper-modal').toggle();
   });

   $('.btn-close, #overlay').on('click', function () {
      $('.wrapper-modal').hide();
   });

   $('.btn-message-close').on('click', function () {
      $('.massage-for-user , .overlay').toggle();
      $('.wrapper-modal').hide();
   });



   //slikc-slider
   $('.block-slide__slider').slick({
      arrows: true,
      dots: true,
      slidesToShow: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 800,
      responsive: [
         {
            breakpoint: 1119,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               infinite: true,
               dots: true
            }
         },
         {
            breakpoint: 991,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               arrows: false,
               dots: false,
            }
         },
      ]
   });

   $('.swiper-wrapper').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      speed: 4000,
      autoplaySpeed: 800,
      arrows: false,
      dots: true,
      fade: false,
      asNavFor: '.banner__two',
      responsive: [
         {
            breakpoint: 1119,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               dots: true
            }
         },
         {
            breakpoint: 991,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               dots: false
            }
         },
      ]
   });
   $('.banner__two').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: '.swiper-wrapper',
      dots: false,
      arrows: false,
      centerMode: false,
      autoplay: true,
      speed: 4000,
      autoplaySpeed: 800,
      focusOnSelect: false
   });


   //validation

   //Передача инфо о кнопке в модальное окно
   $('.select-btn').click(function () {
      var parent = $(this).attr('wrapper-modal-form');
      var modal = $(this).attr('wrapper-modal-form');
      $(modal).find('input[name=target]').val(parent);
   });

   /* Валидация */
   $('.select-btn ').on('click', function (e) {
      e.preventDefault();
      $(this).parent('form').submit();
   });
   $.validator.addMethod("regex", function (value, element, regexp) {
      let regExsp = new RegExp(regexp);
      return regExsp.test(value);
   }, "Please check your input."
   );

   // Функция валидации и вывода сообщений
   function valEl(el) {
      el.validate({
         rules: {
            phoneNumber: {
               required: true,
               regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
            },
            firstName: {
               required: true,
               regex: "[A-Za-zА-Яа-я]"
            },
            email: {
               required: true,
               email: true
            }
         },
         messages: {
            phoneNumber: {
               required: 'Поле обязательно для заполнения',
               regex: 'Телефон может содержать символы + - ()'
            },
            firstName: {
               required: 'Поле обязательно для заполнения',
            },
            email: {
               required: 'Поле обязательно для заполнения',
               email: 'Неверный формат E-mail'
            }
         },

         // Начинаем проверку id="" формы
         submitHandler: function (form) {
            $('#preloader-active').fadeIn();
            var $form = $(form);
            var $formId = $(form).attr('id');
            switch ($formId) {
               // Если у формы id="form-book_modal" - делаем:
               case 'form-book':
                  $.ajax({
                     type: 'POST',
                     url: $form.attr('action'),
                     data: $form.serialize()
                  })
                     .done(function () {
                        console.log('Success');
                     })
                     .fail(function () {
                        console.log('Fail');

                     })
                     .always(function () {
                        console.log('Always');

                        setTimeout(function () {
                           $form.trigger('reset');
                           $('#massage-for-user').fadeIn();
                        }, 1100);

                        setTimeout(function () {
                           $('#preloader-active').fadeOut();
                           $('#modal-window').fadeOut();
                        }, 1300);
                     });
                  break;
            }
            return false;
         }
      });
   }
   // Запускаем механизм валидации форм, если у них есть класс
   $('.form-book').each(function () {
      valEl($(this));
   });

   //map
   // ymaps.ready(init);

   // function init() {
   //    // Создание экземпляра карты и его привязка к контейнеру с
   //    // заданным id ("map").
   //    myMap = new ymaps.Map('map', {
   //       // При инициализации карты обязательно нужно указать
   //       // её центр и коэффициент масштабирования.
   //       center: [55.76, 37.64], // Москва
   //       zoom: 10
   //    });
   //    // Создаем геообъект с типом геометрии "Точка".
   //    myGeoObject = new ymaps.GeoObject({
   //       // Описание геометрии.
   //       geometry: {
   //          type: "Point",
   //          coordinates: [55.689030, 37.530894]
   //       },
   //       // Свойства.
   //       properties: {
   //          // Контент метки.
   //          iconContent: 'Woomazing',
   //          balloonContent: 'Москва 3 я улица строителей 25'
   //       }
   //    }, {
   //       // Опции.
   //       // Иконка метки будет растягиваться под размер ее содержимого.
   //       preset: 'twirl#redStretchyIcon',
   //       // Метку можно перемещать.
   //       draggable: false
   //    }),

   //       // Добавляем все метки на карту.
   //       myMap.geoObjects
   //          .add(myGeoObject);

   //    myMap.behaviors.disable('drag');
   // }

});














