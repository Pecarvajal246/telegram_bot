const bot = require("./bot");
const buttons = {
  showProducts: {
    label: "🛍️ Productos",
    command: "/showProducts",
  },
  payment: {
    label: "💳 Métodos de pago",
    command: "/payment",
  },
  delivery: {
    label: "🚚 Delivery",
    command: "/delivery",
  },
  crypto: {
    label: "₿ Crypto",
    command: "/crypto",
  },
  cash: {
    label: " 💵 Efectivo",
    command: "/cash",
  },
  transfer: {
    label: "🏦 Transferencia",
    command: "/transfer",
  },
  backToMain: {
    label: "⬅️ Regresar",
    command: "/mainMenu",
  },
  backToProducts: {
    label: "⬅️ Regresar a productos",
    command: "/showProducts",
  },
  searchProduct: {
    label: "🔍 Buscar producto",
    command: "/searchProduct",
  },
  addToCart: {
    label: "🛒 Añadir al carrito",
    command: "/addToCart",
  },
  goToCart: {
    label: "🛒 Ir al carrito",
    command: "/goToCart",
  },
  printBill: {
    label: "🧾 Imprimir factura",
    command: "/printBill",
  },
};

// menu principal
const mainMenu = bot.inlineKeyboard([
  [
    bot.inlineButton(buttons.showProducts.label, {
      callback: buttons.showProducts.command,
    }),
  ],
  [
    bot.inlineButton(buttons.delivery.label, {
      callback: buttons.delivery.command,
    }),
  ],
  [
    bot.inlineButton(buttons.payment.label, {
      callback: buttons.payment.command,
    }),
  ],
]);

// submenu de productos
const productsMenu = bot.inlineKeyboard([
  [
    bot.inlineButton(buttons.searchProduct.label, {
      callback: buttons.searchProduct.command,
    }),
    bot.inlineButton(buttons.addToCart.label, {
      callback: buttons.addToCart.command,
    }),
  ],
  [
    bot.inlineButton(buttons.backToMain.label, {
      callback: buttons.backToMain.command,
    }),
    bot.inlineButton(buttons.goToCart.label, {
      callback: buttons.goToCart.command,
    }),
  ],
]);

// Menu con los resultados de la busqueda
const productResultMenu = bot.inlineKeyboard([
  [
    bot.inlineButton(buttons.backToProducts.label, {
      callback: buttons.backToProducts.command,
    }),
  ],
]);

// Menu despues de agregar productos al carrito
const cartMenu = bot.inlineKeyboard([
  [
    bot.inlineButton(buttons.backToProducts.label, {
      callback: buttons.backToProducts.command,
    }),
    bot.inlineButton(buttons.goToCart.label, {
      callback: buttons.goToCart.command,
    }),
  ],
]);
//MENU PAYMENT
const payMenu = bot.inlineKeyboard([
  [
    bot.inlineButton(buttons.cash.label, {
      callback: buttons.cash.command,
    }),
    bot.inlineButton(buttons.crypto.label, {
      callback: buttons.crypto.command,
    }),
  ],
  [
    bot.inlineButton(buttons.transfer.label, {
      callback: buttons.transfer.command,
    }),
  ],
  [
    bot.inlineButton(buttons.backToMain.label, {
      callback: buttons.backToMain.command,
    }),
  ],
]);

// Menu para Imprimir la factura
const billMenu = bot.inlineKeyboard([
  [
    bot.inlineButton(buttons.backToProducts.label, {
      callback: buttons.backToProducts.command,
    }),
    bot.inlineButton(buttons.printBill.label, {
      callback: buttons.printBill.command,
    }),
  ],
]);

const emptyCartMenu = bot.inlineKeyboard([
  [
    bot.inlineButton(buttons.backToProducts.label, {
      callback: buttons.backToProducts.command,
    }),
  ],
]);



module.exports = {
  mainMenu,
  productsMenu,
  productResultMenu,
  cartMenu,
  payMenu,
  billMenu,
  emptyCartMenu,
};
