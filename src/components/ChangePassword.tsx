import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound } from "lucide-react";

const ChangePassword = ({
  newPassword,
  setNewPassword,
  handleChangePassword,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button onClick={handleChangePassword} disabled={!newPassword}>
          <KeyRound className="h-4 w-4 mr-2" /> Update
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
