import { Facebook, Twitter, Instagram } from "lucide-react";

export default function SocialIcons() {
  return (
    <div className="flex space-x-4 justify-center mt-4">
      <a href="#" className="!text-main hover:!text-primary">
        <Facebook />
      </a>
      <a href="#" className="!text-main hover:!text-primary">
        <Twitter />
      </a>
      <a href="#" className="!text-main hover:!text-primary">
        <Instagram />
      </a>
    </div>
  );
}
