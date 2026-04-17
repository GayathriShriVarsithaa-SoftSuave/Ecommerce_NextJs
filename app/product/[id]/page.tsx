import Productdetails from '../../../components/productdetails/Productdetails';

export default async function Product(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return <Productdetails id={id} />;
}