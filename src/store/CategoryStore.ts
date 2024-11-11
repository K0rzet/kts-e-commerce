import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { ICategory } from '../types/category.types';
import categoriesService from '../services/categories.service';
import { Meta } from '../constants/meta';
import { ILocalStore } from '../hooks/useLocalStore';
import { CollectionModel, getInitialCollectionModel, normalizeCollection, linearizeCollection } from '../utils/collection';

type PrivateFields = '_categories' | '_meta' | '_selectedCategories';

export default class CategoryStore implements ILocalStore {
  private _categories: CollectionModel<number, ICategory> = getInitialCollectionModel();
  private _selectedCategories: number[] = [];
  private _meta: Meta = Meta.initial;
  private _abortController: AbortController | null = null;

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
    if (this._abortController) {
      this._abortController.abort();
    }

    this._abortController = new AbortController();

    runInAction(() => {
      this._meta = Meta.loading;
    });

    try {
      const response = await categoriesService.getCategories();

      if (!this._abortController.signal.aborted) {
        runInAction(() => {
          this._categories = normalizeCollection(
            response,
            (category) => category.id
          );
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