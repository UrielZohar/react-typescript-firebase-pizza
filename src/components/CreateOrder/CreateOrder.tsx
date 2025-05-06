import { OrderUI, PizzaSize } from "../../types"
import styles from "./CreateOrder.module.css"

type CreateOrderProps = {
  onCreateOrder: (order: OrderUI) => void
  sizes: Array<PizzaSize> 
}

const CreateOrder = ({
  onCreateOrder,
  sizes
}: CreateOrderProps) => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const size = formData.get("size") as string
    const order: OrderUI = {
      size,
    }
    console.log('order', order)
    onCreateOrder(order)
  }

  return (
    <div>
      <h2>Create Order</h2>
      <form
        className={styles.form}
        onSubmit={onSubmit}
      >
        <label htmlFor="size">Size</label>
        <select id="size" name="size">
          {
            sizes.map(({id, size}) => (
              <option key={id} value={id}>{size}</option>
            ))
          }
        </select>
        <button type="submit">Create Order</button>
      </form>
    </div>
  )
}

export default CreateOrder