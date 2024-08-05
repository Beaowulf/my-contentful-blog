import { useEffect } from "react";
import {
  ContentfulLivePreviewProvider,
  initLivePreview,
} from "@contentful/live-preview/react";
import "@/app/globals.css"; // Ensure this is imported

function MyApp({ Component, pageProps }) {
  return (
    <ContentfulLivePreviewProvider
      enableInspectorMode={true} // Optional: allows you to toggle inspector mode which is on by default.
      enableLiveUpdates={true} // Optional: allows you to toggle live updates which are on by default.
      targetOrigin="https://app.contentful.com"
      locale="en-US"
    >
      <Component {...pageProps} />
    </ContentfulLivePreviewProvider>
  );
}

export default MyApp;
