// hamburger Javascript
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

// member alert Javascript

// fading effect Javascript
window.addEventListener("scroll", reveal);

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 15;

    if (revealtop < windowheight - revealpoint) {
      reveals[i].classList.add("active");
    }
  }
}

// // Cart Functionality Javascript

let products = [
  {
    name: "yellow",
    tag: "f1",
    price: 139,
    incart: 0,
    productid: "yellowtshirt",
    incartID: "yellowin",
  },
  {
    name: "green",
    tag: "f2",
    price: 139,
    incart: 0,
    productid: "greentshirt",
    incartID: "greenin",
  },
  {
    name: "red",
    tag: "f3",
    price: 139,
    incart: 0,
    productid: "redtshirt",
    incartID: "redin",
  },
  {
    name: "white",
    tag: "f4",
    price: 139,
    incart: 0,
    productid: "whitetshirt",
    incartID: "whitein",
  },
];

let carts = document.getElementById("add-carts");

let MainImgs = document.getElementById("MainImg");

if (carts != null) {
  carts.addEventListener("click", () => {
    // cartNumbers(products[1]);
    if (MainImgs.src == "https://faizan-talikot.github.io/complete_E-Commerce_Website/img/products/f1.jpg") {
      cartNumbers(products[0]);
      totalCost(products[0]);
    } else if (MainImgs.src == "http://127.0.0.1:5500/img/products/f2.jpg") {
      // MainImgs.src = smallimg[1].src;
      cartNumbers(products[1]);
      totalCost(products[1]);
    } else if (MainImgs.src == "http://127.0.0.1:5500/img/products/f3.jpg") {
      cartNumbers(products[2]);
      totalCost(products[2]);
    } else if (MainImgs.src == "http://127.0.0.1:5500/img/products/f4.jpg") {
      cartNumbers(products[3]);
      totalCost(products[3]);
    }
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.getElementById("spans").textContent = productNumbers;
    document.getElementById("spaned").textContent = productNumbers;
  }

  let totalcost = localStorage.getItem("totalCost");
  let costContainer = document.getElementById("totalcost");
  let couponCost = document.getElementById("costaftercoupon");
//   let couponCost1 = document.getElementById("costaftercoupon").innerHTML;
  let valueofdiscount = document.getElementById("valueofdiscount");
//   console.log(valueofdiscount.innerHTML);
  if (costContainer != null) {
    if (totalcost != 0) {
      costContainer.innerHTML = "$ " + totalcost;
      couponCost.innerHTML = "$ " + totalcost;
    }
    if (!totalcost) {
      costContainer.innerHTML = "$ " + 0;
      couponCost.innerHTML = "$ " + 0;
    }
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.getElementById("spans").textContent = productNumbers + 1;
    document.getElementById("spaned").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.getElementById("spans").textContent = 1;
    document.getElementById("spaned").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].incart += 1;
  } else {
    product.incart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".cart-box");
  //    console.log(cartItems);
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      if (item.incart != 0) {
        productContainer.innerHTML += `
            <tr id=${item.name}>
            <td><button id="${
              item.productid
            }"><a href="#" ><i class="far fa-times-circle"></i></a></buttton></td>
                <td><img src="img/products/${item.tag}.jpg" alt=""></td>
                <td>Cartoon Astronaut T-Shirts</td>
                <td>$${item.price}.00</td>
                <td><input type="number" value="${item.incart}" id="${
          item.incartID
        }" min="1" max="10"  ></td>
                <td id="mysubtotal">${item.incart * item.price},00</td>
            </tr>
            `;
      }
    });
  }

  //    product1
  let deletbtn = document.getElementById("yellowtshirt");
  let container = document.getElementById("yellow");
  if (deletbtn != null) {
    deletbtn.addEventListener("click", () => {
      let pd = JSON.parse(localStorage.getItem("productsInCart"));
      console.log(pd);
      Object.values(pd).map((item) => {
        // console.log(item.productid)
        if (item.productid == "yellowtshirt") {
          reducetotal(item.price, item.incart);
          item.incart = 0;
          localStorage.setItem("productsInCart", JSON.stringify(pd));
          var text = document.querySelector("#yellowin").value;
          // console.log(text)
          reducecartnumbers(text);
          container.innerHTML = "";
          let totoalcost = localStorage.getItem("totalCost");
          if (totoalcost == 0) {
            document.getElementById("totalcost").innerHTML = "$0.00";
            document.getElementById("costaftercoupon").innerHTML = "$0.00";
          }

          onLoadCartNumbers();
        }
      });
    });
  }

  let numberbtn = document.getElementById("yellowin");
  if (numberbtn != null) {
    var text = document.querySelector("#yellowin").value;
  }
  if (numberbtn != null) {
    numberbtn.addEventListener("click", () => {
      let pd = JSON.parse(localStorage.getItem("productsInCart"));
      var newtext = document.querySelector("#yellowin").value;
      console.log(pd);
      if (text != newtext) {
        Object.values(pd).map((item) => {
          // console.log(item.productid)
          if (item.productid == "yellowtshirt") {
            var text = document.querySelector("#yellowin").value;

            // increased
            if (item.incart < text && text >= 1) {
              console.log(text);
              item.incart = text;

              localStorage.setItem("productsInCart", JSON.stringify(pd));
              let oldcost = localStorage.getItem("totalCost");
              oldcost = parseInt(oldcost);
              oldcost = item.price + oldcost;
              localStorage.setItem("totalCost", oldcost);

              displayCart();
              onLoadCartNumbers();
              let cartnumbers = localStorage.getItem("cartNumbers");
              if (cartnumbers != 0) {
                addcartnumbers();
              }
            //   document.getElementById('valueofdiscount').innerHTML = '$0.00'
            }
            //    decreased
            else {
              item.incart = text;
              localStorage.setItem("productsInCart", JSON.stringify(pd));
              let oldcost = localStorage.getItem("totalCost");
              oldcost = parseInt(oldcost);
              oldcost = oldcost - item.price;
              localStorage.setItem("totalCost", oldcost);

              displayCart();
              onLoadCartNumbers();
              let cartnumbers = localStorage.getItem("cartNumbers");
              if (cartnumbers != 0) {
                reducecartnumbers1();
              }
            }
            let valueofdiscount = document.getElementById("valueofdiscount");
            valueofdiscount.innerHTML = "$0.00";
          }
        });
      }
    });
  }

  // product2
  let deletbtn1 = document.getElementById("greentshirt");
  let container1 = document.getElementById("green");
  if (deletbtn1 != null) {
    deletbtn1.addEventListener("click", () => {
      let pd = JSON.parse(localStorage.getItem("productsInCart"));
      console.log(pd);
      Object.values(pd).map((item) => {
        // console.log(item.productid)
        if (item.productid == "greentshirt") {
          reducetotal(item.price, item.incart);
          item.incart = 0;
          localStorage.setItem("productsInCart", JSON.stringify(pd));
          var text = document.querySelector("#greenin").value;
          reducecartnumbers(text);
          container1.innerHTML = "";
          let totoalcost = localStorage.getItem("totalCost");
          if (totoalcost == 0) {
            document.getElementById("totalcost").innerHTML = "$0.00";
            document.getElementById("costaftercoupon").innerHTML = "$0.00";
          }
          onLoadCartNumbers();
        }
      });
    });
  }

  let numberbtn1 = document.getElementById("greenin");
  if (numberbtn1 != null) {
    var text1 = document.querySelector("#greenin").value;
  }
  if (numberbtn1 != null) {
    numberbtn1.addEventListener("click", () => {
      let pd = JSON.parse(localStorage.getItem("productsInCart"));
      var newtext = document.querySelector("#greenin").value;
      console.log(pd);
      if (text1 != newtext) {
        Object.values(pd).map((item) => {
          // console.log(item.productid)
          if (item.productid == "greentshirt") {
            var text = document.querySelector("#greenin").value;

            // increased
            if (item.incart < text && text >= 1) {
              console.log(text);
              item.incart = text;

              localStorage.setItem("productsInCart", JSON.stringify(pd));
              let oldcost = localStorage.getItem("totalCost");
              oldcost = parseInt(oldcost);
              oldcost = item.price + oldcost;
              localStorage.setItem("totalCost", oldcost);

              displayCart();
              onLoadCartNumbers();
              let cartnumbers = localStorage.getItem("cartNumbers");
              if (cartnumbers != 0) {
                addcartnumbers();
              }
            }
            //    decreased
            else {
              item.incart = text;
              localStorage.setItem("productsInCart", JSON.stringify(pd));
              let oldcost = localStorage.getItem("totalCost");
              oldcost = parseInt(oldcost);
              oldcost = oldcost - item.price;
              localStorage.setItem("totalCost", oldcost);

              displayCart();
              onLoadCartNumbers();
              let cartnumbers = localStorage.getItem("cartNumbers");
              if (cartnumbers != 0) {
                reducecartnumbers1();
              }
            }
            let valueofdiscount = document.getElementById("valueofdiscount");
            valueofdiscount.innerHTML = "$0.00";
          }
        });
      }
    });
  }

  //  product3
  let deletbtn3 = document.getElementById("redtshirt");
  let container3 = document.getElementById("red");
  if (deletbtn3 != null) {
    deletbtn3.addEventListener("click", () => {
      let pd = JSON.parse(localStorage.getItem("productsInCart"));
      console.log(pd);
      Object.values(pd).map((item) => {
        // console.log(item.productid)
        if (item.productid == "redtshirt") {
          reducetotal(item.price, item.incart);
          item.incart = 0;
          localStorage.setItem("productsInCart", JSON.stringify(pd));
          var text = document.querySelector("#redin").value;
          reducecartnumbers(text);
          container3.innerHTML = "";
          let totoalcost = localStorage.getItem("totalCost");
          if (totoalcost == 0) {
            document.getElementById("totalcost").innerHTML = "$0.00";
            document.getElementById("costaftercoupon").innerHTML = "$0.00";
          }
          onLoadCartNumbers();
        }
      });
    });
  }

  let numberbtn2 = document.getElementById("redin");
