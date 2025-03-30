import { Card, CardContent } from "@/components/ui/card";
import AppButton from "./AppButton";
import { RootState, useAppSelector } from "@/store";
// import { WalletConnect } from "../Wallet/WalletConnect";
import { IProduct } from "@/@types/types";
import { useProductActions } from "@/hooks/useProductActions";

// setKey(import.meta.env.VITE_GEOCODE);

export interface PropertyCardProps extends IProduct {
  discount?: number;
  oldPrice?: number;
  newPrice?: number;
  reviews: number;
  onPress?: () => void;
  isAddToCart?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  image_of_land,
  discount ,
  oldPrice,
  newPrice,
  title,
  mapping_location,
  reviews,
  price,
  stock,
  isAddToCart = false,
  _id
}) => {
  // const [address, setAddress] = useState<string | null>(null);
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const {isAddingToCart,handleAddToCart} = useProductActions(_id)


  return (
    <Card className="border border-gray-200 shadow-md rounded-lg overflow-hidden p-0">
      <div className="relative w-full">
        {discount && discount > 0 && (
          <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-primary text-white text-xs md:text-sm px-2 py-1 rounded-full">
            {discount}% OFF
          </span>
        )}

        <img
          src={image_of_land}
          alt={title}
          className="w-full h-[150px] sm:h-[180px] md:h-[150px] object-cover"
        />
      </div>

      <CardContent className="px-4 py-2">
        <h3 className="text-lg font-semibold text-input">{title}</h3>
        <p className="text-gray-500 text-sm">Lat:{mapping_location.lat}</p>
        <p className="text-gray-500 text-sm">Lng:{mapping_location.lng}</p>
        {/* <p className="text-main text-sm truncate">{address}</p> */}

        <div className="flex items-center gap-2 mt-2">
          {oldPrice && (
            <span className="text-gray-400 line-through text-sm">
             <small className="text-sm">XION</small> {oldPrice}
            </span>
          )}
          {newPrice ? (
            <span className="text-primary text-lg font-bold">
              <small className="text-sm">XION</small> {newPrice}
            </span>
          ) : (
            <span className="text-primary text-lg font-bold">
              <small className="text-sm">XION</small> {price}
            </span>
          )}
        </div>

        <p className="text-input text-xs mt-2">Available {stock}</p>
        {reviews > 0 && (
          <p className="text-gray-500 text-xs">{reviews} Reviews</p>
        )}

        {isAddToCart && (
          isAuthenticated && (
            <AppButton
              label={"Add To Cart"}
              isLoading={isAddingToCart}
              onClick={handleAddToCart}
              className="bg-primary text-white w-full mt-3"
            />
          )
          //  : (
          //   <WalletConnect buttonProps={{ className: "w-full mt-3" }} />
          // )
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
