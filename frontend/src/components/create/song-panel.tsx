"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { TabsContent } from "@radix-ui/react-tabs";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2, Music, Plus} from "lucide-react";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";
import { generateSong, type GenerateRequest } from "~/actions/generation";

const inspirationTags = [
    "Chill pop vibes",
    "Smooth jazz",
    "Indie electronic beats",
    "Lofi hip hop",
    "Acoustic guitar",
  ];

  const styleTags = [
    "Industrial rave",
    "Orchestral",
    "Electronic beats",
    "Funky guitar",
    "Soulful vocals",
  ];
  
  export function SongPanel() {
    const [mode, setMode] = useState<"simple" | "custom">("simple");
    const [description, setDescription] = useState("");
    const [instrumental, setInstrumental] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedStyleTags, setSelectedStyleTags] = useState<string[]>([]);
    const [lyricsMode, setLyricsMode] = useState<"write" | "auto">("write");
    const [lyrics, setLyrics] = useState("");
    const [styleInput, setStyleInput] = useState("");
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      setDescription(selectedTags.join(", "));
    }, [selectedTags])

    useEffect(() => {
        setStyleInput(selectedStyleTags.join(", "));
      }, [selectedStyleTags]);

    const handleCreate = async () => {
        if (mode === "simple" && !description.trim()) {
            toast.error("Please provide a description for your song.")
            return;
        }
        if (mode === "custom" && !lyrics.trim()) {
            toast.error("Please provide lyrics or a description for your song.")
            return;
        }
        if (mode === "custom" && !styleInput.trim()) {
            toast.error("Please provide styles for your song.")
            return;
        }

        // Generate the song
        let requestBody : GenerateRequest;

    if (mode === "simple") {
        requestBody = {
        fullDescribedSong: description,
        instrumental,
        }
    } else {
        const prompt = styleInput;
        if (lyricsMode === "write") {
            requestBody ={
                prompt,
                lyrics,
                instrumental,
            }
        } else {
            requestBody ={
                prompt,
                describedLyrics: lyrics,
                instrumental,
            };
        }
    }

    try {
        setLoading(true);
        await generateSong(requestBody);
        setDescription("");
        setLyrics("");
        setStyleInput("");
      } catch {
        toast.error("An error occurred while generating the song. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
  
    return (
      <div className="bg-muted/30 flex w-full flex-col border-r lg:w-80">
        <div className="flex-1 overflow-y-auto p-4">
          <Tabs
            value={mode}
            onValueChange={(value) => setMode(value as "simple" | "custom")}
          >
            <TabsList className="w-full">
              <TabsTrigger value="simple">Basic</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
  
            <TabsContent value="simple" className="mt-6 space-y-6">
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium">Describe your song</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Chill beat lofi song for studying and working"
                  className="min-h-[120px] resize-none"
                />
              </div>
  
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMode("custom")}
                >
                  <Plus className="mr-2" />
                  Lyrics
                </Button>
  
                <div className="flex items-center gap-2">
                  <Switch
                    checked={instrumental}
                    onCheckedChange={setInstrumental}
                  />
                  <label className="text-sm font-medium">Instrumental</label>
                </div>
              </div>
  
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium">
                  Genre tags for inspiration <span className="text-gray-400">(optional)</span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {inspirationTags.map((tag) => (
                    <label
                      key={tag}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedTags((prev) => [...prev, tag]);
                          } else {
                            setSelectedTags((prev) =>
                              prev.filter((t) => t !== tag)
                            );
                          }
                        }}
                        className="border-gray-400 data-[state=checked]:bg-gray-800"
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="mt-6 space-y-6">
              <div className="flex flex-col gap-3">
               <div className="flex items-center justify-between"> 
                <label className="text-sm font-medium">Lyrics</label>
                <div className="flex items-center gap-1">
                    <Button 
                    variant={lyricsMode === "auto" ? "secondary" : "ghost"}
                    onClick={() => {
                        setLyricsMode("auto");
                        setLyrics("");
                    }}
                    size= "sm" 
                    className="h-7 text-xs"
                    >Describe
                    </Button>

                    <Button 
                    variant={lyricsMode === "write" ? "secondary" : "ghost"}
                    onClick={() => {
                        setLyricsMode("write");
                        setLyrics("");
                    }}
                    size= "sm" 
                    className="h-7 text-xs"
                    >Write Lyrics
                    </Button>
                </div> 
               </div>

               <Textarea 
                placeholder={
                lyricsMode === "auto"
                ? "Describe the theme or story of your lyrics (e.g., a song about first love)"
                : "Type your lyrics here..."}
                value={lyrics} 
                onChange={(e) => setLyrics(e.target.value)}
                className="min-h-[100px]"/>
                </div>

                <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium">Styles</label>
                    <Textarea
                      placeholder="e.g., pop, rock, hip-hop"
                      value={styleInput}
                      onChange={(e) => setStyleInput(e.target.value)}
                      className="min-h-[60px] resize-none"
                    />
                </div>

                <div className="flex flex-col gap-3">
                <label className="text-sm font-medium">
                  Styles for inspiration <span className="text-gray-400">(optional)</span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {styleTags.map((tag) => (
                    <label
                      key={tag}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedStyleTags.includes(tag)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedStyleTags((prev) => [...prev, tag]);
                          } else {
                            setSelectedStyleTags((prev) =>
                              prev.filter((t) => t !== tag)
                            );
                          }
                        }}
                        className="border-gray-400 data-[state=checked]:bg-gray-800"
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              </div>
                </TabsContent>
          </Tabs>
        </div>

        <div className="my-3 border-t p-4">
          <Button 
            onClick={() => {
              toast.info(
                "Thank you! Your request is being processed. Two variations of the song will be generated soon. Please scroll down and refresh. ")
            handleCreate().catch((error) => {
              console.error("Error during song creation:", error);
            }) }}
            disabled={loading} 
            className="w-full cursor-pointer font-medium"
            >
            {loading ? <Loader2 className=" h-4 w-4 animate-spin" /> : <Music />}
            {loading ? "Generating..." : "Generate Song"}
          </Button>
        </div>
      </div>
    );
  }