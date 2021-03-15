
const db = require("../models");

(async () => {
  await db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

  const romeu = await db.clients.create({
    name: "Romeu Rocha",
    birthDate: '1995-04-14 19:52:50'
  }).then(
    console.log("sucesso!")
  ).catch((err) => {
    console.log(">> Error while creating Client: ", err);
  });

  const order1 = await db.orders.create({
    value: parseFloat('400.00'),
    clientId: romeu.id,
  }).then(
    console.log("sucesso!")
  ).catch((err) => {
    console.log(">> Error while creating order: ", err);
  });

  const s1 = await db.services.create({
    description: "Manutenção em notebook",
    value: parseFloat('100.00'),
  }).then(
    console.log("sucesso!")
  ).catch((err) => {
    console.log(">> Error while creating service: ", err);
  });

  const itemservice1 = await db.itemServices.create({
    value: parseFloat('100.00'),
    serviceId: s1.id,
    orderId: order1.id
  }).then(
    console.log("sucesso!")
  ).catch((err) => {
    console.log(">> Error while creating itemService: ", err);
  });

  const prod1 = await db.products.create({
    name: "Memória Ram DDR - 4GB ",
    value: parseFloat('300.00'),
  }).then(
    console.log("sucesso!")
  ).catch((err) => {
    console.log(">> Error while creating product: ", err);
  });

  const itemProduct1 = await db.itemProducts.create({
    value: parseFloat('300.00'),
    productId: prod1.id,
    quantity: 1,
    orderId: order1.id
  }).then(
    console.log("sucesso!")
  ).catch((err) => {
    console.log(">> Error while creating itemProduct: ", err);
  });

  const device1 = await db.devices.create({
    name: 'Computador'
  }).then(
    console.log("sucesso!")
  ).catch(err => {
    console.log(">> Error while creating itemProduct: ", err)
  })

})();

