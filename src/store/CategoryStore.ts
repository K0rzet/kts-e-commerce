import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { ICategory } from '@/types/category.types';
import categoriesService from '@/services/categories.service';
import { Meta } from '@/constants/meta';
import { ILocalStore } from '@/hooks/useLocalStore';
import { CollectionModel, getInitialCollectionModel, normalizeCollection, linearizeCollection } from '@/utils/collection';

type PrivateFields = '_categories' | '_meta' | '_selectedCategories';

export class CategoryStore implements ILocalStore {
  private _categories: CollectionModel<number, ICategory> = getInitialCollectionModel();
  private _selectedCategories: number[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<CategoryStore, PrivateFields>(this, {
      _categories: observable.ref,
      _selectedCategories: observable.ref,
      _meta: observable,
      categories: computed,
      selectedCategories: computed,
      meta: computed,
      getCategories: action,
      setSelectedCategories: action
    });
  }

  get categories(): ICategory[] {
    return linearizeCollection(this._categories);
  }

  get selectedCategories(): number[] {
    return this._selectedCategories;
  }

  get meta(): Meta {
    return this._meta;
  }

  setSelectedCategories(categoryIds: number[]): void {
    this._selectedCategories = categoryIds;
  }

  async getCategories(): Promise<void> {
    if (this._meta === Meta.loading) return;

    runInAction(() => {
      this._meta = Meta.loading;
    });

    try {
      const response = await categoriesService.getCategories();
      
      runInAction(() => {
        this._categories = normalizeCollection(
          response,
          (category) => category.id
        );
        this._meta = Meta.success;
      });
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error;
        this._categories = getInitialCollectionModel();
      });
      
      console.error('Failed to fetch categories:', error);
    }
  }

  destroy(): void {
    this._categories = getInitialCollectionModel();
    this._selectedCategories = [];
    this._meta = Meta.initial;
  }
}