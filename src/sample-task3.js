// BIGSUM performs a custom calculation:
// 1) add the two values
// 2) multiply the sum by the larger number
// 3) then add the smaller number to the final result
// Example: BIGSUM(4, 6) => ((4 + 6) * 6) + 4 = 64
function BIGSUM(a, b) {
  const total = a + b;
  const larger = Math.max(a, b);
  const smaller = Math.min(a, b);

  return (total * larger) + smaller;
}

module.exports = BIGSUM;

// Example output when this file is run directly.
if (require.main === module) {
  console.log(BIGSUM(4, 6));
}