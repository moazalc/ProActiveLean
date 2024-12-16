import CustomerReview from "./musteri-yorumlari";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomerReview />
    </Suspense>
  );
}
