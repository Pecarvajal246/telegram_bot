const bot = require("./bot");

const { sendEmail, validationEmail } = require("./email");

const {
  apiSearchProduct,
  apiGetProducts,
  apiPostUser,
  apiPostCart,
  apiGetCart,
  apiDeleteCart,
  apiRemoveFromCart,
} = require("./mongodbAPI");

const {
  mainMenu,
  productsMenu,
  productResultMenu,
  cartMenu,
  payMenu,
  billMenu,
  emptyCartMenu,
} = require("./buttons");

// Request a la api para obtener 1 producto por su id
async function searchProduct(msg) {
  // Regex para validar el input del ususario, solo permite mensaje que contengan un número del 1 al 20
  const regex = /^1?\d$|^20$/;
  const userInput = msg.text;
  let id = msg.from.id;
  let replyMarkup = productResultMenu;
  if (!regex.test(userInput)) {
    replyMarkup = productsMenu;
    bot.sendMessage(
      id,
      "⚠️Error, debe introducir solamente el numero del producto que desea buscar. Ej: 1 Intentelo de nuevo.",
      { ask: "searchProduct" }
    );
    return;
  }
  await bot.sendMessage(id, "buscando...");
  try {
    const response = await apiSearchProduct(msg);
    const text = `🛍️ <i><b>${response.data[0].title}</b></i>\n\n📜 Descripción:\n${response.data[0].description}\n\n💰 Precio: ${response.data[0].price}$\n\n${response.data[0].image}`;
    bot.sendMessage(id, text, { parseMode: "html", replyMarkup });
  } catch (error) {
    bot.sendMessage(id, "no se encontro el producto");
  }
}

// Request a la api para obtener el listado de productos e imprimirlos
async function getProducts(msg) {
  const id = msg.from.id;
  const replyMarkup = productsMenu;
  try {
    const response = await apiGetProducts();
    const text = response.data
      .map((item) => {
        return `🛍️ ${item.title}\n🆔<b>:${item.id}</b>  💰 Precio: <b>${item.price}$</b>\n`;
      })
      .join("\n");
    bot.sendMessage(id, text, { parseMode: "html", replyMarkup });
  } catch (error) {
    console.log(error);
  }
}

// Request para agregar el usuario a la base de datos y envia mensaje de bienvenida
async function postUser(msg) {
  const replyMarkup = mainMenu;
  await apiPostUser(msg);
  userId = msg.from.id;
  userFirstName = msg.from.first_name;
  bot.sendMessage(
    userId,
    `Hola, ${userFirstName}! bienvenido a nuestra tienda!\nSeleccione una de las siguientes opciones:`,
    {
      replyMarkup,
    }
  );
}

// Request a la api para añadir los item al carrito del ususario
async function addToCart(msg) {
  // Regex para validar el input del ususario, solo permite mensajes que contengan números del 1 al 20 separados por comas
  const regex = /^(1?\d|^20$)+(,(1?\d|20$))*$/;
  const userInput = msg.text;
  let replyMarkup = cartMenu;
  if (!regex.test(userInput)) {
    bot.sendMessage(
      msg.from.id,
      "⚠️Error, debe introducir solamente los numeros de los productos separados por comas. Ej: 1,2,3.",
      { ask: "addToCart" }
    );
    return;
  }
  try {
    // agrega los ids de los items al carrito del usuario
    await apiPostCart(msg);
    bot.sendMessage(
      msg.from.id,
      "Productos agregados exitosamente al carrito",
      { replyMarkup }
    );
  } catch (error) {
    bot.sendMessage(
      msg.from.id,
      "Error, no se agregaron los productos al carrito",
      { replyMarkup }
    );
    console.log(error);
  }
}
function processCart(cartItems, cartItemsInfo) {
  // calcula las cantidades de cada item en el carrito
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
  for (const item of cartItemsInfo) {
    items += `Item: ${item.title}\nid: ${item.id}\nPrecio: ${
      item.price
    }$\nCantidad: ${quantities[item.id]}\n\n`;
    total += parseFloat(item.price) * quantities[item.id];
  }
  return `${items}total = ${total.toFixed(2)} $`;
}

