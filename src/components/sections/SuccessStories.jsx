import React from "react";
import { Star, Calendar, MapPin } from "lucide-react";

const SuccessStories = () => {

    const stories = [
        {
            petName: "Bella",
            petType: "Golden Retriever",
            ownerName: "Sarah Johnson",
            location: "New York, NY",
            adoptionDate: "March 2024",
            story: "Bella was rescued from a shelter and was very shy at first. Now she's the most loving and playful companion I could ask for. She loves morning walks and has become best friends with my neighbor's cat!",
            image: "/api/placeholder/300/200"
        },
        {
            petName: "Whiskers",
            petType: "Tabby Cat",
            ownerName: "Mike Chen",
            location: "San Francisco, CA",
            adoptionDate: "January 2024",
            story: "Whiskers was found as a stray kitten. Today, he's a confident and curious cat who loves to explore every corner of our home. He's brought so much joy and laughter to our family.",
            image: "/api/placeholder/300/200"
        },
        {
            petName: "Rocky",
            petType: "Mixed Breed",
            ownerName: "Emma Davis",
            location: "Austin, TX",
            adoptionDate: "February 2024",
            story: "Rocky had trust issues when we first adopted him. With patience and love, he's now the most loyal companion. He even learned to play fetch and loves car rides to the park!",
            image: "/api/placeholder/300/200"
        }
    ];

    return (
        <div className="w-full main-container">
            <div className="text-center mb-12">
                <div className="mb-4">
                    <span className="text-base-orange font-bold text-lg uppercase tracking-wide">
                        Happy Endings
                    </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-heading-color mb-4">
                    Success Stories
                </h2>
                <p className="text-base sm:text-lg text-pg-base max-w-3xl mx-auto">
                    Every adoption is a new beginning. Read heartwarming stories from families who found their perfect companions through AdoptiPet.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {stories.map((story, index) => (
                    <div
                        key={index}
                        className="bg-background-secondary border border-gray-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-base-rose flex flex-col h-full"
                    >
                        <div className="h-48 bg-gradient-to-br from-base-rose/10 to-base-orange/10 flex items-center justify-center flex-shrink-0">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-base-rose/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl font-bold text-base-rose">
                                        {story.petName.charAt(0)}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-heading-color">
                                    {story.petName}
                                </h3>
                                <p className="text-sm text-pg-base">
                                    {story.petType}
                                </p>
                            </div>
                        </div>
                        
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-4 mb-4 text-sm text-pg-base">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{story.adoptionDate}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{story.location}</span>
                                </div>
                            </div>
                            
                            <p className="text-sm text-pg-base leading-relaxed mb-4 flex-grow">
                                "{story.story}"
                            </p>
                            
                            <div className="flex items-center justify-between mt-auto">
                                <div>
                                    <p className="font-semibold text-base-rose text-sm">
                                        - {story.ownerName}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-4 h-4 text-yellow-400 fill-current"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default SuccessStories;