# AI Agent Rules

## Code

* Write clean, readable and maintainable code.
* Keep components small and follow Single Responsibility Principle.
* Avoid unnecessary abstractions, dependencies and overengineering.
* Reuse existing components and utilities whenever possible.
* Use meaningful names for variables, functions and components.
* Do not leave unused code, imports or variables.

## React

* Use functional components and Hooks.
* Prefer composition and reusable components.
* Keep business logic separate from UI where reasonable.
* Handle loading, error and empty states for API-driven UI.
* Avoid unnecessary `useEffect`, `useMemo` and `useCallback`.

## Component Architecture

Use **Atomic Design** where appropriate:

* `atoms/` — basic UI elements
* `molecules/` — combinations of atoms
* `organisms/` — complex reusable sections
* `pages/` — application pages

Do not create abstractions just for the sake of following Atomic Design.

## CSS / BEM

Use **CSS** and **BEM** methodology.

```text
.block
.block__element
.block--modifier
```

Example:

```css
.photo-card {
  display: flex;
}

.photo-card__image {
  width: 100%;
}

.photo-card__title {
  font-size: 16px;
}

.photo-card--featured {
  border: 2px solid;
}
```

Avoid deeply nested selectors, `!important` and inline styles unless necessary.


## Responsive

The UI must be responsive for:
`1440px, 1024px, 768px, 375px`.

Prefer Flexbox/Grid and fluid layouts over unnecessary fixed dimensions.

## API

* Keep API requests in a dedicated API/service layer.
* Never hardcode API keys or secrets.
* Use environment variables.
* Handle API loading, errors and empty responses.

## Quality

Before finishing a task:

* Check ESLint/build errors.
* Remove unused code.
* Check responsive behavior.
* Check accessibility basics.
* Do not modify unrelated code.
