import { useState } from "react";
import { useAppContext } from "../context/AppContext";

type Category = "All" | "Dog Food" | "Cat Food" | "Toys" | "Grooming";

interface Product {
  id: string;
  name: string;
  price: string;
  category: Exclude<Category, "All">;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Premium Dog Kibble",
    price: "$24.99",
    category: "Dog Food",
    image: "https://picsum.photos/seed/dogfood1/200/200",
  },
  {
    id: "2",
    name: "Grain-Free Dog Food",
    price: "$29.99",
    category: "Dog Food",
    image: "https://picsum.photos/seed/dogfood2/200/200",
  },
  {
    id: "3",
    name: "Puppy Starter Pack",
    price: "$19.99",
    category: "Dog Food",
    image: "https://picsum.photos/seed/dogfood3/200/200",
  },
  {
    id: "4",
    name: "Tuna Cat Delight",
    price: "$18.99",
    category: "Cat Food",
    image: "https://picsum.photos/seed/catfood1/200/200",
  },
  {
    id: "5",
    name: "Indoor Cat Formula",
    price: "$22.99",
    category: "Cat Food",
    image: "https://picsum.photos/seed/catfood2/200/200",
  },
  {
    id: "6",
    name: "Kitten Milk Replacer",
    price: "$14.99",
    category: "Cat Food",
    image: "https://picsum.photos/seed/catfood3/200/200",
  },
  {
    id: "7",
    name: "Interactive Dog Ball",
    price: "$12.99",
    category: "Toys",
    image: "https://picsum.photos/seed/toy1/200/200",
  },
  {
    id: "8",
    name: "Cat Feather Wand",
    price: "$9.99",
    category: "Toys",
    image: "https://picsum.photos/seed/toy2/200/200",
  },
  {
    id: "9",
    name: "Rope Tug Toy",
    price: "$8.99",
    category: "Toys",
    image: "https://picsum.photos/seed/toy3/200/200",
  },
  {
    id: "10",
    name: "Pet Brush Set",
    price: "$15.99",
    category: "Grooming",
    image: "https://picsum.photos/seed/groom1/200/200",
  },
  {
    id: "11",
    name: "Dog Shampoo",
    price: "$11.99",
    category: "Grooming",
    image: "https://picsum.photos/seed/groom2/200/200",
  },
  {
    id: "12",
    name: "Cat Nail Clippers",
    price: "$7.99",
    category: "Grooming",
    image: "https://picsum.photos/seed/groom3/200/200",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Dog Food",
  "Cat Food",
  "Toys",
  "Grooming",
];

export function PetShopModal() {
  const { setShowPetShop } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div
      className="modal-overlay"
      data-ocid="petshop.modal"
      onClick={() => setShowPetShop(false)}
      onKeyDown={(e) => e.key === "Escape" && setShowPetShop(false)}
    >
      <div
        className="w-full max-w-[430px] bg-background rounded-t-3xl animate-slide-up flex flex-col"
        style={{ maxHeight: "90dvh" }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 className="font-poppins font-bold text-xl text-foreground">
            Pet Shop 🛍️
          </h2>
          <button
            type="button"
            onClick={() => setShowPetShop(false)}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
            data-ocid="petshop.close_button"
          >
            ✕
          </button>
        </div>

        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground border border-border"
              }`}
              data-ocid="petshop.category_tab"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-8">
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="bg-card rounded-2xl shadow-card overflow-hidden"
                data-ocid={`petshop.product.item.${i + 1}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
                <div className="p-3">
                  <p className="font-poppins font-semibold text-xs text-foreground leading-tight mb-1">
                    {product.name}
                  </p>
                  <p className="text-secondary font-bold text-sm mb-2">
                    {product.price}
                  </p>
                  <a
                    href="https://example.com/buy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2 bg-secondary text-secondary-foreground rounded-xl text-xs font-bold"
                    data-ocid={`petshop.buy_button.${i + 1}`}
                  >
                    Buy Now 🛒
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
