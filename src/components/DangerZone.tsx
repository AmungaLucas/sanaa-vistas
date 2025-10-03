import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

const DangerZone = ({ handleDeleteAccount }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-red-600">Danger Zone</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="destructive" onClick={handleDeleteAccount}>
          <Trash2 className="h-4 w-4 mr-2" /> Delete Account
        </Button>
      </CardContent>
    </Card>
  );
};

export default DangerZone;
