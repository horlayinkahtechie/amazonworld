import React, { Suspense } from "react";
import CheckoutSuccessPage from "./success";

export default function page() {
  return (
    <div>
      <Suspense>
        <CheckoutSuccessPage />
      </Suspense>
    </div>
  );
}
