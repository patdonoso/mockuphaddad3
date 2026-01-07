import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories?: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories = ['Todos'],
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-12 rounded-xl border-border/50 bg-card pl-12 pr-4 shadow-card-haddad transition-shadow focus:shadow-haddad"
        />
      </div>
      
      <div className="flex items-center gap-3">
        <Filter className="hidden h-5 w-5 text-muted-foreground md:block" />
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="h-12 w-full min-w-[180px] rounded-xl border-border/50 bg-card shadow-card-haddad md:w-auto">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-border/50 bg-card">
            {categories.map((category) => (
              <SelectItem 
                key={category} 
                value={category}
                className="cursor-pointer rounded-lg transition-colors hover:bg-secondary"
              >
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchBar;
