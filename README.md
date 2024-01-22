# Projeto Incentive.me

<div align="center">
  
![image](https://github.com/matheusscarvalho1/projeto-selecao/assets/73304785/1c32024b-1a0f-47d6-9f74-3e3266bb35ff)

</div>

O projeto escolhido foi "Plataforma de pagamentos" desenvolvido com <strong>React.JS</strong>, estilizado com <strong>Material UI</strong> e com navegação utilizando <strong>React Router</strong>

## Pré requisitos

Você precisa ter instalado o [NodeJS](https://nodejs.org/) (Recomendado: versão 18) e o npm ou yarn.

Também é necessário uma IDE, recomendo o [VSCode](https://code.visualstudio.com/)

## Tecnologias utilizadas no projeto

- [ReactJs versão 18.2.0](https://pt-br.legacy.reactjs.org)
- [MaterialUI versão 5.14.18](https://mui.com/material-ui/)

## Como rodar o projeto

Para instalar as bibliotecas e dependências:

```bash
npm i
```

Após instalar, basta utilizar o comando:

```bash
npm start
```

Depois, é só abrir [http://localhost:3000](http://localhost:3000) no seu navegador.


# Requisitos
### O usuário deve ser capaz de:

- Fazer login e logout na aplicação ✅
- Criar pagamentos ✅
- Ver os pagamentos ✅
- Apagar um pagamento ✅
- Editar o nome de um pagamento ✅
- Criar saldos ✅
- Ver os saldos ✅
- Apagar um saldo ✅
- Editar o nome de um saldo ✅

### Os pagamentos devem possuir:
- Nome ✅
- Descrição ✅
- Valor ✅
- Um saldo vinculado ✅

### Os saldos devem possuir:
- Nome ✅
- Descrição ✅
- Valor inicial ✅
- Valor restante ✅

### O sistema deve:
- Gerenciar o valor restante em de um saldo ✅
- Impedir que um saldo seja vinculado a um pagamento se o valor restante no saldo for menor que o do pagamento ✅
- Impedir que um saldo seja excluído caso um pagamento esteja vinculado a ele ✅
- Consumir o valor restante de um saldo quando o mesmo for usado em um pagamento ✅
- Devolver o valor consumido em um saldo se o pagamento a ele vinculado for excluído ✅


# Resultados
## Página inicial
<div align="center">
<p align="left">
• A tela inicial possibilita o usuário a fazer login através do botão 'Login' a direita da tela e também acessar ao menu lateral clicando no "Hamburger menu" localizado à esquerda da tela.
</p> 
  
![image](https://github.com/matheusscarvalho1/projeto-selecao/assets/73304785/02983d8e-a75b-4063-a664-2635c89e6020)
</div>
<div align="center">
<p align="left">
• Ao clicar no botão login: será pedido para o usuário preencher com o e-mail e senha para fazer login no sistema
</p> 
  
![image](https://github.com/matheusscarvalho1/projeto-selecao/assets/73304785/ee1996e2-8750-4d1a-a6c4-c9abfdc887d1)
</div>
<div align="center">
<p align="left">
• Ao clicar em 'Entrar' o usuário será redirecionado para a página inicial com o seu email que foi adicionado no login na direita da tela do usuário.
</p> 
  
![image](https://github.com/matheusscarvalho1/projeto-selecao/assets/73304785/aecf65d8-6ce5-4cb9-8326-986a2e527cc6)

</div>

<div align="center">
<p align="left">
• Ao clicar no menu será aberto as opções para o usuário.
</p> 
  
![image](https://github.com/matheusscarvalho1/projeto-selecao/assets/73304785/93977fcc-857e-43ab-9788-a16540562a7e)


</div>

## Seção Saldos
<div align="center">
<p align="left">
• Ao clicar na esção saldo você será redirecionado para a rota "/saldos"
</p> 
  
![image](https://github.com/matheusscarvalho1/projeto-selecao/assets/73304785/5908c658-0096-4497-92ba-5d14b749a045)


</div>
<div align="center">
<p align="left">
• Para criar um saldo basta clicar em "Criar saldo" e preencher o campo conforme o sistema pede
</p> 
  
![image](https://github.com/matheusscarvalho1/projeto-selecao/assets/73304785/5908c658-0096-4497-92ba-5d14b749a045)

![image](https://github.com/matheusscarvalho1/projeto-selecao/assets/73304785/992d67c1-afeb-4b30-b1d7-f9b36d98dc83)



</div>

<div align="center">
<p align="left">
• Logo após cadastrar será exibido o cadastro na tabela Saldos com as informações "ID, Nome, Descrição, Valor Inicial, Valor utilizado e Valor restante" também possui as funcionalidades de apagar e editar o cadastro do saldo
</p> 

  ![image](https://github.com/matheusscarvalho1/projeto-selecao/assets/73304785/deba9335-4d2f-42c9-83d1-6e2e899ba63d)

</div>

## Seção Pagamentos
<div align="center">
<p align="left">
• Agora com o saldo cadastrado é possível adicionar um pagamento, pois um pagamento só é permitido ser registrado no sistema se ele é vinculado a algum saldo previamente cadastrado.
</p> 

  ![image](https://github.com/matheusscarvalho1/projeto-selecao/assets/73304785/84a4f0d6-1a3f-4a0f-9b10-5b2696879aff)
  ![image](https://github.com/matheusscarvalho1/projeto-selecao/assets/73304785/80b53374-e64c-4bfd-90b7-ecac8c1d9e11)



</div>
<div align="center">
<p align="left">
• Para criar um saldo basta clicar em "Criar saldo" e preencher o campo conforme o sistema pede.
</p> 

![image](https://github.com/matheusscarvalho1/projeto-selecao/assets/73304785/f573d779-30f9-4435-b6e1-c6bef7976f2d)

<p align="left">
• Observe que ao preencher o cadastro de pagamento tem o campo saldo, e as opções são todos os saldo cadastrados na seção saldos, como nesse exemplo foi criado somente um, somente ele aparecerá nas opções, mostrando o Valor inicial que foi adicionado na seção Saldo e o valor disponível de saldo caso tenha mais pagamentos associados a esse saldo, esse saldo ele irá atualizar conforme um pagamento associado a ele for excluido (será reembolsado o valor do pagamento), ou caso um pagamento for associado a esse saldo (será gasto do valor do pagamento).
  
</p>

![image](https://github.com/matheusscarvalho1/projeto-selecao/assets/73304785/c1b02cd2-1ddc-4cc9-8a48-5f970983f7bb)

<p align="left">
• Ao preencher todos os campos, basta clicar em 'Registrar Pagamento'
  
</p>
</div>
<div align="center">
<p align="left">
• Logo após cadastrar será exibido o cadastro na tabela Pagamentos com as informações "ID, Nome, Descrição, Valor e Saldo vinculado" também possui as funcionalidades de apagar e editar o cadastro do pagamento
</p> 

 ![image](https://github.com/matheusscarvalho1/projeto-selecao/assets/73304785/c11233fb-d44b-4a79-840d-49a66c208976)



</div>

<div align="center">
<p align="left">
• Depois do cadastro do pagamento, ao voltar para a tabela Saldos pelo menu lateral a esquerda é possível ver que o pagamento anexado ao saldo que foi selecionado foi Utilizado, nós preenchemos o formulário de pagamento com o valor de 2000 num saldo cadastrado de 3000, então o valor restante é 1000, como consta na tabela atualizada de saldos abaixo:
</p> 
  
![image](https://github.com/matheusscarvalho1/projeto-selecao/assets/73304785/f616de3e-31f2-4933-b8ae-4355acd11c30)

• Caso o usuário tente apagar o saldo que tem um pagamento vinculado, o sistema informa que não é possível, pois para apagar o saldo é preciso primeiro apagar todos os pagamentos vinculados a esse saldo.
![image](https://github.com/matheusscarvalho1/projeto-selecao/assets/73304785/3dcafc88-b3e7-40d4-ae99-eda748941a53)


</div>
## Logout
<div align="center">
<p align="left">
• E por ultimo, mas não menos importante a função de Logout, para acessa-la basta clicar no menu lateral e clicar no botão "Sair da conta"
</p> 

 ![image](https://github.com/matheusscarvalho1/projeto-selecao/assets/73304785/bc12c9e8-ad26-49f2-80f3-1b2017e83de2)

 ![image](https://github.com/matheusscarvalho1/projeto-selecao/assets/73304785/75278f15-4dbc-49e5-82c0-c05d5a60eabd)

</div>

# Autor

<b>Matheus de Souza Carvalho</b>

LinkedIn:
[https://www.linkedin.com/in/matheusscarvalho/](https://www.linkedin.com/in/matheusscarvalho/)

E-mail:
matheusdocarvalho@gmail.com

</div>
