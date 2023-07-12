## Tecnologias

- npm
- postgres
- typeorm
- jest
- moongose
- *email
- keyclock

## Description

- Sistema web com a funcionalidade de usuário com cargo e suas respectivas permissões;
- podem ser criados diversos tipos de usuários, e cada cargo só pode ser atribuido a um tipo ou mais
- suporte a multi-tenancy: cada usuario pode estar relacionado com varios tenant
    - mas em cada tenant de criar um novo user, pois cada tenant deve ser todalmente independente 


### arquitetura
Por padrão o Nest.js tem um arquitetura de software orientado a serviços,
mas neste caso estamos se inspirando como o clean architecture é orientado a camada de dominio,
desta forma podemos criar novos conceitos, como camadas e arquivos, mas tentando ao maximo não alterar o padrão do framework,
pois o objetivo é usar o framework simplesmente como uma ferramenta a nosso favor, e não lutar contra o framework tentando mudar a forma em que foi planejada por seus criadores

- entity: camada do ORM
- domain: camada que aplica a regra de negócio 

### niveis de acesso

1ª valida se o usuário logado tem cargo com a permissão de realizar a ação do serviço
    - exemplo: somente usuários admininstrdores tem permissão de realizar essa ação
2ª valida se o usuario logado tem autorização sobre o dado que esta interagindo 
    - exemplo: usuario logado nao tem autorização para interagir com dados de outro tenant
    - exemplo: usuário logado não tem autorização para interagir com dados de outros usuários
3ª valida se o dado que esta interagindo permite a ação 
    - exemplo: status do dado não permite realizar essa ação 
4ª o sistema terá um tenant ROOT, aonde estará os usuário de suporte e atendimento ao cliente

## arquitetura de software
- esta arquitetura de software é baseada em dominio, diferente da arquitetura padrão fornecida pelo Nest.js que prove uma arquitetura de software orientada a serviço;
- a camada de dominio tem por responsabilidade de unificar e isolar a regra de negocio pura em suas entidades (entity), e o fluxo de execução dessas regras nos caso de uso (usecase)
- por nesta aplicação a camada de dominio esta separada, aonde o dominio não pode depender de nada que não pertença a propria camada de dominio. Implicando que exista um isolamento da camada de dominio das outras camadas, incluindo a separação do proprio Nest.js, Typeorm, Jest e outras ferramentas, e este é o "limite arquitetural" de dependencias entre as camadas.
- O isolamento da camada de dominio faz com que esta tenha que quase somente typescript puro, podendo depender somente de ferramentas extramente estaveis, como por exemplo tipagem da "data-hora";
- a camada de "service" do Nest.js tem a responsabilidade de executar o "usecase" e caso seja necessario fluxo de serviços que não aplicam regra de negocio do dominio, como por exemplo, envio de email;
- a camada de "service" do Nest.js tem a responsabilidade verificar se o usuário logado tem a permissão do cargo
- a camada de "usecase" do Domain tem a responsabilidade de verificar se o usuário logado tem capacidade de executar está ação de acordo com as regra de negocio dos dados
    - exemplo: usuário logado não pode realizar está ação caso esteja com status pendente;
    - exemplo: usuário logado não pode realizar está ação caso update-password de outro usuário;
- a camada de "usecase" do Domain tem a responsabilidade de verificar se a tupla em que o usuario logado esta interagindo permite a ação
    - exemplo:o "cargo-sub-gerente-1" está com o status "lotado", e por isso não pode ser adicionado um novo usuário a este cargo;
