export class General {
  formatRatingStars(ratings) {
    return ratings * 10;
  }

  formatCurrency(priceCents) {
    return (Math.round(priceCents) / 100).toFixed(2);
  }
}
