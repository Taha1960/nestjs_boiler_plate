export interface GetSavingProductParams {
  productId?: string; // now optional
}

export interface GetSavingProductQuery {
  includeInactive?: boolean;
  currency?: string;
}
