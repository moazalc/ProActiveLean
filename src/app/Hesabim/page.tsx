"use client";

import { UserProfileComponent } from "@/components/account/user-profile";
import { UserProfile } from "@/types/users";
import { SetStateAction } from "react";

const dummyUser = {
  id: 1,
  firstName: "John",
  lastName: "Mcdonald",
  email: "GoaheadMrjohn@ankara.com",
  username: "johnmcdonald",
  password: "123456",
  phone: "1234567890",
  createdAt: new Date(),
  lastLogin: new Date(),
  roleId: 1,
  avatar: "",
  role: { id: 1, name: "Certified Forklift User", isAuditor: false },
  canAudit: false,
};

export default function AccountPage() {
  return (
    <div className="container mx-auto p-4 ">
      <div className="grid">
        <UserProfileComponent
          user={dummyUser}
          onChange={function (value: SetStateAction<UserProfile>): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  );
}
