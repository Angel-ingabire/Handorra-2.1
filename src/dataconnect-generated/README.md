# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetArtworkById*](#getartworkbyid)
  - [*ListArtworksByCategory*](#listartworksbycategory)
- [**Mutations**](#mutations)
  - [*CreateNewUser*](#createnewuser)
  - [*UpdateArtworkQuantity*](#updateartworkquantity)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetArtworkById
You can execute the `GetArtworkById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getArtworkById(vars: GetArtworkByIdVariables): QueryPromise<GetArtworkByIdData, GetArtworkByIdVariables>;

interface GetArtworkByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetArtworkByIdVariables): QueryRef<GetArtworkByIdData, GetArtworkByIdVariables>;
}
export const getArtworkByIdRef: GetArtworkByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getArtworkById(dc: DataConnect, vars: GetArtworkByIdVariables): QueryPromise<GetArtworkByIdData, GetArtworkByIdVariables>;

interface GetArtworkByIdRef {
  ...
  (dc: DataConnect, vars: GetArtworkByIdVariables): QueryRef<GetArtworkByIdData, GetArtworkByIdVariables>;
}
export const getArtworkByIdRef: GetArtworkByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getArtworkByIdRef:
```typescript
const name = getArtworkByIdRef.operationName;
console.log(name);
```

### Variables
The `GetArtworkById` query requires an argument of type `GetArtworkByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetArtworkByIdVariables {
  artworkId: UUIDString;
}
```
### Return Type
Recall that executing the `GetArtworkById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetArtworkByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetArtworkByIdData {
  artwork?: {
    id: UUIDString;
    title: string;
    imageUrl: string;
    price: number;
    artistProfile: {
      id: UUIDString;
      artistName: string;
    } & ArtistProfile_Key;
  } & Artwork_Key;
}
```
### Using `GetArtworkById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getArtworkById, GetArtworkByIdVariables } from '@dataconnect/generated';

// The `GetArtworkById` query requires an argument of type `GetArtworkByIdVariables`:
const getArtworkByIdVars: GetArtworkByIdVariables = {
  artworkId: ..., 
};

// Call the `getArtworkById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getArtworkById(getArtworkByIdVars);
// Variables can be defined inline as well.
const { data } = await getArtworkById({ artworkId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getArtworkById(dataConnect, getArtworkByIdVars);

console.log(data.artwork);

// Or, you can use the `Promise` API.
getArtworkById(getArtworkByIdVars).then((response) => {
  const data = response.data;
  console.log(data.artwork);
});
```

### Using `GetArtworkById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getArtworkByIdRef, GetArtworkByIdVariables } from '@dataconnect/generated';

// The `GetArtworkById` query requires an argument of type `GetArtworkByIdVariables`:
const getArtworkByIdVars: GetArtworkByIdVariables = {
  artworkId: ..., 
};

// Call the `getArtworkByIdRef()` function to get a reference to the query.
const ref = getArtworkByIdRef(getArtworkByIdVars);
// Variables can be defined inline as well.
const ref = getArtworkByIdRef({ artworkId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getArtworkByIdRef(dataConnect, getArtworkByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.artwork);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.artwork);
});
```

## ListArtworksByCategory
You can execute the `ListArtworksByCategory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listArtworksByCategory(vars: ListArtworksByCategoryVariables): QueryPromise<ListArtworksByCategoryData, ListArtworksByCategoryVariables>;

interface ListArtworksByCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListArtworksByCategoryVariables): QueryRef<ListArtworksByCategoryData, ListArtworksByCategoryVariables>;
}
export const listArtworksByCategoryRef: ListArtworksByCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listArtworksByCategory(dc: DataConnect, vars: ListArtworksByCategoryVariables): QueryPromise<ListArtworksByCategoryData, ListArtworksByCategoryVariables>;

interface ListArtworksByCategoryRef {
  ...
  (dc: DataConnect, vars: ListArtworksByCategoryVariables): QueryRef<ListArtworksByCategoryData, ListArtworksByCategoryVariables>;
}
export const listArtworksByCategoryRef: ListArtworksByCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listArtworksByCategoryRef:
```typescript
const name = listArtworksByCategoryRef.operationName;
console.log(name);
```

### Variables
The `ListArtworksByCategory` query requires an argument of type `ListArtworksByCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListArtworksByCategoryVariables {
  category: string;
}
```
### Return Type
Recall that executing the `ListArtworksByCategory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListArtworksByCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListArtworksByCategoryData {
  artworks: ({
    id: UUIDString;
    title: string;
    imageUrl: string;
    price: number;
  } & Artwork_Key)[];
}
```
### Using `ListArtworksByCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listArtworksByCategory, ListArtworksByCategoryVariables } from '@dataconnect/generated';

// The `ListArtworksByCategory` query requires an argument of type `ListArtworksByCategoryVariables`:
const listArtworksByCategoryVars: ListArtworksByCategoryVariables = {
  category: ..., 
};

// Call the `listArtworksByCategory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listArtworksByCategory(listArtworksByCategoryVars);
// Variables can be defined inline as well.
const { data } = await listArtworksByCategory({ category: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listArtworksByCategory(dataConnect, listArtworksByCategoryVars);

console.log(data.artworks);

// Or, you can use the `Promise` API.
listArtworksByCategory(listArtworksByCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.artworks);
});
```

### Using `ListArtworksByCategory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listArtworksByCategoryRef, ListArtworksByCategoryVariables } from '@dataconnect/generated';

// The `ListArtworksByCategory` query requires an argument of type `ListArtworksByCategoryVariables`:
const listArtworksByCategoryVars: ListArtworksByCategoryVariables = {
  category: ..., 
};

