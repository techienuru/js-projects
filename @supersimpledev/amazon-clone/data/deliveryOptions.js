export const deliveryOptions = [
  {
    deliveryId: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  { deliveryId: "2", deliveryDays: 3, priceCents: 499 },
  { deliveryId: "3", deliveryDays: 1, priceCents: 999 },
];

export function getDeliveryOption(deliveryOptionId) {
  // Get delivery option that matches the ID in deliveryOptions array
  let matchingdeliveryOption;
  deliveryOptions.forEach((deliveryOption) => {
    if (deliveryOption.deliveryId === deliveryOptionId) {
      matchingdeliveryOption = deliveryOption;
    }
  });

  return matchingdeliveryOption;
}

export function calculateDeliveryDate(deliveryOption) {
  //  Calculating the delivery date and adding to the date
  const todaysDate = dayjs();
  let daysToAdd = deliveryOption.deliveryDays;
  let totalDaysToAdd = 0;
  // Exclude weekend from the added days
  while (daysToAdd != 0) {
    totalDaysToAdd++;
    const dayCalculated = todaysDate.add(totalDaysToAdd, "days").format("dddd");
    if (dayCalculated === "Saturday" || dayCalculated === "Sunday") {
      continue;
    }
    daysToAdd--;
  }
  const deliveryDate = todaysDate.add(totalDaysToAdd, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");
  return dateString;
}
