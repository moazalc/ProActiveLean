"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", query);
    if (window.innerWidth < 768) {
      setIsExpanded(false);
    }
  };

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchBarRef} className="relative">
      <form onSubmit={handleSearch} className="flex items-center">
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isExpanded
              ? "w-[200px] sm:w-[300px] md:w-[400px]"
              : "w-0 md:w-[200px] md:border md:border-input md:rounded-md"
          )}
        >
          <div className="relative">
            <Input
              ref={inputRef}
              type="search"
              placeholder="Ara..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={cn(
                "w-full pl-2 pr-8",
                isExpanded ? "" : "md:pr-10 md:pl-4"
              )}
            />
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn("ml-2", isExpanded ? "" : "md:absolute md:right-0")}
          onClick={toggleSearch}
          aria-label={isExpanded ? "Close search" : "Open search"}
        >
          {isExpanded ? (
            <X className="h-5 w-5" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </Button>
      </form>
    </div>
  );
}
