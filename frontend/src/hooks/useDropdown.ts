import { useEffect, useState, useRef } from 'react';

/**
 * Manages the state of a dropdown element.
 * The ref object that is returned must be applied to the dropdown DOM element.
 * @return A stateful value, a function to update it and a ref.
 */
export const useDropdown = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.RefObject<HTMLDivElement>
] => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as any)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return [isOpen, setIsOpen, ref];
};
