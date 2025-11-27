import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface ArtistProfile_Key {
  id: UUIDString;
  __typename?: 'ArtistProfile_Key';
}

export interface Artwork_Key {
  id: UUIDString;
  __typename?: 'Artwork_Key';
}

export interface CreateNewUserData {
  user_insert: User_Key;
}

export interface CreateNewUserVariables {
  displayName: string;
  email: string;
  passwordHash: string;
}

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

export interface GetArtworkByIdVariables {
  artworkId: UUIDString;
}

export interface ListArtworksByCategoryData {
  artworks: ({
    id: UUIDString;
    title: string;
    imageUrl: string;
    price: number;
  } & Artwork_Key)[];
}

export interface ListArtworksByCategoryVariables {
  category: string;
}

export interface OrderItem_Key {
  orderId: UUIDString;
  artworkId: UUIDString;
  __typename?: 'OrderItem_Key';
}

export interface Order_Key {
  id: UUIDString;
  __typename?: 'Order_Key';
}

export interface UpdateArtworkQuantityData {
  artwork_update?: Artwork_Key | null;
}

export interface UpdateArtworkQuantityVariables {
  artworkId: UUIDString;
  quantityAvailable: number;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateNewUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewUserVariables): MutationRef<CreateNewUserData, CreateNewUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewUserVariables): MutationRef<CreateNewUserData, CreateNewUserVariables>;
  operationName: string;
}
export const createNewUserRef: CreateNewUserRef;

export function createNewUser(vars: CreateNewUserVariables): MutationPromise<CreateNewUserData, CreateNewUserVariables>;
export function createNewUser(dc: DataConnect, vars: CreateNewUserVariables): MutationPromise<CreateNewUserData, CreateNewUserVariables>;

interface GetArtworkByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetArtworkByIdVariables): QueryRef<GetArtworkByIdData, GetArtworkByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetArtworkByIdVariables): QueryRef<GetArtworkByIdData, GetArtworkByIdVariables>;
  operationName: string;
}
export const getArtworkByIdRef: GetArtworkByIdRef;

export function getArtworkById(vars: GetArtworkByIdVariables): QueryPromise<GetArtworkByIdData, GetArtworkByIdVariables>;
export function getArtworkById(dc: DataConnect, vars: GetArtworkByIdVariables): QueryPromise<GetArtworkByIdData, GetArtworkByIdVariables>;

interface UpdateArtworkQuantityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateArtworkQuantityVariables): MutationRef<UpdateArtworkQuantityData, UpdateArtworkQuantityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateArtworkQuantityVariables): MutationRef<UpdateArtworkQuantityData, UpdateArtworkQuantityVariables>;
  operationName: string;
}
export const updateArtworkQuantityRef: UpdateArtworkQuantityRef;

export function updateArtworkQuantity(vars: UpdateArtworkQuantityVariables): MutationPromise<UpdateArtworkQuantityData, UpdateArtworkQuantityVariables>;
export function updateArtworkQuantity(dc: DataConnect, vars: UpdateArtworkQuantityVariables): MutationPromise<UpdateArtworkQuantityData, UpdateArtworkQuantityVariables>;

interface ListArtworksByCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListArtworksByCategoryVariables): QueryRef<ListArtworksByCategoryData, ListArtworksByCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListArtworksByCategoryVariables): QueryRef<ListArtworksByCategoryData, ListArtworksByCategoryVariables>;
  operationName: string;
}
export const listArtworksByCategoryRef: ListArtworksByCategoryRef;

export function listArtworksByCategory(vars: ListArtworksByCategoryVariables): QueryPromise<ListArtworksByCategoryData, ListArtworksByCategoryVariables>;
export function listArtworksByCategory(dc: DataConnect, vars: ListArtworksByCategoryVariables): QueryPromise<ListArtworksByCategoryData, ListArtworksByCategoryVariables>;

