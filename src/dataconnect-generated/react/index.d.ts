import { CreateNewUserData, CreateNewUserVariables, GetArtworkByIdData, GetArtworkByIdVariables, UpdateArtworkQuantityData, UpdateArtworkQuantityVariables, ListArtworksByCategoryData, ListArtworksByCategoryVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateNewUser(options?: useDataConnectMutationOptions<CreateNewUserData, FirebaseError, CreateNewUserVariables>): UseDataConnectMutationResult<CreateNewUserData, CreateNewUserVariables>;
export function useCreateNewUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateNewUserData, FirebaseError, CreateNewUserVariables>): UseDataConnectMutationResult<CreateNewUserData, CreateNewUserVariables>;

export function useGetArtworkById(vars: GetArtworkByIdVariables, options?: useDataConnectQueryOptions<GetArtworkByIdData>): UseDataConnectQueryResult<GetArtworkByIdData, GetArtworkByIdVariables>;
export function useGetArtworkById(dc: DataConnect, vars: GetArtworkByIdVariables, options?: useDataConnectQueryOptions<GetArtworkByIdData>): UseDataConnectQueryResult<GetArtworkByIdData, GetArtworkByIdVariables>;

export function useUpdateArtworkQuantity(options?: useDataConnectMutationOptions<UpdateArtworkQuantityData, FirebaseError, UpdateArtworkQuantityVariables>): UseDataConnectMutationResult<UpdateArtworkQuantityData, UpdateArtworkQuantityVariables>;
export function useUpdateArtworkQuantity(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateArtworkQuantityData, FirebaseError, UpdateArtworkQuantityVariables>): UseDataConnectMutationResult<UpdateArtworkQuantityData, UpdateArtworkQuantityVariables>;

export function useListArtworksByCategory(vars: ListArtworksByCategoryVariables, options?: useDataConnectQueryOptions<ListArtworksByCategoryData>): UseDataConnectQueryResult<ListArtworksByCategoryData, ListArtworksByCategoryVariables>;
export function useListArtworksByCategory(dc: DataConnect, vars: ListArtworksByCategoryVariables, options?: useDataConnectQueryOptions<ListArtworksByCategoryData>): UseDataConnectQueryResult<ListArtworksByCategoryData, ListArtworksByCategoryVariables>;
