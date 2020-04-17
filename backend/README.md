## Migrations
 ** Para executar as migrations
 * npx typeorm migration:run
 ou
 * npm run migrate

 ** Para criar nova migrations
 * npx typeorm migrations:create -n ${NOME_ARQUIVOS}

 ** Rodar qualquer comando com cli TYPEORM
 * ./node_modules/.bin/ts-node ./node_modules/.bin/typeorm  ${comando}