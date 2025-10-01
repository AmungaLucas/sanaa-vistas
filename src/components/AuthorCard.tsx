import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AuthorCard = ({ name, about, avatar }) => (
  <Card className="my-8 rounded-xl shadow border border-border/50 bg-gradient-to-br from-white to-muted/20 dark:from-background dark:to-muted/5">
    <CardContent className="p-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
        <img
          src={avatar || "/api/placeholder/120/120"}
          alt={name}
          className="w-20 h-20 rounded-full object-cover border-2 border-white shadow"
        />
        <div className="flex-1">
          <h3 className="font-poppins font-bold text-lg text-heading mb-1">
            {name}
          </h3>
          <span className="text-xs text-muted-foreground block mb-2">
            Contributor & Cultural Curator
          </span>
          <p className="font-lora text-xs text-content mb-4 leading-relaxed">
            {about ||
              "Passionate writer and cultural curator documenting Kenya's vibrant creative scene."}
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            <Button size="sm" className="px-4 py-1 rounded-full text-xs">
              Follow Author
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="px-4 py-1 rounded-full text-xs"
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default AuthorCard;
