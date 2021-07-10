React Native / React JS + Node.js
Criar um app utilizando a TheCocktailDB
Não utilizar Expo
Criar um nome pro app
Dar atenção a paleta de cores, UX e todo detalhe de layout que deixe
o app mais agradável.
O App deve ter o seguinte fluxo Categorias -> Drinks -> Detalhe dos drinks
Não esquecer de mostrar as imagens
Ter sistema de busca conforme o que API tem
Redux Obrigatório,
Unstated, MobX, são diferenciais (não é obrigatório)
Toda a programação em inglês e constâncias no padrão de código (eslint, airbnb) são pontos essênciais.
Se conseguir adicionar videos de Drinks do Youtube e outras integrações são diferenciais
Testes unitários são diferenciais

Backend
Adicionar cadastro, login e favoritos nos drinks
Adicionar funcionalidades no app
Criar API de login, cadastro e favoritos

Drinks
  - idDrink
  - strDrink
  - strDrinkThumb

Drinks Details
  - idDrink
  - strDrink
  - strTags
  - strVideo
  - strCategory
  - strAlcoholic
  - strGlass
  - strInstructions
  - strIngredient[1/15]
  - strDrinkThumb

- Filter by alcoholic
www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic
www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic

- Filter by Category
www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink
www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail

- Filter by Glass
www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass
www.thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute
