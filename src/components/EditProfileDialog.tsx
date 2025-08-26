"use client";
import React, { useState, useEffect } from "react";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { app } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { User, Role } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  name?: string;
  introduction?: string;
  imageUrl?: string;
}

const EditProfileDialog: React.FC<{ user: UserProfile; onUpdate: (updatedUser: UserProfile) => void }> = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name || "");
  const [introduction, setIntroduction] = useState(user.introduction || "");
  const [imageUrl, setImageUrl] = useState(user.imageUrl || "");
  const { toast } = useToast();

  const handleSave = async () => {
    const userDocRef = doc(getFirestore(app), "users", user.id);
    const updatedData = { name, introduction, imageUrl };

    try {
      await updateDoc(userDocRef, updatedData);
      onUpdate({ ...user, ...updatedData });
      toast({ title: "Profile updated successfully!" });
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast({ title: "Failed to update profile.", variant: "destructive" });
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="imageUrl" className="text-right">
            Image URL
          </Label>
          <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="introduction" className="text-right">
            Introduction
          </Label>
          <Textarea id="introduction" value={introduction} onChange={(e) => setIntroduction(e.target.value)} className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit" onClick={handleSave}>Save changes</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default EditProfileDialog;