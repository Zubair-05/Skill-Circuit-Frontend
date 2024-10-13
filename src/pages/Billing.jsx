import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust import according to your file structure
import { Card } from "@/components/ui/card"; // Adjust import according to your file structure
// import { Heading } from "@/components/ui/heading"; // Adjust import according to your file structure
import axios from "axios";

const Billing = () => {
    const [isConnected, setIsConnected] = useState(false);

    // useEffect(() => {
    //     // Fetch the user's Stripe connection status
    //     const fetchStripeConnectionStatus = async () => {
    //         try {
    //             const response = await axios.get(`${process.env.BASE_URL}/api/stripe/status`, {
    //                 withCredentials: true,
    //             });
    //             setIsConnected(response.data.isConnected);
    //         } catch (error) {
    //             console.error("Error fetching Stripe connection status:", error);
    //         }
    //     };
    //
    //     fetchStripeConnectionStatus();
    // }, []);

    // const handleConnectStripe = async () => {
    //     try {
    //         // Redirect the user to connect their Stripe account
    //         window.location.href = `${process.env.BASE_URL}/api/stripe/connect`;
    //     } catch (error) {
    //         console.error("Error connecting to Stripe:", error);
    //     }
    // };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center ">
            <Card className="p-6 shadow-lg rounded-lg">
                <div className="text-2xl font-bold mb-4">Billings</div>
                <p className="mb-6">Find all the details regarding your payments.</p>
                <Button
                    // onClick={handleConnectStripe}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                    {isConnected ? "View Dashboard" : "Link your account to Stripe"}
                </Button>
            </Card>
        </div>
    );
};

export default Billing;
