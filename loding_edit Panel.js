/*
 *
 * Load articles-panel
 *
 */
window.onload = function loadPanel() {
  // clear ul items
  document.getElementById("ul-prod").innerHTML = "";
  // get element from localstorage
  let arrProduct = [];
  arrProduct = JSON.parse(localStorage.getItem("products"));
  console.log(arrProduct);
  var element = document.getElementById("liProd"); //this is a hidden div
  if (arrProduct != []) {
    var newObj = groupArticleById(arrProduct);
    for (let i in newObj) {
      let elProd = newObj[i][0];
      let nbOcc = newObj[i].length;
      //clone a hidden div
      var el4 = element.cloneNode(true);
      el4.classList.remove("d-none"); // to show div
      // settig cloned element
      el4.querySelector(".card-img-top").setAttribute("src", elProd.src_img);
      el4.setAttribute("id", elProd.id);
      el4.querySelector(".item-descreption").innerText = elProd.description;
      el4.querySelector(".item-pu").innerText = elProd.prix + " " + "TND";
      el4.querySelector(".span-montant ").innerText =
        (parseFloat(elProd.prix) * parseInt(elProd.nb)).toFixed(3) +
        " " +
        "TND";
      el4.querySelector(".form-control").value = nbOcc;
      console.log("****************");
      console.log(el4);
      // adding element to Ul listes in the panel
      document.getElementById("ul-prod").appendChild(el4);
    }
  } else {
    console.log("Votre panier est vide!");
  }
  // To show in "header panel" the number of articles in panel

  document.getElementById("span-panel-title").innerText =
    "  " + "(" + countPanel().toString() + " " + "articles)";
  //affiche total commande
  // get all of UL childrens
  var ul = [].slice.call(
    document.getElementById("ul-prod").querySelectorAll(".list-group-item")
  );
  //calculate sum of total panel
  var sum = 0;
  ul.forEach(function(element) {
    sum += parseFloat(element.querySelector(".span-montant ").innerText);
  });
  // Display sum in his div
  document.getElementById("total").querySelector(".montant").innerText =
    sum.toFixed(3) + " " + "TND";
  nbProducts();
};
/*
 *
 * Load panel : this is the same funtion called in window.onload, but we need to use it independently that's why we recreate it
 *
 */

function loadPanel() {
  // clear ul items
  document.getElementById("ul-prod").innerHTML = "";
  // get element from localstorage
  let arrProduct = [];
  arrProduct = JSON.parse(localStorage.getItem("products"));
  console.log(arrProduct);
  var element = document.getElementById("liProd"); //this is a hidden div
  if (arrProduct != []) {
    var newObj = groupArticleById(arrProduct);
    for (let i in newObj) {
      let elProd = newObj[i][0];
      let nbOcc = newObj[i].length;
      //clone a hidden div
      var el4 = element.cloneNode(true);
      el4.classList.remove("d-none"); // to show div
      // settig cloned element
      el4.querySelector(".card-img-top").setAttribute("src", elProd.src_img);
      el4.setAttribute("id", elProd.id);
      el4.querySelector(".item-descreption").innerText = elProd.description;
      el4.querySelector(".item-pu").innerText = elProd.prix + " " + "TND";
      el4.querySelector(".span-montant ").innerText =
        (parseFloat(elProd.prix) * parseInt(elProd.nb)).toFixed(3) +
        " " +
        "TND";
      el4.querySelector(".form-control").value = nbOcc;
      console.log("****************");
      console.log(el4);
      // adding element to Ul listes in the panel
      document.getElementById("ul-prod").appendChild(el4);
    }
  } else {
    console.log("Votre panier est vide!");
  }
  // To show in "header panel" the number of articles in panel
  document.getElementById("span-panel-title").innerText =
    "  " + "(" + countPanel().toString() + " " + "articles)";
  //affiche total commande
  // get all of UL childrens
  var ul = [].slice.call(
    document.getElementById("ul-prod").querySelectorAll(".list-group-item")
  );
  //calculate sum of total panel
  var sum = 0;
  ul.forEach(function(element) {
    sum += parseFloat(element.querySelector(".span-montant ").innerText);
  });
  // Display sum in his div
  document.getElementById("total").querySelector(".montant").innerText =
    sum.toFixed(3) + " " + "TND";
  nbProducts();
}

/*
 *
 * To change number of articles disolyed in header panel
 *
 */
function changeNbArtInHeaderPanel() {
  var ul = [].slice.call(
    document.getElementById("ul-prod").querySelectorAll(".list-group-item")
  );
  var nbArt = 0;
  ul.forEach(function(element) {
    nbArt += parseInt(element.querySelector(".form-control").value);
  });
  //afficher le nombre d'article dans le "header" de panier

  document.getElementById("span-panel-title").innerText =
    "  " + "(" + nbArt.toString() + " " + "articles)";
  nbProducts();
}
/*
 *
 * Remove an article totally from panel
 *
 */
function removeArticle(el) {
  var element = el.parentElement.parentElement.parentElement;
  let arrProduct = [];
  let newArr = [];
  let k = 0;
  arrProduct = JSON.parse(localStorage.getItem("products"));
  if (arrProduct != [])
    arrProduct.forEach(function(item) {
      if (item.id !== element.id) {
        //arrProduct.splice(arrProduct.indexOf(item), 1);
        newArr[k] = item;
        k++;
      }
    });
  var produts_json = JSON.stringify(newArr);
  localStorage.setItem("products", produts_json);

  location.reload();
  changeNbArtInHeaderPanel();
  nbProducts();
  console.log(element);
}
/*
 *
 * Add an article to localstorage when customer increment the number of the same article in panel
 *
 */
