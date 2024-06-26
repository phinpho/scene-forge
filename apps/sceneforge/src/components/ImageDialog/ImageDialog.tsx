import { Button, Dialog, Variant } from "@sceneforge/ui";
import { useCallback, useState } from "react";

import { Image } from "../Image";

export type ImageDialogProps = {
  alt?: string;
  src: string;
  title?: string;
};

export const ImageDialog = ({ alt, src, title }: ImageDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleImageDialogClick = useCallback(() => {
    setIsOpen(previousIsOpen => !previousIsOpen);
  }, []);
  const closeImageDialog = useCallback(() => {
    setIsOpen(false);
  }, []);
  return (
    <>
      <Button
        onClick={handleImageDialogClick}
      >
        <Image
          alt={alt}
          className="block h-full w-full object-scale-down"
          src={src}
          title={title}
        />
      </Button>
      {isOpen && (
        <Dialog
          onClose={closeImageDialog}
          title={alt}
          variant={Variant.Accent}
        >
          <figure>
            <Image
              alt={alt}
              className="block h-full w-full object-scale-down"
              src={src}
              title={title}
            />
            <figcaption className="block text-center text-size-lg">
              {title}
            </figcaption>
          </figure>
        </Dialog>
      )}
    </>
  );
};
