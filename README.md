
# Order Anything

It lets customers sign up using their phone no, and order almost anything, the order is assigned to a delivery person by admin, where he can see order details, and delivery person can update its status.



## API Reference

#### to register 

```http
  POST /api/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `phone` | `string` | **Required**. Your phone number |
| `name` | `string` | **Required**. Your name |


#### to verify otp 

```http
  POST /api/auth/verify
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `otp` | `string` | **Required**. 6 digit otp |


#### to login

```http
  POST /api/auth/login_with_phone
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `phone` | `string` | **Required**. Your phone number |


#### Get current user

```http
  GET /api/auth/me/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `currentUser`|`string` | **Required**. Id of item to fetch |



#### to delivery

```http
  POST /api/delivery/status
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `status` | `string` | **Required**. current status |

* same for fetching status

#### Get current user

```http
  POST /api/delivery/new
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productName`|`string` | **Required**. Id of item to fetch |
| `addrress`|`string` | **Required**. Id of item to fetch |
| `qusntity`|`number` | **Required**. Id of item to fetch |

#### GET Current order

```http
  GET /api/order/view
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `currentOrder`|`string` | **Required**. Id of item to fetch |


#### POST Create new order

```http
  POST /api/order/new
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productName`|`string` | **Required**. Id of item to fetch |
| `address`|`string` | **Required**. Id of item to fetch |
| `quantity`|`Number` | **Required**. Id of item to fetch |



#### GET fetch all Product

```http
  GET /api/products/view
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `allProducts`|`string` | **Required**. Id of item to fetch |


#### POST Create new prodeucts

```http
  POST /api/products/new
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productName`|`string` | **Required**. Id of item to fetch |
| `address`|`string` | **Required**. Id of item to fetch |


#### PUT Update Product

```http
  PUT /api/products/view/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `allProducts`|`string` | **Required**. Id of item to fetch |
