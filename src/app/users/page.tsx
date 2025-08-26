"use client"
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import EditProfileDialog from '@/components/EditProfileDialog';


export default function UsersPage() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState<any[]>([]);

  const handleUserUpdate = (updatedUser: any) => {
    setUsers(users.map(u => u.email === updatedUser.email ? updatedUser : u));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "users"));
      const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    };
    fetchUsers();
  }, []);
  
  return (
      
          <Card>
              <CardHeader>
                  <CardTitle className="font-headline">User Management</CardTitle>
                  <CardDescription>List of all registered users and their roles.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Table>
                      <TableHeader>
                          <TableRow>
                              <TableHead>User</TableHead>
                              <TableHead>소개</TableHead>
                              <TableHead>Role</TableHead>
                              <TableHead className="text-center">Projects</TableHead>
                              <TableHead className="text-center">Contests</TableHead>
                              <TableHead><span className="sr-only">Actions</span></TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {users.map(user => (
                              <TableRow key={user.email}>
                                  <TableCell>
                                      <div className="flex items-center gap-3">
                                          <Avatar>
                                              <AvatarImage src={user.avatar} data-ai-hint={user.aiHint} />
                                              <AvatarFallback>{user.name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                                          </Avatar>
                                          <div>
                                              <p className="font-medium">{user.name}</p>
                                              <p className="text-sm text-muted-foreground">{user.email}</p>
                                          </div>
                                      </div>
                                  </TableCell>
                                  <TableCell>
                                      {user.introduction && <p className="text-sm text-muted-foreground">{user.introduction}</p>}
                                  </TableCell>
                                  <TableCell>
                                      {user.roles && user.roles.length > 0 ? user.roles.join(', ') : user.role}
                                  </TableCell>
                                  <TableCell className="text-center font-medium">
                                      {user.projects && user.projects.length > 0 ? (
                                          <div className="flex flex-wrap justify-center gap-1">
                                              {user.projects.map((projectName: string, index: number) => (
                                                  <Link key={index} href={`/projects/details?name=${encodeURIComponent(projectName)}`} className="text-blue-600 hover:underline">
                                                      {projectName}
                                                  </Link>
                                              ))}
                                          </div>
                                      ) : (
                                          <span>0</span>
                                      )}
                                  </TableCell>
                                  <TableCell className="text-center font-medium">{user.contests}</TableCell>
                                  <TableCell>
                                      <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                                  <MoreHorizontal className="h-4 w-4" />
                                                  <span className="sr-only">Toggle menu</span>
                                              </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                                              {currentUser && currentUser.email === user.email && (
                                                <Dialog>
                                                  <DialogTrigger asChild>
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit</DropdownMenuItem>
                                                  </DialogTrigger>
                                                  <EditProfileDialog user={user} onUpdate={handleUserUpdate} />
                                                </Dialog>
                                              )}
                                          </DropdownMenuContent>
                                      </DropdownMenu>
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </CardContent>
          </Card>
      
  );
}
