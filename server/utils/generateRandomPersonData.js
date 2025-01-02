const { faker } = require("@faker-js/faker");
module.exports.generateRandomPersonData = (count = 1000) => {
  const people = [];
  for (let i = 0; i < count; i++) {
    people.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
      phone: faker.phone.number({
        style: "international",
      }),
      birthdate: faker.date
        .birthdate({ min: 18, max: 80, mode: "age" })
        .toISOString()
        .split("T")[0],
    });
  }
  return people;
};
