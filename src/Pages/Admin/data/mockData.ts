export interface User {
  id: number;
  name: string;
  email: string;
  ordersCount: number;
  status: 'active' | 'blocked';
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  emoji: string;
}

export interface Review {
  id: number;
  userName: string;
  userInitials: string;
  productName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const users: User[] = [
  { id: 1, name: 'Алина Токтосунова', email: 'alina.tok@example.com', ordersCount: 12, status: 'active' },
  { id: 2, name: 'Бекжан Мамбетов', email: 'bekzhan.m@example.com', ordersCount: 8, status: 'active' },
  { id: 3, name: 'Гүлмира Асанова', email: 'gulmira.a@example.com', ordersCount: 15, status: 'blocked' },
  { id: 4, name: 'Данияр Кадыров', email: 'daniyar.k@example.com', ordersCount: 3, status: 'active' },
  { id: 5, name: 'Элина Жумабекова', email: 'elina.zh@example.com', ordersCount: 21, status: 'active' },
  { id: 6, name: 'Жаныбек Токтогулов', email: 'zhanybek.t@example.com', ordersCount: 6, status: 'active' },
  { id: 7, name: 'Зарина Омурбекова', email: 'zarina.o@example.com', ordersCount: 9, status: 'active' }
];

export const products: Product[] = [
  { id: 1, name: 'Картофельные чипсы Лайс', category: 'Чипсы', price: 120, stock: 45, emoji: '🍟' },
  { id: 2, name: 'Жареный арахис', category: 'Орехи', price: 80, stock: 32, emoji: '🥜' },
  { id: 3, name: 'Сухарики Бородино', category: 'Сухарики', price: 65, stock: 28, emoji: '🍞' },
  { id: 4, name: 'Попкорн сырный', category: 'Попкорн', price: 95, stock: 18, emoji: '🍿' },
  { id: 5, name: 'Семечки подсолнуха', category: 'Семечки', price: 55, stock: 41, emoji: '🌻' },
  { id: 6, name: 'Креветочные снеки', category: 'Снеки', price: 140, stock: 22, emoji: '🦐' },
  { id: 7, name: 'Кукурузные чипсы', category: 'Чипсы', price: 110, stock: 36, emoji: '🌽' },
  { id: 8, name: 'Фисташки соленые', category: 'Орехи', price: 280, stock: 15, emoji: '🟫' }
];

export const reviews: Review[] = [
  {
    id: 1,
    userName: 'Айжан Асылбекова',
    userInitials: 'АА',
    productName: 'Картофельные чипсы Лайс',
    rating: 5,
    comment: 'Отличные чипсы, очень вкусные! Заказываю уже в третий раз.',
    date: '2024-12-15',
    status: 'pending'
  },
  {
    id: 2,
    userName: 'Марат Сулайманов',
    userInitials: 'МС',
    productName: 'Жареный арахис',
    rating: 4,
    comment: 'Хороший арахис, свежий и хрустящий. Рекомендую!',
    date: '2024-12-14',
    status: 'approved'
  },
  {
    id: 3,
    userName: 'Нургуль Эмилбекова',
    userInitials: 'НЭ',
    productName: 'Попкорн сырный',
    rating: 3,
    comment: 'Неплохо, но могло быть и лучше. Сыра маловато.',
    date: '2024-12-13',
    status: 'pending'
  },
  {
    id: 4,
    userName: 'Темирлан Жакыпов',
    userInitials: 'ТЖ',
    productName: 'Сухарики Бородино',
    rating: 5,
    comment: 'Прекрасные сухарики! Очень ароматные, напоминают детство.',
    date: '2024-12-12',
    status: 'approved'
  },
  {
    id: 5,
    userName: 'Жамила Бекмурзаева',
    userInitials: 'ЖБ',
    productName: 'Семечки подсолнуха',
    rating: 4,
    comment: 'Семечки свежие, легко чистятся. Качество хорошее.',
    date: '2024-12-11',
    status: 'pending'
  },
  {
    id: 6,
    userName: 'Арстан Омуралиев',
    userInitials: 'АО',
    productName: 'Креветочные снеки',
    rating: 5,
    comment: 'Необычный вкус, очень понравилось! Буду заказывать еще.',
    date: '2024-12-10',
    status: 'approved'
  },
  {
    id: 7,
    userName: 'Калыс Токтосунов',
    userInitials: 'КТ',
    productName: 'Кукурузные чипсы',
    rating: 2,
    comment: 'Слишком соленые, не понравились. Ожидал большего.',
    date: '2024-12-09',
    status: 'rejected'
  },
  {
    id: 8,
    userName: 'Санжар Алымкулов',
    userInitials: 'СА',
    productName: 'Фисташки соленые',
    rating: 5,
    comment: 'Отличные фисташки! Дорого, но качество того стоит.',
    date: '2024-12-08',
    status: 'approved'
  },
  {
    id: 9,
    userName: 'Мээрим Абдрахманова',
    userInitials: 'МА',
    productName: 'Жареный арахис',
    rating: 4,
    comment: 'Вкусный арахис, хорошая упаковка. Доставка быстрая.',
    date: '2024-12-07',
    status: 'pending'
  },
  {
    id: 10,
    userName: 'Эркин Матиев',
    userInitials: 'ЭМ',
    productName: 'Попкорн сырный',
    rating: 3,
    comment: 'Обычный попкорн, ничего особенного. За такую цену ожидал лучше.',
    date: '2024-12-06',
    status: 'pending'
  }
];