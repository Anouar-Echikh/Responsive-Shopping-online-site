/*
 * Global variables
 */
var list_product = [];
let k = 0;

/*
 *
 * Function to add product to panel (localstorage)
 *
 */
function addproductToPanel(el) {
  // create an object of this product
  var obj_product = {
    src_img: el.parentElement.parentElement
      .querySelector(".card-img-top")
      .getAttribute("src"),
    description:
      el.parentElement.parentElement.querySelector(".card-title").innerHTML +
      "<br>" +
      el.parentElement.parentElement.querySelector(".card-text").innerText,
    disp: el.parentElement.parentElement.querySelector(".disp"),
    prix: el.parentElement.parentElement
      .querySelector(".prix")
      .innerText.replace(" TND", ""),
    id: el.parentElement.parentElement.querySelector(".ref").innerText,
    nb: 1,
    category: el.parentElement.parentElement.querySelector(".category")
      .innerText
  };
  let count = 1;
  let arr = [];
  //add object to localstorage panel
  if (localStorage.getItem("products") == null) {
    var produts_json = JSON.stringify(list_product);
    localStorage.setItem("products", produts_json);
    arr = JSON.parse(localStorage.getItem("products"));
    console.log("/***************arr*************");

    arr[arr.length] = obj_product;
    console.log(arr);
    var produts_json = JSON.stringify(arr);
    localStorage.setItem("products", produts_json);
    nbProducts();
  } else {
    arr = JSON.parse(localStorage.getItem("products"));
    console.log("/***************arr*************");

    arr[arr.length] = obj_product;
    console.log(arr);
    var produts_json = JSON.stringify(arr);
    localStorage.setItem("products", produts_json);
    nbProducts();
  }
}
/*
 *
 * A function to load modal
 *
 */

function load_modal(el) {
  var obj_product = {
    src_img: el.parentElement.parentElement
      .querySelector(".card-img-top")
      .getAttribute("src"),
    title: el.parentElement.parentElement.querySelector(".card-title")
      .innerHTML,
    text: el.parentElement.parentElement.querySelector(".card-text").innerText,
    disp: el.parentElement.parentElement.querySelector(".disp"),
    prix: el.parentElement.parentElement.querySelector(".prix").innerText,
    id: el.parentElement.parentElement.querySelector(".ref").innerText,
    nb: 1,
    category: el.parentElement.parentElement.querySelector(".category")
      .innerText
  };
  //add object to model
  // Add img to carousel
  var imgs = [].slice.call(
    document.getElementById("model-article").querySelectorAll(".carousel-item")
  );
  imgs.forEach(function(div) {
    div.getElementsByTagName("img")[0].setAttribute("src", obj_product.src_img);
  });
  // Add data
  document.getElementById("model-article").querySelector(".ref").innerText =
    obj_product.id;
  document
    .getElementById("model-article")
    .querySelector(".category").innerText = obj_product.category;
  document
    .getElementById("model-article")
    .querySelector(".category").innerText = obj_product.category;
  document.getElementById("model-article").querySelector(".disp").innerText =
    obj_product.disp;
  document
    .getElementById("model-article")
    .querySelector(".card-text").innerText = obj_product.text;
  document
    .getElementById("model-article")
    .querySelector(".card-title").innerText = obj_product.text;
  document.getElementById("model-article").querySelector(".prix").innerText =
    obj_product.prix;
}

/*
 *
 * A function to get size of an object  (Not used)
 *
 */
Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
/*
 *
 * Get nb of articles in panel and setting the button
 *
 */
window.onload = function nbProducts() {
  //let count;
  //let arr = [];
  // arr = JSON.parse(localStorage.getItem("products"));
  if (countPanel() != 0) {
    // count = arr.length;
    document.getElementById("link-panel").setAttribute("data-toggle", "modal1");
    document.getElementById("link-panel").setAttribute("href", "carte.html");
    document.getElementById("link-panel").setAttribute("target", "_blank");
  } else {
    // count = 0;
    document.getElementById("link-panel").setAttribute("data-toggle", "modal");
    document.getElementById("link-panel").removeAttribute("href");
    document.getElementById("link-panel").removeAttribute("target");
  }
  // localStorage.setItem("count", count);
  //let nb = parseInt(document.getElementById("span-panier2").innerHTML);
  document.getElementById("span-panier2").innerText = countPanel().toString();
  console.log("nbproducts");
  //********************** */
};
/*
 *
 * This function is the same of the previous,but  we need to use it independently that's why we recreate it
 *
 */
