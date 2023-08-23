const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add,
} = require("../src/math");

test("Should calculate total with tip", () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
});

test("Should calculate total with default tip", () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5);
});

test("Should convert 32 F to 0 C", () => {
  const tempC = fahrenheitToCelsius(32);
  expect(tempC).toBe(0);
});

test("Should conver 0 C to 32 F", () => {
  const tempF = celsiusToFahrenheit(0);
  expect(tempF).toBe(32);
});

test("Async test demo", (done) => {
  setTimeout(() => {
    expect(1).toBe(1);
    done();
  }, 2000);
});

test("Async test demo", async () => {
  await setTimeout(() => {
    expect(1).toBe(1);
  }, 2000);
});

test("Should add two numbers", (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

test("Should add two numbers async/await", async () => {
  const sum = await add(10, 22);
  expect(sum).toBe(32);
});
