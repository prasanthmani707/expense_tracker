import { useEffect } from "react";

export default function GoogleLoginButton() {
  const handleCallbackResponse = (response) => {
    const userObject = jwt_decode(response.credential);
    console.log("Google User:", userObject);
    alert("Google Login Successful!");
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      {
        theme: "outline",
        size: "large",
        width: "100%"
      }
    );
  }, []);

  return (
    <div className="w-full">
      <div id="googleSignInDiv" className="w-full"></div>
    </div>
  );
}
