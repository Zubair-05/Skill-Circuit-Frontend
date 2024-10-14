import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.jsx"; // Adjust import according to your file structure
import { Card } from "@/components/ui/card.jsx"; // Adjust import according to your file structure
// import { Heading } from "@/components/ui/heading"; // Adjust import according to your file structure
import axios from "axios";
import {postApiCall, getApiCall} from "@/utils/apiHelper.js";

const Billing = () => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Fetch the user's Stripe connection status
        const fetchStripeConnectionStatus = async () => {
            try {
                const response = await axios.get(`${process.env.BASE_URL}/stripe/status`, {
                    withCredentials: true,
                });
                setIsConnected(response.data.isActivated);
            } catch (error) {
                console.error("Error fetching Stripe connection status:", error);
            }
        };

        fetchStripeConnectionStatus();
    }, []);

    const handleConnectStripe = async () => {
        try {
            if(isConnected){
                const response = await getApiCall(`/stripe/login/link`)
                window.location.href = `${response.data.loginUrl}`
            } else {
                const response = await postApiCall(`/stripe/connect`);
                window.location.href = `${response?.data?.linkUrl}`;
            }

        } catch (error) {
            console.error("Error connecting to Stripe:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center ">
            <Card className="p-6 shadow-lg rounded-lg">
                <div className="text-2xl font-bold mb-4">Billings</div>
                <p className="mb-6">Find all the details regarding your payments.</p>
                <Button
                    onClick={handleConnectStripe}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                    {isConnected ? "View Dashboard" : "Link your account to Stripe"}
                </Button>
            </Card>
        </div>
    );
};

export default Billing;