// imprime los items en el carrito del usuario
async function getCart(msg) {
  try {
    let replyMarkup = billMenu;
    const { items, items_info } = await apiGetCart(msg);

    // Revisa si el carrito esta vacio
    if (!items || items.length === 0) {
      replyMarkup = emptyCartMenu;
      return bot.sendMessage(
        msg.from.id,
        "Tu carrito esta vacío, agrega productos para poder verlos aqui",
        { replyMarkup }
      );
    }
    const text = processCart(items, items_info);
    bot.sendMessage(msg.from.id, text, { replyMarkup });
  } catch (error) {
    console.log(error);
  }
}

function showMainMenu(msg) {
  const replyMarkup = mainMenu;
  bot.sendMessage(msg.from.id, "Seleccione una de las siguientes opciones:", {
    replyMarkup,
  });
}

//TEXTO DELIVERY
function textDelivery(msg) {
  const text =
    "🚚Nuestros horarios y metódos de envíos:\n" +
    "📌 Envíos al todo el país 🇻🇪\n" +
    "📌 Trabajamos de Lunes a Sábados de 9am a 4pm⏱\n" +
    "📌 Pedidos de zonas aledañas, serán despachadas en el día.\n" +
    "📌 Los despachos al resto del país se realizan los días Lunes y jueves.";
  return bot.sendMessage(msg.from.id, text);
}

//MENU PAYMENT
function buttonsPayment(msg) {
  const replyMarkup = payMenu;
  bot.sendMessage(msg.from.id, "⬇⚡Info sobre nuestros métodos de pago⚡⬇", {
    replyMarkup,
  });
}
//InfoCash
function infoCash(msg) {
  const id = msg.from.id;
  const text =
    "✨ Podrá realizar su pago en efectivo cuando reciba su pedido😊(Válido para envíos en zonas cercanas)";
  return bot.sendMessage(id, text);
}
//InfoCrypto
function infoCrypto(msg) {
  const id = msg.from.id;
  const text =
    "💰 ACEPTAMOS 💰 \n" + "🔥Bitcoin\n" + "🔥Ethereum\n" + "🔥Tether (USDT)";
  return bot.sendMessage(id, text);
}
//InfoTransfer
function infoTransfer(msg) {
  const id = msg.from.id;
  const text =
    "📲 Datos de transferencia \n" +
    " Entidad👉 Fake Store\n" +
    " Banco👉 FakeStoriApi\n" +
    " N° de cuenta👉 0000000000";
  return bot.sendMessage(id, text);
}

// envia la factura al correo introducido por el ususario
async function printBill(msg) {
  let id = msg.from.id;
  let text = msg.text.split(",");
  const firstName = text[0];
  const lastName = text[1];
  const email = text[2];
  const replyMarkup = mainMenu;

  validation = await validationEmail(firstName, lastName, email);

  if (!validation) {
    return bot.sendMessage(
      id,
      "⚠️Error los datos no son invalidos. Por favor introduzca su nombre, apellido y correo electronico separados por comas. Ej: Nombre,Apellido,email@email.com",
      { ask: "printBill" }
    );
  } else {
    try {
      const { items, items_info } = await apiGetCart(msg);
      const text = processCart(items, items_info);
      sendEmail(firstName, lastName, email, text);
      await apiDeleteCart(msg);
    } catch (error) {
      console.log(error);
    }
    return bot.sendMessage(
      id,
      "Muchas gracias por comprar en FakeStoreApi, la factura ha sido enviada a su correo electrónico. Si desea continuar, seleccione una de las siguientes opciones:",
      { replyMarkup }
    );
  }
}

// elimina los items intruducidos por el usuario del su carrito
async function removeFromCart(msg) {
  const id = msg.from.id;
  const replyMarkup = cartMenu;
  const regex = /^(1?\d|^20$)+(,(1?\d|20$))*$/;
  const userInput = msg.text;
  if (!regex.test(userInput)) {
    bot.sendMessage(
      id,
      "⚠️Error, debe introducir solamente los numeros de los productos separados por comas. Ej: 1,2,3.",
      { ask: "removeFromCart" }
    );
    return;
  }
  try {
    await apiRemoveFromCart(msg);
    bot.sendMessage(id, "Productos eliminados de su carrito exitosamente", {
      replyMarkup,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  searchProduct,
  getProducts,
  postUser,
  addToCart,
  getCart,
  showMainMenu,
  textDelivery,
  buttonsPayment,
  infoCash,
  infoCrypto,
  infoTransfer,
  printBill,
  removeFromCart,
};
