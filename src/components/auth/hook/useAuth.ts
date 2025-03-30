import { IApiResponse, IMessage, IUserResponse } from "@/@types/types";
import { useAuthLoginMutation, useAuthRegisterMutation } from "@/api/authService";
import { setAuthenticated } from "@/features/authSlice";
import { useToast } from "@/hooks/useToast";
import { useAppDispatch } from "@/store";
import AuthStore from "@/utils/AuthStore";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
    const [register, { isLoading: registerLoad }] = useAuthRegisterMutation();
    const [login, { isLoading: loginLoad }] = useAuthLoginMutation();
    const toast = useToast();
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    
    const registerAuth = async (email: string, password: string) => {
        toast.dismiss();
        const loadingToast = toast.loading("Registering...");

        try {
            const response: IApiResponse = await register({ email, password }).unwrap();
            toast.dismiss(loadingToast);

            if (response.status === 201) {
                const successResponse = response.data as IUserResponse;
                dispatch(
                    setAuthenticated({
                        isAuthenticated: true,
                        user: {
                            id: successResponse.accessToken,
                            roles: successResponse.user!.role,
                            walletAddress: successResponse.user!.walletAddress,
                        },
                    })
                );
                navigate('/',{replace:true})
                AuthStore.setAccessToken(successResponse.accessToken);
                toast.success("Registration successful!");
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } catch (error: unknown) {

            const err = error as { data?: IMessage }; 
            const errMsg = err?.data?.message || "An error occurred during registration.";
          
            toast.dismiss(loadingToast);
            toast.error(errMsg);
        }
    };

    const loginAuth = async (email: string, password: string) => {
        toast.dismiss();
        const loadingToast = toast.loading("Logging in...");
        
        
        try {
            const response: IApiResponse = await login({ email, password }).unwrap();
            toast.dismiss(loadingToast);
            
            if (response.status === 200) {
                const successResponse = response.data as IUserResponse;
                dispatch(
                    setAuthenticated({
                        isAuthenticated: true,
                        user: {
                            id: successResponse.accessToken,
                            roles: successResponse.user!.role,
                            walletAddress: successResponse.user!.walletAddress,
                        },
                    })
                );

                navigate('/',{replace:true})
                AuthStore.setAccessToken(successResponse.accessToken);
                toast.success("Login successful!");
            } else {
                toast.error("Login failed. Please check your credentials.");
            }
        } catch (error:unknown) {
            const err = error as { data?: IMessage }; 
            const errMsg = err?.data?.message || "An error occurred during login.";
            toast.dismiss(loadingToast);
            toast.error(errMsg);
        }
    };
     const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
          AuthStore.removeAccessToken();
          dispatch(setAuthenticated({ isAuthenticated: false, user: null }));
          toast.success("Log out sucess successfully.");
          navigate('/',{replace:true})
        }
      };
    
    return { registerAuth, loginAuth, registerLoad, loginLoad ,handleLogout};
}
