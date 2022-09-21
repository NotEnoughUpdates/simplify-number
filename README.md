# Simplify Number

Simplifies large numbers.

## How to install

```sh
yarn add @tanzanite/simplify-number
```

## Usage

```typescript
// ESM only
import simplifyNumber from "@tanzanite/simplify-number";

console.log(simplifyNumber(1000)); // 1k
```

## API

```ts
simplifyNumber(number, config);
```

- `number`: type `number`. example: `1000`
- `config`: type `object`.
  - `abbrev`: type `array`. default: `['k', 'm', 'b', 't']`
  - `decimal`: type `number`. default: `2`

## License

[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2018 - MH Rohman Masyhar
