(function ($) {
    'use strict';

    $.fn.scrollingTo = function (opts) {
        var defaults = {
            animationTime: 1000,
            easing: '',
            callbackBeforeTransition: function () {},
            callbackAfterTransition: function () {}
        };

        var config = $.extend({}, defaults, opts);

        $(this).click(function (e) {
            var eventVal = e;
            e.preventDefault();

            var $section = $(document).find($(this).data('section'));
            if ($section.length < 1) {
                return false;
            };

            if ($('html, body').is(':animated')) {
                $('html, body').stop(true, true);
            };

            var scrollPos = $section.offset().top;

            if ($(window).scrollTop() == scrollPos) {
                return false;
            };

            config.callbackBeforeTransition(eventVal, $section);

            $('html, body').animate({
                'scrollTop': (scrollPos + 'px')
            }, config.animationTime, config.easing, function () {
                config.callbackAfterTransition(eventVal, $section);
            });
        });
    };





    /* ========================================================================= */
    /*   Contact Form Validating
    /* ========================================================================= */

    $('#contact-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 4
            },
            email: {
                required: true,
                email: true
            },
            subject: {
                required: false,
            },
            message: {
                required: true,
            },
        },
        messages: {
            user_name: {
                required: "Come on, you have a name don't you?",
                minlength: "Your name must consist of at least 2 characters"
            },
            email: {
                required: "Please put your email address",
            },
            message: {
                required: "Put some messages here?",
                minlength: "Your name must consist of at least 2 characters"
            },
        },
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                type: "POST",
                data: $(form).serialize(),
                url: "sendmail.php",
                success: function () {
                    $('#contact-form #success').fadeIn();
                },
                error: function () {
                    $('#contact-form #error').fadeIn();
                }
            });
        }
    });


}(jQuery));



jQuery(document).ready(function () {
    "use strict";
    new WOW().init();


    (function () {
        jQuery('.smooth-scroll').scrollingTo();
    }());

});




$(document).ready(function () {

    $(window).scroll(function () {
        if ($(window).scrollTop() > 50) {
            $(".navbar-brand a").css("color", "#fff");
            $(".top-bar").removeClass("animated-header");
        } else {
            $(".navbar-brand a").css("color", "inherit");
            $(".top-bar").addClass("animated-header");
        }
    });

    $('.clients-logo-slider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
      });


});



// fancybox
$(".fancybox").fancybox({
    padding: 0,

    openEffect: 'elastic',
    openSpeed: 450,

    closeEffect: 'elastic',
    closeSpeed: 350,

    closeClick: true,
    helpers: {
        title: {
            type: 'inside'
        },
        overlay: {
            css: {
                'background': 'rgba(0,0,0,0.8)'
            }
        }
    }
});







let carts=document.querySelectorAll('.add-cart');


let products = [
  {
    name: 'General Service',
    tag: 'gs',
    price: 999,
    inCart: 0
  },
  {
    name: 'P2',
    tag: 'p2',
    price: 999,
    inCart: 0
  },
  {
    name: 'P3',
    tag: 'p3',
    price: 999,
    inCart: 0
  },
  {
    name: 'P4',
    tag: 'p4',
    price: 999,
    inCart: 0
  },
  {
    name: 'P5',
    tag: 'p5',
    price: 999,
    inCart: 0
  },
  {
    name: 'P6',
    tag: 'p6',
    price: 999,
    inCart: 0
  }
];


for(let i=0;i<carts.length;i++)
{
  carts[i].addEventListener('click', () => {
    cartsNumbers(products[i]);
    totalCost(products[i]);
  })
}


function onLoadCartNumbers(){
    let productsNumbers=localStorage.getItem('cartsNumbers');

    if(productsNumbers)
    {
        document.querySelector('.cart span').textContent=productsNumbers;
    }
}
function cartsNumbers(product)
{ //console.log("product clicked is",product);
  let productsNumbers=localStorage.getItem('cartsNumbers');
//  console.log(productsNumbers);
//  console.log(typeof productsNumbers);
  productsNumbers=parseInt(productsNumbers);
//  console.log(typeof productsNumbers);
if(productsNumbers)
{
  localStorage.setItem('cartsNumbers',productsNumbers+1);
  document.querySelector('.cart span').textContent=productsNumbers+1;
}
else {

    localStorage.setItem('cartsNumbers',1);
    document.querySelector('.cart span').textContent=1;
}
setItems(product);
}
function setItems(product)
{
  let cartItems=localStorage.getItem('productsInCart');
  cartItems=JSON.parse(cartItems);
  //console.log("items are",cartItems);
  //console.log("inside");
  //console.log("pro is",product);
  if(cartItems!=null)
  {
    if(cartItems[product.tag]==undefined){
      cartItems={
        ...cartItems,[product.tag]: product
      }
    }
    cartItems[product.tag].inCart +=1;
  }
  else{
    product.inCart=1;

     cartItems={
      [product.tag]: product
  }

  }
  localStorage.setItem("productsInCart", JSON.stringify
(cartItems));
}

function totalCost(product){
  //console.log("price is",product.price);
  let cartCost=localStorage.getItem('totalCost');

  //console.log("casrcost",cartCost);
  if(cartCost!=null)
  {     cartCost=parseInt(cartCost);
      localStorage.setItem("totalCost",cartCost+product.price);
  }
  else{
      localStorage.setItem("totalCost",product.price);
  }
  //localStorage.setItem("totalcost",product.price);
}


function displayCart(){
  let cartItems=localStorage.getItem("productsInCart");
  cartItems=JSON.parse(cartItems);
  let productContainer=document.querySelector('.products');
    let cartCost=localStorage.getItem('totalCost');

  console.log(cartItems);
  if(cartItems&&productContainer)
  { console.log("gg");
    productContainer.innerHTML ='';
    Object.values(cartItems).map(item=>{
      productContainer.innerHTML+=`
      <div class="product">
      <ion-icon name="close-circle"></ion-icon>
      <img src="./images/${item.tag}.jpg">
      <span>${item.name}</span>
      </div>

      <div class="price">Rs ${item.price}</div>
        <div class="quantity">
        <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
        </div>
          <div class="total">Rs ${item.price*item.inCart}</div>
      `



    });

    productContainer.innerHTML+=`

    <div class="basketTotalContainer">
    <h4 class="basketTotalTitle">
    Basket total
    <h4>
    <h4 class="basketTotal">
    Rs ${cartCost}
    </h4>`;
  }
}
onLoadCartNumbers();
displayCart();
