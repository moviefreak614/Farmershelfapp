import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  currentLang: 'en' | 'hi';
  onToggle: (lang: 'en' | 'hi') => void;
}

export function LanguageToggle({ currentLang, onToggle }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-white p-1 rounded-full border shadow-sm">
      <Button
        variant={currentLang === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onToggle('en')}
        className="rounded-full px-4 h-8"
      >
        English
      </Button>
      <Button
        variant={currentLang === 'hi' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onToggle('hi')}
        className="rounded-full px-4 h-8 font-sans"
      >
        हिंदी
      </Button>
    </div>
  );
}
