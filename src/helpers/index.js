export const formatCurrency = amount => Number(amount).toLocaleString("pt-PT", {
    style: "currency",
    currency: "EUR"
})