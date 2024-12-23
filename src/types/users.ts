export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password?: string;
  phone?: string;
  createdAt: Date;
  lastLogin?: Date;
  roleId: number;
  avatar?: string;
  role?: { id: number; name: string; isAuditor: boolean };
}

export interface UserProfile {
  createdAt: string | number | Date;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password?: string;
  phone?: string;
  roleId: number;
  avatar?: string;
  role?: { id: number; name: string; isAuditor: boolean };
}

export interface AccountSettings {
  locations: string[];
  departments: string[];
  roles: string[];
  selectedLocations: string[];
  selectedDepartments: string[];
  selectedRoles: string[];
}
