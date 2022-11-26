import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { AuthContextProvider } from "../context/AuthContext";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <div className="pt-32 md:pt-16">
          <Component {...pageProps} />
        </div>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
