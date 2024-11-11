import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { IProduct } from '../types/products.types';
import productsService from '../services/products.service';
import { Meta } from '../constants/meta';
import { ILocalStore } from '../hooks/useLocalStore';
import { CollectionModel, getInitialCollectionModel, normalizeCollection } from '../utils/collection';

type PrivateFields = '_products' | '_meta' | '_totalCount';

export default class ProductsStore implements ILocalStore {
  private _products: CollectionModel<number, IProduct> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _totalCount: number = 0;
  private _abortController: AbortController | null = null;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _products: observable.ref,
      _meta: observable,
      _totalCount: observable,
      products: computed,
      meta: computed,
      totalCount: computed,
      getProducts: action
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

  async getProducts(
    limit: number, 
    offset: number, 
    title?: string, 
    categoryIds?: number[]
  ): Promise<void> {
    if (this._abortController) {
      this._abortController.abort();
    }

    this._abortController = new AbortController();

    runInAction(() => {
      this._meta = Meta.loading;
    });

    try {
      let productsResponse;
      let allProducts: IProduct[] = [];

      if (categoryIds && categoryIds.length > 0) {
        const categoryPromises = categoryIds.map(categoryId =>
          productsService.getProductsByCategory(categoryId)
        );
        const categoryResults = await Promise.all(categoryPromises);
        
        allProducts = categoryResults.flatMap(result => result);

        if (title) {
          allProducts = allProducts.filter(product => 
            product.title.toLowerCase().includes(title.toLowerCase())
          );
        }

        productsResponse = {
          data: allProducts.slice(offset, offset + limit)
        };
      } else {
        productsResponse = await productsService.getProducts(limit, offset, title);
        
        const allProductsResponse = await productsService.getProducts(undefined, undefined, title);
        allProducts = allProductsResponse.data;
      }

      if (!this._abortController.signal.aborted) {
        runInAction(() => {
          this._products = normalizeCollection(
            productsResponse.data,
            (product) => product.id
          );
          this._totalCount = allProducts.length;
          this._meta = Meta.success;
        });
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }

      runInAction(() => {
        this._meta = Meta.error;
      });

      console.error('Failed to fetch products:', error);
    } finally {
      this._abortController = null;
    }
  }

  destroy(): void {
    if (this._abortController) {
      this._abortController.abort();
    }
  }
} 