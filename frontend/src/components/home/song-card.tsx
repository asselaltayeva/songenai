"use client"

import type { Category, Like, Song } from "@prisma/client"
import { Heart, Loader2, Music, Play } from "lucide-react";
import { useState } from "react";
import { getPlayUrl } from "~/actions/generation";
import { toggleLikeSong } from "~/actions/song";
import { usePlayerStore } from "~/stores/use-player-store";

type SongWithRelation = Song & {
    user: {name: string | null},
    _count: { likes: number },
    categories: Category[]
    thumbnailUrl?: string | null,
    likes?: Like[];
};

export function SongCard({song}: { song: SongWithRelation }) {
    const [isLoading, setIsLoading] = useState(false);
    const setTrack = usePlayerStore((state) => state.setTrack);
    const [isLiked, setIsLiked] = useState(song._count.likes > 0 ? true : false);
    const [likesCount, setLikesCount] = useState(song._count.likes);
    
    const handlePlay = async () => {
        setIsLoading(true);
        const playUrl = await getPlayUrl(song.id);
    
        setTrack({
          id: song.id,
          title: song.title,
          url: playUrl,
          artwork: song.thumbnailUrl,
          prompt: song.prompt,
          createdByUserName: song.user.name,
        });
    
        setIsLoading(false);
      };

      const handleLike = async (e: React.MouseEvent) => {
        e.stopPropagation();

        setIsLiked(!isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);

        await toggleLikeSong(song.id);
      }
      
    return (
        <div>
            <div onClick={handlePlay}
            className="cursor-pointer">
                <div className="group relative aspect-square w-full overflow-hidden 
                rounded-md bg-gray-200 group-hover:opacity-75">
                    {song.thumbnailUrl 
                    ? (
                        <img src={song.thumbnailUrl} alt={song.title}
                        className="h-full w-full object-cover object-center" />
                    ) : (
                        <div className="bg-muted flex h-full w-full items-center justify-center ">
                        <Music className="text-muted-foreground h-12 w-12"/>
                        </div>
                    )}

                    {/*Loading Spinner*/}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 
                    transition-opacity group-hover:opacity-100">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 
                        transition-transform group-hover:scale-105">
                            {isLoading 
                            ? (<Loader2 className="h-6 w-6 animate-spin text-white" />)
                            :(<Play className="h-6 w-6 text-white fill-white" />)}
                        </div>
                    </div>
                </div>

                 {/* Text */}
                 <div className="mt-2 px-1">
                    <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {song.title}
                    </h3>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {song.user.name}
                    </p>
                </div>

                <div className="mt-1 flex items-center justify-between text-xs text-gray-700 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                        <Play className="h-4 w-4 text-gray-500" />
                        <span>{song.listenCount.toLocaleString()} listens </span>
                    </div>
                    <button
                        onClick={handleLike}
                        className="flex items-center gap-1 text-gray-700 dark:text-gray-400"
                    >
                        <Heart
                        className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-500"}`}
                        />
                        <span>{likesCount.toLocaleString()} likes </span>
                    </button>
                </div>



            </div>
        </div>
    )

}