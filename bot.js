const TeleBot = require("telebot");
require("dotenv").config();
const bot = new TeleBot({
  token: process.env.TOKEN,
  usePlugins: ["commandButton", "askUser"],
});
module.exports = bot;

const {
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
} = require("./messages");

// mensaje de bienvenida
bot.on("/start", postUser);

// mostrar el menu principal
bot.on(["/mainMenu"], showMainMenu);

// mostrar los 20 productos
bot.on("/showProducts", getProducts);

// esperar input de usuario para buscar el producto
bot.on("/searchProduct", (msg) => {
  let id = msg.from.id;
  bot.sendMessage(
    id,
    "introduzca el id del producto que desea buscar. Ej: 1",
    { ask: "searchProduct" }
  );
});

// buscar producto por id
bot.on("ask.searchProduct", searchProduct);

// esperar input de usuario para añadir el producto al carrito
bot.on("/addToCart", (msg) => {
  let id = msg.from.id;
  bot.sendMessage(
    id,
    "introduzca los ids de los items que desea agregar al carrito, separados por comas. Ej: 1,2,3. Puede repetir el id para incrementar su cantidad",
    { ask: "addToCart" }
  );
});

// añade los productos al carrito por su id
bot.on("ask.addToCart", addToCart);

// mostrar el carrito del usuario
bot.on("/goToCart", getCart);

// calback que recibe los comandos de los botones
bot.on("callbackQuery", (msg) => {
  bot.answerCallbackQuery(msg.id);
});
//INFO DELIVERY
bot.on("/delivery", textDelivery);
//MENU PAYMENT -Info
bot.on("/payment", buttonsPayment);
//import cash
bot.on("/cash", infoCash);
//import crypto
bot.on("/crypto", infoCrypto);
//import transfer
bot.on("/transfer", infoTransfer);

// le pide los datos al usuario para imprimir factura
bot.on("/printBill", (msg) => {
  const id = msg.from.id;
  bot.sendMessage(
    id,
    "Por favor introduzca su nombre, apellido y correo electronico separados por comas. Ej: Nombre,Apellido,email@email.com",
    { ask: "printBill" }
  );
});

// imprime la factura con los datos del usuario
bot.on("ask.printBill", printBill);

// input de los ids de los productos a eliminar del carrito del usuario
bot.on("/removeFromCart", (msg) => {
  const id = msg.from.id;
  bot.sendMessage(
    id,
    "Por favor, introduzca los ids de los productos que desea remover de su carrito, separados por comas. Ej: 1,2,3. Puede repetir el id para desminuir su cantidad",
    { ask: "removeFromCart" }
  );
});

// elimina los items del carrito del usuario
bot.on("ask.removeFromCart", removeFromCart)

bot.connect();
