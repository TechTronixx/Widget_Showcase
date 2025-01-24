# E-commerce Widget System Documentation

## Overview

A modern, customizable widget system built with React, TypeScript, Framer Motion, and Tailwind CSS. The system provides a collection of reusable, accessible, and highly customizable e-commerce components designed for scalability and performance.




## Widget Showcase

https://github.com/user-attachments/assets/8fa33272-77dc-474f-8919-c9dc4b7d7dd9

Watch our widget system in action! The video above demonstrates our collection of e-commerce components including:

- Product Quick View with image gallery
- Dynamic Stock Status Indicators
- Animated Mini Cart Drawer
- Interactive Refer & Earn Widgets
- Order Status Timeline
- Back in Stock Notifications

Each component showcases smooth animations, responsive design, and theme customization capabilities.

## Core Features

- 🎨 Theme Support (Light/Dark)
- 🎯 Customizable Accent Colors
- 📱 Responsive Design
- ♿ Accessibility
- 🔄 Smooth Animations
- 🛡️ Type Safety
- 🎭 Multiple Variants

## Widget Collection

### 1. Product Quick View

A modal-based product viewer with:

- Image gallery with navigation
- Product details (name, price, description)
- Rating display
- Size and color selection
- Add to cart and wishlist actions
- Responsive layout
- Smooth enter/exit animations

```typescript
<ProductQuickView
  theme="light"
  accentColor="#FF5733"
  isOpen={true}
  product={productData}
  onClose={() => {}}
/>
```

### 2. Stock Status Indicator

A versatile status display with three variants:

- Badge: Compact inline status
- Card: Detailed status with progress
- Inline: Simple text-based status

Features:

- Multiple states (in-stock, low-stock, out-of-stock, restocking)
- Quantity tracking
- Progress visualization
- Customizable thresholds

```typescript
<StockStatusIndicator
  status="low-stock"
  quantity={3}
  variant="card"
  showQuantity={true}
/>
```

### 3. Mini Cart Drawer

A sliding cart drawer with:

- Animated entrance/exit
- Item quantity controls
- Remove item functionality
- Price breakdown
- Empty state handling
- Checkout button

```typescript
<MiniCartDrawer
  isOpen={true}
  items={cartItems}
  onUpdateQuantity={(id, qty) => {}}
  onRemoveItem={(id) => {}}
  shipping={5.99}
  tax={2.99}
/>
```

### 4. Refer & Earn Widgets

#### 4.1 Classic Form

A traditional referral form with:

- Email and name collection
- Form validation
- Success feedback
- Clean design

```typescript
<ReferAndEarnWidget
  theme="light"
  accentColor="#FF5733"
  rewardAmount={50}
  onSubmit={(data) => {}}
/>
```

#### 4.2 Gamified Card

A progress-tracking referral widget with:

- Milestone system
- Progress visualization
- Rank display
- Total referrals counter
- Next milestone preview

```typescript
<ReferAndEarnCard
  theme="light"
  accentColor="#FF5733"
  rewardAmount={50}
  totalReferrals={12}
  rank="Silver"
  nextMilestone={15}
/>
```

#### 4.3 Minimal Design

A streamlined single-field referral form:

- Single input field
- Instant submission
- Minimalist design
- Floating action button

```typescript
<ReferAndEarnMinimal
  theme="light"
  accentColor="#FF5733"
  rewardAmount={50}
  onSubmit={(email) => {}}
/>
```

#### 4.4 Social Sharing

A social-focused referral widget with:

- Multi-platform sharing
- Copyable referral code
- Tabbed interface
- Share statistics

```typescript
<ReferAndEarnSocial
  theme="light"
  accentColor="#FF5733"
  rewardAmount={50}
  referralLink="https://example.com/ref/123"
  referralCode="REF123"
/>
```

### 5. Order Status Widgets

#### 5.1 Classic Timeline

A detailed order tracking display:

- Vertical timeline
- Status icons
- Estimated delivery
- Order details

