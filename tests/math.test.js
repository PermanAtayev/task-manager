const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math');

test('Should calculate with tip', () => {
    const total = calculateTip(10, .3);
    expect(total).toBe(13);
})

test('Should calculate with default tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
})

test('Should convert fahrenheitToCelsius', () => {
    const total = fahrenheitToCelsius(32);
    expect(total).toBe(0);
})

test('Should convert celsius to fahrenheit', () => {
    const total = celsiusToFahrenheit(0);
    expect(total).toBe(32);
})

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2);
//         done();
//     }, 2000);
// })

test('Should add 2 numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5);
        done();
    }) 
});

test('Should add two number async/await', async () => {
    const sum = await add(2, 3);
    expect(sum).toBe(5);
});

