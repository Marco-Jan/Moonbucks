"use strict";

//Drink class
class Drink {
  constructor(name, price, type) {
    this.name = name;
    this.price = price;
    this.type = type;
  }

  getType() {
    return this.type;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }
}

//Order Factory Function
const Order = () => {
  const cart = [];


  const addToCart = (drink) => {
    let quantity = 1;
    // console.log(quantity);

    if (cart.length > 0) {
      cart.forEach((item) => {
        if (item.drink.getName() === drink.getName()) {
          const count_id = 0;
          count_id + 1;
          item.quantity++;
          quantity++;
        }
        return quantity
      });
    }
    if (quantity == 1) {
      cart.push({ drink, quantity });
    }
    updateCart();
  };

  const updateCart = () => {
    const parent = document.getElementById("cart_section");
    parent.innerHTML = "";

    cart.forEach((cart_item) => {
      const itemCard = createTag(parent, "div", null, "cart_item");
      createTag(
        itemCard,
        "p",
        null,
        "cart_item_name",
        cart_item.drink.getName()
      );
      createTag(
        itemCard,
        "p",
        null,
        "cart_item_price",
        "€ " + (cart_item.drink.getPrice() * cart_item.quantity).toFixed(2)
      );
      createTag(itemCard, "p", null, "cart_item_num", cart_item.quantity + "x");
      const dec_button = createTag(
        itemCard,
        "button",
        null,
        "decrease_num",
        "-"
      );

      // add EventListner to dec_button > call function removeItem() 
      // when clicked and give an argument to the function


      dec_button.addEventListener("click", () => {
        removeItem(cart_item.drink);
      });
    });
    console.log(cart);
  };

  //add argument

  const removeItem = (drink) => {
    cart.forEach((item, index) => {
      if (item.drink.getName() === drink.getName()) {
        item.quantity--;
        if (item.quantity === 0) {
          cart.splice(index, 1);
        }
      }
    });

    //dec quantity in cart
    //check if quantity == 0 > remove item from cart


    updateCart();
  };

  return {
    addToCart,
  };
};

//create Tags
function createTag(parent_node, tag_node, id_name, class_name, content) {
  const tag = document.createElement(tag_node);

  if (parent_node != null) {
    parent_node.append(tag);
  } else {
    const startpoint = document.getElementById("content");
    startpoint.append(tag);

    
    

  }

  if (id_name != null) {
    tag.id = id_name;
  }

  if (class_name != null) {
    tag.className = class_name;
  }

  if (content != null) {
    tag.innerHTML = content;
  }

  return tag;
}



//create multiple tags

function createMultiTags(parent_node, tag_node, num, list, menu) {
  for (let i = 0; i < num; i++) {
    if (menu) {
      createTag(
        parent_node,
        tag_node,
        null,
        list[i],
        '<a href="#' + list[i].replace(/ /g, "-") + '">' + list[i] + "</a>"
      );
    } else {
      createTag(
        parent_node,
        tag_node,
        null,
        list[i].replace(/ /g, "_"),
        list[i]
      );
    }
  }
}

//create header
function createHeader() {
  const header = createTag(null, "header");
  const logo = createTag(header, "img", null, "logo_header");
  const heading = createTag(header, "h1", null, null, "Moonbucks");
  const nav_header = createTag(header, "nav", "nav_header");
  const menu = createTag(nav_header, "ul", null, "menu_header");

  let menu_list = ["Home", "Our Team", "Contact"];
  createMultiTags(menu, "li", menu_list.length, menu_list, true);

  logo.src = "/img/Logo.png";
  logo.alt = "Logo";

}


//create card
function createCard(parent_section, drink, order) {


  const card = createTag(parent_section, "div", null, "card");
  createTag(card, "h3", null, "drink_name", drink.getName());
  createTag(card, "p", null, "drink_price", `€ ${drink.getPrice().toFixed(2)}`);
  const button = createTag(card, "button", null, "add_button", "Add");

  button.addEventListener("click", () => {
    order.addToCart(drink);
  });
}

//create Background


function createBackground() {
  const startpoint = document.getElementById("content");
  const bgContainer = createTag(startpoint, "div", 'bgContainer');
  
}



//create menu
function createMenu(menulist) {
  const order = Order();
  const menu_section = createTag(null, "section", "menu_section"); 
  const menu_coffee = createTag(
    menu_section,
    "div",
    "menu_coffee",
    "menu_sub_section"
  );
  const menu_coffee_special = createTag(
    menu_section,
    "div",
    "menu_coffee_special",
    "menu_sub_section"
  );

  createTag(menu_coffee, "h2", null, "coffee_heading", "Classics");
  createTag(
    menu_coffee_special,
    "h2",
    null,
    "coffee_s_heading",
    "Coffee Specials"
  );

  menulist.forEach((drink) => {
    if (drink.getType() === "coffee") {
      createCard(menu_coffee, drink, order);
    } else if (drink.getType() === "coffee_special") {
      createCard(menu_coffee_special, drink, order);
    }
  });
}

//create order
function createOrder() {
  const order_section = createTag(null, "section", "order_section", "order");
  createTag(order_section, "h2", null, "order_heading", "Your Order");
  createTag(order_section, "div", "cart_section");

  // console.log(order_section);
}

//create footer
function createFooter() {
  const footer = createTag(null, 'footer');
  const logoFooter = createTag(footer, null, 'logo_Footer');
  const SocialLinks = createTag(footer, null, 'social_links');

  // add space the logo

  const logoImg = createTag(logoFooter, 'img', null, 'logo_footer')
  logoImg.src = "/img/Logo.png";



  // add the social links (facebook, instagram, twitter)

  const faLink = createTag(SocialLinks, 'a');
  faLink.href = '#';
  const faIcon = createTag(faLink, "i", null, "fab fa-facebook");
  faIcon.style.padding = '10px';
  faIcon.style.color = 'white';
  faIcon.addEventListener('mouseover', function () {
    faIcon.style.transform = 'scale(1.3)';
  });

  faIcon.addEventListener('mouseout', function () {
    faIcon.style.transform = 'scale(1.1)';
  });



  const twLink = createTag(SocialLinks, 'a');
  twLink.href = '#';
  const twIcon = createTag(twLink, "i", null, "fab fa-twitter");
  twIcon.style.padding = '10px';
  twIcon.style.color = 'white';

  twIcon.addEventListener('mouseover', function () {
    twIcon.style.transform = 'scale(1.3)';
  });

  twIcon.addEventListener('mouseout', function () {
    twIcon.style.transform = 'scale(1.1)';
  });


  const instLink = createTag(SocialLinks, 'a');
  instLink.href = '#';
  const instIcon = createTag(instLink, "i", null, "fab fa-instagram");
  instIcon.style.padding = '10px';
  instIcon.style.color = 'white';

  instIcon.addEventListener('mouseover', function () {

    instIcon.style.transform = 'scale(1.3)';
  });

  instIcon.addEventListener('mouseout', function () {
    instIcon.style.transform = 'scale(1.1)';
  });

};

//main function
function init() {
  const espresso = new Drink("Espresso", 2.85, "coffee");
  const cappuccino = new Drink("Cappuccino", 3.2, "coffee");
  const latte = new Drink("Latte", 3.2, "coffee");
  const bullet = new Drink("Bullet Coffee", 3.2, "coffee_special");
  const mocca = new Drink("Mocca Froffee", 3.2, "coffee_special");

  const menulist = [espresso, cappuccino, latte, bullet, mocca];


  createBackground();
  createHeader();
  createMenu(menulist);
  createOrder();
  createFooter();
}

init();
