import { useMemo } from 'react';
import { useProfileDataValue, useProfileRole } from 'src/features/recoil';
import { Roles, ServiceRoles } from 'src/shared/types/roles';

export type PermissionsParams = {
  isAdmin: boolean;
  isSeniorRole: boolean;
  isSeniorOwner: boolean;
  isAdminOwner: boolean;
};

export const usePermissions = (): PermissionsParams => {
  const userRole = useProfileRole();
  const seniorRole = useProfileDataValue().senior_service_role.senior_role;
  const isAdmin = userRole === Roles.admin;
  const isSeniorRole = seniorRole === ServiceRoles.owner || seniorRole === ServiceRoles.manager;
  const isSeniorOwner = seniorRole === ServiceRoles.owner;
  const isAdminOwner = isAdmin || isSeniorOwner;
  return useMemo<PermissionsParams>(
    () => ({
      isAdmin,
      isSeniorRole,
      isSeniorOwner,
      isAdminOwner,
    }),
    [isAdmin, isSeniorRole, isSeniorOwner, isAdminOwner],
  );
};
