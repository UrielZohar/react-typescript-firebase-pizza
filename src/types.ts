export type PizzaSize = {
  id: string
  size: string
}

export type OrderUI = {
  size: string
}

export type Order = {
  id: string
  size: string
  userUID: string
  createdAt: Date
}