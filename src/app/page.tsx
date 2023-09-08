import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Hero from "./components/Hero/Hero";
function Page() {

  return (
    <div>
      <Hero />
      <ToastContainer />
    </div>
  );
}

export default Page;
