import { toast} from "@/components/ui/use-toast";
import useAuthStore from "@/store/useAuth";
import axios from "axios";

const apiRequest = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
});

apiRequest.interceptors.response.use(
    response => response,
    error => {
        
        const { status } = error.response;
        if (status === 401) {
            useAuthStore.getState().clearUser();
            toast({variant:"destructive",title:"Session Expired", description:"Please login again"});
            
        }
        return Promise.reject(error);
    }
);


export default apiRequest;