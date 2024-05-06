import { useMemo } from 'react';
import { useProfileDataValue, useProfileRole, useServiceRoleValue } from 'src/features/recoil';
import { Roles, ServiceRoles } from 'src/shared/types/roles';

export type PermissionsParams = {
  isAdmin: boolean;
  isServiceOwner: boolean;
  isServiceManager: boolean;
  isSeniorRole: boolean;
  isSeniorOwner: boolean;
  isAdminOwner: boolean;
};

export const usePermissions = (): PermissionsParams => {
  const userRole = useProfileRole();
  const seniorRole = useProfileDataValue().senior_service_role.senior_role;
  const serviceRole = useServiceRoleValue();
  const isAdmin = userRole === Roles.admin;
  const isServiceOwner = serviceRole.base === ServiceRoles.owner;
  const isServiceManager = serviceRole.base === ServiceRoles.manager;
  const isSeniorRole = seniorRole === ServiceRoles.owner || seniorRole === ServiceRoles.manager;
  const isSeniorOwner = seniorRole === ServiceRoles.owner;
  const isAdminOwner = isAdmin || isSeniorOwner;
  return useMemo<PermissionsParams>(
    () => ({
      isAdmin,
      isServiceOwner,
      isServiceManager,
      isSeniorRole,
      isSeniorOwner,
      isAdminOwner,
    }),
    [isAdmin, isServiceOwner, isServiceManager, isSeniorRole, isSeniorOwner, isAdminOwner],
  );
};
