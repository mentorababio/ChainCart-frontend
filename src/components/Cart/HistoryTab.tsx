import { ICartResponseData } from '@/@types/types';
import { Card, CardContent } from '../ui/card';
import { IUserOrderHistory } from '@/@types/types';
import { useAllUserOrderQuery } from '@/api/orderService';
import HistoryCard from './HistoryCard';

export interface CartProps {
  cart?: ICartResponseData;
}



export default function HistoryTab() {
  const { data, error } = useAllUserOrderQuery('release',{});

  console.log(error);

  return (
    <div className="w-full mx-auto py-4">
      <Card>
        <CardContent>
          {data?.data?.length > 0 ? (
            <div className="space-y-4">
              {data.data.map((purchase:IUserOrderHistory,index:number) => (
               <HistoryCard purchase={purchase} key={index}/>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No purchase history available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
