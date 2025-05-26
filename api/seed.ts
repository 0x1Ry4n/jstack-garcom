import axios from 'axios';
import { fakerPT_BR as faker } from '@faker-js/faker';

const NUM_PRODUCTS = 10;

// const pickRandomElements = <T>(arr: T[], n: number): T[] => {
//   const shuffled = arr.slice().sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, n);
// };

async function seedCategories() {
  console.log('\n🌱 Inserindo categorias...\n');

  const categoryIds: string[] = [];
  const categoryIdToName: Record<string, string> = {};

  const FOOD_CATEGORIES = [
    { name: 'Pizzas', icon: '🍕' },
    { name: 'Massas', icon: '🍝' },
    { name: 'Lanches', icon: '🍔' },
    { name: 'Saladas', icon: '🥗' },
    { name: 'Bebidas', icon: '🥤' },
    { name: 'Sobremesas', icon: '🍰' },
    { name: 'Carnes', icon: '🥩' },
    { name: 'Frutos do Mar', icon: '🦞' },
    { name: 'Cafés', icon: '☕' },
    { name: 'Sopas', icon: '🍲' },
  ];

  for (const cat of FOOD_CATEGORIES) {
    const fakeCategory = {
      name: cat.name,
      icon: cat.icon,
    };

    try {
      const response = await axios.post('http://localhost:3000/categories', fakeCategory);
      console.log(`✅ Categoria criada: ${response.data.name}`);

      const catId = response.data._id || response.data.id || response.data._doc?._id;
      categoryIds.push(catId);
      categoryIdToName[catId] = cat.name;
    } catch (err: any) {
      console.error(`❌ Erro ao criar categoria: ${err.message}`);
    }
  }

  return { categoryIds, categoryIdToName };
}