// Call the `listArtworksByCategoryRef()` function to get a reference to the query.
const ref = listArtworksByCategoryRef(listArtworksByCategoryVars);
// Variables can be defined inline as well.
const ref = listArtworksByCategoryRef({ category: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listArtworksByCategoryRef(dataConnect, listArtworksByCategoryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.artworks);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.artworks);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateNewUser
You can execute the `CreateNewUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNewUser(vars: CreateNewUserVariables): MutationPromise<CreateNewUserData, CreateNewUserVariables>;

interface CreateNewUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewUserVariables): MutationRef<CreateNewUserData, CreateNewUserVariables>;
}
export const createNewUserRef: CreateNewUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNewUser(dc: DataConnect, vars: CreateNewUserVariables): MutationPromise<CreateNewUserData, CreateNewUserVariables>;

interface CreateNewUserRef {
  ...
  (dc: DataConnect, vars: CreateNewUserVariables): MutationRef<CreateNewUserData, CreateNewUserVariables>;
}
export const createNewUserRef: CreateNewUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNewUserRef:
```typescript
const name = createNewUserRef.operationName;
console.log(name);
```

### Variables
The `CreateNewUser` mutation requires an argument of type `CreateNewUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNewUserVariables {
  displayName: string;
  email: string;
  passwordHash: string;
}
```
### Return Type
Recall that executing the `CreateNewUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNewUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNewUserData {
  user_insert: User_Key;
}
```
### Using `CreateNewUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNewUser, CreateNewUserVariables } from '@dataconnect/generated';

// The `CreateNewUser` mutation requires an argument of type `CreateNewUserVariables`:
const createNewUserVars: CreateNewUserVariables = {
  displayName: ..., 
  email: ..., 
  passwordHash: ..., 
};

// Call the `createNewUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNewUser(createNewUserVars);
// Variables can be defined inline as well.
const { data } = await createNewUser({ displayName: ..., email: ..., passwordHash: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNewUser(dataConnect, createNewUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createNewUser(createNewUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateNewUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNewUserRef, CreateNewUserVariables } from '@dataconnect/generated';

// The `CreateNewUser` mutation requires an argument of type `CreateNewUserVariables`:
const createNewUserVars: CreateNewUserVariables = {
  displayName: ..., 
  email: ..., 
  passwordHash: ..., 
};

// Call the `createNewUserRef()` function to get a reference to the mutation.
const ref = createNewUserRef(createNewUserVars);
// Variables can be defined inline as well.
const ref = createNewUserRef({ displayName: ..., email: ..., passwordHash: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNewUserRef(dataConnect, createNewUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateArtworkQuantity
You can execute the `UpdateArtworkQuantity` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateArtworkQuantity(vars: UpdateArtworkQuantityVariables): MutationPromise<UpdateArtworkQuantityData, UpdateArtworkQuantityVariables>;

interface UpdateArtworkQuantityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateArtworkQuantityVariables): MutationRef<UpdateArtworkQuantityData, UpdateArtworkQuantityVariables>;
}
export const updateArtworkQuantityRef: UpdateArtworkQuantityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateArtworkQuantity(dc: DataConnect, vars: UpdateArtworkQuantityVariables): MutationPromise<UpdateArtworkQuantityData, UpdateArtworkQuantityVariables>;

interface UpdateArtworkQuantityRef {
  ...
  (dc: DataConnect, vars: UpdateArtworkQuantityVariables): MutationRef<UpdateArtworkQuantityData, UpdateArtworkQuantityVariables>;
}
export const updateArtworkQuantityRef: UpdateArtworkQuantityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateArtworkQuantityRef:
```typescript
const name = updateArtworkQuantityRef.operationName;
console.log(name);
```

### Variables
The `UpdateArtworkQuantity` mutation requires an argument of type `UpdateArtworkQuantityVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateArtworkQuantityVariables {
  artworkId: UUIDString;
  quantityAvailable: number;
}
```
### Return Type
Recall that executing the `UpdateArtworkQuantity` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateArtworkQuantityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateArtworkQuantityData {
  artwork_update?: Artwork_Key | null;
}
```
### Using `UpdateArtworkQuantity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateArtworkQuantity, UpdateArtworkQuantityVariables } from '@dataconnect/generated';

// The `UpdateArtworkQuantity` mutation requires an argument of type `UpdateArtworkQuantityVariables`:
const updateArtworkQuantityVars: UpdateArtworkQuantityVariables = {
  artworkId: ..., 
  quantityAvailable: ..., 
};

// Call the `updateArtworkQuantity()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateArtworkQuantity(updateArtworkQuantityVars);
// Variables can be defined inline as well.
const { data } = await updateArtworkQuantity({ artworkId: ..., quantityAvailable: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateArtworkQuantity(dataConnect, updateArtworkQuantityVars);

console.log(data.artwork_update);

// Or, you can use the `Promise` API.
updateArtworkQuantity(updateArtworkQuantityVars).then((response) => {
  const data = response.data;
  console.log(data.artwork_update);
});
```

### Using `UpdateArtworkQuantity`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateArtworkQuantityRef, UpdateArtworkQuantityVariables } from '@dataconnect/generated';

// The `UpdateArtworkQuantity` mutation requires an argument of type `UpdateArtworkQuantityVariables`:
const updateArtworkQuantityVars: UpdateArtworkQuantityVariables = {
  artworkId: ..., 
  quantityAvailable: ..., 
};

// Call the `updateArtworkQuantityRef()` function to get a reference to the mutation.
const ref = updateArtworkQuantityRef(updateArtworkQuantityVars);
// Variables can be defined inline as well.
const ref = updateArtworkQuantityRef({ artworkId: ..., quantityAvailable: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateArtworkQuantityRef(dataConnect, updateArtworkQuantityVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.artwork_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.artwork_update);
});
```

