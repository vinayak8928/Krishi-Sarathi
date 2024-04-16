// cartUtils.js

export const calculateSubtotal = (cartItems, durationOptions, durationInput) => {
    let subtotalValue = cartItems.reduce((acc, item) => {
      const duration = durationOptions[item.seed] || "hours";
      const durationValue = durationInput[item.seed] || 1;
      let subtotal = item.price;
      // Check the duration selected for each item and adjust the price accordingly
      if (duration === "hours") {
        subtotal *= item.qty * durationValue; // Multiply by the number of hours
      } else if (duration === "days") {
        subtotal *= item.qty * 10 * durationValue; // Multiply by 10X the number of days
      } else if (duration === "weeks") {
        subtotal *= item.qty * 60 * durationValue; // Multiply by 60X for weeks
      }
      return acc + subtotal;
    }, 0); 
    return subtotalValue.toFixed(2);
  };
  