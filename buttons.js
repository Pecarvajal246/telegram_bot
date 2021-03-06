const bot = require("./bot");
const buttons = {
  showProducts: {
    label: "ðï¸ Productos",
    command: "/showProducts",
  },
  payment: {
    label: "ð³ MÃ©todos de pago",
    command: "/payment",
  },
  delivery: {
    label: "ð Delivery",
    command: "/delivery",
  },
  crypto: {
    label: "â¿ Crypto",
    command: "/crypto",
  },
  cash: {
    label: " ðµ Efectivo",
    command: "/cash",
  },
  transfer: {
    label: "ð¦ Transferencia",
    command: "/transfer",
  },
  backToMain: {
    label: "â¬ï¸ Regresar",
    command: "/mainMenu",
  },
  backToProducts: {
    label: "â¬ï¸ Regresar a productos",
    command: "/showProducts",
  },
  searchProduct: {
    label: "ð Buscar producto",
    command: "/searchProduct",
  },
  addToCart: {
    label: "ð AÃ±adir al carrito",
    command: "/addToCart",
  },
  goToCart: {
    label: "ð Ir al carrito",
    command: "/goToCart",
  },
  removeFromCart: {
    label: "ð Remover del carrito",
    command: "/removeFromCart",
  },
  printBill: {
    label: "ð§¾ Imprimir factura",
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
    bot.inlineButton(buttons.searchProduct.label, {
      callback: buttons.searchProduct.command,
    }),
    bot.inlineButton(buttons.addToCart.label, {
      callback: buttons.addToCart.command,
    }),
  ],
  [
    bot.inlineButton(buttons.backToProducts.label, {
      callback: buttons.backToProducts.command,
    }),
    bot.inlineButton(buttons.goToCart.label, {
      callback: buttons.goToCart.command,
    }),
  ]
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
    bot.inlineButton(buttons.removeFromCart.label, {
      callback: buttons.removeFromCart.command,
    }),
  ],
  [
    bot.inlineButton(buttons.printBill.label, {
      callback: buttons.printBill.command,
    }),
  ]
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
