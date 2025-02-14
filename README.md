# Frontend Mentor - Product list with cart solution

Este projeto foi desenvolvido como parte do desafio do Frontend Mentor, mas adaptado para atender aos requisitos do teste prático de Desenvolvedor(a) Front-End Shopify e Integrações. O desafio original do Frontend Mentor não exigia o uso da FakeStore API, mas como esse era um requisito do teste prático, fiz a mescla dos dois. Assim, além dos produtos que já existiam no desafio da plataforma, adicionei uma nova categoria de produtos utilizando a FakeStore API. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

O Desafio

Os usuários devem ser capazes de:

Adicionar itens ao carrinho e removê-los

Aumentar/diminuir a quantidade de itens no carrinho

Ver um modal de confirmação do pedido ao clicar em "Confirmar Pedido"

Redefinir suas seleções ao clicar em "Iniciar Novo Pedido"

Visualizar o layout ideal da interface, dependendo do tamanho da tela do dispositivo

Ver os estados de foco e hover para todos os elementos interativos da página

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it. 

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- HTML5 semântico
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- TailwindCSS
- FakeStore API - API utilizada para buscar produtos adicionais

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

O que Aprendi

Neste projeto, aprimorei minhas habilidades ao integrar uma API externa e organizar os dados dentro da aplicação. A divisão dos produtos em categorias permitiu uma experiência mais rica para o usuário.

Exemplo de consumo da FakeStore API:

```html
fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => console.log(data));
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

Recursos Úteis

- FakeStore API Docs - Documentação da API utilizada

- Vite Documentation - Documentação do Vite para otimização do build

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

Autor

Website - Adicionar nome aqui

Frontend Mentor - @yourusername

GitHub - @yourusername
**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**



# Running the Application
- Prerequisites
- Node.js (latest LTS version recommended)
- npm (comes with Node.js)
# Installation
- First, install all the required dependencies:
 ```
npm install
```
- Development Mode
- To run the application in development mode:
```
npm run dev
```
- This will start the development server, typically at http://localhost:5173. The page will automatically reload when you make changes to the code.
