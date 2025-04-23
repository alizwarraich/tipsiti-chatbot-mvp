import React from "react";
import { placeSchema } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { z } from "zod";
import Image from "next/image";

const PlaceCard = ({ place }: { place: z.infer<typeof placeSchema> }) => {
    return (
        <a
            href={place.href}
            target="_blank"
            rel="noopener noreferrer"
            className="max-w-[300px] h-fit outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
        >
            <Card className="overflow-hidden h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={place.coverImageUrl}
                        alt={place.title}
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        width={300}
                        height={300}
                    />
                    <div className="absolute top-1 right-1">
                        <Badge>{place.category}</Badge>
                    </div>
                </div>
                <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold line-clamp-1">
                            {place.title}
                        </h3>
                        <span className="text-sm font-bold text-primary">
                            {place.priceRange}
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {place.description}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <span className="bg-accent py-0.5 px-2 rounded-full">
                            {place.locationCode}
                        </span>
                    </div>
                </CardContent>
                <CardFooter className="pt-0 pb-4">
                    <div className="flex items-center justify-between w-full text-sm">
                        <span className="text-muted-foreground">
                            View Details
                        </span>
                        <ExternalLink size={14} className="text-primary" />
                    </div>
                </CardFooter>
            </Card>
        </a>
    );
};

export default PlaceCard;