function nbProducts() {
  //let count;
  //let arr = [];
  // arr = JSON.parse(localStorage.getItem("products"));
  if (countPanel() != 0) {
    // count = arr.length;
    document.getElementById("link-panel").setAttribute("data-toggle", "modal1");
    document.getElementById("link-panel").setAttribute("href", "carte.html");
    document.getElementById("link-panel").setAttribute("target", "_blank");
  } else {
    //count = 0;
    document.getElementById("link-panel").setAttribute("data-toggle", "modal");
    document.getElementById("link-panel").removeAttribute("href");
    document.getElementById("link-panel").removeAttribute("target");
  }
  // localStorage.setItem("count", count);
  //let nb = parseInt(document.getElementById("span-panier2").innerHTML);
  document.getElementById("span-panier2").innerText = countPanel().toString();
  console.log("nbproducts");
  console.log(countPanel());
}
/*
 *
 * Return number of article in panel
 *
 */

function countPanel() {
  let arrProduct = [];
  let count = 0;
  arrProduct = JSON.parse(localStorage.getItem("products"));
  if (arrProduct != []) {
    count = arrProduct.length;
    return count;
  } else return count;
}

// for sticky header
window.onscroll = function() {
  myFunction();
};

var header = document.getElementById("header");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    document.getElementById("header-logo").classList.remove("logo");
    document.getElementById("header-logo").classList.add("logo-sticky");
    document.getElementById("header").classList.remove("header");
    document.getElementById("header").classList.add("header-sticky");
    document.getElementById("sub-header").classList.remove("flex-column");
    document.getElementById("sub-header").classList.add("flex-row");
    function myFunction(x) {
      if (x.matches) {
        // If media query matches
        document.getElementById("header-search").classList.remove("d-flex");
        document.getElementById("header-search").classList.add("d-none");
        document.getElementById("wishlist").classList.add("d-none");
        document.getElementById("dropdown-user").classList.add("d-none");
      } else {
        document.getElementById("header-search").classList.remove("d-none");
        document.getElementById("header-search").classList.add("d-flex");
        document.getElementById("wishlist").classList.remove("d-none");
        document.getElementById("dropdown-user").classList.remove("d-none");
      }
    }

    var x = window.matchMedia("(max-width: 700px)");
    myFunction(x); // Call listener function at run time
    x.addListener(myFunction); // Attach listener function on state changes
  } else {
    header.classList.remove("sticky");
    document.getElementById("header-logo").classList.remove("logo-sticky");
    document.getElementById("header-logo").classList.add("logo");
    document.getElementById("header").classList.add("header");
    document.getElementById("header").classList.remove("header-sticky");
    document.getElementById("sub-header").classList.add("flex-column");
    document.getElementById("sub-header").classList.remove("flex-row");
    document.getElementById("header-search").classList.remove("d-none");
    document.getElementById("header-search").classList.add("d-flex");
    document.getElementById("wishlist").classList.remove("d-none");
    document.getElementById("user").classList.remove("d-none");
  }
}

// menu
$("#primary-menu").on("show.zf.dropdownmenu", function() {
  var dropdown = $(this).find(".is-dropdown-submenu");
  dropdown.css("display", "none");
  dropdown.fadeIn("slow");
});
$("#primary-menu").on("hide.zf.dropdownmenu", function() {
  var dropdown = $(this).find(".is-dropdown-submenu");
  dropdown.css("display", "inherit");
  dropdown.fadeOut("slow");
});
// menu 2
$(document).ready(function() {
  // executes when HTML-Document is loaded and DOM is ready

  // breakpoint and up
  $(window).resize(function() {
    if ($(window).width() >= 980) {
      // when you hover a toggle show its dropdown menu
      $(".navbar .dropdown-toggle").click(function() {
        $(this)
          .parent()
          .toggleClass("show");
        $(this)
          .parent()
          .find(".dropdown-menu")
          .toggleClass("show");
      });

      // hide the menu when the mouse leaves the dropdown
      $(".navbar .dropdown-menu").mouseleave(function() {
        $(this).removeClass("show");
      });

      // do something here
    }
  });

  // document ready
});

// carousel -1
$(document).ready(function() {
  $("#owl-demo").owlCarousel({
    autoPlay: 3000, //Set AutoPlay to 3 seconds

    items: 4,
    itemsDesktop: [1199, 3],
    itemsDesktopSmall: [979, 3]
  });
});
