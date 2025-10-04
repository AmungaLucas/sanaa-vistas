import { useEffect } from "react";

interface AdSenseProps {
  adSlot: string;
  adFormat?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  adLayout?: string;
  fullWidthResponsive?: boolean;
  className?: string;
}

const AdSense = ({
  adSlot,
  adFormat = "auto",
  adLayout,
  fullWidthResponsive = true,
  className = "",
}: AdSenseProps) => {
  useEffect(() => {
    try {
      // Push ad to adsbygoogle array
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8031704055036556"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
};

export default AdSense;
