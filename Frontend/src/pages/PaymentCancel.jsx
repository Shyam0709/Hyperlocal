const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-4">
      <h2 className="text-3xl font-bold text-red-700 mb-2">Payment Cancelled</h2>
      <p className="text-gray-600 mb-6">Your payment was not completed.</p>
      <Link
        to="/"
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
      >
        Return Home
      </Link>
    </div>
  );
};

export default PaymentCancel;
