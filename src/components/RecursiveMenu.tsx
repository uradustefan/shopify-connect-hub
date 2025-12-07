import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@/types/giftbox';

interface RecursiveMenuProps {
  items: MenuItem[];
  level?: number;
  onClose: () => void;
}

interface MenuItemComponentProps {
  item: MenuItem;
  level: number;
  onClose: () => void;
}

const MenuItemComponent: React.FC<MenuItemComponentProps> = ({ item, level, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    } else if (item.href) {
      navigate(item.href);
      onClose();
    } else if (item.tag) {
      navigate(`/products?tag=${item.tag}`);
      onClose();
    }
  };

  const paddingLeft = level * 16;

  return (
    <div>
      <motion.button
        onClick={handleClick}
        className={`w-full flex items-center justify-between py-3 px-4 text-left transition-colors hover:bg-secondary/50 rounded-lg group ${
          level === 0 ? 'text-lg font-semibold' : level === 1 ? 'text-base' : 'text-sm text-muted-foreground'
        }`}
        style={{ paddingLeft: `${paddingLeft + 16}px` }}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <span className="flex-1">{item.title}</span>
        {hasChildren && (
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
          </motion.div>
        )}
        {item.tag && !hasChildren && (
          <span className="text-xs text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full">
            {item.tag}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-l border-border/30 ml-6">
              {item.children!.map((child, index) => (
                <MenuItemComponent
                  key={`${child.title}-${index}`}
                  item={child}
                  level={level + 1}
                  onClose={onClose}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RecursiveMenu: React.FC<RecursiveMenuProps> = ({ items, level = 0, onClose }) => {
  return (
    <nav className="space-y-1">
      {items.map((item, index) => (
        <MenuItemComponent
          key={`${item.title}-${index}`}
          item={item}
          level={level}
          onClose={onClose}
        />
      ))}
    </nav>
  );
};

export default RecursiveMenu;
