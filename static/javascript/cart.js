let d = new Date();
document.getElementById("Copyright_Year").innerHTML = d.getFullYear();

// Selectors
const open_cart_button = document.getElementById("cart-button");
const close_cart_button = document.getElementById("cart-close");
const open_menu_button_nav = document.getElementById("menu-button-nav");
const close_menu_button_nav = document.getElementById("navigation-bar-close");
const open_cart_button_nav = document.getElementById("cart-button-nav");
const add_buttons = document.getElementsByClassName("add-to-cart");
const cart_list = document.getElementsByClassName("cart-display-content")[0];

// Event Listener
open_cart_button.addEventListener("click", open_cart_display);
close_cart_button.addEventListener("click", close_cart_display);
open_menu_button_nav.addEventListener("click", open_menu_display);
close_menu_button_nav.addEventListener("click", close_menu_display);
open_cart_button_nav.addEventListener("click", open_cart_display);


for (let i = 0; i < add_buttons.length; i++) {
    add_buttons[i].addEventListener("click", add_to_cart);
}

// function
class Items {
    constructor(title, price) {
        this.title = title;
        this.price = price;
        this.quantity = 0;
    }

    get_title() {
        return this.title;
    }
    get_price() {
        return this.price;
    }
    get_quantity() {
        return this.quantity;
    }

    add_items(counter) {
        this.quantity = parseFloat(this.quantity) + parseFloat(counter);
    }
    remove_items(counter) {
        this.quantity = parseFloat(this.quantity) + parseFloat(counter);
    }
}

function open_menu_display() {
    document.getElementById("navigation-bar-mobile").classList.add("menu-opened");
    document.getElementById("navigation-bar-mobile").classList.remove("menu-closed");
}

function close_menu_display(e) {
    document.getElementById("navigation-bar-mobile").classList.add("menu-closed");
    document.getElementById("navigation-bar-mobile").classList.remove("menu-opened");
}


function open_cart_display() {
    if (document.getElementById("cart-display").classList.contains("cart-closed")) {
        display_cart_list();
        update_total_price();
    }
    document.getElementById("cart-display").classList.add("cart-opened");
    document.getElementById("cart-display").classList.remove("cart-closed");
}

function display_cart_list() {
    let local_cart_list;
    if (!(localStorage.getItem("cart_item_list") === null)) {
        local_cart_list = JSON.parse(localStorage.getItem("cart_item_list"));

        local_cart_list.forEach((item) => {
            display_cart_list_item(item.title, item.price, item.quantity);
        });
    }
    update_total_price();
}

function display_cart_list_item(title, price, quantity) {
    const cart_item = document.createElement("div");
    cart_item.classList.add("cart-item");
    cart_list.appendChild(cart_item);

    const cart_item_quantity = document.createElement("p");
    cart_item_quantity.classList.add("cart-item-quantity");
    cart_item_quantity.innerText = quantity;
    cart_item.appendChild(cart_item_quantity);

    const cart_item_title = document.createElement("p");
    cart_item_title.classList.add("cart-item-title");
    cart_item_title.innerText = title;
    cart_item.appendChild(cart_item_title);

    const cart_item_price = document.createElement("p");
    cart_item_price.classList.add("cart-item-price");
    cart_item_price.innerText = price;
    cart_item.appendChild(cart_item_price);

    const cart_item_price_total = document.createElement("p");
    cart_item_price_total.classList.add("cart-item-price-total");
    cart_item_price_total.innerText = price * quantity;
    cart_item.appendChild(cart_item_price_total);

    const remove = document.createElement("button");
    remove.innerHTML = "<i class='fas fa-minus'></i>";
    remove.classList.add("remove");
    remove.addEventListener("click", remove_from_cart);
    cart_item.appendChild(remove);

    const trash = document.createElement("button");
    trash.innerHTML = "<i class='fas fa-times'></i>";
    trash.classList.add("trash");
    trash.addEventListener("click", delete_item);
    cart_item.appendChild(trash);
}

