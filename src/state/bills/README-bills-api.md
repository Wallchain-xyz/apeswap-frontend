# Bills API

## POST `/bills/widget`

### Body

```typescript
export class WidgetTransactionDTO {
  chainId: number;
  transactionHash: string;
  referenceId: number;
}
```

### POST HTTP Codes

- `CONFLICT | 409` if transactionHash already exists.
- `CREATED | 201` if tx is successfully created in the DB.
- `INTERNAL_SERVER_ERROR | 500` if any error happens.

## GET `/bills/widget`

### Params

```typescript
export class WidgetTransactionFilterDTO {
  chainId?: number;
  referenceId?: number;
  from?: number | Date;
  to?: number | Date;
}
```

### GET HTTP Codes

- `OK | 200` if it founds transactions.
- `NOT_FOUND | 404` if it doesn't found transactions.
- `INTERNAL_SERVER_ERROR | 500` if any error happens.

### Notes

- All params are optional. If any, it will return all transactions.
- Date `from` and `to` is in Epoch Unix Timestamp with ms (1692738000000)
