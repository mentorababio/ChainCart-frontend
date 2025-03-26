import ProductDetail from '@/components/Product/ProductDetail'
import BackButton from '@/components/shared/BackButton'
import { useParams } from 'react-router-dom'


export default function Product() {
    const {productId} = useParams()
  return (
   <section className='container mx-auto px-3 lg:px-0'>
      <BackButton/>
      <ProductDetail productId={productId!}/>
   </section>
  )
}
