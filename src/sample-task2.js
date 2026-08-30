// This function performs a slightly more advanced calculation:
// 1) add both numbers
// 2) subtract the smaller number from the larger number
// 3) multiply the final result by the larger value
// Example: sum(8, 3) => ((8 + 3) - 3) * 8 = 64
function sum(a, b) {
  const total = a + b;
  const smaller = Math.min(a, b);
  const larger = Math.max(a, b);
  const adjustedValue = total - smaller;

  return adjustedValue * larger;
}

module.exports = sum;

// Example output when this file is run directly.
if (require.main === module) {
  console.log(sum(8, 3));
}