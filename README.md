## General

Basic CRUD application for users to register, login and transfer funds

Users are assigned a JWT which is valid for 15 minutes after signing up / logging in

Users must provide JWT in the header of transfer requests

Contains docker-compose for the postgresql db

Prisma used as the ORM

## Endpoints

```bash
POST
# /auth/register

{
  "username":"stanMarsh",
  "email":"stanMarsh@hotmail.com",
  "password":"tegridy"
}
- Throws an error (500) if Username/Email do not exist
- Throws an error (500) if Username/Email/Password are empty
- Throws an error if Email is not correctly formatted
- Returns bearer token
- Valid for 15 minutes
- Assigns user a Bank Account on creation with 0 balance
```

```bash
POST
# /auth/login

{
  "username":"stanMarsh",
  "password":"tegridy"
}
- Throws an error (500) if Username/Password are empty
- Throws an error (500) if Username/Password combination is invalid
- Returns bearer token
- Valid for 15 minutes
```

```bash
POST
# /user/transfer

Header:
  Authorization : <JWT>
{
  "amount": 500.00,
  "accountIdSender": 1,
  "accountIdReceiver": 2
}

- Account must have sufficient balance
- Requestor must own the account, verified by Authorization Token otherwise Throws an error (400)
- Updates Balances
- Saves Transaction
```

```bash
POST
# /deposit/create

Used for funding accounts to test transfer features


{
    "AccountID": 1,
    "Value": 1000
}
```
