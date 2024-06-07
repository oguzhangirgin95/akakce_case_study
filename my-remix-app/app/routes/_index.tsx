import Layout from "~/components/layout/index";
import ProductList from "~/components/productlist/ProductList";

export default function Index() {
  return (
    <Layout>
      <div className="flex items-center space-x-6">
        <ProductList />
      </div>
    </Layout>
  );
}