function close_cart_display(e) {
    let cart_display_content = e.target.parentElement.querySelector(".cart-display-content");
    while (cart_display_content.hasChildNodes()) {
        cart_display_content.removeChild(cart_display_content.firstChild);
    }
    document.getElementById("cart-display").classList.add("cart-closed");
    document.getElementById("cart-display").classList.remove("cart-opened");
}

function add_to_cart(e) {
    let local_cart_list;
    let value_found = false;
    let temp_quantity = 0;
    let title = e.target.parentElement.parentElement.children[1].innerHTML;
    let price = e.target.parentElement.parentElement.children[3].children[0].children[0].childNodes[8].childNodes[3].innerText;

    if (localStorage.getItem("cart_item_list") === null) {
        local_cart_list = [];
    } else {
        local_cart_list = JSON.parse(localStorage.getItem("cart_item_list"));
    }

    local_cart_list.forEach((item) => {
        if (item.title === title) {
            item.quantity = item.quantity + 1;
            temp_quantity = item.quantity;
            value_found = true;
        }
    });

    if (value_found == false) {
        temp_quantity = 1;
        let item_to_store = new Items(title, price);
        item_to_store.add_items(1);
        local_cart_list.push(item_to_store);
    }

    localStorage.setItem("cart_item_list", JSON.stringify(local_cart_list));

    if (document.getElementById("cart-display").classList.contains("cart-opened")) {
        if (value_found == true) {
            for (i = 0; i < cart_list.childElementCount; i++) {
                if (cart_list.childNodes[i].querySelector(".cart-item-title").innerHTML === title) {
                    cart_list.childNodes[i].querySelector(".cart-item-quantity").innerHTML = temp_quantity;
                    cart_list.childNodes[i].querySelector(".cart-item-price-total").innerHTML = price * temp_quantity;
                }
            }
        } else {
            display_cart_list_item(title, price, temp_quantity);
        }
    }
    update_total_price();
}

function remove_from_cart(e) {
    let local_cart_list;
    let temp_quantity = 0;
    let title = e.target.parentElement.querySelector(".cart-item-title").innerHTML;
    let price = e.target.parentElement.querySelector(".cart-item-price").innerHTML;

    if (localStorage.getItem("cart_item_list") === null) {
        local_cart_list = [];
    } else {
        local_cart_list = JSON.parse(localStorage.getItem("cart_item_list"));
    }

    local_cart_list.forEach((item) => {
        if (item.title === title) {

            if (Number.parseInt(item.quantity) > 0) {
                item.quantity = Number.parseInt(item.quantity) - 1;
            }
            temp_quantity = item.quantity;
        }
    });

    localStorage.setItem("cart_item_list", JSON.stringify(local_cart_list));

    if (document.getElementById("cart-display").classList.contains("cart-opened")) {
        for (i = 0; i < cart_list.childElementCount; i++) {
            if (cart_list.childNodes[i].querySelector(".cart-item-title").innerHTML === title) {
                cart_list.childNodes[i].querySelector(".cart-item-quantity").innerHTML = temp_quantity;
                cart_list.childNodes[i].querySelector(".cart-item-price-total").innerHTML = price * temp_quantity;
            }
        }
    }
    update_total_price();
}

function update_total_price() {
    if (localStorage.getItem("cart_item_list") === null) {
        document.getElementById("price").innerHTML = 0;
    } else {
        let total = 0;
        local_cart_list = JSON.parse(localStorage.getItem("cart_item_list"));

        local_cart_list.forEach((item) => {
            total = total + Number.parseFloat(item.price) * Number.parseFloat(item.quantity);
        });

        document.getElementById("price").innerHTML = Number.parseFloat(total).toFixed(2);
    }
}

function delete_item(e) {
    const item_for_remove = e.target.parentElement;
    remove_item(item_for_remove);
    item_for_remove.remove();
}

function remove_item(item) {
    let local_cart_list;
    if (localStorage.getItem("cart_item_list") === null) {
        local_cart_list = [];
    } else {
        local_cart_list = JSON.parse(localStorage.getItem("cart_item_list"));
    }
    const item_title = item.childNodes[0].innerText;
    local_cart_list.splice(local_cart_list.indexOf(item_title), 1);
    localStorage.setItem("cart_item_list", JSON.stringify(local_cart_list));
    update_total_price();
}