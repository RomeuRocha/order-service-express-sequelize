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
  })();

