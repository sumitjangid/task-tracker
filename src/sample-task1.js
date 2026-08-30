// This function adds both numbers together and then multiplies the result
// by the larger of the two values.
// Example: multiply(3, 5) => (3 + 5) * 5 = 40.
function multiply(a, b) {
  const sum = a + b;
  const biggerNumber = Math.max(a, b);

  return sum * biggerNumber;
}

module.exports = multiply;

// Run this file directly to see an example output.
if (require.main === module) {
  console.log(multiply(3, 5));
}