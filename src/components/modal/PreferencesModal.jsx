import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { petCategoryOptions } from "@/utils/pet_categories";
import { bangladeshDistricts } from "@/utils/districts";
import { MapPin, Heart, CheckCircle } from "lucide-react";
import Select from "react-select";

const PreferencesModal = ({ isOpen, onClose, onSavePreferences }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [error, setError] = useState("");

    const handleCategoryToggle = (category) => {
        setSelectedCategories((prev) => {
            if (prev.includes(category)) {
                return prev.filter((c) => c !== category);
            } else {
                return [...prev, category];
            }
        });
        setError("");
    };

    const handleDistrictChange = (selectedOption) => {
        setSelectedDistrict(selectedOption ? selectedOption.value : "");
        setError("");
    };

    const handleSave = () => {
        if (selectedCategories.length === 0) {
            setError("Please select at least one pet category");
            return;
        }
        if (!selectedDistrict) {
            setError("Please select your district");
            return;
        }

        const preferences = {
            categories: selectedCategories,
            district: selectedDistrict,
            timestamp: new Date().toISOString(),
        };

        // Save to local storage
        localStorage.setItem("petMatchPreferences", JSON.stringify(preferences));

        // Call parent callback
        onSavePreferences(preferences);

        // Close modal
        onClose();
    };

    // Custom styles for react-select with proper dark mode support
    const customSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            paddingLeft: '2.5rem',
            minHeight: '48px',
            border: `1px solid ${state.isFocused ? 'var(--color-base-rose)' : 'var(--color-gray-border)'}`,
            borderRadius: '0.5rem',
            backgroundColor: 'var(--color-background-primary)',
            boxShadow: state.isFocused ? `0 0 0 2px var(--color-base-rose)` : 'none',
            '&:hover': {
                borderColor: state.isFocused ? 'var(--color-base-rose)' : 'var(--color-gray-light)'
            }
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'var(--color-gray-medium)',
            fontSize: '1rem',
            fontFamily: 'inherit'
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'var(--color-pg-black)',
            fontSize: '1rem',
            fontFamily: 'inherit'
        }),
        input: (provided) => ({
            ...provided,
            color: 'var(--color-pg-black)',
            fontSize: '1rem',
            fontFamily: 'inherit'
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'var(--color-background-primary)',
            border: '1px solid var(--color-gray-border)',
            borderRadius: '0.5rem',
            zIndex: 9999,
            fontSize: '1rem',
            fontFamily: 'inherit'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected 
                ? 'var(--color-base-rose)' 
                : state.isFocused 
                    ? 'var(--color-base-rose-light)' 
                    : 'transparent',
            color: state.isSelected 
                ? 'white' 
                : 'var(--color-pg-black)',
            fontSize: '1rem',
            fontFamily: 'inherit',
            '&:hover': {
                backgroundColor: 'var(--color-base-rose-light)',
                color: 'var(--color-pg-black)'
            }
        }),
        indicatorSeparator: () => ({
            display: 'none'
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0.75rem 1rem'
        })
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md md:max-w-xl overflow-y-auto bg-background-primary">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-heading-color font-heading">
                        <Heart className="w-6 h-6 text-base-rose" />
                        Set Your Pet Preferences
                    </DialogTitle>
                    <DialogDescription className="text-base mt-2 text-pg-base font-pg">
                        Help us find the perfect pet match for you! Select your preferred pet categories and location.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                    {/* Pet Categories Selection */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-heading-color font-heading">
                            <span className="text-base-rose">1.</span> Select Pet Categories
                        </h3>
                        <p className="text-sm text-pg-base mb-4 font-pg">
                            Choose one or more pet types you're interested in adopting
                        </p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {petCategoryOptions.map((category) => (
                                <button
                                    key={category.value}
                                    type="button"
                                    onClick={() => handleCategoryToggle(category.value)}
                                    className={`
                                        relative p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer
                                        ${
                                            selectedCategories.includes(category.value)
                                                ? "border-base-rose bg-base-rose-light dark:bg-base-rose-dark"
                                                : "border-gray-border dark:border-gray-dark hover:border-gray-light"
                                        }
                                    `}>
                                    {selectedCategories.includes(category.value) && (
                                        <CheckCircle className="absolute top-1 right-1 w-5 h-5 text-base-rose dark:text-base-white" />
                                    )}
                                    <div className="text-center">
                                        <span className="text-sm font-medium text-pg-base font-pg">
                                            {category.label}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* District Selection */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-heading-color font-heading">
                            <span className="text-base-rose">2.</span> Select Your District
                        </h3>
                        <p className="text-sm text-pg-base mb-4 font-pg">
                            Choose your location to find pets available near you
                        </p>
                        <div className="relative">
                            <Select
                                value={bangladeshDistricts.find(district => district.value === selectedDistrict) || null}
                                onChange={handleDistrictChange}
                                options={bangladeshDistricts}
                                placeholder="Select a district..."
                                isClearable
                                isSearchable
                                className="react-select-container"
                                classNamePrefix="react-select"
                                styles={customSelectStyles}
                            />
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-rose pointer-events-none z-10" />
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-light dark:bg-red-base border border-red-medium dark:border-red-base rounded-lg">
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 justify-end pt-4 border-t dark:border-white">
                        <Button variant="outline" onClick={onClose} className="px-6 bg-gray-light">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} className="px-6 bg-base-rose hover:bg-base-rose-dark text-white">
                            Save Preferences
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PreferencesModal;
