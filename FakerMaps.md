# Faker map config

Sample type and field maps to mock values, used by [graphql-faker](https://github.com/kristianmandrup/graphql-faker)

### Schema configuration

Generate JSON schema, GraphQL typedefs, Model schemas etc.

```js
const typeMap = {
  Person: {
    match: ['Vehicle', 'Auto'],
    fields: {
      name: {
        type: 'string'
      },
      age: {
        type: 'int',
        range: { min: 0, max: 130 }
      },
      gender: {
        type: 'string',
        enum: ['male', 'female']
      }
    }
  }
};
```

### Sample values configuration

```js
const typeMap = {
  Car: {
    match: ['Vehicle', 'Auto'],
    fields: {
      brand: [
        'Ford',
        'Porsche',
        'Audi',
        'Volvo',
        'Toyota',
        'Fiat',
        'BMW',
        'Mercedes-Benz'
      ]
    }
  },
  Laptop: {
    brand: ['Lenovo', 'Dell', 'HP', 'Acer', 'Asus', 'Apple', 'Razer', 'Samsung']
  }
};

const gender = ['male', 'female'];
const ticker = ['AAPL', 'MSFT', 'GE', 'GOOG', 'CNET', 'JPM', 'NYT'];

const fieldMap = {
  gender: {
    match: ['gender', 'sex'],
    values: gender
  },
  ticker: {
    match: ['ticker', 'symbol', 'stock'],
    values: ticker
  }
};

export const examples = {
  typeMap,
  fieldMap
};
```

### Faker (fake value) configuration

```js
export const typeMap = {
  Person: {
    name: 'fullName'
  },
  User: {
    name: 'userName'
  },
  Company: {
    name: 'companyName'
  },
  Account: {
    name: 'financeAccountName'
  },
  Phone: {
    number: 'phoneNumber'
  },
  File: {
    extension: 'fileExtension'
  },
  Product: {
    name: 'productName',
    category: 'productCategory',
    price: {
      type: 'money',
      options: {
        minMoney: 10,
        maxMoney: 1000,
        decimalPlaces: 2
      }
    },
    discount: {
      type: 'money',
      options: {
        minMoney: 1,
        maxMoney: 800,
        decimalPlaces: 2
      }
    }
  },
  Address: {
    zip: 'zipCode',
    code: 'zipCode'
  }
};

export const fieldMap = {
  email: ['mail', 'sender', 'receiver', 'cc', 'bcc'],
  money: ['price', 'amount', 'value', 'discount'],
  filename: ['file'],
  semver: ['version'],
  fileExtension: ['ext'],
  mimeType: ['mime'],
  lorem: ['text', 'desc', 'description', 'content'],
  word: ['name'],
  words: ['title', "'caption'", 'label'],
  jobTitle: ['job'],
  ipv4Address: ['ip'],
  url: ['url', 'uri'],
  imageUrl: ['image', 'img'],
  phoneNumber: ['phone'],
  financeAccountName: ['account'],
  bankIdentifierCode: ['bic'],
  internationalBankAccountNumber: ['iban'],
  uuid: ['id'],
  dbColumn: ['column', 'class'],
  companyName: ['company'],
  count: ['number'],
  zipCode: ['zip', 'postal'],
  colorName: ['color'],
  longitude: ['lon'],
  latitude: ['lat'],
  productMaterial: ['material'],
  companyCatchPhrase: ['slogan'],
  firstName: ['first'],
  lastName: ['last'],
  alphaNumeric: ['secret', 'key'],
  recentDate: ['created', 'updated', 'changed', 'deleted']
};

export const fakes = {
  typeMap,
  fieldMap
};
```
