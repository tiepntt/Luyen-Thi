export enum Role {
  Admin = "Admin",
  Teacher = "Teacher",
  Student = "Student",
}
export const roleDefaults = [
  {
    name: "Quản trị viên",
    value: Role.Admin,
  },
  {
    name: "Thành viên",
    value: Role.Student,
  },
  {
    name: "Thành viên",
    value: Role.Teacher,
  },
];
export const getRoles = (roles: Role[]) => {
  if (!roles.length) {
    return roleDefaults.find((i) => i.value === Role.Student);
  }
  if (roles.includes(Role.Admin)) {
    return roleDefaults.find((i) => i.value === Role.Admin);
  } else if (roles.includes(Role.Teacher)) {
    return roleDefaults.find((i) => i.value === Role.Teacher);
  } else if (roles.includes(Role.Student)) {
    return roleDefaults.find((i) => i.value === Role.Student);
  }
};
