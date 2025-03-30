import { baseDomain } from "./BaseDomain";


export const authService = baseDomain.injectEndpoints({
  endpoints: (build) => ({
    walletAuth: build.mutation({
      query: ({ walletAddress }: { walletAddress: string }) => ({
        url: '/wallet',
        method: 'POST',
        body: { walletAddress },
      }),
      // providesTags: [],
    //   invalidatesTags : [],
    }),
    authRegister: build.mutation({
      query: ({ email,password }: { email: string;password:string }) => ({
        url: '/register',
        method: 'POST',
        body: { email,password },
      }),
      // providesTags: [],
    //   invalidatesTags : [],
    }),
    authLogin: build.mutation({
      query: ({ email,password }: { email: string;password:string }) => ({
        url: '/login',
        method: 'POST',
        body: { email,password },
      }),
      // providesTags: [],
    //   invalidatesTags : [],
    }),
    
    
  }),
  
  overrideExisting: false,
});

export const {useWalletAuthMutation,useAuthRegisterMutation,useAuthLoginMutation } = authService;
