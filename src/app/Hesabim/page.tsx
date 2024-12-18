"use client";

import { UserProfileComponent } from "@/components/account/user-profile";

const dummyUser = {
  id: 1,
  firstName: "John",
  lastName: "Mcdonald's",
  email: "John@proactivelean.com",
  phone: "+90 555 123 4567",
  role: "Certified Chicken Nuggets Eater",
  canAudit: false,
};

export default function AccountPage() {
  return (
    <div className="container mx-auto p-4 ">
      <div className="grid">
        <UserProfileComponent user={dummyUser} />
      </div>
    </div>
  );
}
