const axios = require("axios");

const mongodbAPI = axios.create({
  // baseURL: "http://localhost:8888/",
  baseURL: "https://mongo-api-telebot-5a78b8.netlify.app/",
  timeout: 10000,
});

const GET_ITEMS = "dbGetItems";
const POST_USER = "dbPostUsers";
const POST_CART = "dbPostCart";
const GET_CART = "dbGetCart";
const DELETE_CART = "dbDeleteCart";

// funcion para buscar producto
async function apiSearchProduct(msg) {
  try {
    const response = await mongodbAPI.get(`${GET_ITEMS}?id=${msg.text}`);
    const text = `${response.data[0].title}\n\n${response.data[0].description}\n\n${response.data[0].price} $ ${response.data[0].image}`;
    return text;
  } catch (error) {}
}

// funcion para obterner los 20 productos
async function apiGetProducts() {
  try {
    const response = await mongodbAPI.get(GET_ITEMS);
    const text = response.data
      .map((item) => {
        return `${item.id} - ${item.title} ${item.price}`;
      })
      .join("\n");
    return text;
  } catch (error) {
    console.log(error);
  }
}

// añade el usuario a la base de datos
async function apiPostUser(msg) {
  userId = msg.from.id;
  userFirstName = msg.from.first_name;
  userLastName = msg.from.last_name;
  username = msg.from.username;
  try {
    await mongodbAPI.post(POST_USER, {
      userId,
      userFirstName,
      userLastName,
      username,
    });
  } catch (error) {
    console.log("Timeout");
  }
}

// añade los items al carrito del usuario en la base de datos
async function apiPostCart(msg) {
  const userId = msg.from.id;
  const items = msg.text.split(",").map((item) => {
    return parseInt(item);
  });
  try {
    // agrega los ids de los items al carrito del usuario
    await mongodbAPI.post(POST_CART, { userId, items });
  } catch (error) {
    console.log(error);
  }
}

// obiene los items del carrito del usuario
async function apiGetCart(msg) {
  const userId = msg.from.id;
  let text;
  try {
    let response = await mongodbAPI.get(`${GET_CART}?userId=${userId}`);
    const cartItems = response.data.items;
    if (!response.data.items) {
      return;
    }
    let quantities = {};
    for (const item of cartItems) {
      if (quantities.hasOwnProperty(item)) {
        quantities[item] += 1;
      } else {
        quantities[item] = 1;
      }
    }
    let items = "";
    let total = 0;
    for (const item of response.data.items_info) {
      items += `Item: ${item.title}\nid: ${item.id}\nPrecio: ${
        item.price
      }$\nCantidad: ${quantities[item.id]}\n\n`;
      total += parseFloat(item.price) * quantities[item.id];
    }
    text = `${items}total = ${total.toFixed(2)} $`;
    return text;
  } catch (error) {
    console.log(error);
  }
}

// elimina el carrito del usuario
async function apiDeleteCart(msg) {
  const userId = msg.from.id;
  try {
    await mongodbAPI.delete(DELETE_CART, { data: { userId } });
  } catch (error) {
    console.log(error);
  }
}

// elimina los items del carrito del usuario
async function apiRemoveFromCart(msg) {
  const userId = msg.from.id;
  const items = msg.text.split(",").map((item) => {
    return parseInt(item);
  });
  try {
    await mongodbAPI.delete(DELETE_CART, { data: { userId, items } });
  } catch (error) {}
}

module.exports = {
  apiSearchProduct,
  apiGetProducts,
  apiPostUser,
  apiPostCart,
  apiGetCart,
  apiDeleteCart,
  apiRemoveFromCart,
};