- em aplicações multi-tenancy, a camada de "service" a partir do payload do JWT, é responsavel para verificar se o usuario logado tem a cargo/permissão no tenant desejado
- em aplicações multi-tenancy, vários inquilinos (tenants) compartilham a mesma instância da aplicação, você pode seguir uma abordagem em que cada solicitação é roteada para o tenant correto com base em algum critério, como um subdomínio, um cabeçalho personalizado ou um parâmetro de URL.
- todas as entidades do typeorm devem ser criados com o sufixo ".typeorm.schema.impl.js"
### recomendações de como desenvolver
- Um módulo contém toda a lógica associada a um domínio específico. É recomendado seguir de forma sensata o princípio da Responsabilidade Única do SOLID. Isso significa que cada módulo deve se preocupar apenas com seu próprio domínio e não com outros domínios. Esta regra pode ser quebrado caso julgue que o "trade-off" de tardar sua decisão de executar essa separação somente quando houver real necessidade tenha um custo beneficio satisfatorio;
- Deixe todas as bibliotecas, pacotes e qualquer outro importação de terceiros fora da camada de domínio. Pois tudo que esta dentro da camada de dominio só pode depender quase que exclusivamente da propria camada de dominio. Salve em caso que ha necessidade compense, como por exemplo tipagem de data-hora;
- Em teoria, você deve ser capaz de recortar e colar sua camada de domínio em qualquer projeto (dependente do idioma) e deve funcionar.
- cada "entidade forte" tende a ter seu proprio modulo;
- existem casos em que "entidade fraca" deve ser um submodulo de uma "entidade forte", mas por padrão tente criar um módulo separado, para não fazer o módulo "pai" não tenha dependencia somente por causa de seu submodulo;
- Se a entidade depende de outra(s) entidade externa, então talvez seja interessante cria-lo em um módulo separado, e não em submodulo, para que assim o modulo em que ela dependa não seja obrigado tambem ter suas respectivas dependencias;
- entidade "pivot" de junção em um relacionamento "M:M", só irão necessitar de controller e service caso tenha necessidade de expor externamente seus recursos como por exemplo REST, GraphQL e WebSockets. Mas caso o relacionamento de junção seja incorporado por algum dos lados do relacionamento "M:M", então recomendasse quem em seu respectivo módulo que seja criado um submodulo. Lembrando que isso pode fazer que seu módulo dependa de outro, assim aumentando a profundidade dos niveis de dependencias;
- a diferença entre "src/infra/gateways/external" e "src/infra/gateways/internal"
    - internal: são serviços de "conexão" com outro serviço, que está sendo usado exclusivamente internamente no sistema
    - external: são serviços com regra de negocio, que podem ser usados por outros sistemas, e que inclusive tem potencial para se tornar um microserviço caso haja necessidade
- alem de se preocupar com o princio da responsabilidade unica, tenha cuidado de se preocupar "motivação unica", pois alem de fazer que uma função tenha somente uma responsabilidade, considere em replicar essa função varias vezes se por preciso para manter sua unica motivação de existe, pois para cada motivo como um "service", "usecase" ou "repository" é um motivo diferente o porque esta usando esta função, com motivos diferentes de existir, consequentimente pode acontecer de com o passar do tempo cada função evoluir de forma idependente, tornando oque inicialmente era identico cada vez mais responsabilidades distintas. Mas lembre de que dentro da entidade de dominio nunca não pode haver replicação de código de regra de negocio;

### ornanização do multi-tenancy
- Uma unica instancia/instalação/"ambiente de produção" do sistema;
- Aonde existe uma empresa que é proprietaria do sistema e será chamada de "locador/Lessor";
- As companhias que fizerem o "Arrendamento/Tenancy" com o "locador/Lessor", se tornará um "inquilino/tenant";
- assim cada "inquilino/tenant" é separado dos demais, mas todos os "inquilinos/tenants" compartilham o mesmo "locador/Lessor" que é a empresa proprietaria do sistema;
- para que o sistema tenha sua propria equipe de atendimento/suporte as "companhias/tenants", será criado um tenant ROOT, chamado de "LESSOR_ROOT" para representar o proprio "locador/Lessor", que para simplificar o software tambem será um tenant, mas com acesso a qualquer outro tenant;
- futuramente poderá ser implementado o conceito de "matriz e filiais", aonde um tenant será a matriz de muitas filiais, sendo que cada filial tambem é um tenant;

### etapas para criar um novo endpoint
1ª criar arquivo NOME.repository.interface.ts
2ª criar arquivo NOME.usecase.ts
3ª criar arquivo NOME.typeorm.repo.impl.ts 
4ª na service.ts instanciar o "usecase.ts", passaram como parametro o a instancia do "typeorm.repo.impl.ts"

### keyclock
- http://localhost:9080/auth/admin
- login = Autenticação (processo de verificar a identidade de um usuário, geralmente por meio de credenciais, como nome de usuário e senha)
- OAuth 2 = Autorização (direitos e permissões concedidos a um usuário autenticado)
- Open ID Connet = (OAuth 2) + (login)
- realm: backend-nestjs
- dentro do "realm", "client" com "access type" como "public" para o frontend
- dentro do "realm", "client" com "access type" como "confidential" para o backend
    - na aba "Credentials", copie o texto do campo "secret" e cole no arquivo keyclock.http
## instalação em ambiente de desenvolvimento

```bash
$ npm install
$ sudo docker-compose down -v
$ sudo docker-compose up
# arquivo .env ENVIRONMENT_TYPE="DEVELOPMENT"
$ npm run start:dev
```

#### Migrations
```bash
# cria nova migration, lembre de passar o nome e depois de mover a migration para o diretorio 
# path: src/infra/gateways/internal/db/typeorm/migrations/
$ npm run typeorm:migrate-create NomeDaMigration
# Executa as migrations
$ npm run typeorm:migrate-up
```

### cli nest
```bash
# gera modulo com CRUD
$ nest resource modules/nome-do-modulo
```

## License

Nest is [MIT licensed](LICENSE).
