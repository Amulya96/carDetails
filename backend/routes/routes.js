const express = require("express");
const router = express.Router();
const carDetailsTemplateCopy = require("../modules/carModules");

router.post("/carDetails", (request, response) => {
  const carDetails = new carDetailsTemplateCopy();
  ({
    manufacturer: request.body.manufacturer,
    carName: request.body.carName,
    carType: request.body.carType,
    color: request.body.color,
  });
  carDetails
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json(error);
    });
});

module.exports = router;
