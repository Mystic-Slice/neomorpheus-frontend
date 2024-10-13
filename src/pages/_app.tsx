import { GeistSans } from "geist/font/sans";
import { AppProps, type AppType } from "next/app";
import Layout from "~/components/custom/layout";
import { UserProvider } from "~/contexts/UserProvider";

import "~/styles/globals.css";
type ComponentWithNoSidebar = {
  noSidebar?: boolean;
};

function MyApp({ Component, pageProps }: AppProps & { Component: ComponentWithNoSidebar }) {
// const MyApp: AppType = ({ Component, pageProps }) => {
  const FinalLayout = Component.noSidebar ? ({ children }: { children: React.ReactNode }) => <>{children}</> : Layout;

  return (
    <div className={GeistSans.className}>
      <UserProvider>
        <FinalLayout>
          <Component {...pageProps} />
        </FinalLayout>
      </UserProvider>
    </div>
  );
};

export default MyApp;
