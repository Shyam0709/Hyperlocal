import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center px-4">
      <FaCheckCircle className="text-green-500 text-6xl mb-4" />
      <h2 className="text-3xl font-bold text-green-700 mb-2">Payment Successful!</h2>
      <p className="text-gray-600 mb-6">Thank you for your booking. Your service has been confirmed.</p>

      <Link
        to="/user"
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default PaymentSuccess;
