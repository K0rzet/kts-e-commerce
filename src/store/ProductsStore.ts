import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { IGetProductsParams, IProduct } from '@/types/products.types';
import productsService from '@/services/products.service';
import { Meta } from '@/constants/meta';
import { ILocalStore } from '@/hooks/useLocalStore';
import { CollectionModel, getInitialCollectionModel } from '@/utils/collection';

type PrivateFields = '_products' | '_meta' | '_totalCount' | '_isInitialized' | '_lastUsedCategoryId';


export class ProductsStore implements ILocalStore {
  private _products: CollectionModel<number, IProduct> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _totalCount: number = 0;
  private _isInitialized: boolean = false;
  private _lastUsedCategoryId: number | undefined = undefined;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _products: observable.ref,
      _meta: observable,
      _totalCount: observable,
      _isInitialized: observable,
      _lastUsedCategoryId: observable,
      products: computed,
      meta: computed,
      totalCount: computed,
      getProducts: action,
    });
  }

  get products(): IProduct[] {
    return Object.values(this._products.entities);
  }

  get meta(): Meta {
    return this._meta;
  }

  get totalCount(): number {
    return this._totalCount;
  }

  async getProducts({limit = 9, offset = 0, title, categoryId}: Partial<IGetProductsParams>): Promise<void> {
    try {
      this._meta = Meta.loading;
      
      const productsResponse = await productsService.getProducts({limit, offset, title, categoryId});

      const shouldUpdateTotalCount = !this._isInitialized || 
        title !== undefined || 
        categoryId !== undefined || 
        (this._lastUsedCategoryId !== undefined && categoryId === undefined);

      if (shouldUpdateTotalCount) {
        const totalCountResponse = await productsService.getProducts({
          title,
          categoryId
        });
        runInAction(() => {
          this._totalCount = totalCountResponse.data.length;
          this._isInitialized = true;
          this._lastUsedCategoryId = categoryId;
        });
      }

      runInAction(() => {
        this._products = {
          order: productsResponse.data.map(product => product.id),
          entities: productsResponse.data.reduce((acc, product) => {
            acc[product.id] = product;
            return acc;
          }, {} as Record<number, IProduct>)
        };
        this._meta = Meta.success;
      });
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error;
      });
      console.error('Failed to fetch products:', error);
    }
  }

  destroy(): void {
    this._products = getInitialCollectionModel();
    this._totalCount = 0;
    this._isInitialized = false;
    this._lastUsedCategoryId = undefined;
    this._meta = Meta.initial;
  }
}