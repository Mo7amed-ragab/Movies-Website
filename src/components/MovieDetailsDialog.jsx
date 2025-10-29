import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shared/ui/dialog";
import { Button } from "../shared/ui/button";

const MovieDetailsDialog = ({
  title,
  overview,
  release_date,
  popularity,
  original_language,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-transparent cursor-pointer bg-white text-black transition-colors"
        >
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px] md:max-w-[500px] lg:max-w-[700px] border-[#0f0d23] bg-[#0f0d23]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold mb-2">{title}</DialogTitle>
          <DialogDescription className="text-gray-300 text-base leading-relaxed">
            {overview}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-gray-200">
          <p className="text-sm">
            <strong className="text-white">Release Date:</strong>{" "}
            {release_date || "N/A"}
          </p>
          <p className="text-sm">
            <strong className="text-white">Popularity:</strong>{" "}
            {popularity || "N/A"}
          </p>
          <p className="text-sm">
            <strong className="text-white">Language:</strong>{" "}
            {original_language?.toUpperCase() || "N/A"}
          </p>
        </div>
        <DialogFooter className="flex justify-end pt-4">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="cursor-pointer"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetailsDialog;
