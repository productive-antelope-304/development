# Development

### Link to Deployed Website

https://productive-antelope-304.github.io/development/

### Goal and Value of the Application

Oh no, did this have to have a goal? There isn’t one. It has no value beyond the mirth it may or may not impart into you. May you smile inwardly while your eyes bleed.

### Usability Principles Considered

1. It should be possible to use the application.
2. The filter options should be clearly visible at all times, even when scrolling.
3. Improved familiarity due to use of classic, time-tested UI standards
4. Since people will likely only use this interface once or a few times, it should not have a ton of shortcuts or hidden functionality.
5. The layout should be responsive on both mobile and desktop, with a reasonable style for each.

### Organization of Components

The main `App` component handles the high-level layout. Each city is a `<City />`, and the two windows in the sidebar are separate components. The filter checkboxes are also implemented as a component.

### How Data is Passed Down Through Components

It’s passed down as props (with `foo` and `setFoo` props when a lower down component needs to update). Most state is stored on `<App />` and passed down, but some components hold their own state (like the windows, which can be collapsed. `App` doesn’t need to know about that).

### How the User Triggers State Changes

They can click the checkboxes/radio buttons or click on a city to add it. Then they can click on the purchase button to receive a special message.
