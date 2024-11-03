import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from '../../types/products.types';
import productsService from '../../services/products.service';
interface ProductDetailPageState {
  data: IProduct | null;
  isLoading: boolean;
  error: string | null;
}

const ProductDetailPage = () => {
  const { id } = useParams();

  const [state, setState] = useState<ProductDetailPageState>({
    data: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const response = await productsService.getProduct(Number(id));

        setState((prev) => ({ ...prev, data: response.data }));
        setState((prev) => ({ ...prev, error: null }));
      } catch (error) {
        setState((prev) => ({ ...prev, error: (error as Error).message }));
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      {state.data?.title}
      {state.data?.price}
      {state.data?.description}
      {state.data?.category?.name}
      {state.data?.images.map((image, index) => <img key={index} src={image} alt={index.toString()} />)}
    </div>
  );
};

export default ProductDetailPage;
