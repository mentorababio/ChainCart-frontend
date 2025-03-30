import { baseDomain } from "./BaseDomain";

export const xionService = baseDomain.injectEndpoints({
    endpoints:(build)=>({
        getXionBalance:build.query({
            query:(address)=>`xion/balance?address=${address}`,
        }),
        sendToXionEscrow:build.mutation({
            query:({ sellerAddress, amount }:{ sellerAddress:string, amount:string })=>({
                url:`xion/send_to_escrow`,
                body:{ sellerAddress, amount },
                method:"POST"
            }),
            invalidatesTags: ["Order", "Product"],
        })
    })
})

export const {useGetXionBalanceQuery,useSendToXionEscrowMutation} = xionService