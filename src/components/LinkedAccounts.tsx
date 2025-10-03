import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link as LinkIcon, Unlink } from "lucide-react";

const LinkedAccounts = ({
  isEmailLinked,
  isGoogleLinked,
  email,
  password,
  setPassword,
  linkLoading,
  handleLinkEmailPassword,
  handleLinkGoogle,
  handleUnlinkGoogle,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Linked Accounts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Email & Password */}
        <div className="flex justify-between p-4 border rounded-lg">
          <p>Email & Password: {isEmailLinked ? "Linked" : "Not connected"}</p>
          {!isEmailLinked && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLinkEmailPassword(email, password);
              }}
              className="flex gap-2"
            >
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" size="sm" disabled={linkLoading}>
                Link
              </Button>
            </form>
          )}
        </div>

        {/* Google */}
        <div className="flex justify-between p-4 border rounded-lg">
          <p>Google: {isGoogleLinked ? "Linked" : "Not connected"}</p>
          {isGoogleLinked ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleUnlinkGoogle}
              disabled={linkLoading}
            >
              <Unlink className="h-4 w-4 mr-2" /> Unlink
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleLinkGoogle}
              disabled={linkLoading}
            >
              <LinkIcon className="h-4 w-4 mr-2" /> Link
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkedAccounts;
