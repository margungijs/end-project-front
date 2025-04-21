import React, { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

const tagCategories = {
    "Topics": [
        "Life", "Love", "Mental Health", "Relationships", "Work", "School", "Money",
        "Fitness", "Food", "Travel", "Fashion", "Beauty", "Art", "Music", "Gaming",
        "Books", "Movies", "Tech", "Business", "Sports", "Politics", "News", "Science"
    ],
    "Content Type": [
        "Storytime", "Advice", "Question", "Confession", "Rant", "Meme", "Quote",
        "Photo", "Video", "Tutorial", "Thread", "Challenge", "Review", "Guide"
    ],
    "Vibes": [
        "Funny", "Serious", "Wholesome", "Controversial", "Inspiring", "Relatable",
        "Random", "TMI", "Cringe", "Dark", "Feel Good", "Motivational", "Petty"
    ],
    "Social & Culture": [
        "Dating", "Friendship", "Family", "Culture", "Language", "Fandom", "Aesthetic",
        "Spirituality", "Zodiac", "Identity", "LGBTQ+", "Gen Z", "Millennial", "Trad"
    ],
    "Time & Events": [
        "Morning", "Night", "Weekend", "Holiday", "Throwback", "Now", "2020s", "Trend",
        "Hot Take", "Life Update", "Viral", "AMA", "POV", "Unpopular Opinion"
    ],
    "Intent": [
        "Help", "Vent", "Share", "React", "Learn", "Debate", "Show Off", "Expose",
        "NSFW", "NSFL", "Just Saying", "Low Effort", "Deep", "Not Clickbait"
    ]
};

const MAX_TAGS = 5;

const TagSelector = ({tags, setTags}) => {
    const [selectedTags, setSelectedTags] = useState(tags || []);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleTag = (tag) => {
        let updated;
        if (selectedTags.includes(tag)) {
            updated = selectedTags.filter(t => t !== tag);
        } else if (selectedTags.length < MAX_TAGS) {
            updated = [...selectedTags, tag];
        } else {
            return;
        }

        setSelectedTags(updated);
        setTags(updated);
    };

    const removeTag = (tag) => {
        const updated = selectedTags.filter(t => t !== tag);
        setSelectedTags(updated);
        setTags(updated);
    };


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        setSelectedTags(tags || []);
    }, [tags]);

    return (
        <div className="space-y-6 pb-4">
            {/* Selected Tags Section */}
            <div>
                <h3 className="text-neutral-200 text-2xl mb-2">Selected Tags ({selectedTags.length}/{MAX_TAGS})</h3>
                <h1 className="text-neutral-600 mb-4">Add tags to your post to help push them out there and help find your target audience</h1>
                <div className="flex flex-wrap gap-2">
                    {selectedTags.map(tag => (
                        <div key={tag} className="flex items-center bg-neutral-950 text-neutral-200 px-3 py-1 rounded-full text-sm">
                            {tag}
                            <button
                                onClick={() => removeTag(tag)}
                                className="ml-2 text-red-600 hover:text-red-600"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                    {selectedTags.length === 0 && <span className="text-sm text-neutral-600">No tags selected yet.</span>}
                </div>
            </div>

            {/* Dropdown Toggle */}
            <div className="flex items-center justify-between cursor-pointer" onClick={toggleDropdown}>
                <h4 className="text-md font-semibold text-neutral-200 mb-1">Tag Categories</h4>
                {isDropdownOpen ? (
                    <ChevronUp className="h-5 w-5 text-neutral-200" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-neutral-200" />
                )}
            </div>

            {/* Dropdown Content */}
            {isDropdownOpen && (
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {Object.entries(tagCategories).map(([category, tags]) => (
                        <div key={category}>
                            <h4 className="text-md font-semibold text-neutral-200 mb-1">{category}</h4>
                            <div className="flex flex-wrap gap-2">
                                {tags.map(tag => {
                                    const isSelected = selectedTags.includes(tag);
                                    return (
                                        <button
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            className={`px-3 py-1 rounded-full text-sm transition ${
                                                isSelected
                                                    ? 'bg-neutral-900 text-white border-blue-600'
                                                    : 'bg-neutral-950 text-neutral-200 hover:bg-neutral-900'
                                            }`}
                                        >
                                            {tag}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TagSelector;
