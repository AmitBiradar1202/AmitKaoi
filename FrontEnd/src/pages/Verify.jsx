import axios from 'axios';
import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopContext } from "../context/ShopContext";
const Verify = () => {
    const { navigate, backendUrl, token, cartItem, setCartItem, delivery_fee, getCartAmount, products } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get(success);
    const orderId = searchParams.get(orderId);

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null;
            }
            const response = await axios.post("https://amitkaoi.onrender.com/api/order/verifyStripe", { success, orderId }, { headers: { token } })
            if (response.data.success) {
                setCartItem({})
                navigate('/orders');
            }
            else {
                navigate('/home')
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    }
    useEffect(() => {

    }, [token])
    return (
        <div>
    
        </div>
    )
}

export default Verify