//   console.log(numberbtn2);
  if (numberbtn2 != null) {
    var text2 = document.querySelector("#redin").value;
  }
  if (numberbtn2 != null) {
    numberbtn2.addEventListener("click", () => {
      let pd = JSON.parse(localStorage.getItem("productsInCart"));
      var newtext = document.querySelector("#redin").value;
      //  console.log(pd)
      if (text2 != newtext) {
        // console.log(text2)
        // console.log(newtext)
        Object.values(pd).map((item) => {
          // console.log(item.productid)
          if (item.productid == "redtshirt") {
            var text = document.querySelector("#redin").value;

            // increased
            if (item.incart < text && text >= 1) {
              console.log(text);
              item.incart = text;

              localStorage.setItem("productsInCart", JSON.stringify(pd));
              let oldcost = localStorage.getItem("totalCost");
              oldcost = parseInt(oldcost);
              oldcost = item.price + oldcost;
              localStorage.setItem("totalCost", oldcost);

              displayCart();
              onLoadCartNumbers();
              let cartnumbers = localStorage.getItem("cartNumbers");
              if (cartnumbers != 0) {
                addcartnumbers();
              }
            }
            //    decreased
            else {
              console.log("delete");
              item.incart = text;
              localStorage.setItem("productsInCart", JSON.stringify(pd));
              let oldcost = localStorage.getItem("totalCost");
              oldcost = parseInt(oldcost);
              oldcost = oldcost - item.price;
              localStorage.setItem("totalCost", oldcost);

              displayCart();
              onLoadCartNumbers();
              let cartnumbers = localStorage.getItem("cartNumbers");
              if (cartnumbers != 0) {
                reducecartnumbers1();
              }
            }
            let valueofdiscount = document.getElementById("valueofdiscount");
            valueofdiscount.innerHTML = "$0.00";
          }
        });
      }
    });
  }

  //  product4
  let deletbtn4 = document.getElementById("whitetshirt");
  let container2 = document.getElementById("white");
  if (deletbtn4 != null) {
    deletbtn4.addEventListener("click", () => {
      let pd = JSON.parse(localStorage.getItem("productsInCart"));
      console.log(pd);
      Object.values(pd).map((item) => {
        // console.log(item.productid)
        if (item.productid == "whitetshirt") {
          reducetotal(item.price, item.incart);
          item.incart = 0;
          localStorage.setItem("productsInCart", JSON.stringify(pd));
          var text = document.querySelector("#whitein").value;
          reducecartnumbers(text);
          container2.innerHTML = "";
          let totoalcost = localStorage.getItem("totalCost");
          if (totoalcost == 0) {
            document.getElementById("totalcost").innerHTML = "$0.00";
            document.getElementById("costaftercoupon").innerHTML = "$0.00";
          }
          onLoadCartNumbers();
        }
      });
    });
  }

  let numberbtn3 = document.getElementById("whitein");
