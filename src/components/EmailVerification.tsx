import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

const EmailVerification = ({ emailVerified, handleSendVerification }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Verification</CardTitle>
      </CardHeader>
      <CardContent>
        {emailVerified ? (
          <p className="text-green-600 font-medium">
            ✅ Your email is verified
          </p>
        ) : (
          <div className="flex gap-4 items-center">
            <p className="text-red-600 font-medium">⚠️ Email not verified</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSendVerification}
            >
              <Mail className="h-4 w-4 mr-2" /> Resend Verification
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailVerification;
