import apiRequest from "@/lib/apiRequest";
import useAuthStore from "@/store/useAuth";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

interface LoginProp{
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface DecodedResponse{
  email: string;
  name: string;
  picture: string;
  exp: number;
}
const Login = ({setIsLoginOpen}:LoginProp) => {
  const setUser = useAuthStore((state)=>state.setUser)
  const handleGoogleLogin = async (response: CredentialResponse) => {
    try {
      const decodedResponse:DecodedResponse = jwtDecode(response?.credential as string);
      const { email, name, picture, exp } = decodedResponse;
      const res = await apiRequest.post("auth/google-login", {
        username: name,
        email: email,
        profileImg: picture,
        exp: exp,
      });
      setUser(res.data);
      setIsLoginOpen(false);
      alert("Logged IN")
    } catch (error) {
      console.error("Error decoding credentialResponse:", error);
    }
  };
  return (
    <section className=" w-full flex flex-col gap-4 items-center">
      <p className="flex text-2xl font-bold">
        College
        <span className=" text-blue-600 flex">Buzz</span>
      </p>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => {
          alert("Login Failed");
        }}
      />
    </section>
  );
};

export default Login;