```typescript
<OrderStatusWidget
  theme="light"
  accentColor="#FF5733"
  currentStatus="processing"
  orderNumber="ORD123"
  estimatedDelivery="2024-02-01"
/>
```

#### 5.2 Compact View

A space-efficient status display:

- Horizontal progress
- Minimal design
- Key information only
- Mobile-optimized

```typescript
<OrderStatusCompact
  theme="light"
  accentColor="#FF5733"
  currentStatus="shipped"
  orderNumber="ORD123"
  estimatedDelivery="2024-02-01"
/>
```

#### 5.3 Toast Notification

A non-intrusive status update:

- Auto-dismissing
- Progress indicator
- Status-specific icons
- Minimal footprint

```typescript
<OrderStatusToast
  theme="light"
  accentColor="#FF5733"
  currentStatus="out-for-delivery"
  orderNumber="ORD123"
  isVisible={true}
  onClose={() => {}}
/>
```

### 6. Back in Stock Notification

A notification signup widget:

- Email collection
- Multiple notification options
- Success feedback
- Stock status display

```typescript
<BackInStockNotification
  theme="light"
  accentColor="#FF5733"
  productName="Premium Product"
  expectedDate="2024-02-01"
  onSubmit={(data) => {}}
/>
```

## Implementation Details

### Animation Strategy

- Using Framer Motion for fluid animations
- AnimatePresence for mount/unmount animations
- Spring animations for natural movement
- Layout animations for smooth transitions

### State Management

- Local state for UI interactions
- Props for data and callbacks
- Controlled components pattern

### Styling Approach

- Tailwind CSS for utility-first styling
- Dynamic theme switching
- Consistent spacing and colors
- Responsive breakpoints

### Type Safety

- TypeScript interfaces for props
- Strict null checks
- Exhaustive status handling
- Type guards where necessary

## Best Practices

### Performance

- Code splitting for each widget
- Optimized animations
- Lazy loading of images
- Memoization of expensive calculations

### Accessibility

- ARIA labels and roles
- Keyboard navigation
- Focus management
- Color contrast compliance

### Customization

- Theme support (light/dark)
- Configurable colors
- Multiple variants
- Flexible props API

## Common Interview Questions

1. **Why use Framer Motion over CSS animations?**

   - Better control over animation states
   - More complex animation sequences
   - Built-in exit animations
   - TypeScript support

2. **How is theme switching implemented?**

   - Theme prop passed to components
   - Conditional classes with Tailwind
   - Dynamic color variables
   - Consistent theme interface

3. **What makes the widgets reusable?**

   - Flexible props API
   - Consistent styling patterns
   - Self-contained components
   - Clear documentation

4. **How is performance optimized?**
   - Lazy loading
   - Animation optimization
   - Efficient re-renders
   - Code splitting

## Future Enhancements

1. **Integration Features**

   - Analytics hooks
   - A/B testing support
   - Custom event system
   - Third-party integrations

2. **Additional Customization**

   - More variants
   - Custom animation options
   - Extended theming
   - Layout alternatives

3. **Advanced Features**
   - Offline support
   - Multi-language
   - RTL support
   - Advanced analytics

## Technical Requirements

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "framer-motion": "^10.0.0",
    "tailwindcss": "^3.0.0",
    "lucide-react": "^0.300.0",
    "typescript": "^5.0.0"
  }
}
```

## Code Examples

### Theme Implementation

```typescript
interface ThemeProps {
  theme?: "light" | "dark";
  accentColor?: string;
}

const getThemeClasses = (theme: "light" | "dark") => ({
  background: theme === "light" ? "bg-white" : "bg-gray-900",
  text: theme === "light" ? "text-gray-900" : "text-white",
  border: theme === "light" ? "border-gray-200" : "border-gray-700",
});
```

### Animation Pattern

```typescript
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring" }}
    >
      {content}
    </motion.div>
  )}
</AnimatePresence>
```

## Contributing Guidelines

1. Follow TypeScript best practices
2. Maintain consistent styling patterns
3. Include proper documentation
4. Add necessary tests
5. Ensure accessibility compliance