//   console.log(numberbtn3);
  if (numberbtn3 != null) {
    var text3 = document.querySelector("#whitein").value;
  }
  if (numberbtn3 != null) {
    numberbtn3.addEventListener("click", () => {
      let pd = JSON.parse(localStorage.getItem("productsInCart"));
      if (text3 != null) {
        var newtext = document.querySelector("#whitein").value;
      }
      //  console.log(pd)

      if (text3 != newtext) {
        // console.log(text2)
        // console.log(newtext)
        Object.values(pd).map((item) => {
          // console.log(item.productid)
          if (item.productid == "whitetshirt") {
            var text = document.querySelector("#whitein").value;

            // increased
            if (item.incart < text && text >= 1) {
              console.log(text);
              item.incart = text;

              localStorage.setItem("productsInCart", JSON.stringify(pd));
              let oldcost = localStorage.getItem("totalCost");
              oldcost = parseInt(oldcost);
              oldcost = item.price + oldcost;
              localStorage.setItem("totalCost", oldcost);

              displayCart();
              onLoadCartNumbers();
              let cartnumbers = localStorage.getItem("cartNumbers");
              if (cartnumbers != 0) {
                addcartnumbers();
              }
            }
            //    decreased
            else {
              console.log("delete");
              item.incart = text;
              localStorage.setItem("productsInCart", JSON.stringify(pd));
              let oldcost = localStorage.getItem("totalCost");
              oldcost = parseInt(oldcost);
              oldcost = oldcost - item.price;
              localStorage.setItem("totalCost", oldcost);

              displayCart();
              onLoadCartNumbers();
              let cartnumbers = localStorage.getItem("cartNumbers");
              if (cartnumbers != 0) {
                reducecartnumbers1();
              }
            }
            let valueofdiscount = document.getElementById("valueofdiscount");
            valueofdiscount.innerHTML = "$0.00";
          }
        });
      }
    });
  }

  onLoadCartNumbers();
}

