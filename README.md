# Inventory Management and History Service

## Описание
Проект состоит из двух независимых сервисов:
1. **Inventory Service** - управление товарами и их остатками в магазинах.
2. **History Service** - отслеживание действий с товарами и остатками.

Оба сервиса используют PostgreSQL для хранения данных и взаимодействуют через REST API.

---

## Запуск

### Требования
- Node.js 16+
- PostgreSQL
- Установленный `npm`

### Установка
1. Склонируйте репозиторий:
   ```bash
   git clone <repo-url>
   cd <repo-folder>
Установите зависимости:
bash
 
npm install

## Запуск Inventory Service
npm start

## Запуск History Service
npm run logger

## API Endpoints
### Inventory Service

1. Создание товара
POST /api/products
Body:
json
 
{
  "plu": "12345",
  "name": "Example Product"
}
2. Создание остатка
POST /api/inventories
Body:
json
 
{
  "product_id": 1,
  "shop_id": 1,
  "quantity_on_shelf": 20,
  "quantity_in_order": 5
}
3. Увеличение/уменьшение остатка
PATCH /api/inventories/:id
Body:
json
 
{
  "quantity_on_shelf": 5,
  "quantity_in_order": -3
}
4. Получение остатков
GET /api/inventories
Query Params:
plu (optional)
shop_id (optional)
quantity_on_shelf_from и quantity_on_shelf_to (optional)
quantity_in_order_from и quantity_in_order_to (optional)
5. Получение товаров
GET /api/products
Query Params:
name (optional)
plu (optional)

### History Service
1. Добавление записи истории
POST /api/history
Body:
json
 
{
  "action": "CREATE_STOCK",
  "plu": "12345",
  "shop_id": 1,
  "quantity_changed": 25,
  "old_quantity": 0,
  "new_quantity": 25,
  "date": "2024-11-21T10:43:08.277Z"
}
2. Получение истории действий
GET /api/history
Query Params:
shop_id (optional)
plu (optional)
date_from и date_to (optional)
action (optional)
page и limit (optional, для пагинации)
