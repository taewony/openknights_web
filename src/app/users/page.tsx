"use client"
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "@/lib/firebase";
import { MainLayout } from '@/components/main-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from '@/components/ui/dropdown-menu';


export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "users"));
      const userList = querySnapshot.docs.map(doc => doc.data());
      setUsers(userList);
    };
    fetchUsers();
  }, []);
  
  return (
      <MainLayout>
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
                                      <Badge variant={user.role === 'Admin' ? 'destructive' : user.role === 'Judge' ? 'default' : 'secondary'}>{user.role}</Badge>
                                  </TableCell>
                                  <TableCell className="text-center font-medium">{user.projects}</TableCell>
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
                                              <DropdownMenuItem>Edit Role</DropdownMenuItem>
                                          </DropdownMenuContent>
                                      </DropdownMenu>
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </CardContent>
          </Card>
      </MainLayout>
  );
}
