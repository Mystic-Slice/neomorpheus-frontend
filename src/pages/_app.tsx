import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import { UserProvider } from "~/contexts/UserProvider";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </div>
  );
};

export default MyApp;
