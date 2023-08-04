import { user1Entity } from '../../user/test/user.schema.list.mock';

export const jwtPayloadMockUser1 = {
  sub: user1Entity.id,
  userName: user1Entity.name,
  userTenantId: user1Entity.tenant ? user1Entity.tenant.id : null,
  userEmail: user1Entity.email,
  userStatus: user1Entity.status,
  iat: 1689270471,
  exp: 1689270531,
};
