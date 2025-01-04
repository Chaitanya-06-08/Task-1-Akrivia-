const { faker } = require("@faker-js/faker");

const returnTimeStamp = () => {
  const ISOString = faker.date.future().toISOString();
  return ISOString.split("T")[0] + " " + ISOString.split("T")[1].split(".")[0];
};

module.exports.generateRandomAirlinesData = (count = 1) => {
  const airlines = [];
  const userIds = [1, 2, 3];
  for (let i = 0; i < count; i++) {
    airlines.push({
      airlineName: faker.company.name(),
      flightNumber: faker.string.alphanumeric({ length: 6, casing: "upper" }),
      departureAirport: faker.location.city(),
      arrivalAirport: faker.location.city(),
      departureTime: returnTimeStamp(),
      arrivalTime: returnTimeStamp(),
      ticketPrice: faker.commerce.price({ min: 100, max: 1000, dec: 2 }),
      seatNumber: faker.string.alphanumeric({ length: 4, casing: "upper" }),
      passengerName: faker.person.fullName(),
      passengerEmail: faker.internet.email(),
      passengerPhone: faker.phone.number({ style: "international" }),
      userID: faker.helpers.arrayElement(userIds),
    });
  }
  return airlines;
};

module.exports.returnTimeStamp = returnTimeStamp;