function reducecartnumbers(num) {
  let cartnumbers = localStorage.getItem("cartNumbers");
  console.log(cartnumbers);
  num = parseInt(num);
  let newnumbers = cartnumbers - num;
  localStorage.setItem("cartNumbers", newnumbers);
  document.getElementById("spans").textContent = newnumbers;
  document.getElementById("spaned").textContent = newnumbers;
}

function reducecartnumbers1() {
  let cartnumbers = localStorage.getItem("cartNumbers");
  console.log(cartnumbers);
  let newnumbers = cartnumbers - 1;
  localStorage.setItem("cartNumbers", newnumbers);
  document.getElementById("spans").textContent = newnumbers;
  document.getElementById("spaned").textContent = newnumbers;
}

function addcartnumbers() {
  let cartnumbers = localStorage.getItem("cartNumbers");
  console.log(cartnumbers);
  cartnumbers = parseInt(cartnumbers);
  let newnumbers = cartnumbers + 1;
  localStorage.setItem("cartNumbers", newnumbers);
  document.getElementById("spans").textContent = newnumbers;
  document.getElementById("spaned").textContent = newnumbers;
}

function reducetotal(price, incart) {
  let carttotal = localStorage.getItem("totalCost");
  let cartnumbers = localStorage.getItem("cartNumbers");
  cartnumbers = parseInt(cartnumbers);
  if (cartnumbers == 0) {
    carttotal = 0;
    localStorage.setItem("totalCost", carttotal);
  }
  carttotal = carttotal - price * incart;
  localStorage.setItem("totalCost", carttotal);
}

onLoadCartNumbers();

displayCart();
