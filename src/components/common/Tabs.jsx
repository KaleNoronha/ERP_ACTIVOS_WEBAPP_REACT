import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Tabs({ tabs, activeTab, setActiveTab }) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef(null);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollWidth > el.clientWidth && el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    checkScroll();
    el?.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      el?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [tabs]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({
        left: direction === 'left' ? 0 : el.scrollWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="relative">
        {/* Scroll left button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 px-2 bg-gradient-to-r from-white via-white to-transparent"
          >
            <ChevronLeft size={18} className="text-gray-400" />
          </button>
        )}

        {/* Tabs container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap
                  transition-colors duration-200
                  ${isActive 
                    ? 'text-brand-500' 
                    : 'text-gray-500 hover:text-gray-700'
                  }
                `}
              >
                <Icon size={18} className={isActive ? 'text-brand-500' : 'text-gray-400'} />
                {tab.label}
                
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Scroll right button */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 px-2 bg-gradient-to-l from-white via-white to-transparent"
          >
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
}
