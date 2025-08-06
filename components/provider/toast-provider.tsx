// components/ToastProvider.js
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-center" // You can customize the position
      reverseOrder={false} // Reverses the order of toasts
      gutter={8} // Gap between toasts
      toastOptions={{
        // Customize toast options here
        duration: 4000,
        style: {
          background: "#fff",
          color: "black",
        },
      }}
    />
  );
};

export default ToastProvider;
