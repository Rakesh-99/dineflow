import DashboardStats from "@/pages/DashboardStats"
import ShopOrders from "./ShopOrders"

const Dashboard = () => {
  return (
    <>
    <div className="">
      <DashboardStats/>
      <div className="px-5">
        <ShopOrders/>
      </div>
    </div>
    </>
  )
}

export default Dashboard