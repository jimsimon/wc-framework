# wc-framework

## Mixins
* A11yMixin
* PropertiesMixin
* HostAttributesMixin
* EventListenersMixin
* LoggingMixin

## Component Types
* HTMLElement -> Good starting point for building your own base component
* A11yComponent -> HTMLElement, HostAttributesMixin, EventListenersMixin, A11yMixin, PropertiesMixin,
* Component -> HTMLElement, PropertiesMixin
* Application -> HTMLElement, EventListenersMixin

## Application Class/Object
Allows setting config in one spot.  Also a good place to set up routers, redux, etc.

### Config
Global config

#### Renderers
* ImmediateIDomRenderer - renders immediately on every prop change
* DebouncedIDomRenderer - batches render requests and renders on the next tick

#### Property Comparators
* BasicComparator - always returns true
* ShallowComparator - returns true if a shallow comparison of the properties indicates no differences
* DeepComparator?

## Testbed
Useful testing utility class
