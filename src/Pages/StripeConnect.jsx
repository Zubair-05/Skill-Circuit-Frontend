import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/Components/ui/card.jsx";
import {Label} from "@/Components/ui/label.jsx";
import {Button} from "@/Components/ui/button.jsx";
import {Checkbox} from "@/Components/ui/checkbox.jsx"
import {useEffect} from "react";


const StripeConnect = () => {


    const connectToStripe = () => {
        const queryParams = new URLSearchParams({
            response_type: 'code',
            client_id: process.env.STRIPE_CLIENT_ID,
            scope:"read_write",
            redirect_uri: `http://localhost:5173`,
            "stripe_user[email]": "mahammadzubairmulla@gmail.com",
        });
        const url = `https://connect.stripe.com/oauth/authorize?${queryParams.toString()}`;
        return url;
    }

    // useEffect(() => {
    //     connectToStripe();
    // }, []);


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Card className="p-8 max-w-md w-full">
                <CardHeader>
                    <CardTitle>Connect Your Bank Account</CardTitle>
                    <CardDescription>Receive payments through Stripe by connecting your bank account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="consent"/>
                        <Label htmlFor="consent">I agree to the Stripe terms of service and privacy policy.</Label>
                    </div>
                    <Button type="button" className="w-full">
                        <a href={connectToStripe()}>
                            Connect to Stripe
                        </a>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default StripeConnect;