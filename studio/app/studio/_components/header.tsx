import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
export const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="Avatar"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Select defaultValue="personal">
            <SelectTrigger className="w-[180px] border-0 bg-transparent focus:ring-0">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Personal account</SelectItem>
              <SelectItem value="business">Business account</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="bankos">
            <SelectTrigger className="w-[200px] border-0 bg-transparent focus:ring-0">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bankos">Better Auth Demo</SelectItem>
              <SelectItem value="other">Other projects</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
            Free
          </span>
          <Select defaultValue="development">
            <SelectTrigger className="w-[150px] border-0 bg-transparent focus:ring-0">
              <SelectValue placeholder="Select environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="production">Production</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
