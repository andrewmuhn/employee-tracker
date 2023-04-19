const { asciHeader, menu } = require("./lib");
const cTable = require("console.table");

const init = async () => {
  await asciHeader();
  menu();
};

init();
