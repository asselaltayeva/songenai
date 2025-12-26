"use client"
import React, { useState } from "react";
import type { Track } from "./track-list";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export function RenameDialog({
    track,
    onClose,
    onRename,
  }: {
    track: Track;
    onClose: () => void;
    onRename: (trackId: string, newTitle: string) => void;
  }) {
    const [title, setTitle] = useState(track.title ?? "");
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (title.trim()) {
        onRename(track.id, title.trim());
      }
      onClose();
    };
  
    return (
    <Dialog open={true} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
        <DialogHeader>
            <DialogTitle>Rename song</DialogTitle>
            <DialogDescription>
            Enter a new title for your song, then click save.
            </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
                Title
            </Label>
            <Input
                id="name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Summer Nights"
                className="col-span-3"
            />
            </div>
        </div>

        <DialogFooter>
            <DialogClose asChild>
            <Button variant="outline" type="button">
                Cancel
            </Button>
            </DialogClose>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
            Save
            </Button>
        </DialogFooter>
        </form>
    </DialogContent>
    </Dialog>
    );
  }