function addToLocalStorage(el) {
  let arrProduct = [];
  arrProduct = JSON.parse(localStorage.getItem("products"));
  if (arrProduct != [])
    for (let i of arrProduct) {
      if (i.id === el.id) {
        console.log("press +");
        console.log("this object is added :" + i);
        arrProduct[arrProduct.length] = i;
        break;
      }
    }

  var produts_json = JSON.stringify(arrProduct);
  localStorage.setItem("products", produts_json);
}
/*
 *
 * Remove an article to localstorage when customer decrement the number of the same article in panel
 *
 */

function removeFromLocalStorage(el) {
  let arrProduct = [];
  arrProduct = JSON.parse(localStorage.getItem("products"));
  if (arrProduct != [])
    for (let item of arrProduct) {
      if (item.id === el.id) {
        console.log("press -");
        console.log("this object is removed :" + item);
        arrProduct.splice(arrProduct.indexOf(item), 1);
        break;
      }
    }

  var produts_json = JSON.stringify(arrProduct);
  localStorage.setItem("products", produts_json);
}
/*
 *
 * Change number of articles, total price of one article and total price of panel
 *  when customer increment or decrement the number of the same article in panel
 *
 */

function increment(el) {
  // get the last parent of el
  var parent =
    el.parentElement.parentElement.parentElement.parentElement.parentElement;
  console.log(parent);
  // get value of input
  var nb = el.parentElement.parentElement.querySelector(".form-control").value;
  regex = /^[0-9]*$/gm; // it must be a number
  if (regex.test(nb) === true) {
    if (el.innerText === "+") {
      nb = parseInt(nb);
      nb++;
      addToLocalStorage(parent);
    }
    if (el.innerText === "-") {
      nb = parseInt(nb);
      if (nb != 0) {
        nb--;

        removeFromLocalStorage(parent);
      }
    }
    if (nb <= 0) {
      el.parentElement.parentElement.querySelector(".form-control").value = "0";
      removeArticle(parent);
      // return total= 0.000 if qte=0
      el.parentElement.parentElement.parentElement.parentElement.querySelector(
        ".span-montant "
      ).innerText = "0,000 " + " " + "TND";

      //display total of panel
      // get all of UL childrens
      var ul = [].slice.call(
        document.getElementById("ul-prod").querySelectorAll(".list-group-item")
      );
      //calculate sum of total panel
      var sum = 0;
      ul.forEach(function(element) {
        sum += parseFloat(element.querySelector(".span-montant ").innerText);
      });
      // Display sum in his div
      document.getElementById("total").querySelector(".montant").innerText =
        sum.toFixed(3) + " " + "TND";
    } else {
      el.parentElement.parentElement.querySelector(
        ".form-control"
      ).value = nb.toString();
      el.parentElement.parentElement.parentElement.parentElement.querySelector(
        ".span-montant "
      ).innerText =
        (
          nb *
          parseFloat(
            el.parentElement.parentElement.parentElement.parentElement.querySelector(
              ".item-pu"
            ).innerText
          )
        ).toFixed(3) +
        " " +
        "TND";

      //display total of panel
      // get all of UL childrens
      var ul = [].slice.call(
        document.getElementById("ul-prod").querySelectorAll(".list-group-item")
      );
      //calculate sum of total panel
      var sum = 0;
      ul.forEach(function(element) {
        sum += parseFloat(element.querySelector(".span-montant ").innerText);
      });
      // Display sum in his div
      document.getElementById("total").querySelector(".montant").innerText =
        sum.toFixed(3) + " " + "TND";
    }
  } else {
    console.log("ce n'est pas un number!");
  }

  changeNbArtInHeaderPanel();
  nbProducts();
}
/*
 *
 * Function to return number of article in panel by getting length of ArrObj in localstorage
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
/*
 *
 * Function to group a table of object by property
 *
 */

function groupBy(tableauObjets, propriete) {
  return tableauObjets.reduce(function(acc, obj) {
    var cle = obj[propriete];
    if (!acc[cle]) {
      acc[cle] = [];
    }
    acc[cle].push(obj);
    return acc;
  }, {});
}
/*
 *
 * Function to group a table of object (articles) saved in localstorege by id and return a table of objects
 *
 */

function groupArticleById(arrProduct) {
  var ArticleById = groupBy(arrProduct, "id");
  return ArticleById;
}
/*
 *
 * Function to clear storage
 *
 */
function command() {
  localStorage.removeItem("products");
  location.reload();
}

function nbProducts() {
  //let count;
  //let arr = [];
  // arr = JSON.parse(localStorage.getItem("products"));
  if (countPanel() != 0) {
    // count = arr.length;
    document.getElementById("link-panel").setAttribute("data-toggle", "modal1");
    document.getElementById("link-panel").setAttribute("href", "carte.html");
  } else {
    // count = 0;
    document.getElementById("link-panel").setAttribute("data-toggle", "modal");
    document.getElementById("link-panel").removeAttribute("href");
  }
  // localStorage.setItem("count", count);
  //let nb = parseInt(document.getElementById("span-panier2").innerHTML);

  document.getElementById("span-panier2").innerText = countPanel().toString();
  console.log("nbproducts");

  //********************** */
}
/**
 *
 * Sticky header
 *
 */
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
        document.getElementById("user").classList.add("d-none");
      } else {
        document.getElementById("header-search").classList.remove("d-none");
        document.getElementById("header-search").classList.add("d-flex");
        document.getElementById("wishlist").classList.remove("d-none");
        document.getElementById("user").classList.remove("d-none");
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
