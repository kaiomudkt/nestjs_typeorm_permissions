export type UserLogged = {
  id: string;
  status: string;
  name: string;
  email: string;
  tenantId: string;
  /**
   * determina se usuário logado pertentece ao tenant "LESSOR_ROOT"
   * o tenant "LESSOR_ROOT" é para usuários de "atendimento ao cliente" e outros funções que prestam suporte aos tenants
   */
  isLessorRoot: boolean;
  roles?: [];
  capabilities?: [];
};