async function seedProducts(categoryIdToName: Record<string, string>) {
  console.log('\n🍕 Inserindo produtos nas categorias certas...\n');

  const categoryNameToId: Record<string, string> = {};
  for (const [id, name] of Object.entries(categoryIdToName)) {
    categoryNameToId[name] = id;
  }

  const usedProducts = new Set<string>();

  const PRODUCT_NAMES_PT = [
    'Pizza Margherita',
    'Lasanha à Bolonhesa',
    'Hambúrguer Artesanal',
    'Salada Caesar',
    'Suco Natural de Laranja',
    'Bolo de Chocolate',
    'Picanha Grelhada',
    'Camarão ao Alho e Óleo',
    'Café Expresso',
    'Sopa de Legumes',
  ];

  const INGREDIENTS_POOL = [
    { name: 'Mussarela', icon: '🧀' },
    { name: 'Parmesão', icon: '🧀' },
    { name: 'Gorgonzola', icon: '🧀' },
    { name: 'Bacon', icon: '🥓' },
    { name: 'Tomate', icon: '🍅' },
    { name: 'Pepperoni', icon: '🍕' },
    { name: 'Frango', icon: '🍗' },
    { name: 'Cebola', icon: '🧅' },
    { name: 'Alho', icon: '🧄' },
    { name: 'Azeitona', icon: '🫒' },
  ];

  while (usedProducts.size < NUM_PRODUCTS) {
    const productIndex = Math.floor(Math.random() * PRODUCT_NAMES_PT.length);
    const productName = PRODUCT_NAMES_PT[productIndex];

    if (usedProducts.has(productName)) continue;
    usedProducts.add(productName);

    const productIngredientsMap: Record<string, { name: string; icon: string }[]> = {
      'Pizza Margherita': [
        { name: 'Mussarela', icon: '🧀' },
        { name: 'Tomate', icon: '🍅' },
        { name: 'Azeitona', icon: '🫒' },
      ],
      'Lasanha à Bolonhesa': [
        { name: 'Parmesão', icon: '🧀' },
        { name: 'Carne Moída', icon: '🥩' },
        { name: 'Molho de Tomate', icon: '🍅' },
      ],
      'Hambúrguer Artesanal': [
        { name: 'Bacon', icon: '🥓' },
        { name: 'Cebola', icon: '🧅' },
        { name: 'Tomate', icon: '🍅' },
        { name: 'Mussarela', icon: '🧀' },
      ],
      'Salada Caesar': [
        { name: 'Frango', icon: '🍗' },
        { name: 'Alface', icon: '🥬' },
        { name: 'Parmesão', icon: '🧀' },
        { name: 'Molho Caesar', icon: '🥣' },
      ],
      'Suco Natural de Laranja': [
        { name: 'Laranja', icon: '🍊' },
        { name: 'Gelo', icon: '🧊' },
        { name: 'Água', icon: '💧' },
      ],
      'Bolo de Chocolate': [
        { name: 'Chocolate', icon: '🍫' },
        { name: 'Farinha', icon: '🌾' },
        { name: 'Ovos', icon: '🥚' },
        { name: 'Açúcar', icon: '🍬' },
      ],
      'Picanha Grelhada': [
        { name: 'Picanha', icon: '🥩' },
        { name: 'Alho', icon: '🧄' },
        { name: 'Sal Grosso', icon: '🧂' },
      ],
      'Camarão ao Alho e Óleo': [
        { name: 'Camarão', icon: '🦐' },
        { name: 'Alho', icon: '🧄' },
        { name: 'Azeite', icon: '🫒' },
      ],
      'Café Expresso': [
        { name: 'Café', icon: '☕' },
        { name: 'Água', icon: '💧' },
      ],
      'Sopa de Legumes': [
        { name: 'Cenoura', icon: '🥕' },
        { name: 'Batata', icon: '🥔' },
        { name: 'Cebola', icon: '🧅' },
        { name: 'Alho', icon: '🧄' },
      ],
    };

    const rawIngredients = productIngredientsMap[productName] || [];
    const ingredients = rawIngredients.map((ingredient) => ({
      _id: faker.database.mongodbObjectId(),
      ...ingredient,
    }));

    const productDescriptionMap: Record<string, string> = {
      'Pizza Margherita': 'Delicioso prato feito com ingredientes frescos e selecionados.',
      'Lasanha à Bolonhesa': 'Preparado com muito carinho e sabor caseiro.',
      'Hambúrguer Artesanal': 'Receita tradicional com toque especial do chef.',
      'Salada Caesar': 'Combinação perfeita para quem busca sabor e qualidade.',
      'Suco Natural de Laranja': 'Opção leve e saudável para qualquer momento do dia.',
      'Bolo de Chocolate': 'Sobremesa irresistível para adoçar sua refeição.',
      'Picanha Grelhada': 'Carne suculenta grelhada no ponto ideal.',
      'Camarão ao Alho e Óleo': 'Mariscos frescos com temperos especiais.',
      'Café Expresso': 'Bebida quente perfeita para acompanhar seu lanche.',
      'Sopa de Legumes': 'Saborosa e nutritiva, feita com legumes da estação.',
    };

    const productDescription = productDescriptionMap[productName];

    const FOOD_IMAGES_BY_CATEGORY = {
      Pizzas: [
        'https://images.unsplash.com/pt-br/fotografias/uma-pessoa-segurando-uma-pizza-com-calabresa-e-azeitonas-pLsUFfjBq2E',
      ],
      Massas: [
        'https://images.unsplash.com/pt-br/fotografias/macarrao-com-molho-vermelho-no-prato-redondo-de-ceramica-branca-qits91IZv1o&fit=crop&w=640&q=80',
      ],
      Lanches: [
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=640&q=80',
      ],
      Saladas: [
        'https://images.unsplash.com/pt-br/fotografias/salada-de-legumes-na-tigela-de-ceramica-branca-EvoIiaIVRzU&fit=crop&w=640&q=80',
      ],
      Bebidas: [
        'https://images.unsplash.com/pt-br/fotografias/suco-de-laranja-em-copo-transparente-kkrXVKK-jhg&fit=crop&w=640&q=80',
      ],
      Sobremesas: [
        'https://images.unsplash.com/pt-br/fotografias/bolo-de-chocolate-bundt-W1TOhhlbQpw&fit=crop&w=640&q=80',
      ],
      Carnes: [
        'https://images.unsplash.com/pt-br/fotografias/pessoa-cortando-uma-carne-em-tabua-de-madeira-marrom-s-Z-h0fEiBM&fit=crop&w=640&q=80',
      ],
      'Frutos do Mar': [
        'https://images.unsplash.com/pt-br/fotografias/uma-mesa-coberta-com-pratos-de-comida-cobertos-de-pernas-de-caranguejo-txHQ6Snvr5o&fit=crop&w=640&q=80',
      ],
      Cafés: [
        'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=640&q=80',
      ],
      Sopas: [
        'https://images.unsplash.com/pt-br/fotografias/dois-molhos-cobertos-com-sementes-w6ftFbPCs9I&fit=crop&w=640&q=80'
      ],
    };

    const productCategoryNameMap: Record<string, keyof typeof FOOD_IMAGES_BY_CATEGORY> = {
      'Pizza Margherita': 'Pizzas',
      'Lasanha à Bolonhesa': 'Massas',
      'Hambúrguer Artesanal': 'Lanches',
      'Salada Caesar': 'Saladas',
      'Suco Natural de Laranja': 'Bebidas',
      'Bolo de Chocolate': 'Sobremesas',
      'Picanha Grelhada': 'Carnes',
      'Camarão ao Alho e Óleo': 'Frutos do Mar',
      'Café Expresso': 'Cafés',
      'Sopa de Legumes': 'Sopas',
    };

    const categoryName = productCategoryNameMap[productName];
    const categoryId = categoryNameToId[categoryName];
    const images = FOOD_IMAGES_BY_CATEGORY[categoryName] ?? ['https://source.unsplash.com/640x480/?food'];

    const fakeProduct = {
      _id: faker.database.mongodbObjectId(),
      name: productName,
      description: productDescription,
      imagePath: images[Math.floor(Math.random() * images.length)],
      price: Number(faker.commerce.price({ min: 10, max: 80 })),
      ingredients,
      category: categoryId,
    };

    try {
      const response = await axios.post('http://localhost:3000/products', fakeProduct);
      console.log(`✅ Produto criado: ${response.data.name} na categoria ${categoryName}`);
    } catch (err: any) {
      console.error(`❌ Erro ao criar produto: ${err.message}`);
    }
  }
}

async function runSeed() {
  const { categoryIds, categoryIdToName } = await seedCategories();

  if (categoryIds.length === 0) {
    console.error('⚠️ Nenhuma categoria criada, abortando seed dos produtos.');
    return;
  }

  await seedProducts(categoryIdToName);
}

runSeed();
