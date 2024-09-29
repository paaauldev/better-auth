"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ChevronDown,
  MoreHorizontal,
  Eye,
  Edit,
  Key,
  Ban,
  Trash,
} from "lucide-react";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
export default function Studio() {
  const [searchTerm, setSearchTerm] = useState("");
  const users = [
    {
      name: "Eden Hazard",
      email: "john.doe@example.com",
      lastSignedIn: "2 hours ago",
      joined: "2023-05-15",
    },
    {
      name: "Cold Palmer",
      email: "john.doe@example.com",
      lastSignedIn: "2 hours ago",
      joined: "2023-05-15",
    },
    {
      name: "Kante",
      email: "john.doe@example.com",
      lastSignedIn: "2 hours ago",
      joined: "2023-05-15",
    },
    {
      name: "John",
      email: "john.doe@example.com",
      lastSignedIn: "2 hours ago",
      joined: "2023-05-15",
    },
  ];
  const [sortBy, setSortBy] = useState("Joined");
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Users</h1>
      <p className="text-sm text-gray-500 mb-6">View and manage users</p>

      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Joined">Joined</SelectItem>
              <SelectItem value="Name">Name</SelectItem>
              <SelectItem value="LastSignIn">Last Sign In</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-stone-600 hover:bg-stone-700 text-white">
            Create user
          </Button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last signed in
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
                <ChevronDown className="inline-block ml-1 h-4 w-4" />
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          {!users.length ? (
            users.map((user) => {
              return (
                <tbody key={user.email}>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500">
                      {user.lastSignedIn}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500">
                      {user.joined}
                    </td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit user</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Key className="mr-2 h-4 w-4" />
                            <span>Reset password</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Ban className="mr-2 h-4 w-4" />
                            <span>Ban user</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete user</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <tbody>
              <tr>
                <td colSpan={4} className="text-center py-16">
                  <div className="flex flex-col w-full items-center">
                    <Avatar className="h-12 w-12 mb-4">
                      <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                    <p className="text-lg font-medium text-gray-900 mb-1">
                      No users yet
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Create a new user or learn how to{" "}
                      <a href="#" className="text-stone-600 hover:underline">
                        migrate existing users
                      </a>
                    </p>
                    <Button className="bg-stone-600 hover:bg-stone-700 text-white">
                      Create user
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </main>
  );
}
