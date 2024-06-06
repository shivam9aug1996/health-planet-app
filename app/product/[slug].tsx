import ProductList from "@/components/ProductList";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export default function Page() {
  let slug: any = useLocalSearchParams();
  const navigation = useNavigation();
  slug = JSON.parse(slug?.slug);
  const { categoryName, categoryId } = slug;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back",
      headerTitle: categoryName,
    });
  }, [navigation, slug, categoryId]);

  return <ProductList categoryId={categoryId} />;
}
