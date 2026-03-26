# Equipment Image System Documentation

## Overview

The KisanSaathi equipment marketplace uses an intelligent image mapping system that automatically displays relevant, high-quality images for each piece of agricultural equipment.

## Architecture

### Components

1. **`lib/equipment-images.ts`** - Image mapping utility
   - Maintains a centralized map of equipment names to high-quality image URLs
   - Each equipment has primary and fallback images from Unsplash
   - Includes emoji and gradient fallbacks for complete failure scenarios
   - Keyword matching for flexible equipment name matching

2. **`components/equipment-image.tsx`** - Smart image component
   - Handles image loading with shimmer skeleton animation
   - Implements three-tier fallback system:
     1. Primary Unsplash image (best quality)
     2. Fallback Unsplash image (alternative)
     3. Emoji + gradient background (when URLs fail)
   - Lazy loading with `loading="lazy"` attribute
   - Proper error handling and state management

3. **`components/equipment-marketplace.tsx`** - Main marketplace
   - Uses `EquipmentImage` component for all equipment cards
   - Passes equipment name to component for dynamic lookup

## Equipment Coverage

Current equipment types with dedicated images:

- **Tractors**: Mahindra 575 DI, John Deere 5050D, Kubota MU5502
- **Harvesters**: New Holland TC5.30 Combine Harvester
- **Water Pumps**: Kirloskar 5HP Water Pump
- **Sprayers**: Aspee Battery Sprayer
- **Seed Drills**: Fieldking Seed Driller
- **Soil Preparation**: Sonalika Rotavator

## Adding New Equipment

To add a new equipment type with images:

1. Update `equipment-images.ts`:
   ```typescript
   "Your Equipment Name": {
     primary: "https://images.unsplash.com/photo-xxx?w=800&h=500&fit=crop&q=85",
     fallback: "https://images.unsplash.com/photo-yyy?w=800&h=500&fit=crop&q=85",
     emoji: "🎯",
     gradient: "linear-gradient(135deg, #hex, #hex)",
     keywords: ["equipment", "type", "variant"]
   }
   ```

2. The component automatically handles the rest via keyword matching

## Image Quality Parameters

All images use consistent optimization:
- Width: 800px
- Height: 500px
- Fit: crop
- Quality: 85 (high quality, optimized file size)
- Aspect Ratio: 16:9

## Fallback Behavior

1. **Component loads**: Shows shimmer skeleton (animated gradient)
2. **Primary image loads**: Fade in with smooth transition
3. **Primary image fails**: Automatically tries fallback image
4. **Fallback image fails**: Shows equipment emoji on gradient background
5. **Dark overlay**: Applied for text readability on images

## Performance Features

- **Lazy Loading**: Images load only when visible
- **Async Decoding**: Non-blocking image decoding
- **Shimmer Animation**: Better perceived performance
- **Keyword Matching**: Flexible equipment name matching without exact string match

## Browser Compatibility

- Modern browsers with ES6 support
- Lazy loading: Chrome 76+, Firefox 75+, Safari 15.1+, Edge 76+
- Fallback for older browsers: Shows emoji gradient instantly

## Image Sources

All images sourced from Unsplash API with appropriate query optimization:
- No authentication required
- Free for commercial use
- Consistent, high-quality agricultural/equipment imagery
